import {ApolloClient} from '@apollo/client'
import {IS_DEV} from 'config/constants'
import {cache} from 'graphql/cache'
import {link} from 'graphql/link'

export const client = new ApolloClient({
  link,
  cache,
  connectToDevTools: IS_DEV,
})
