'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import UserForm from '../UserForm/UserForm'
import { useContext } from 'react'
import { notesContext } from '@/context/notesContext'

const LoginUser = (): React.ReactElement => {
  const { user } = useContext(notesContext)

  return (
    <Popover>
      <PopoverTrigger className="fixed top-4 right-4">
        <Avatar>
          <AvatarImage
            src={
              user?.picture !== null && user?.picture !== undefined
                ? user?.picture
                : 'https://imebehavioralhealth.com/wp-content/uploads/2021/10/user-icon-placeholder-1.png'
            }
          />
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="mr-4">
        <UserForm />
      </PopoverContent>
    </Popover>
  )
}

export default LoginUser
