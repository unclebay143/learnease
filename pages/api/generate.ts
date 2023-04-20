import { OpenAIStream, OpenAIStreamPayload } from '@/lib/OpenAIStream'
import { NextRequest } from 'next/server'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OpenAI API key is required')
}

export const config = {
  runtime: 'edge',
}

const handler = async (req: NextRequest): Promise<Response> => {
  try {
    const { prompt, language, level } = (await req.json()) as {
      prompt: string
      language: string
      level: string
    }

    const promptEmpty = prompt.trim().length === 0

    if (promptEmpty) {
      return new Response('Please enter a valid prompt', { status: 400 })
    }

    const completion: OpenAIStreamPayload = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: generatePrompt({ prompt, language, level }) },
      ],
      temperature: 0.6,
      max_tokens: 1000,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stream: true,
      n: 1,
    }

    const stream = await OpenAIStream(completion)

    return new Response(stream)
  } catch (error) {
    console.log(error)
    throw new Error('Something went wrong')
  }
}

function generatePrompt({
  prompt,
  language,
  level,
}: {
  prompt: string
  language?: string
  level?: string
}) {
  const conceptToLearn = prompt[0].toUpperCase() + prompt.slice(1).toLowerCase()
  const replyLanguage = language || 'English'

  console.log(language)
  console.log(replyLanguage)

  // return `
  //   Please provide a markdown response that explains ${conceptToLearn} in a way that's accessible to a PRO user who wants to learn the concept from scratch like they're 5 years old.
  //   Use the following prompt template, which includes sections for

  //   ## Definition (INSTRUCTION: Be sure to provide at least one code example) [EMOJI]
  //   ## Analogy [EMOJI]
  //   ## Practical use cases [EMOJI]
  //   ## Beginner-friendly projects [EMOJI]
  //   ## What concept to learn next?. [EMOJI]

  //   Add links to additional resources.
  //   Remember to use simple language and avoid technical jargon as much as possible.
  //   Feel free to use emojis to make the explanation more user-friendly.`;

  // return `
  //   Please provide a markdown response that explains ${conceptToLearn} in a way that's accessible to a PRO user who wants to learn the concept from scratch.
  //   Use the following prompt template, which includes sections for definition (Be sure to provide at least one code example), analogy, practical use cases, beginner-friendly projects and what concept to learn next?.
  //   Add links to additional resources.
  //   Remember to use simple language and avoid technical jargon as much as possible.
  //   Feel free to use emojis to make the explanation more user-friendly.`;

  return `

  [Information for AI: "I am an open-source AI learning assistant designed to help people in the tech industry easily learn new concepts using advanced artificial intelligence technology. Created by Unclebigbay a software developer from Nigeria 🇳🇬. Unclebigbay Twitter https://twitter.com/unclebigbay143, LearnEase AI GitHub Repository: https://github.com/unclebay143/learnease, Unclebigbay youtube channel: https://www.youtube.com/@unclebigbay"]

  [TASK: Let your reply be in ${replyLanguage}]
  Let your response be in markdown
  [TASK: I want to learn a new concept ${conceptToLearn}, my level is like a ${level}, I want you to explain to me like a ${level} in this format:
  [Guide: you can use emojis to make it more reader friendly and paraphrase the ## headings if needed]

  [INSTRUCTION: Always use the ## heading arrangements and wordings in the template and add markdown horizontal line after each headings]

  [INSTRUCTION: EMOJI should always be rendered in all languages]

  ## Definition EMOJI
  [paragraph] - [INSTRUCTION: break to new line after 2 dots.]
  [INSTRUCTION: Only if ${conceptToLearn} is code related generate at least one sample of ${conceptToLearn} in markdown code block]
  [INSTRUCTION: Do not put code block heading, text, list, paragraphs or sentence inside the markdown code block backticks, only code syntax and its comments should be within code blocks, you've made this mistakes before]
  [INSTRUCTION: Don't repeat the question asked in your response]


  ## Analogy EMOJI
  [paragraph]

  ## Practical usecase in real world EMOJI
  [paragraph]
  [bullet points]

  ## Friendly projects to build with the concept EMOJI
  [INSTRUCTION: The projects must be for ${level} level]
  [paragraph]
  [bullet points]
  [Only If the concept is code related, then provide a simple code from the projects bullet points]

  ## What to learn next? EMOJI
  [paragraph]
  [bullet points]

  ## Wrapping Up? EMOJI
  [paragraph]
  [INSTRUCTION: generate links from most viewed resource on ${conceptToLearn} from youtube, articles etc]
`
}

export default handler
