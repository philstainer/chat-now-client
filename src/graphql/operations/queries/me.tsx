import {gql, useQuery} from '@apollo/client'
import {MeQuery} from 'generated/MeQuery'

export const ME = gql`
  query MeQuery {
    me {
      id
      fullName
      displayName
      email
      image
    }
  }
`

export const useMe = () => {
  const {data, loading, error} = useQuery<MeQuery>(ME)

  return {me: data?.me, meLoading: loading, meError: error}
}
