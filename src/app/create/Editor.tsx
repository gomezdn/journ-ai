"use client"

import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

export default function Editor({ content, saveArticle, contentLoaded }: { content: string, saveArticle: Dispatch<SetStateAction<string>>, contentLoaded: boolean }) {
    const [editable, setEditable] = useState(false)

    function handleSave() {
        saveArticle(editor!.getHTML())
        setEditable(false)
    }

    const editor = useEditor({
        extensions: [
            StarterKit
        ],
        immediatelyRender: false,
        autofocus: true,
        content,
        editable
    }, [content, editable])
    
    useEffect(() => {
        if (contentLoaded) window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [contentLoaded])

    return (
        <div className="flex flex-col gap-2 w-[60vw]">
            {   
                !contentLoaded
                ?
                <p className="border-2 p-2 text-xl text-center">Generating article...</p>
                :
                editable
                ?
                <button className="border-2 p-2 text-xl" onClick={handleSave}>SAVE ARTICLE</button>
                :
                <button className="border-2 p-2 text-xl" onClick={() => setEditable(true)}>EDIT ARTICLE</button>
            }
            <EditorContent editor={editor} className={`${!editable ? 'bg-orange-100': 'bg-gray-100 select-none'} text-black max-w-[60vw] h-[90vh] overflow-y-scroll`}/>
        </div>
    )
}