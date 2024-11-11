'use client'

import { DiaryList } from '@/components/DiaryList'
import { Button } from '@/components/ui/button'
import { Diary } from '@/lib/types'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
    const [diaries, setDiaries] = useState<Diary[]>([])

    useEffect(() => {
        // TODO: 실제 API 호출로 대체해야 합니다.
        const storedDiaries = JSON.parse(
            localStorage.getItem('diaries') || '[]'
        )
        setDiaries(storedDiaries)
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8 transition-all duration-300 hover:shadow-xl">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
                            일기 목록
                        </h1>
                        <Link href="/diary/new">
                            <Button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center">
                                <PlusCircle className="mr-2 h-5 w-5" />새 일기
                                작성
                            </Button>
                        </Link>
                    </div>
                    <DiaryList diaries={diaries} />
                </div>
            </div>
        </div>
    )
}
