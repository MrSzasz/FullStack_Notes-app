'use client'

import { useRef, useState } from 'react'
import { Input } from '../ui/input'
import { FaSearch } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'

interface SearchNoteProps {
  searchFilterFn: (value: string) => void
}

const SearchNote = ({
  searchFilterFn,
}: SearchNoteProps): React.ReactElement => {
  const [emptySearch, setEmptySearch] = useState<boolean>(true)
  const searchInput = useRef<HTMLInputElement | null>(null)

  const handleClear = (): void => {
    if (searchInput.current !== null) searchInput.current.value = ''
    searchFilterFn('')
    setEmptySearch(true)
  }

  return (
    <div className="md:col-start-2 col-span-3 w-10/12 mx-auto md:mx-0 md:w-full md:col-span-1 relative flex items-center group">
      <Input
        ref={searchInput}
        placeholder="Search notes..."
        onChange={e => {
          searchFilterFn(e.target.value)
          e.target.value === '' ? setEmptySearch(true) : setEmptySearch(false)
        }}
      />
      <div className="absolute right-2 pointer-events-none group-focus-within:text-primary/75 transition-all">
        {emptySearch ? (
          <FaSearch size={'1em'} />
        ) : (
          <button
            className="pointer-events-auto flex justify-center items-center"
            onClick={() => {
              handleClear()
            }}
          >
            <FaXmark size={'1.5em'} color="red" />
          </button>
        )}
      </div>
      <span>{}</span>
    </div>
  )
}

export default SearchNote
