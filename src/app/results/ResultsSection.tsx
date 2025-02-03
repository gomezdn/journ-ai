import { Result } from "@/types";
import ResultCard from "./ResultCard";

export default async function ResultsSection({ results, prompt, category }: { results: Result[], prompt: string, category: string }) {
    return (
        <div className="flex flex-col gap-6">
            <p className="text-lg text-gray-100">
                Showing results for prompt ``<i className="text-md">{prompt}</i> `` with category focus set to <i>{category}</i>
            </p>
            <div className="flex flex-col gap-14 w-[60vw]">
                {results.map(result => <ResultCard key={result.url} result={result}/>)}
            </div>
        </div>
    )
}