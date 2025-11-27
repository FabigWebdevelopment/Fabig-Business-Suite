import { NextRequest, NextResponse } from 'next/server'

const GEMINI_MODEL = 'gemini-3-pro-image-preview'
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt } = body

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.GOOGLE_GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    // Use REST API directly for image generation
    const response = await fetch(GEMINI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          responseModalities: ['IMAGE'],
        }
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Gemini API error:', errorData)
      return NextResponse.json(
        { error: 'Gemini API error', details: errorData },
        { status: response.status }
      )
    }

    const data = await response.json()

    // Extract image data from response
    const parts = data.candidates?.[0]?.content?.parts || []
    const imagePart = parts.find((p: { inlineData?: unknown }) => p.inlineData)

    if (!imagePart?.inlineData) {
      return NextResponse.json(
        { error: 'No image generated', response: data },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      image: {
        data: imagePart.inlineData.data,
        mimeType: imagePart.inlineData.mimeType,
      }
    })

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Image generation error:', error)

    // Handle quota errors specifically
    if (errorMessage.includes('quota') || errorMessage.includes('429')) {
      return NextResponse.json(
        {
          error: 'API quota exceeded. Please wait a minute and try again.',
          details: errorMessage
        },
        { status: 429 }
      )
    }

    return NextResponse.json(
      {
        error: 'Failed to generate image',
        details: errorMessage
      },
      { status: 500 }
    )
  }
}
