import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import { analyzeEmotion } from '@/lib/openai'
import { Emotion } from '@/lib/types'
import { EmotionBadge } from './EmotionBadge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

interface DiaryFormProps {
    initialDate?: Date
    initialContent?: string
    initialEmotion?: Emotion
    onSubmit: (date: Date, content: string, emotion: Emotion) => void
}

export function DiaryForm({
    initialDate,
    initialContent,
    initialEmotion,
    onSubmit
}: DiaryFormProps) {
    const [date, setDate] = useState<Date | undefined>(
        initialDate || new Date()
    )
    const [content, setContent] = useState(initialContent || '')
    const [emotion, setEmotion] = useState<Emotion>(initialEmotion || '평범')
    const [isAnalyzing, setIsAnalyzing] = useState(false)

    useEffect(() => {
        if (initialDate) setDate(initialDate)
        if (initialContent) setContent(initialContent)
        if (initialEmotion) setEmotion(initialEmotion)
    }, [initialDate, initialContent, initialEmotion])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (date) {
            setIsAnalyzing(true)
            const analyzedEmotion = await analyzeEmotion(content)
            setEmotion(analyzedEmotion as Emotion)
            setIsAnalyzing(false)
            onSubmit(date, content, analyzedEmotion as Emotion)
        }
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-purple-700">
                    오늘의 일기
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label
                            htmlFor="date"
                            className="text-sm font-medium text-gray-700"
                        >
                            날짜 선택
                        </Label>
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-lg border border-purple-200 p-3"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label
                            htmlFor="content"
                            className="text-sm font-medium text-gray-700"
                        >
                            일기 내용
                        </Label>
                        <Textarea
                            id="content"
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            placeholder="오늘의 일기를 작성해주세요..."
                            required
                            className="min-h-[200px] transition-all duration-200 ease-in-out focus:border-purple-400 focus:ring-purple-300"
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={isAnalyzing}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                    >
                        {isAnalyzing ? '감정 분석 중...' : '저장'}
                    </Button>
                    {emotion !== '평범' && (
                        <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                            <span className="text-sm font-medium text-purple-700 mr-2">
                                분석된 감정:
                            </span>
                            <EmotionBadge emotion={emotion} />
                        </div>
                    )}
                </form>
            </CardContent>
        </Card>
    )
}
