'use client'

import { useEffect, useState } from 'react'
import CardSkeleton from '../CardSkeleton/CardSkeleton'

const LoadingComponent = (): React.ReactElement => {
  const [tooLong, setTooLong] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => {
      setTooLong(true)
    }, 5000)
  }, [])

  return (
    <>
      {tooLong ? (
        <div className="grid place-items-center text-2xl font-bold h-screen w-screen fixed z-20 top-0 bg-black/50 backdrop-blur-sm">
          <p className="w-full h-full grid place-content-center text-xl md:text-2xl font-bold">
            It&apos;s taking too long to load, please reload the page (or try
            again later)
          </p>
        </div>
      ) : (
        <>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </>
      )}
    </>
  )
}

export default LoadingComponent
