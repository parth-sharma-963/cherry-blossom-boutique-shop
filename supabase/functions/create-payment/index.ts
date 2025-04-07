
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderInfo } = await req.json();
    console.log("Order info received:", JSON.stringify(orderInfo));
    
    // Initialize Stripe
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
    }
    
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2022-11-15",
    });

    // Create line items from cart items
    const lineItems = orderInfo.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product.name,
          // Remove the images array to avoid URL validation errors
        },
        unit_amount: Math.round(item.product.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Calculate tax
    const taxAmount = Math.round(orderInfo.total * 0.08 * 100); // 8% tax in cents
    
    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/checkout`,
      customer_email: orderInfo.email,
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0, // Free shipping
              currency: "usd",
            },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 3,
              },
              maximum: {
                unit: "business_day",
                value: 5,
              },
            },
          },
        },
      ],
      tax_id_collection: {
        enabled: false,
      },
      metadata: {
        orderNumber: orderInfo.orderNumber,
      }
    });

    console.log("Stripe session created:", session.id);

    // Return the session ID and URL to the client
    return new Response(
      JSON.stringify({ sessionId: session.id, url: session.url }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error creating payment:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
