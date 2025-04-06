
# Razorpay Integration Setup Guide

## Step 1: Create a Razorpay Account

1. Sign up for a Razorpay account at [https://razorpay.com](https://razorpay.com)
2. Complete the registration process

## Step 2: Get Your API Keys

1. Login to your Razorpay Dashboard
2. Go to Settings > API Keys
3. Generate a new API key pair if you don't have one already
4. You will need both the Key ID and the Key Secret

## Step 3: Add API Keys to Supabase

1. Go to your Supabase Dashboard: [https://supabase.com/dashboard/project/ockqidspcyxqaspdwddh/settings/functions](https://supabase.com/dashboard/project/ockqidspcyxqaspdwddh/settings/functions)
2. Click on "Edge Functions" in the left sidebar
3. Click on "Settings" for the Edge Functions section
4. Add the following environment variables:
   - `RAZORPAY_KEY_ID`: Your Razorpay Key ID
   - `RAZORPAY_KEY_SECRET`: Your Razorpay Key Secret
5. Click "Save"

## Step 4: Test Your Integration

1. Add items to your cart in the Cherry Fashion store
2. Proceed to checkout
3. Fill in the checkout form and submit
4. You should be redirected to the Razorpay payment page
5. Complete the payment (use test mode in the Razorpay dashboard for testing)
6. You should be redirected back to the order confirmation page

## Troubleshooting

If you encounter any issues:

1. Check your API keys are correct in the Supabase Edge Function settings
2. Look at the Edge Function logs for any errors
3. Ensure your Razorpay account is properly set up and verified
4. For testing, use Razorpay's test mode and test cards
