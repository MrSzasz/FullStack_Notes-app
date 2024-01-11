import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

const CardSkeleton = (): React.ReactElement => {
  return (
    <Card
      className="min-h-20 max-h-52 h-full md:h-full md:w-64 md:min-h-44 md:max-w-1/2 ease-in-out transition-all hover:border-white/15 relative"
      role="card skeleton"
    >
      <CardHeader>
        <CardTitle className="truncate text-start text-sm md:text-base">
          <Skeleton className="w-[100px] h-[20px] rounded-full" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="line-clamp-4 text-xs md:text-sm text-start flex flex-col gap-2">
          <Skeleton className="w-full h-[20px] rounded-full" />
          <Skeleton className="w-full h-[20px] rounded-full" />
          <Skeleton className="w-1/2 h-[20px] rounded-full" />
        </div>
      </CardContent>
    </Card>
  )
}

export default CardSkeleton
