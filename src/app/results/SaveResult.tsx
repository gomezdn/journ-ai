"use client"

import { Result } from "@/types";
import { useEffect, useState } from "react";

export default function SaveResult({ result }: { result: Result }) {
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        setSaved(!!localStorage.getItem(result.url))
    }, [result.url])

    function handleSave() {
        localStorage.setItem(result.url, JSON.stringify(result))
        setSaved(true)
    }

    function handleRemove() {
        localStorage.removeItem(result.url)
        setSaved(false)
    }

    return (
        <button className="border-2 p-2 rounded-md h-min" onClick={saved ? handleRemove : handleSave}>{saved ? 'Remove' : 'Save'}</button>
    )
}