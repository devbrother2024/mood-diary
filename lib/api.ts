import { supabase } from './supabase'

// 감정 상태를 위한 ENUM 타입 정의
export type EmotionType = '행복' | '슬픔' | '분노' | '평범' | '신남'

// Database 테이블 타입 정의
export interface DiaryTable {
    id: string // UUID
    content: string // TEXT
    date: string // DATE (ISO 형식 문자열로 처리)
    emotion: EmotionType // emotion_type ENUM
    created_at: string // TIMESTAMP WITH TIME ZONE
    updated_at: string // TIMESTAMP WITH TIME ZONE
}

// 모든 일기 조회
export async function getAllDiaries(): Promise<DiaryTable[]> {
    const { data, error } = await supabase
        .from('diaries')
        .select('*')
        .order('date', { ascending: false })

    if (error) {
        throw new Error('일기 목록을 불러오는데 실패했습니다: ' + error.message)
    }

    return data as DiaryTable[]
}

// 특정 일기 조회
export async function getDiaryById(id: string): Promise<DiaryTable | null> {
    const { data, error } = await supabase
        .from('diaries')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        throw new Error('일기를 불러오는데 실패했습니다: ' + error.message)
    }

    return data as DiaryTable
}

// 일기 작성을 위한 입력 타입
type CreateDiaryInput = Pick<DiaryTable, 'content' | 'date' | 'emotion'>

// 일기 작성
export async function createDiary(
    diary: CreateDiaryInput
): Promise<DiaryTable> {
    const { data, error } = await supabase
        .from('diaries')
        .insert([diary])
        .select()
        .single()

    if (error) {
        throw new Error('일기 작성에 실패했습니다: ' + error.message)
    }

    return data as DiaryTable
}

// 일기 수정을 위한 입력 타입
type UpdateDiaryInput = Pick<DiaryTable, 'content' | 'date' | 'emotion'>

// 일기 수정
export async function updateDiary(
    id: string,
    diary: UpdateDiaryInput
): Promise<DiaryTable> {
    const { data, error } = await supabase
        .from('diaries')
        .update({
            ...diary,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

    if (error) {
        throw new Error('일기 수정에 실패했습니다: ' + error.message)
    }

    return data as DiaryTable
}

// 일기 삭제
export async function deleteDiary(id: string): Promise<boolean> {
    const { error } = await supabase.from('diaries').delete().eq('id', id)

    if (error) {
        throw new Error('일기 삭제에 실패했습니다: ' + error.message)
    }

    return true
}