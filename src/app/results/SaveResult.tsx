"use client"

import { Result } from "@/types";
import { useEffect, useState } from "react";

export default function SaveResult({ result }: { result: Result }) {
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        const results = JSON.parse(localStorage.getItem('results') || '{}')
        setSaved(!!results[result.url])
    }, [result.url])

    function handleSave() {
        const results = JSON.parse(localStorage.getItem('results') || '{}')
        results[result.url] = result
        localStorage.setItem('results', JSON.stringify(results))
        setSaved(true)
    }

    function handleRemove() {
        const results = JSON.parse(localStorage.getItem('results') || '{}')
        delete results[result.url]
        localStorage.setItem('results', JSON.stringify(results))
        setSaved(false)
    }

    return (
        <button className="border-2 p-2 rounded-md h-min" onClick={saved ? handleRemove : handleSave}>{saved ? 'Remove' : 'Save'}</button>
    )
}