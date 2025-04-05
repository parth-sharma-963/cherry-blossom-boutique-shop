
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

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
    
    // Create Razorpay order
    const razorpayKey = Deno.env.get("RAZORPAY_KEY_ID") || "";
    const razorpaySecret = Deno.env.get("RAZORPAY_KEY_SECRET") || "";
    
    // Create authorization header for Razorpay API
    const auth = btoa(`${razorpayKey}:${razorpaySecret}`);
    
    // Calculate amount in smallest currency unit (paise for INR)
    const amountInPaise = Math.round(orderInfo.total * 100);
    
    // Create a Razorpay order
    const orderResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: "INR",
        receipt: orderInfo.orderNumber,
        notes: {
          orderNumber: orderInfo.orderNumber,
          email: orderInfo.email,
        }
      }),
    });
    
    if (!orderResponse.ok) {
      const errorData = await orderResponse.json();
      throw new Error(`Failed to create Razorpay order: ${JSON.stringify(errorData)}`);
    }
    
    const razorpayOrder = await orderResponse.json();
    
    // Store order info in session storage for retrieval after payment
    const responseData = {
      orderId: razorpayOrder.id,
      amount: amountInPaise,
      currency: razorpayOrder.currency,
      keyId: razorpayKey,
      orderInfo: orderInfo,
    };
    
    // Return the order details to the client
    return new Response(
      JSON.stringify(responseData),
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
