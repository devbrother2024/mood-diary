'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Diary } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { EmotionBadge } from '@/components/EmotionBadge'
import { getEmotionColor } from '@/lib/utils'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter
} from '@/components/ui/card'
import { motion } from 'framer-motion'

export default function DiaryDetailPage({
    params
}: {
    params: { id: string }
}) {
    const [diary, setDiary] = useState<Diary | null>(null)
    const router = useRouter()

    useEffect(() => {
        // TODO: 실제 API 호출로 대체해야 합니다.
        const storedDiaries = JSON.parse(
            localStorage.getItem('diaries') || '[]'
        )
        const foundDiary = storedDiaries.find((d: Diary) => d.id === params.id)
        setDiary(foundDiary || null)
    }, [params.id])

    const handleDelete = () => {
        // TODO: 실제 API 호출로 대체해야 합니다.
        const storedDiaries = JSON.parse(
            localStorage.getItem('diaries') || '[]'
        )
        const updatedDiaries = storedDiaries.filter(
            (d: Diary) => d.id !== params.id
        )
        localStorage.setItem('diaries', JSON.stringify(updatedDiaries))
        router.push('/diary')
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
                            {new Date(diary.date).toLocaleDateString('ko-KR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                weekday: 'long'
                            })}
                        </CardTitle>
                        <p className="text-sm text-gray-500">
                            작성일:{' '}
                            {new Date(diary.createdAt).toLocaleString('ko-KR')}
                        </p>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="mb-4">
                            <EmotionBadge emotion={diary.emotion} />
                        </div>
                        <div className="whitespace-pre-wrap mb-4 text-gray-700 leading-relaxed">
                            {diary.content}
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2 border-t border-gray-200 pt-4">
                        <Link href={`/diary/edit/${params.id}`}>
                            <Button
                                variant="outline"
                                className="hover:bg-purple-50"
                            >
                                수정
                            </Button>
                        </Link>
                        <Button
                            onClick={handleDelete}
                            variant="destructive"
                            className="hover:bg-red-600"
                        >
                            삭제
                        </Button>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    )
}
