import type { Metadata } from 'next'

import '../styles/globals.css'

import { ThemeProvider } from '@/components/theme-provider'
import NotesProvider from '@/context/notesContext'
import { UserProvider } from '@auth0/nextjs-auth0/client'

import { Toaster } from '@/components/ui/toaster'

import { Inter } from 'next/font/google'
import LoginWarning from '@/components/LoginWarning/LoginWarning'
import LoginUser from '@/components/LoginUser/LoginUser'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Minimal Notes',
  description:
    'Simplify your note-taking routine with this clean and minimalist application. Utilizing a local database, we offer an uncomplicated and streamlined approach to creating, editing, and organizing your notes. Experience simplicity at its best.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>
            <NotesProvider>
              <main className="p-4 relative h-screen">
                <LoginWarning />
                {children}
                <LoginUser />
              </main>
            </NotesProvider>
          </UserProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
