import { Result } from "@/types";
import Image from "next/image";
import Link from "next/link";
import SaveResult from "./SaveResult";

export default function ResultCard({ result }: { result: Result }) {
    return (
        <div className={`flex border-[1px] rounded-sm gap-2 pb-10 p-4 ${result.worthExpanding ? 'border-green-500' : 'border-white'}`}>
            <div className="flex flex-col gap-3 w-[100%] text-gray-300">
                <h1 className="font-bold text-2xl text-white">{result.title || '___'}</h1>
                {result.summary ? <p className="text-left">Summary: {result.summary} </p> : ''}
                <p className="text-start text-sm text-gray-400">{result.author ? <i>{result.author} - </i> : ''}{new Date(result.publishedDate).toLocaleDateString()}</p>
                <Link href={result.url} target="_blank" className="text-blue-400">{result.url}</Link>
                {
                    result.worthExpanding &&
                    <div className="flex flex-col gap-2 items-start text-gray-500">
                        <div className="flex gap-2 items-end">
                            <p>Based on your settings, it is worth expanding.</p>
                            <Link href={`/create?articleUrl=${result.url}`} className="text-blue-200 m-auto"> Start an article.</Link>
                        </div>
                    </div>
                }
            </div>
            <div className="w-[200px] relative">
                {result.image ? <Image fill sizes="200px auto" style={{objectFit: 'contain'}} src={result.image} alt={`An image illustrating the article "${result.title}"`}/> : ''}
            </div>
            <SaveResult result={result}/>
        </div>
    )
}