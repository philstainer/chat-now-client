import {yupResolver} from '@hookform/resolvers/yup'
import {Button} from 'components/Button'
import {Field} from 'components/Field'
import {useSignIn} from 'graphql/operations/mutations/signIn'
import {useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'
import * as Yup from 'yup'

const schema = Yup.object().shape({
  email: Yup.string().email('Email is invalid').required('Email is required'),
  password: Yup.string().required('Password is required'),
})

interface FormData {
  email: string
  password: string
}

export const SignIn = (): JSX.Element => {
  const {signIn, signInLoading, signInError} = useSignIn()

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      await signIn({variables: data})
    } catch (e) {}
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full space-y-8">
        <h1 className="text-3xl font-bold">Sign In</h1>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Field
            label="Email"
            register={register('email')}
            autoComplete="email"
            error={errors.email?.message}
            required
          />

          <Field
            label="Password"
            register={register('password')}
            autoComplete="new-password"
            type="password"
            error={errors.password?.message}
            required
          />

          {signInError && (
            <p className="text-sm text-red-500">{signInError.message}</p>
          )}

          <Button loading={signInLoading}>Sign in</Button>
        </form>

        <p className="text-sm text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-indigo-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
