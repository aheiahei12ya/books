import type {
  ReactNode,
} from 'react';

export interface InputProps {
  id?: string
  prepend?: ReactNode;
  append?: ReactNode;
  addonBefore?: ReactNode;
  addonAfter?: ReactNode;
  affixWrapperClassName?: string;
  value?: string
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  clearable?: boolean
  onChange?: (val: string) => void
  onEnterPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  enterKeyHint?:
    | 'enter'
    | 'done'
    | 'go'
    | 'next'
    | 'previous'
    | 'search'
    | 'send'
  size?: 'small' | 'large'
}

export interface InputRef {
  clear: () => void
  focus: () => void
  blur: () => void
  nativeElement: HTMLInputElement | null
}
