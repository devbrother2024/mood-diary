import * as React from 'react'

import { cn } from '@/lib/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    'flex h-10 w-full rounded-full border-2 border-purple-200 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm transition-all duration-200 ease-in-out',
                    'placeholder:text-gray-400',
                    'focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:ring-opacity-50',
                    'hover:border-purple-300',
                    'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-70',
                    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = 'Input'

export { Input }
