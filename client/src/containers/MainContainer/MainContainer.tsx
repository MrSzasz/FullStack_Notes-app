'use client'

import { useAutoAnimate } from '@formkit/auto-animate/react'

import { notesContext } from '@/context/notesContext'
import { useContext, useState } from 'react'

import AddNoteButton from '@/components/AddNoteButton/AddNoteButton'
import ErrorComponent from '@/components/ErrorComponent/ErrorComponent'
import LoadingComponent from '@/components/LoadingComponent/LoadingComponent'
import SearchNote from '@/components/SearchNote/SearchNote'
import DialogNote from '@/components/DialogNote/DialogNote'
import NoteCard from '@/components/NoteCard/NoteCard'
import { ToggleTheme } from '@/components/ToggleTheme/ToggleTheme'
import type { notesType } from '@/types/notes'

const MainContainer = (): React.ReactElement => {
  const [filterValue, setFilterValue] = useState<string>('')

  const { notes, isLoading, isError, handleDeleteNote, handleEditNote } =
    useContext(notesContext)

  const [parent] = useAutoAnimate()

  if (isError !== null && isError !== undefined) return <ErrorComponent />

  return (
    <>
      <div className="grid grid-cols-3 auto-rows-min gap-4 w-full">
        <SearchNote searchFilterFn={setFilterValue} />
        <div
          ref={parent}
          className="col-span-3 w-10/12 md:w-full h-fit flex flex-wrap gap-4 justify-center mx-auto"
        >
          {isLoading ? (
            <LoadingComponent />
          ) : notes.length === 0 ? (
            <div className="grid place-items-center w-full text-2xl font-bold h-[80vh]">
              <p className="w-full h-full grid place-content-center text-xl md:text-2xl font-bold">
                No notes yet, click the + button to add one
              </p>
            </div>
          ) : (
            notes
              .filter(note => {
                const filterString = filterValue.toLowerCase()
                const titleIncludesFilter = note.title
                  .toLowerCase()
                  .includes(filterString)
                const contentIncludesFilter = note.content
                  .toLowerCase()
                  .includes(filterString)
                return (
                  filterValue === '' ||
                  titleIncludesFilter ||
                  contentIncludesFilter
                )
              })
              .map((note: notesType) => (
                <DialogNote
                  note={note}
                  handleDeleteNoteFn={handleDeleteNote}
                  handleEditNoteFn={handleEditNote}
                  key={note.id}
                  editableNote
                >
                  <NoteCard note={note} />
                </DialogNote>
              ))
          )}
        </div>
      </div>
      <AddNoteButton />
      <ToggleTheme />
    </>
  )
}

export default MainContainer
