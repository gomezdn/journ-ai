This is a proof of concept application to write an article with the help of AI.

## Requirements

As shown in .env.example, to run this project you'll need to configure in .env:

- EXA_API_KEY -> [https://dashboard.exa.ai/playground](https://dashboard.exa.ai/playground)
- GROQ_API_KEY -> [https://console.groq.com/](https://console.groq.com/)
- AI_MODEL -> [https://console.groq.com/docs/models](https://console.groq.com/docs/models), it's set to 'gemma2-9b-it' by default which is pretty good for this purpose.

The rest of the variables (EXA_BASE_URL, EXA_SEARCH_ENDPOINT, EXA_CONTENTS_ENDPOINT) are already displayed in the file, but keep in mind they could eventually change.

Install the dependencies `npm install`

- Run the app in dev mode `npm run dev`

Or
-  Build the app `npm run build`
-  And run it `npm run start`

# Screenshots
![Topic search form](screenshot.png)
![Topic search results](screenshot-1.png)
![Article generated through AI](screenshot-2.png)
![AI assistant to continue modifying the article](screenshot-3.png)