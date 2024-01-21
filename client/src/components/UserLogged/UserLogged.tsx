import { Button } from '../ui/button'

interface UserLoggedProps {
  handleLogOut: () => Promise<void>
}

const UserLogged = ({ handleLogOut }: UserLoggedProps): React.ReactElement => {
  const handleLogOutFn = async (): Promise<void> => {
    await handleLogOut()
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Welcome!</h2>
      <p>
        You&apos;re currently logged in, your notes will be visible in this page
        and will be synced with other browsers.
      </p>

      <Button
        variant="destructive"
        className="w-full"
        onClick={() => {
          void handleLogOutFn()
        }}
      >
        Log out
      </Button>
    </div>
  )
}

export default UserLogged
