'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { IoIosArrowBack } from 'react-icons/io'
import { Separator } from '../ui/separator'
import type { userData } from '@/types/notes'

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(3),
    userConfirmPassword: z.string().min(3),
  })
  .refine(data => data.password === data.userConfirmPassword, {
    message: 'Passwords do not match',
    //   path: [''],
  })

interface UserRegisterProps {
  changeFormFn: () => void
  handleRegister: (userDataForRegistration: userData) => Promise<void>
}

const UserRegister = ({
  changeFormFn,
  handleRegister,
}: UserRegisterProps): React.ReactElement => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmit = async (
    data: z.infer<typeof formSchema>,
  ): Promise<void> => {
    await handleRegister(data as userData)
  }

  return (
    <>
      <Form {...form}>
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="email"
            // label="Email"
            //   TODO => change type
            render={({ field }: any) => {
              return (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name="password"
            // label="Password"
            //   TODO => change type
            render={({ field }: any) => {
              return (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name="userConfirmPassword"
            // label="Password"
            //   TODO => change type
            render={({ field }: any) => {
              return (
                <FormItem>
                  <FormLabel>Repeat Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Repeat password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <Button type="submit" className="w-full mt-4">
            Sign Up
          </Button>
        </form>
      </Form>
      <Separator className="my-2" />
      <div
        className="flex items-center gap-2 cursor-pointer hover:gap-3 transition-all text-sm"
        onClick={changeFormFn}
      >
        <IoIosArrowBack /> Return to log in
      </div>
    </>
  )
}

export default UserRegister
