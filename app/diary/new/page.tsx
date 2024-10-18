'use client'

import { DiaryForm } from '@/components/DiaryForm'
import { useRouter } from 'next/navigation'
import { Emotion } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { toast } from '@/hooks/use-toast'

export default function NewDiaryPage() {
    const router = useRouter()

    const handleSubmit = async (
        date: Date,
        content: string,
        emotion: Emotion
    ) => {
        try {
            // TODO: 실제 API 호출로 대체해야 합니다.
            const newDiary = {
                id: Date.now().toString(),
                content,
                date: date.toISOString(),
                emotion,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }

            // 로컬 스토리지에 저장 (임시)
            const diaries = JSON.parse(localStorage.getItem('diaries') || '[]')
            diaries.push(newDiary)
            localStorage.setItem('diaries', JSON.stringify(diaries))

            toast({
                title: '일기 저장 완료',
                description: '새로운 일기가 성공적으로 저장되었습니다.',
                duration: 3000
            })

            router.push('/diary')
        } catch (error) {
            console.error('일기 저장 중 오류 발생:', error)
            toast({
                title: '오류 발생',
                description:
                    '일기 저장 중 문제가 발생했습니다. 다시 시도해 주세요.',
                variant: 'destructive',
                duration: 3000
            })
        }
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
                            새 일기 작성
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <DiaryForm onSubmit={handleSubmit} />
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
