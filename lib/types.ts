export interface Diary {
    id: string
    content: string
    date: string // ISO 형식의 날짜 문자열
    emotion: string
    createdAt: string
    updatedAt: string
}

export type Emotion = '행복' | '슬픔' | '분노' | '평범' | '신남'
