import { isNoteType, isValid } from '@/services/functions'
import { it, describe, expect } from 'vitest'

describe('Functions Testing', () => {
  it('should be false if data is not passed', () => {
    expect(isValid({})).toBe(false)
  })

  it('should be false if data is empty or invalid', () => {
    const dataOptions = [
      {
        title: '',
        content: 'test',
      },
      {
        title: '',
        content: '',
      },
      {
        title: null,
        content: '',
      },
      {
        title: '',
        content: null,
      },
      {
        title: 'valid',
        content: '',
      },
      {
        title: '',
        content: 'valid',
      },
      {
        title: null,
        content: 'valid',
      },
      {
        title: null,
        content: null,
      },
    ]

    dataOptions.forEach(data => {
      expect(isValid(data)).toBe(false)
    })
  })

  it('should be true if data is valid', () => {
    const data = [
      {
        id: 'fabb82f1-a689-4875-a3b4-f4550e9e7f57',
        title: 'test',
        content: 'test',
      },
      {
        title: 'test',
        content: 'test',
      },
    ]

    expect(isValid(data)).toBe(true)
  })

  it('should be false if the object is not passed', () => {
    expect(isNoteType({})).toBe(false)
  })

  it('should be true if the object is a valid noteType object', () => {
    const data = [
      {
        id: 'fabb82f1-a689-4875-a3b4-f4550e9e7f57',
        title: 'test',
        content: 'test',
      },
      {
        title: 'test',
        id: '1',
        content: 'test',
      },
      {
        title: 'test',
        content: 'test',
        id: 'a',
      },
    ]

    data.forEach(note => {
      expect(isNoteType(note)).toBe(true)
    })
  })

  it('should be false if the object is not a valid noteType object', () => {
    const notes = [
      {
        id: 1,
        title: 'test',
        content: 'test',
      },
      {
        title: 'test',
        content: 'test',
      },
      {
        title: 'test',
        id: 'a',
      },
      {
        content: 'test',
        id: 'a',
      },
      {
        title: 1,
        id: 'a',
        content: 'test',
      },
      {
        title: 'test',
        id: 'a',
        content: 1,
      },
      {},
    ]

    notes.forEach(note => {
      expect(isNoteType(note)).toBe(false)
    })
  })
})
