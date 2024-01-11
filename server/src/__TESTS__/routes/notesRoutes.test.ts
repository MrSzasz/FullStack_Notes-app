import { spec, request } from 'pactum'

describe('notes', async () => {
  request.setBaseUrl(`http://localhost:${process.env.PORT}`)

  describe('GET /api/notes -- Get notes', () => {
    // Get all notes

    it('should return 200', async () => {
      const res = await spec().get('/api/notes').toss()

      expect(res.statusCode).toBe(200)
    })

    it('should return a json object', async () => {
      const res = await spec().get('/api/notes').toss()

      expect(res.headers['content-type']).toContain('application/json')
    })
  })

  describe('POST /api/notes -- Create notes', () => {
    it('should throw if data is not passed', async () => {
      const res = await spec()
        .post('/api/notes')
        .withBody({ title: 'test' })
        .toss()

      expect(res.statusCode).toBe(400)
    })
  })

  describe('PUT /api/notes/ -- Update notes', () => {
    it('should throw if id is not passed', async () => {
      const res = await spec().put('/api/notes').toss()
      expect(res.statusCode).toBe(400)
    })

    it('should throw if id is passed but note is not found', async () => {
      const res = await spec()
        .put('/api/notes')
        .withBody({ id: '1', title: 'test', content: 'test' })
      expect(res.statusCode).toBe(404)
    })

    it('should throw if data is invalid', async () => {
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

      for (let index = 0; index < dataOptions.length; index++) {
        const element = dataOptions
        const res = await spec().put('/api/notes').withBody(element)
        expect(res.statusCode).toBe(400)
      }
    })
  })

  describe('DELETE /api/notes/ -- Delete notes', () => {
    it('should throw if id is not passed', async () => {
      const res = await spec().delete('/api/notes').toss()
      expect(res.statusCode).toBe(400)
    })

    it('should throw if note is not found', async () => {
      const res = await spec().delete('/api/notes').withBody({ id: '1' })
      expect(res.statusCode).toBe(404)
    })
  })

  describe('Test full functionality', () => {
    it('should create, edit, and delete a note', async () => {
      // create a note

      const data = {
        title: 'test',
        content: 'test',
      }

      const createNoteRes = await spec()
        .post('/api/notes')
        .withBody(data)
        .toss()

      expect(createNoteRes.statusCode).toBe(200)
      expect(createNoteRes.body).toBeInstanceOf(Object)

      // get all notes

      const getNotesRes = await spec().get('/api/notes')

      expect(getNotesRes.statusCode).toBe(200)
      expect(getNotesRes.body).toBeInstanceOf(Array)

      // edit created note

      const dataToEdit = {
        id: createNoteRes.body.note.id,
        title: 'edit',
        content: 'edit',
      }

      const editNoteRes = await spec()
        .put('/api/notes')
        .withBody(dataToEdit)
        .toss()

      expect(editNoteRes.statusCode).toBe(200)
      expect(editNoteRes.body.note.title).toBe('edit')

      // delete created note

      const deleteNoteRes = await spec()
        .delete('/api/notes')
        .withBody({ id: createNoteRes.body.note.id })
        .toss()

      expect(deleteNoteRes.statusCode).toBe(200)
      expect(deleteNoteRes.body).toBeInstanceOf(Object)
    })
  })
})
