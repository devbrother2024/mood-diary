import Link from 'next/link'
import { EmotionBadge } from './EmotionBadge'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { DiaryTable } from '@/lib/api'

interface DiaryListProps {
    diaries: DiaryTable[]
}

export function DiaryList({ diaries }: DiaryListProps) {
    return (
        <ul className="space-y-4">
            {diaries.map((diary, index) => (
                <motion.li
                    key={diary.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                    <Link href={`/diary/${diary.id}`} className="block">
                        <Card className="hover:shadow-lg transition-shadow duration-300 ease-in-out">
                            <CardContent className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <p className="text-lg font-semibold text-purple-700">
                                        {new Date(
                                            diary.date
                                        ).toLocaleDateString('ko-KR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                    <EmotionBadge emotion={diary.emotion} />
                                </div>
                                <p className="text-gray-600 line-clamp-2 text-sm">
                                    {diary.content}
                                </p>
                            </CardContent>
                        </Card>
                    </Link>
                </motion.li>
            ))}
        </ul>
    )
}
