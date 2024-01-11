import { isValid } from '../../../services/functions'

describe('functions', () => {
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
})
