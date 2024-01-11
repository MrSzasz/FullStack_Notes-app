export const upDB = async (): Promise<any> => {
  const { JSONPreset } = await import('lowdb/node')

  const defaultData = { notes: [] }
  const db = await JSONPreset('db.json', defaultData)

  await db.write()

  return db
}
