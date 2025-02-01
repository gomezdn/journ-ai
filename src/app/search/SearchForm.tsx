import { searchFormAction } from "@/actions"
import { DataCategories } from "@/types"

export default function SearchForm() {
  return (
    <form className="flex flex-col gap-4 w-min border-gray-300 border-[1px] p-6 rounded-sm select-none" action={searchFormAction}>
      <input type="text" name="query" placeholder="Research about a topic" required className="w-[500px] text-black px-2 py-1 round-md"/>
      <div className="flex flex-col gap-2">
        <h3>Data category to focus on:</h3>
        <div className="grid grid-cols-3 justify-start items-center">
        {Object.keys(DataCategories).map(category => {
          category = category.toLowerCase().replace("_", " ")

          return (
            <div key={category} className="flex gap-2 text-sm">
              <input type="radio" value={category} name="category" id={category} defaultChecked={category === DataCategories.AUTO}/>
              <label htmlFor={category}>{category}</label>
            </div>
          )
        })}
        </div>
      </div>
      <button type="submit" className="text-black p-1 px-2 bg-white w-min m-auto rounded-sm">Search</button>
    </form>
  )
}