import { createGroq } from "@ai-sdk/groq"

export const {
    EXA_BASE_URL: exaBaseUrl,
    EXA_SEARCH_ENDPOINT: exaSearchEndpoint,
    EXA_CONTENTS_ENDPOINT: exaContentsEndpoint,
    EXA_API_KEY: exaApiKey,
} = process.env

export const model = createGroq({ apiKey: process.env.GROQ_API_KEY })(process.env.AI_MODEL!)