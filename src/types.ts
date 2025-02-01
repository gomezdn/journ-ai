export type ExaRequest = {
    query: string
    useAutoprompt: boolean
    type: string
    category?: string
    contents?: {
        summary?: boolean
        text?: boolean
    }
}

export type Result = {
    score: number
    title: string
    url: string
    author: string
    text?: {
        maxCharacters: number
        includeHtmlTags: boolean
    },
    summary?: string
    image?: string
    publishedDate: string
    worthExpanding?: boolean
}

export enum DataCategories {
      AUTO = "auto",
      COMPANY = "company",
      RESEARCH_PAPER = "research paper",
      NEWS = "news",
      PDF = "pdf",
      GITHUB = "github",
      TWEET = "tweet",
      PERSONAL_SITE = "personal site",
      LINKEDIN_PROFILE = "linkedin profile",
      FINANCIAL_REPORT = "financial report"
}