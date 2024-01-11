import type { notesType } from '@/types/notes'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface NoteCardInterface {
  note: notesType
}

const NoteCard = ({ note }: NoteCardInterface): React.ReactElement => {
  return (
    <Card className="min-h-20 max-h-52 h-full md:h-full md:w-64 md:min-h-44 md:max-w-1/2 cursor-pointer ease-in-out transition-all hover:border-white/15 group relative">
      <div className="absolute -inset-px bg-white/10 opacity-0 blur transition duration-300 group-hover:opacity-15 group-hover:blur-sm"></div>
      <CardHeader>
        <CardTitle className="truncate text-start text-sm md:text-base">
          {note?.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-4 text-xs md:text-sm text-start">
          {note?.content}
        </p>
      </CardContent>
    </Card>
  )
}

export default NoteCard
