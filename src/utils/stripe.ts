
import { loadStripe } from '@stripe/stripe-js';

// Load Stripe with the publishable key
const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_51RAxUwQ4859M5SqJjAiumjk8W5o62UhEcq4zEFbkKkXc5B2tqIStjOlNTvl5geHTQxTcHpCtlGDOd0gDi5xWvwPy00z5R8Y0Wo');

export default stripePromise;
