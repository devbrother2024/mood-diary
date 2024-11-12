'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { EmotionBadge } from '@/components/EmotionBadge'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter
} from '@/components/ui/card'
import { motion } from 'framer-motion'
import { DiaryTable, deleteDiary, getDiaryById } from '@/lib/api'

export default function DiaryDetailPage({
    params
}: {
    params: { id: string }
}) {
    const [diary, setDiary] = useState<DiaryTable | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        async function fetchDiary() {
            try {
                setIsLoading(true)
                const data = await getDiaryById(params.id)
                setDiary(data)
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : '일기를 불러오는데 실패했습니다.'
                )
            } finally {
                setIsLoading(false)
            }
        }

        fetchDiary()
    }, [params.id])

    const handleDelete = async () => {
        try {
            if (!confirm('정말로 이 일기를 삭제하시겠습니까?')) {
                return
            }

            await deleteDiary(params.id)
            router.push('/')
        } catch (err) {
            alert(
                err instanceof Error ? err.message : '일기 삭제에 실패했습니다.'
            )
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                <p className="ml-2 text-gray-600">로딩 중...</p>
            </div>
        )
    }

    if (error || !diary) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-xl text-gray-600">
                    {error || '일기를 찾을 수 없습니다.'}
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
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="mb-4">
                            <EmotionBadge emotion={diary.emotion} />
                        </div>
                        <div className="whitespace-pre-wrap mb-4 text-gray-700 leading-relaxed">
                            {diary.content}
                        </div>
                        <div className="text-sm text-gray-500">
                            <p>
                                작성일:{' '}
                                {new Date(diary.created_at).toLocaleString(
                                    'ko-KR'
                                )}
                            </p>
                            {diary.updated_at !== diary.created_at && (
                                <p>
                                    수정일:{' '}
                                    {new Date(diary.updated_at).toLocaleString(
                                        'ko-KR'
                                    )}
                                </p>
                            )}
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
