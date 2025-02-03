import { exaApiKey, exaBaseUrl, exaContentsEndpoint, exaSearchEndpoint } from "./config"
import { DataCategories, ExaSearchRequest, ExaContentsRequest, Result } from "./types"

/* eslint-disable @typescript-eslint/no-explicit-any */

export const exa = {
    async researchTopic({ 
        query,
        category,
        scoreThreshold
    }: { query: string, category: string, scoreThreshold: string }) {
        try {
            const URL = `${exaBaseUrl}${exaSearchEndpoint}`as string

            const body: ExaSearchRequest = {
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
                result.worthExpanding = result.score >= Number(scoreThreshold)
            }
            
            return { data: { results } }
        } catch (e: any) {
            return { error: e.message }
        }
    },
    async getText({ url }: { url: string }) {        
        try {
            if (!/(https?:\/\/)?([\da-z\.-]+)\.([a-z]{2,6})([\/\w\.-]*)*\/?/g.test(url)) {
                throw new Error('Invalid URL to look for contents')
            }
    
            const URL = `${exaBaseUrl}${exaContentsEndpoint}`
            const body: ExaContentsRequest = {
                urls: [url],
                text: true
            }
    
            const options = {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': exaApiKey!
                }
            }
    
            const res = await fetch(URL, options)
            const { results: [{ text }]} = (await res.json()) as { results: Result[] }

            return { data: { text } }
        } catch (e: any) {
            return { error: e.message }
        }
    }
}