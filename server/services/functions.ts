import type { notesType } from '../types/dict'

/**
 * Checks if the input is a notesType object.
 *
 * @param {object | notesType} note - the input to be checked
 * @return {boolean} true if the input is a notesType object, false otherwise
 */
const isNote = (note: object | notesType): note is notesType => {
  return (note as notesType).id !== undefined
}

/**
 * Validate a string value.
 *
 * @param {string | null} valueToValidate - the value to validate
 * @return {boolean} whether the value is valid or not
 */
const stringValidation = (valueToValidate: string | null): boolean => {
  if (valueToValidate === null || valueToValidate === undefined) return false

  if (typeof valueToValidate === 'string') {
    return valueToValidate.trim() !== ''
  } else {
    return true
  }
}

/**
 * Validates the input object and its properties.
 *
 * @param {object} args - the input object to be validated
 * @return {boolean} true if the input is valid, false otherwise
 */
export const isValid = (args: object): boolean => {
  if (Object.keys(args).length === 0) return false

  if (isNote(args)) {
    if (typeof args.id !== 'string') return false
  }

  return Object.values(args).every((value: string | null) =>
    stringValidation(value),
  )
}
