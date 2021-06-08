import {HttpLink, split} from '@apollo/client'
import {WebSocketLink} from '@apollo/client/link/ws'
import {getMainDefinition} from '@apollo/client/utilities'
import {GRAPHQL_URI, WS_URI} from 'config/constants'

const httpLink = new HttpLink({
  uri: GRAPHQL_URI as string,
  credentials: 'include',
})

const wsLink = new WebSocketLink({
  uri: WS_URI as string,
  options: {
    reconnect: true,
    lazy: true,
    connectionParams: {
      credentials: 'include',
    },
  },
})

export const link = split(
  ({query}) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)
