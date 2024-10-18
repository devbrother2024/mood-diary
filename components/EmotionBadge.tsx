import { getEmotionColor, getEmotionIcon } from '@/lib/utils'
import { motion } from 'framer-motion'

interface EmotionBadgeProps {
    emotion: string
}

export function EmotionBadge({ emotion }: EmotionBadgeProps) {
    const color = getEmotionColor(emotion)
    const Icon = getEmotionIcon(emotion)

    return (
        <motion.span
            className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm transition-all duration-200 ease-in-out"
            style={{
                backgroundColor: `${color}20`,
                color: color,
                border: `1px solid ${color}`
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <Icon className="mr-1.5 h-4 w-4" aria-hidden="true" />
            <span>{emotion}</span>
        </motion.span>
    )
}
