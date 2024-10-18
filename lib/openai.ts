import OpenAI from 'openai'

export type Emotion = '행복' | '슬픔' | '분노' | '평범' | '신남'

export async function analyzeEmotion(content: string): Promise<Emotion> {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
    })

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: `당신은 감정 분석가입니다. 주어진 텍스트를 분석하고 다음 감정 중 하나를 반환하세요: '행복', '슬픔', '분노', '평범', '신남'. 감정 단어만 반환하고 다른 내용은 포함하지 마세요.`
                },
                {
                    role: 'user',
                    content: content
                }
            ],
            temperature: 0.3,
            max_tokens: 10
        })

        const analyzedEmotion =
            response.choices[0].message.content?.trim() as Emotion

        if (isValidEmotion(analyzedEmotion)) {
            return analyzedEmotion
        } else {
            console.warn('Invalid emotion detected:', analyzedEmotion)
            return '평범'
        }
    } catch (error) {
        console.error('Error analyzing emotion:', error)
        return '평범'
    }
}

function isValidEmotion(emotion: string): emotion is Emotion {
    return ['행복', '슬픔', '분노', '평범', '신남'].includes(emotion)
}
