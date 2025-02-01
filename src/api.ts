import { exaApiKey, exaBaseUrl, exaSearchEndpoint } from "./config"
import { DataCategories, ExaRequest, Result } from "./types"

export const exa = {
    async researchTopic({ 
        query,
        category,
    }: { query: string, category: string}) {
        try {
            const URL = `${exaBaseUrl}${exaSearchEndpoint}`as string

            if (typeof query !== 'string' || !query.length) {
                throw new Error('Must enter a topic to research')
            }

            const body: ExaRequest = {
                query,
                type: 'neural',
                useAutoprompt: false,
                contents: {
                    summary: true
                }
            }

            if (category !== DataCategories.AUTO) body.category = category

            const options = {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': exaApiKey!
                }
            }
            
            const res = await fetch(URL, options)
            const { results } = (await res.json()) as { results: Result[] }
            
            for (const result of results) {
                result.image = /https|http/.test(result.image || '') ? result.image : ''
            }
            
            return { data: { results } }
        /* eslint-disable @typescript-eslint/no-explicit-any */
        } catch (e: any) {
            return { error: e.message }
        }
    }
}