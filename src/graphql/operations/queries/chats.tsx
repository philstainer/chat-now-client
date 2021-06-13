import {gql, useQuery} from '@apollo/client'
import {ChatsQuery} from 'generated/ChatsQuery'

export const CHATS = gql`
  query ChatsQuery {
    chats {
      id
      users {
        id
        fullName
        displayName
        image
      }
      messages {
        id
        text
        user {
          id
          fullName
          displayName
          image
        }
        createdAt
      }
      createdAt
    }
  }
`

export const useChats = () => {
  const {data, loading, error} = useQuery<ChatsQuery>(CHATS)

  return {chats: data?.chats, chatsLoading: loading, chatsError: error}
}
