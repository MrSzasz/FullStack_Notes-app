import Image from 'next/image'

const ErrorComponent = (): React.ReactElement => {
  return (
    <div className="w-full h-full font-bold flex flex-col justify-center items-center gap-4">
      <Image
        src={
          'https://media3.giphy.com/media/QMHoU66sBXqqLqYvGO/giphy.gif?cid=6c09b952o1bazrejzarb7v6445l7msfm6fdgv3sirpknu61b&ep=v1_gifs_search&rid=giphy.gif&ct=g'
        }
        width={300}
        height={300}
        alt="This is fine"
      />
      <p className="text-sm text-center md:text-2xl">
        Sorry, but somehow, somewhere, there was an error, so please try again
        later :(
      </p>
    </div>
  )
}

export default ErrorComponent
