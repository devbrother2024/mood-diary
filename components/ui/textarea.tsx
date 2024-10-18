import * as React from 'react'

import { cn } from '@/lib/utils'

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    'flex min-h-[120px] w-full rounded-2xl border-2 border-purple-200 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm transition-all duration-200 ease-in-out',
                    'placeholder:text-gray-400',
                    'focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:ring-opacity-50',
                    'hover:border-purple-300',
                    'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-70',
                    'resize-y',
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Textarea.displayName = 'Textarea'

export { Textarea }
