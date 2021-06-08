import {gql, useQuery} from '@apollo/client'
import {meQuery} from 'generated/meQuery'

export const ME = gql`
  query meQuery {
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
  const {data, loading, error} = useQuery<meQuery>(ME, {
    fetchPolicy: 'network-only',
  })

  return {meData: data?.me, meLoading: loading, meError: error}
}
