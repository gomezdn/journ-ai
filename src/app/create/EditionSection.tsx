"use client"

import { useEffect, useState } from "react"

import Chat from "./Chat"
import Editor from "./Editor"
import AlternativeTitles from "./AlternativeTitles"

export default function EditionSection({ streamedText }: { streamedText: ReadableStream<string> }) {
    const [content, updateContent] = useState('')
    const [titlesAmount, setTitlesAmount] = useState(0)
    const [showEditor, setShowEditor] = useState(false)
    const [showChat, setShowChat] = useState(false)

    function handleGenerateTitles(userInput: FormData) {
        const selectedAmount = userInput.get('titlesAmount') as unknown as number
        setTitlesAmount(selectedAmount)
    }

    useEffect(() => {
        (async () => {
            try {
                if (!content) {
                    const reader = streamedText.getReader()

                    while (true) {
                        const { done, value } = await reader.read()
        
                        if (done) {
                            setShowEditor(true)
                            break
                        }
                        updateContent(c => c += value)
                    }
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                }
            /* eslint-disable @typescript-eslint/no-explicit-any */
            } catch (e: any) {
                updateContent(e.message)
            }
        })()
    }, [streamedText, content])

    return (
        <div className="flex flex-col items-start gap-6 pb-10">
            {showEditor && titlesAmount ? <AlternativeTitles amount={titlesAmount} article={content} updateArticle={updateContent}/> : ''}
            {
                !titlesAmount && showEditor
                ?
                <form action={handleGenerateTitles} className="flex gap-2 p-2 items-end border-2">
                    <span>Ask an AI assistant for</span>
                    <input name="titlesAmount" type="number" required max={10} min={1} defaultValue={1} className="text-black px-1 rounded w-[40px]"/>
                    <span>alternative titles.</span>
                    <button type="submit" className="bg-gray-300 text-black rounded-sm px-2 text-lg">Generate</button>
                </form>
                :
                ''  
            }
            {!showChat && showEditor && <button className="border-2 p-2 text-lg" onClick={() => setShowChat(true)}>Click here to chat with an AI assistant</button>}
            <div className="flex flex-col gap-4 w-max">
                <Editor content={content} saveArticle={updateContent} contentLoaded={showEditor}/>
                {showChat ? <Chat updateArticle={updateContent} article={content}/> : ''}
            </div>
        </div>
    )
}