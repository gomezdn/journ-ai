"use client"

import { useEffect, useState } from "react"
import ResultCard from "./ResultCard"
import { Result } from "@/types"


export default function SavedResults() {
    const [results, setResults] = useState({} as Record<string, Result>)
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (show) {
            setResults(JSON.parse(localStorage.getItem('results') || '{}'))
        }
    }, [show])

    return (
        <div className="flex flex-col gap-2 w-full">
            <button className="border-2 p-2 text-xl w-full" onClick={() => setShow(v => !v)}>{!show ? 'Show saved results' : 'Hide saved results'}</button>
            {show
             ?
             <div className="flex flex-col gap-14 max-w-[60vw]">
                {
                    Object.keys(results).length
                    ?
                    Object.values(results).map(result => {
                        return (
                            <div key={result.url} className=" border-orange-400 border-4">
                                <ResultCard result={result}/>
                            </div>
                        )
                    })
                    :
                    <p className="text-lg">No results saved yet.</p>
                }
             </div>
             :
             ''
            }
        </div>
    )
}