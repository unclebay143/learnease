import { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          'OpenAI API key not configured, please follow instructions in README.md',
      },
    })
    return
  }

  const prompt = req.body.prompt || ''
  const promptEmpty = prompt.trim().length === 0

  if (promptEmpty) {
    res.status(400).json({
      error: {
        message: 'Please enter a valid prompt',
      },
    })
    return
  }

  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: generatePrompt(prompt),
      temperature: 0.6,
      max_tokens: 2000,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    })
    res.status(200).json({ result: completion.data.choices[0].text })
  } catch (error) {
    if (error) {
      res.status(400).json(error)
      console.log(error)
      // TS erroring this line
      // console.log(error?.response?.status)
      // res.status(error?.response?.status).json(error.response.data)
    } else {
      if (error instanceof Error) {
        console.error(`Error with OpenAI API request: ${error.message}`)
      } else {
        console.log(error)
      }
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        },
      })
    }
  }
}

function generatePrompt(prompt: string) {
  const conceptToLearn = prompt[0].toUpperCase() + prompt.slice(1).toLowerCase()
  // return `do nothing and smile`;

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


  Let your response be in markdown
  [TASK: I want to learn a new concept ${conceptToLearn}, I am a PRO, I want you to explain to me like I am NOT 5 years old in this format:
  [Guide: you can use emojis to make it more user friendly and paraphrase the ## headings if needed]

  [INSTRUCTION: Always use the ## heading arrangements and wordings in the template and add markdown horizontal line after each headings]

  ## Definition EMOJI
  [paragraph] - [INSTRUCTION: break to new line after 2 dots.]
  [INSTRUCTION: Only if ${conceptToLearn} is code related generate at least one sample of ${conceptToLearn} in markdown code block]

  ## Analogy EMOJI
  [paragraph]

  ## Practical usecase in real world EMOJI
  [paragraph]
  [bullet points]

  ## Friendly projects to build with the concept EMOJI
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
