"use client"

import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { FieldGroup, FieldLabel, Field, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { formSchema, RegisterFormValues } from '../features/register/register.schema'
import { registerAction } from '../features/register/register.action'

const Register = () => {

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    }
  })

  const onSubmit = async (data: RegisterFormValues) => {
    const response = await registerAction(data)

    console.log({ response })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="w-full max-w-sm" onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardAction>
              <Button variant="link">Sign Up</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">
                      Email
                    </FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      type='email'
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="password"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="passwordConfirm"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="passwordConfirm">
                      Password confirm
                    </FieldLabel>
                    <Input
                      {...field}
                      id="passwordConfirm"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

            </FieldGroup>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Register
            </Button>
            <Button variant="outline" className="w-full">
              Register with Google
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

export default Register