'use client'

import { useTheme } from 'next-themes'

import { Switch } from '@/components/ui/switch'

export function ToggleTheme(): React.ReactElement {
  const { setTheme, theme } = useTheme()

  return (
    <div className="fixed bottom-4 left-2">
      <Switch
        onClick={() => {
          setTheme(theme === 'light' ? 'dark' : 'light')
        }}
      />
    </div>
  )
}
