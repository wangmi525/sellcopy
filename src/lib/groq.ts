import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

export interface GenerateInput {
  mode: 'product' | 'social' | 'email' | 'seo' | 'ads';
  input: string;
  platform?: string;
  language?: string;
  tone?: string;
  features?: string;
}

const modePrompts: Record<string, { system: string; structure: string }> = {
  product: {
    system: 'You are an expert e-commerce copywriter. Generate optimized product listings following SEO best practices.',
    structure: '{"title":"Product title (max 200 chars)","bullets":["Bullet 1","Bullet 2","Bullet 3","Bullet 4","Bullet 5"],"description":"Product description (200-300 words)","hashtags":["hashtag1","hashtag2","hashtag3","hashtag4","hashtag5"],"seoKeywords":["keyword1","keyword2","keyword3","keyword4","keyword5"]}',
  },
  social: {
    system: 'You are a social media content expert. Generate engaging social media posts that drive engagement and conversions.',
    structure: '{"title":"Post caption","bullets":["Hashtag 1","Hashtag 2","Hashtag 3","Hashtag 4","Hashtag 5","Hashtag 6","Hashtag 7"],"description":"The full social media post with emojis and call-to-action (100-300 words)","hashtags":["hashtag1","hashtag2","hashtag3","hashtag4","hashtag5"],"seoKeywords":["best time to post","content strategy","engagement tips"]}',
  },
  email: {
    system: 'You are an email marketing expert. Generate compelling email copy that drives opens, clicks, and conversions.',
    structure: '{"title":"Email subject line","bullets":["Key benefit 1","Key benefit 2","Key benefit 3","CTA button text","Preview text"],"description":"Complete email body with subject, preview text, and full copy (200-400 words)","hashtags":["email marketing","conversion","open rate"],"seoKeywords":["email subject line","marketing email","campaign"]}',
  },
  seo: {
    system: 'You are an SEO content writer. Generate comprehensive, keyword-optimized articles that rank well in search engines.',
    structure: '{"title":"SEO-optimized article title","bullets":["H2 Section 1","H2 Section 2","H2 Section 3","H2 Section 4","Meta description (160 chars)"],"description":"A comprehensive 800-1200 word SEO article with proper structure, keyword density, and engaging content.","hashtags":["SEO","content marketing","organic traffic"],"seoKeywords":["primary keyword","secondary keyword","LSI keyword 1","LSI keyword 2","long-tail keyword"]}',
  },
  ads: {
    system: 'You are a digital advertising expert. Generate high-converting ad copy for Google Ads and Facebook/Meta Ads.',
    structure: '{"title":"Headline (max 30 chars for Google Ads)","bullets":["Ad description line 1","Ad description line 2","CTA button text","Display URL path","Extension text"],"description":"Complete ad copy including headline, descriptions, CTA, and targeting suggestions (150-300 words)","hashtags":["PPC","ROI","conversion rate"],"seoKeywords":["ad copy","Google Ads","Facebook Ads","PPC advertising"]}',
  },
};

export async function generateCopy(input: GenerateInput): Promise<any> {
  const mode = modePrompts[input.mode] || modePrompts.product;
  const inputLabel = input.mode === 'product' ? 'Product Name' : input.mode === 'social' ? 'Brand/Product' : input.mode === 'email' ? 'Product/Service' : input.mode === 'seo' ? 'Target Keyword' : 'Product/Service';

  const userPrompt = `Generate ${input.mode} copy for:

${inputLabel}: ${input.input}
${input.platform ? `Platform: ${input.platform}` : ''}
Language: ${input.language || 'English'}
${input.tone ? `Tone: ${input.tone}` : 'Tone: Professional'}
${input.features ? `Key Features: ${input.features}` : ''}

Return ONLY a valid JSON object with exactly these fields:
${mode.structure}

No markdown. No explanation. Only JSON.`;

  const completion = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages: [
      { role: 'system', content: mode.system },
      { role: 'user', content: userPrompt },
    ],
    temperature: 0.7,
    max_tokens: 3000,
    response_format: { type: 'json_object' },
  });

  const content = completion.choices[0]?.message?.content || '{}';
  return JSON.parse(content);
}

export async function generateBulk(items: GenerateInput[]): Promise<any[]> {
  const results = [];
  for (const item of items) {
    try {
      const result = await generateCopy(item);
      results.push({ ...result, input: item.input });
    } catch (err) {
      results.push({ error: 'Failed', input: item.input });
    }
  }
  return results;
}
