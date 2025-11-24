import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, aspectRatio = '16:9', imageSize = '2K' } = body

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    // Use Gemini 3 Pro Image model
    const model = genAI.getGenerativeModel({
      model: 'gemini-3-pro-image-preview',
    })

    const result = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        responseModalities: ['IMAGE'],
        imageConfig: {
          aspectRatio,
          imageSize,
        }
      }
    })

    const response = await result.response

    // Extract image data from response
    const imagePart = response.candidates?.[0]?.content?.parts?.find(
      (part: any) => part.inlineData
    )

    if (!imagePart?.inlineData) {
      return NextResponse.json(
        { error: 'No image generated' },
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

  } catch (error: any) {
    console.error('Image generation error:', error)

    // Handle quota errors specifically
    if (error.message?.includes('quota') || error.message?.includes('429')) {
      return NextResponse.json(
        {
          error: 'API quota exceeded. Please wait a minute and try again.',
          details: error.message
        },
        { status: 429 }
      )
    }

    return NextResponse.json(
      {
        error: 'Failed to generate image',
        details: error.message
      },
      { status: 500 }
    )
  }
}
