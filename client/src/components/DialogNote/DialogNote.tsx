'use client'

import type { notesType } from '@/types/notes'

import { useEffect, useState } from 'react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'
import { Textarea } from '../ui/textarea'

import { isNoteType, isValid } from '@/services/functions'

interface DialogNoteProps {
  note?: {
    id: string
    title: string
    content: string
  }
  children: React.ReactNode
  editableNote: boolean
  handleDeleteNoteFn?: (value: string) => Promise<void>
  handleEditNoteFn?: (note: notesType) => Promise<void>
  handleCreateNoteFn?: (note: Omit<notesType, 'id'>) => Promise<void>
}

const DialogNote = ({
  note,
  children,
  editableNote,
  handleDeleteNoteFn,
  handleEditNoteFn,
  handleCreateNoteFn,
}: DialogNoteProps): React.ReactElement => {
  const [noteTitleValue, setNoteTitleValue] = useState<string | null>(null)
  const [noteContentValue, setNoteContentValue] = useState<string | null>(null)

  useEffect(() => {
    if (note !== null && isNoteType(note)) {
      setNoteTitleValue(note?.title)
      setNoteContentValue(note.content)
    } else {
      setNoteTitleValue(null)
      setNoteContentValue(null)
    }
  }, [])

  return (
    <Dialog>
      <DialogTrigger className="w-[calc(50%-1rem)] md:w-fit">
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-[75vw] md:max-w-[50vw] h-[85vh] md:h-[75vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            <Input
              className="border-none rounded-none focus-visible:ring-0 border-white p-0"
              placeholder="Title"
              defaultValue={note?.title !== null ? note?.title : ''}
              onChange={e => {
                setNoteTitleValue(e.target.value)
              }}
            />
          </DialogTitle>
          <Separator />
        </DialogHeader>
        <Textarea
          className="h-full resize-none px-0 border-none focus-visible:ring-0"
          placeholder="Write your note"
          defaultValue={note?.content !== null ? note?.content : ''}
          onChange={e => {
            setNoteContentValue(e.target.value)
          }}
        />
        <DialogFooter className="flex justify-between gap-4">
          {editableNote && (
            <DialogClose asChild>
              <Button
                onClick={() => {
                  if (note?.id != null) {
                    void handleDeleteNoteFn?.(note?.id)
                  }
                }}
                variant="destructive"
              >
                Delete note
              </Button>
            </DialogClose>
          )}
          <DialogClose asChild>
            <Button
              disabled={
                !isValid({
                  noteTitleValue,
                  noteContentValue,
                })
              }
              onClick={() => {
                if (editableNote) {
                  if (isNoteType(note)) {
                    void handleEditNoteFn?.({
                      id: note?.id,
                      title: noteTitleValue ?? note?.title,
                      content: noteContentValue ?? note?.content,
                    })
                  }
                } else {
                  void handleCreateNoteFn?.({
                    title: noteTitleValue ?? '',
                    content: noteContentValue ?? '',
                  })
                }
              }}
            >
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DialogNote
