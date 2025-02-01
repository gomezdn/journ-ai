import { exa } from "@/api";
import ResultsSection from "./components/ResultsSection";
import { DataCategories } from "@/types";
import Link from "next/link";

export default async function Results(
  { searchParams }:  { searchParams: { query: string, category: string } }
   = { searchParams: { query: '', category: DataCategories.AUTO }}
  ) {
  const { query, category } = await searchParams
  let data, error

  if (query) {
    const res = await exa.researchTopic({ query, category })
    data = res.data
    error = res.error
  }

  return (
    <div className="flex flex-col gap-2">
      <Link href="/search" className="text-blue-200">{`<< `}back</Link>
      {
        data
        ?
        <ResultsSection results={data.results} prompt={query} category={category} />
        :
        error
        ?
        <div>{error}</div>
        :
        ''
      }
    </div>
  )
}