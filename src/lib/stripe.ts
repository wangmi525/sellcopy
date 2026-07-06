import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia' as any,
});

export const PLANS = {
  free: { name: 'Free', price: 0, dailyLimit: 3, features: ['3 generations/day', 'Amazon & Shopify', 'Basic templates'] },
  pro: { name: 'Pro', price: 9.9, stripePriceId: process.env.STRIPE_PRO_PRICE_ID || '', dailyLimit: -1, features: ['Unlimited generations', 'All platforms', 'Multi-language', 'SEO optimization', 'History'] },
  business: { name: 'Business', price: 19.9, stripePriceId: process.env.STRIPE_BUSINESS_PRICE_ID || '', dailyLimit: -1, features: ['Everything in Pro', 'API access', 'Team collaboration', 'Priority support', 'Custom templates'] },
} as const;
