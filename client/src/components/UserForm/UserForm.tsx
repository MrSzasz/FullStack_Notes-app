'use client'

import { notesContext } from '@/context/notesContext'
import { useContext } from 'react'
import { Button } from '../ui/button'

const UserForm = (): React.ReactElement => {
  const { user, isLoading } = useContext(notesContext)
  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {user !== null && user !== undefined ? (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Welcome!</h2>
          <p>
            You&apos;re logged in, your notes will be visible in this page and
            will be synced with other browsers.
          </p>
          <Button asChild>
            <a href="/api/auth/logout">Logout</a>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Welcome!</h2>
          <p>
            You&apos;re not logged in. Press the button below to register or
            login to your account.
          </p>
          <Button asChild>
            <a href="/api/auth/login">Login</a>
          </Button>
        </div>
      )}
    </>
  )
}

export default UserForm
