import { Configuration, OpenAIApi } from "openai-edge"
import { OpenAIStream, StreamingTextResponse } from "ai"

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(config)

export const runtime = "edge"

export async function POST(req: Request) {
  const { subject, gradeLevel, duration, learningStyle, action } = await req.json()

  let systemPrompt = ""
  let userPrompt = ""

  switch (action) {
    case "generatePlan":
      systemPrompt =
        "You are an expert teacher and curriculum designer. Create a detailed lesson plan based on the given parameters."
      userPrompt = `Create a lesson plan for:
Subject: ${subject}
Grade Level: ${gradeLevel}
Duration: ${duration} minutes
Learning Style: ${learningStyle}

Please provide a structured lesson plan including objectives, activities, and assessment methods.`
      break
    case "provideFeedback":
      systemPrompt =
        "You are an experienced education consultant. Provide constructive feedback on the given lesson plan."
      userPrompt = `Review this lesson plan and provide detailed feedback:
${subject}

Consider:
1. Alignment with learning objectives
2. Time management
3. Student engagement
4. Assessment methods
5. Areas for improvement`
      break
    case "suggestResources":
      systemPrompt =
        "You are a knowledgeable educational resource specialist. Suggest relevant resources for the given lesson plan."
      userPrompt = `Suggest educational resources for this lesson plan:
${subject}

Include:
1. Digital tools and websites
2. Teaching materials
3. Reference materials
4. Interactive activities
5. Assessment tools`
      break
    default:
      throw new Error("Invalid action")
  }

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  })

  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}

