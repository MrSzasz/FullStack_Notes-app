import type { notesType } from '@/types/notes'

/**
 * Validates a string value.
 *
 * @param {string | null} valueToValidate - The value to be validated.
 * @return {boolean} Returns true if the value is a non-empty string, false otherwise.
 */
const stringValidation = (valueToValidate: string | null): boolean => {
  if (valueToValidate === null || valueToValidate === undefined) return false

  return String(valueToValidate).trim() !== ''
}

/**
 * Checks if the given note is of type "notesType".
 *
 * @param {object | notesType | null | undefined} note - The note to be checked.
 * @return {boolean} Returns true if the note is of type "notesType", false otherwise.
 */
export function isNoteType(
  note: object | notesType | null | undefined,
): note is notesType {
  if (typeof note !== 'object') return false

  if (note === null || note === undefined) return false

  if (!('title' in note)) return false
  if (!('content' in note)) return false
  if (!('id' in note)) return false

  if (typeof note.id !== 'string') return false
  if (typeof note.title !== 'string') return false
  if (typeof note.content !== 'string') return false

  return note.id !== undefined
}

/**
 * Checks if the provided object is valid based on the following criteria:
 * - The object must not be empty.
 * - All values in the object must pass a string validation function.
 *
 * @param {object} args - The object to be validated.
 * @return {boolean} Returns true if the object is valid, false otherwise.
 */
export const isValid = (args: object): boolean => {
  if (Object.keys(args).length === 0) return false

  return Object.values(args).every((value: string | null) =>
    stringValidation(value),
  )
}
