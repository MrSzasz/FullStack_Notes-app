import { notesContext } from '@/context/notesContext'
import { useContext } from 'react'

import DialogNote from '../DialogNote/DialogNote'
import { Button } from '../ui/button'
import { FaPlus } from 'react-icons/fa'

const AddNoteButton = (): React.ReactElement => {
  const { handleAddNote } = useContext(notesContext)

  return (
    <DialogNote editableNote={false} handleCreateNoteFn={handleAddNote}>
      <Button
        asChild
        role="open-dialog"
        className="rounded-full h-12 w-12 flex justify-center items-center fixed bottom-4 right-4 z-10"
      >
        <FaPlus size="1.5em" />
      </Button>
    </DialogNote>
  )
}

export default AddNoteButton
