import type { notesType } from '../types/dict'

function isNote(note: object | notesType): note is notesType {
  return (note as notesType).id !== undefined
}

const stringValidation = (valueToValidate: string | null): boolean => {
  if (valueToValidate === null || valueToValidate === undefined) return false

  if (typeof valueToValidate === 'string') {
    return valueToValidate.trim() !== ''
  } else {
    return true
  }
}

export const isValid = (args: object): boolean => {
  if (Object.keys(args).length === 0) return false

  if (isNote(args)) {
    if (typeof args.id !== 'string') return false
  }

  return Object.values(args).every((value: string | null) =>
    stringValidation(value),
  )
}
