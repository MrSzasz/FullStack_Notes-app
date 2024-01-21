import { describe, it, expect } from 'vitest'
import { spec, request } from 'pactum'

describe('notes', async () => {
  request.setBaseUrl(`http://localhost:${process.env.PORT ?? 5002}`)

  const accessToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV'

  const dataOptions = [
    {
      id: 'fabb82f1-a689-4875-a3b4-f4550e9e7f57',
      title: '',
    },
    {
      id: 'fabb82f1-a689-4875-a3b4-f4550e9e7f57',
      title: null,
    },
    {
      id: 'fabb82f1-a689-4875-a3b4-f4550e9e7f57',
      content: '',
    },
    {
      id: 'fabb82f1-a689-4875-a3b4-f4550e9e7f57',
      title: '',
      content: '',
    },
    {
      id: 'fabb82f1-a689-4875-a3b4-f4550e9e7f57',
      title: 'test',
      content: '',
    },
    {
      id: 'fabb82f1-a689-4875-a3b4-f4550e9e7f57',
      title: '',
      content: 'test',
    },
    {
      id: 1,
      title: '',
      content: 'test',
    },
  ]

  describe('GET /api/notes -- Get notes', () => {
    it('should throw if token-id is not passed', async () => {
      const res = await spec().get('/api/notes').toss()

      expect(res.statusCode).toBe(400)
    })

    it('should throw if token is invalid', async () => {
      const res = await spec()
        .get('/api/notes')
        .withHeaders({ Authorization: 'Bearer wrongId' })
        .toss()

      expect(res.statusCode).toBe(400)
    })

    it('should return a empty array if no notes are found', async () => {
      const res = await spec()
        .get('/api/notes')
        .withHeaders({ 'x-auth-id': accessToken })
        .toss()

      console.log(res.body)

      expect(res.statusCode).toBe(200)
      expect(res.body).toStrictEqual({
        notes: [],
      })
    })
  })

  describe('POST /api/notes -- Create notes', () => {
    it('should throw if token is not passed', async () => {
      const res = await spec().post('/api/notes').withBody({}).toss()

      expect(res.statusCode).toBe(400)
    })

    it('should throw if token is invalid', async () => {
      const res = await spec()
        .post('/api/notes')
        .withBody({})
        .withHeaders({ 'x-auth-id': 'Bearer wrongId' })
        .toss()

      expect(res.statusCode).toBe(400)
    })

    it('should throw if data is not passed', async () => {
      const res = await spec()
        .post('/api/notes')
        .withBody({ title: 'test' })
        .withHeaders({
          'x-auth-id': `${accessToken}`,
        })
        .toss()

      expect(res.statusCode).toBe(400)
    })

    it('should throw if data is invalid', async () => {
      for (const data of dataOptions) {
        const res = await spec()
          .post('/api/notes')
          .withBody(data)
          .withHeaders({
            'x-auth-id': `${accessToken}`,
          })
          .toss()

        expect(res.statusCode).toBe(400)
      }
    })
  })

  describe('PUT /api/notes/ -- Update notes', () => {
    it('should throw if token is not passed', async () => {
      const res = await spec().put('/api/notes').withBody({}).toss()

      expect(res.statusCode).toBe(400)
    })

    it('should throw if token is invalid', async () => {
      const res = await spec()
        .put('/api/notes')
        .withBody({})
        .withHeaders({ 'x-auth-id': 'Bearer wrongId' })
        .toss()

      expect(res.statusCode).toBe(400)
    })

    it('should throw if data is invalid', async () => {
      for (const data of dataOptions) {
        const res = await spec()
          .put('/api/notes')
          .withBody(data)
          .withHeaders({
            'x-auth-id': `${accessToken}`,
          })
        expect(res.statusCode).toBe(400)
      }
    })
  })

  describe('DELETE /api/notes/ -- Delete notes', () => {
    it('should throw if token is not passed', async () => {
      const res = await spec().delete('/api/notes').withBody({}).toss()

      expect(res.statusCode).toBe(400)
    })

    it('should throw if token is invalid', async () => {
      const res = await spec()
        .delete('/api/notes')
        .withBody({})
        .withHeaders({ 'x-auth-id': 'Bearer wrongId' })
        .toss()

      expect(res.statusCode).toBe(400)
    })

    it('should throw if note is not found', async () => {
      const res = await spec()
        .delete('/api/notes')
        .withBody({ id: '1' })
        .withHeaders({
          'x-auth-id': `${accessToken}`,
        })

      expect(res.statusCode).toBe(404)
    })
  })

  describe('Test full functionality', () => {
    it('should create, edit, and delete a note', async () => {
      // create a note

      const data = {
        title: 'testing playground title',
        content: 'testing playground content',
      }

      const createNoteRes = await spec()
        .post('/api/notes')
        .withBody(data)
        .withHeaders({
          'x-auth-id': `${accessToken}`,
        })
        .toss()

      expect(createNoteRes.statusCode).toBe(200)
      expect(createNoteRes.body.message).toBeDefined()

      // get all notes

      const getNotesRes = await spec()
        .get('/api/notes')
        .withHeaders({
          'x-auth-id': `${accessToken}`,
        })
        .toss()

      expect(getNotesRes.statusCode).toBe(200)
      expect(getNotesRes.body.notes[0].title).toBe('testing playground title')

      // edit created note

      const dataToEdit = {
        id: createNoteRes.body.note.id,
        title: 'edit',
        content: 'edit',
      }

      const editNoteRes = await spec()
        .put('/api/notes')
        .withBody(dataToEdit)
        .withHeaders({
          'x-auth-id': `${accessToken}`,
        })
        .toss()

      expect(editNoteRes.statusCode).toBe(200)
      expect(editNoteRes.body.note.title).toBe('edit')

      // delete created note

      const deleteNoteRes = await spec()
        .delete('/api/notes')
        .withBody({ id: createNoteRes.body.note.id })
        .withHeaders({
          'x-auth-id': `${accessToken}`,
        })
        .toss()

      expect(deleteNoteRes.statusCode).toBe(200)
      expect(deleteNoteRes.body).toBeInstanceOf(Object)

      const getNotesAfterDeleteRes = await spec()
        .get('/api/notes')
        .withHeaders({
          'x-auth-id': `${accessToken}`,
        })
        .toss()

      expect(getNotesAfterDeleteRes.statusCode).toBe(200)
      expect(getNotesAfterDeleteRes.body).toStrictEqual({
        notes: [],
      })
    })
  })
})
