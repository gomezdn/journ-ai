import { Result } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function ResultCard({ result }: { result: Result }) {
    return (
        <div className="flex gap-2 border-white border-b-2 py-2">
            <div className="flex flex-col gap-3 w-[100%] text-gray-300">
                <h1 className="font-bold text-3xl text-orange-300">{result.title}</h1>
                {result.summary ? <p className="text-left">Summary: {result.summary} </p> : ''}
                <p className="text-start text-sm text-gray-400">{result.author ? <i>{result.author} - </i> : ''}{new Date(result.publishedDate).toLocaleDateString()}</p>
                <Link href={result.url} target="_blank" className="w-max text-blue-400">{result.url}</Link>
                <p className="text-sm text-gray-500">From 0 to 1, this has a score of <span className="text-gray-400">{result.score}</span> in terms of similarity to the prompt</p>
            </div>
            <div className="w-[150px] h-auto relative">
                {result.image ? <Image objectFit="contain" fill={true} sizes="auto, 300px" src={result.image} alt={`An image illustrating the article "${result.title}"`}/> : ''}
            </div>
        </div>
    )
}