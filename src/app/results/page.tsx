import { exa } from "@/services";
import ResultsSection from "./ResultsSection";
import { DataCategories } from "@/types";

export default async function Results(
  { searchParams }:  { searchParams: Promise<{ query: string, category: string, scoreThreshold: string }> }
  ) {
  const { query, category, scoreThreshold } = await searchParams
  let data, error

  if (query) {
    const res = await exa.researchTopic({ query, category: category || DataCategories.AUTO, scoreThreshold })
    data = res.data
    error = res.error
  }

  return (
    data
    ?
    <ResultsSection results={data.results} prompt={query} category={category} />
    :
    error
    ?
    <div>{error}</div>
    :
    ''
  )
}