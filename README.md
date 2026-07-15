# SellCopy.ai

AI-powered product description generator for e-commerce sellers. Generate SEO-optimized listings for Amazon, Shopify, and Etsy in seconds.

**Live Demo:** [sellcopy.vercel.app](https://sellcopy.vercel.app)

## Features

- **Amazon SEO** — Optimized titles, bullet points, and descriptions following Amazon ranking algorithms
- **Shopify Listings** — Compelling product pages that convert visitors into buyers
- **Etsy Tags & Descriptions** — Stand out in Etsy search with relevant tags and unique copy
- **Multi-Language** — Generate listings in English, Chinese, Spanish, French, German, Japanese
- **SEO Keywords** — Automatic keyword research and integration for better ranking
- **Instant Results** — Professional copy in under 5 seconds

## Tech Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS 4
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL + Auth)
- **AI:** Groq (LLaMA 3)
- **Payments:** Stripe (Subscriptions)
- **Deployment:** Vercel

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/wangmi525/sellcopy.git
cd sellcopy
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your keys:

```bash
cp .env.example .env.local
```

Required keys:
- `GROQ_API_KEY` — Get from [console.groq.com](https://console.groq.com)
- `NEXT_PUBLIC_SUPABASE_URL` — Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key (Settings → API)
- `STRIPE_SECRET_KEY` — Stripe secret key (dashboard.stripe.com)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — Stripe publishable key
- `STRIPE_WEBHOOK_SECRET` — Stripe webhook signing secret
- `STRIPE_PRO_PRICE_ID` — Stripe price ID for Pro plan
- `STRIPE_BUSINESS_PRICE_ID` — Stripe price ID for Business plan
- `NEXT_PUBLIC_APP_URL` — Your app URL (e.g., `http://localhost:3000`)

### 4. Set up Supabase database

Go to Supabase Dashboard → SQL Editor, run the contents of `supabase-schema.sql`.

### 5. Set up Stripe webhook

Create a webhook endpoint in Stripe Dashboard:
- URL: `https://your-domain.com/api/webhook`
- Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`

### 6. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pricing

| Plan | Price | Features |
|------|-------|----------|
| Free | $0 | 3 generations/day, Amazon & Shopify, English only |
| Pro | $9.9/mo | Unlimited, all platforms, multi-language, SEO, history |
| Business | $19.9/mo | Everything in Pro + API, team, custom templates, bulk |

## Deployment

Push to GitHub and connect to Vercel for automatic deployments.

```bash
git push origin main
```

Vercel will auto-detect Next.js and deploy.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

- **Issues:** [GitHub Issues](https://github.com/wangmi525/sellcopy/issues)
- **Email:** Contact via [sellcopy.vercel.app](https://sellcopy.vercel.app)

## License

Distributed under the MIT License. See `LICENSE` for more information.
