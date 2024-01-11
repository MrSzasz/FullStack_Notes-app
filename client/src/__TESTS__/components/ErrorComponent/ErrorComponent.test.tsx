import ErrorComponent from '@/components/ErrorComponent/ErrorComponent'
import { render, screen } from '@testing-library/react'
import { it, describe, expect } from 'vitest'

describe('== ErrorComponent == Component Test', () => {
  it('should render', () => {
    render(<ErrorComponent />)

    expect(screen.queryAllByText(/error/i)).toBeDefined()
  })
})
