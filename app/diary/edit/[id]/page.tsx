'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DiaryForm } from '@/components/DiaryForm'
import { Diary } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

export default function EditDiaryPage({ params }: { params: { id: string } }) {
    const [diary, setDiary] = useState<Diary | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const fetchDiary = async () => {
            // TODO: 실제 API 호출로 대체해야 합니다.
            const storedDiaries = JSON.parse(
                localStorage.getItem('diaries') || '[]'
            )
            const foundDiary = storedDiaries.find(
                (d: Diary) => d.id === params.id
            )
            setDiary(foundDiary || null)
            setIsLoading(false)
        }

        fetchDiary()
    }, [params.id])

    const handleSubmit = (date: Date, content: string, emotion: string) => {
        if (!diary) return

        // TODO: 실제 API 호출로 대체해야 합니다.
        const storedDiaries = JSON.parse(
            localStorage.getItem('diaries') || '[]'
        )
        const updatedDiaries = storedDiaries.map((d: Diary) =>
            d.id === params.id
                ? {
                      ...d,
                      date: date.toISOString(),
                      content,
                      emotion,
                      updatedAt: new Date().toISOString()
                  }
                : d
        )
        localStorage.setItem('diaries', JSON.stringify(updatedDiaries))

        router.push(`/diary/${params.id}`)
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </div>
        )
    }

    if (!diary) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-xl text-gray-600">
                    일기를 찾을 수 없습니다.
                </p>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="w-full shadow-lg">
                    <CardHeader className="border-b border-gray-200">
                        <CardTitle className="text-2xl font-bold text-purple-700">
                            일기 수정
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <DiaryForm
                            initialDate={new Date(diary.date)}
                            initialContent={diary.content}
                            initialEmotion={diary.emotion}
                            onSubmit={handleSubmit}
                        />
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
