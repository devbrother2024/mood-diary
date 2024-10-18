import { Smile, Frown, Angry, Meh, Zap } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getEmotionColor(emotion: string): string {
    switch (emotion) {
        case '행복':
            return '#FFD700'
        case '슬픔':
            return '#1E90FF'
        case '분노':
            return '#FF4500'
        case '평범':
            return '#C0C0C0'
        case '신남':
            return '#7FFF00'
        default:
            return '#C0C0C0'
    }
}

export function getEmotionIcon(emotion: string) {
    switch (emotion) {
        case '행복':
            return Smile
        case '슬픔':
            return Frown
        case '분노':
            return Angry
        case '평범':
            return Meh
        case '신남':
            return Zap
        default:
            return Meh
    }
}
