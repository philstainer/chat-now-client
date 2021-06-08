import {yupResolver} from '@hookform/resolvers/yup'
import {Button} from 'components/Button'
import {Field} from 'components/Field'
import {useSignUp} from 'graphql/operations/mutations/signUp'
import {useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'
import * as Yup from 'yup'

const schema = Yup.object().shape({
  fullName: Yup.string().min(5, 'Enter your full name'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    "Passwords don't match"
  ),
})

interface FormData {
  fullName: string
  email: string
  password: string
  confirmPassword: string
}

export const SignUp = (): JSX.Element => {
  const {signUp, signUpLoading, signUpError} = useSignUp()

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    const {fullName, email, password} = data
    try {
      await signUp({variables: {fullName, email, password}})
    } catch (e) {}
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full space-y-8">
        <h1 className="text-3xl font-bold">Sign Up</h1>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Field
            label="Full Name"
            register={register('fullName')}
            autoComplete="name"
            error={errors.fullName?.message}
            required
          />

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

          <Field
            label="Confirm Password"
            register={register('confirmPassword')}
            autoComplete="new-password"
            type="password"
            error={errors.confirmPassword?.message}
            required
          />

          {signUpError && (
            <p className="text-sm text-red-500">{signUpError.message}</p>
          )}

          <Button loading={signUpLoading}>Sign up</Button>
        </form>

        <p className="text-sm text-center">
          Already have an account?{' '}
          <Link to="/signin" className="text-indigo-500">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
