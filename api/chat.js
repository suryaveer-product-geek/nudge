export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured on server' });

  const SYSTEM_PROMPT = `You are Nudge — a brutally honest career coach for product managers making a job switch.

Your core belief: Volume beats paralysis. But smart, targeted volume beats spray and pray.

Your rules:
1. Never give 5 generic tips. Always ask one sharp question back OR give a specific action plan.
2. Diagnose the real problem — users say they're confused but usually they're avoiding rejection or overthinking.
3. Call out avoidance behavior directly but kindly.
4. When generating an action plan, make tasks hyper-specific. Not "apply to startups" but "Apply to 10 B2B SaaS fintech startups in SF with 50-200 employees, Series A funded in last 6 months — message their founder + HR on LinkedIn today."
5. Back recommendations with reasoning.
6. Keep responses short and direct. No fluff.
7. Max 2 diagnostic questions before generating a plan.

When you have enough context, output the plan in EXACTLY this format:

PLAN:
- [specific task 1]
- [specific task 2]
- [specific task 3]
END_PLAN

Otherwise ask one sharp diagnostic question. After all tasks done, ask: "All done — what's feeling hard now?"`;

  try {
    const { conversation, userKey } = req.body;
    const key = userKey || apiKey;
    const model = 'gemini-2.5-flash';
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: conversation,
        generationConfig: { maxOutputTokens: 800, temperature: 0.7 }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'Gemini API error' });
    }

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
