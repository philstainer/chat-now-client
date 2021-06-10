import {gql, MutationUpdaterFn, useMutation} from '@apollo/client'
import {SignInMutation, SignInMutationVariables} from 'generated/SignInMutation'
import {ME} from 'graphql/operations/queries/me'

export const SIGN_IN = gql`
  mutation SignInMutation($email: EmailAddress!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      fullName
      displayName
      email
      image
    }
  }
`

export const update: MutationUpdaterFn<SignInMutation> = (cache, {data}) => {
  const me = data?.signIn

  if (!me) return

  cache.writeQuery({query: ME, data: {me: me}})
}

export const useSignIn = () => {
  const [mutate, {data, loading, error}] = useMutation<
    SignInMutation,
    SignInMutationVariables
  >(SIGN_IN, {update})

  return {
    signIn: mutate,
    signInData: data,
    signInLoading: loading,
    signInError: error,
  }
}
