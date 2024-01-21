'use client'

import { PiWarningCircleFill } from 'react-icons/pi'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { useContext } from 'react'
import { notesContext } from '@/context/notesContext'

const LoginWarning = (): React.ReactElement => {
  const { user, isLoading } = useContext(notesContext)

  return (
    <>
      {isLoading ? (
        <></>
      ) : user === null || user === undefined ? (
        <Popover>
          <PopoverTrigger className="fixed top-4 left-4 bg-[#030712] rounded-full">
            <PiWarningCircleFill size="2.5em" color="#eed202" />
          </PopoverTrigger>
          <PopoverContent className="bg-[#eed202] ml-2">
            <p className="text-[#030712] font-medium select-none">
              The notes will be stored in your browser. If you want to access
              them in another browser, please log in.
            </p>
          </PopoverContent>
        </Popover>
      ) : null}
    </>
  )
}

export default LoginWarning
