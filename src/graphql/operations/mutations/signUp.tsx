import {gql, MutationUpdaterFn, useMutation} from '@apollo/client'
import {SignUpMutation, SignUpMutationVariables} from 'generated/SignUpMutation'
import {ME} from 'graphql/operations/queries/me'

export const SIGN_UP = gql`
  mutation SignUpMutation(
    $fullName: String!
    $email: EmailAddress!
    $password: String!
  ) {
    signUp(fullName: $fullName, email: $email, password: $password) {
      id
      fullName
      displayName
      email
      image
    }
  }
`

export const update: MutationUpdaterFn<SignUpMutation> = (cache, {data}) => {
  const me = data?.signUp

  if (!me) return

  cache.writeQuery({query: ME, data: {me: me}})
}

export const useSignUp = () => {
  const [mutate, {data, loading, error}] = useMutation<
    SignUpMutation,
    SignUpMutationVariables
  >(SIGN_UP, {update})

  return {
    signUp: mutate,
    signUpData: data,
    signUpLoading: loading,
    signUpError: error,
  }
}
