"use client"

import { useChat } from "ai/react"
import { Dispatch, SetStateAction, useEffect } from "react"

export default function Chat({ article, updateArticle }: { article: string, updateArticle: Dispatch<SetStateAction<string>> }) {
    const { messages, input, isLoading, error, stop, handleInputChange, handleSubmit, append } = useChat({})

    useEffect(() => {
        (async () => {
            await append({
                role: 'user',
                content: `Read this article ${article} and have it in mind since I may talk to you about it later. Answer shortly to this message.`,
                id: 'initial'
            })
        })()
    }, [append, article])

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight)
    }, [messages])

    return (
        <div className="flex flex-col gap-4 w-[60vw]">
            {messages.map(m => {
                if (m.id !== 'initial') {
                    return (
                        <div key={m.id} className="flex gap-2 text-justify border-gray-300 pb-3 border-b-[1px]">
                            <strong>{m.role === 'user' ? 'Me' : 'AI'}: </strong>
                            {
                                /^(?=.*<h1>)(?=.*<\/h1>).*/.test(m.content)
                                ?
                                <div className="flex flex-col gap-2 items-start">
                                    <span>{m.content}</span>
                                    {!isLoading && <button onClick={() => {
                                        updateArticle(m.content)
                                        window.scrollTo({ top: 0, behavior: 'smooth' })
                                    }} className="border-2 p-2 rounded-md font-bold w-full bg-gray-600">Set as the new article</button>}
                                </div>
                                :
                                <span>{m.content}</span>
                            }
                        </div>
                    )
                }
            })}

            {
                isLoading
                ?
                <div className="flex gap-3 items-end">
                    <span>Waiting for the assistant to answer...</span>
                    <button onClick={stop} className="h-max border-2 px-2 rounded-md">Stop</button>
                </div>
                :
                error
                ?
                <strong className="text-red-500">{error.message}</strong>
                :
                ''
            }

            <form onSubmit={handleSubmit} id="chatForm" className="flex flex-col gap-4 items-center">
                <div className="flex gap-2 max-w-[60vw]">
                    <textarea className="w-[60vw] resize-none text-justify p-3 text-black bg-gray-200" placeholder="Start chatting..." autoComplete="off" name="prompt" value={input} onChange={handleInputChange} />
                    <button type="submit" className="border-2 p-2 rounded-md">Send</button>
                </div>
            </form>
        </div>
    )
}