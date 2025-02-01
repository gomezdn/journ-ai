'use server'

import { redirect } from "next/navigation"

export async function searchFormAction(userInput: FormData) {  
    const category = userInput.get('category') as string
    const query = userInput.get('query') as string
  
    redirect(`/results?query=${query}&category=${category}`)
}