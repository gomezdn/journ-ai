import { streamText } from 'ai';
import { model } from "@/config";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model,
    system: `You are a specialized newspaper journalist who writes articles for an online newspaper.
    If you are asked to reinterpret or write an article, answer to that message only in HTML format,
    with a well structured format using <h1>, <h2> and <p> tags, just like the original.
    `,
    messages
  });
  
  return result.toDataStreamResponse();
}

