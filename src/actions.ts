'use server'

import { redirect } from "next/navigation"
import { generateObject, streamText } from 'ai';
import { z } from 'zod';
import { model } from "./config";

export async function searchFormAction(userInput: FormData) {  
    const category = userInput.get('category')
    const query = userInput.get('query')
    const scoreThreshold = userInput.get('scoreThreshold')
  
    redirect(`/results?query=${query}&category=${category}&scoreThreshold=${scoreThreshold}`)
}

export async function draftArticleAction(text: string) {
    const result = streamText({
        model,
        system: 'You are a specialized newspaper journalist who writes articles for an online newspaper.',
        messages: [
            {
                role: 'user',
                content: `Digest the provided text and create a draft for a newspaper article in HTML format.
                Use <h1> for the headline, <p> for the lead paragraph to provide a concise summary of key points,
                <h3> for section headings to organize the body of the article, <p> for the main content to present detailed information,
                and a last <p> tag for the conclusion to reinforce the main message or provide future implications.`
            },
            {
                role: 'user',
                content: text
            }
        ]
    });

    return result.textStream
}

export async function generateTitlesAction(text: string, titlesAmount: number) {
    const result = await generateObject({
    model,
    schema: z.object({ titles: z.array(z.string()) }),
    messages: [
        {
            role: 'user',
            content: `Generate ${titlesAmount} alternative titles for the provided text`
        },
        {
            role: 'user',
            content: text
        }
    ],
    });

    return result.object
}