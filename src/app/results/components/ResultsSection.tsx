import { Result } from "@/types";
import ResultCard from "./ResultCard";

export default async function ResultsSection({ results, prompt, category }: { results: Result[], prompt: string, category: string }) {
    return (
        <div className="flex flex-col gap-3">
            <p className="text-lg text-gray-300">
                Showing results for prompt ``<i className="text-md">{prompt}</i> `` with category focus set to <i>{category}</i>
            </p>
            <div className="flex flex-col gap-6 w-[1200px] p-4 border-[1px]">
                {results.map(result => <ResultCard key={result.url} result={result}/>)}
            </div>
        </div>
    )
}