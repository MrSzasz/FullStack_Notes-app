import NoteCard from '../../../components/NoteCard/NoteCard'
import { render, screen } from '@testing-library/react'
import { it, describe, expect } from 'vitest'

describe('Note Card Component Testing', () => {
  it('should render the Note Card Component correctly', async () => {
    const noteCardRender = render(
      <NoteCard note={{ title: 'title', content: 'content', id: '1' }} />,
    )

    expect(noteCardRender).toBeDefined()

    expect(await screen.findByText('title')).toBeDefined()
  })
})
