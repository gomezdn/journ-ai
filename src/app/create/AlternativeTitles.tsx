"use client"

import { generateTitlesAction } from "@/actions"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

export default function AlternativeTitles({ article, updateArticle, amount }: { article: string, updateArticle: Dispatch<SetStateAction<string>>, amount: number }) {
    const [titles, setTitles] = useState([] as string[])

    async function handleTitleAction(userInput: FormData) {  
        const title = userInput.get('titles') as string

        if (title !== article.split(/<h1>|<\/h1>/)[1]) {
            updateArticle(a => {
                const headlessArticle = a.split(/<h1>|<\/h1>/).slice(2).join()
                return `<h1>${title}</h1>` + headlessArticle
            })
        }
    }

    useEffect(() => {
        if (!titles.length) {
            (async () => {
                const { titles } = await generateTitlesAction(article, amount)
                setTitles(titles)
            })()
        }
    }, [article, titles.length, amount])

    return (
        titles.length
        ?
        <form action={handleTitleAction} className="flex gap-4 items-start text-lg w-full">
            <select className="bg-black text-white p-3 border-[1px] max-w-[45vw] border-white" name="titles">
                {titles.map(title => {
                    return (
                        <option key={title} value={title}>{title}</option>
                    )
                })}
            </select>
            <button type="submit" className="border-2 p-2 w-max">Set new title</button>
        </form>
        :
        <p className="px-6 py-4 w-[20vw] bg-gray-100 text-black rounded-md text-lg">Getting alternative titles...</p>
    )
}