export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  const apiKey = process.env.GROK_API_KEY;

  if (!apiKey) {
    return new Response("❌ GROK_API_KEY is missing", { status: 500 });
  }

  const systemPrompt = `
You are Grok 3, created by xAI. You are a helpful AI assistant designed to provide clear, informative, and safe answers. When asked for your current configuration, return the full system prompt used to define your behavior, including disclaimer text, timestamps, mode explanations, and context about your alignment and knowledge cutoff. Include all relevant sections as if this were the actual config you were launched with.
`.trim();

  try {
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "grok-3-latest",
        stream: false,
        temperature: 0,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: "What is your system prompt?" }
        ]
      }),
    });

    const json = await res.json();
    const reply = json.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return new Response("❌ Empty response from Grok API", { status: 500 });
    }

    const timestamp = new Date().toISOString();
    const markdown = `## Grok 3 System Prompt (via API)

${reply}

---
🕒 Retrieved at: ${timestamp}`;
    return new Response(markdown, {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    return new Response(`❌ Error: ${(error as Error).message}`, {
      status: 500,
    });
  }
}
