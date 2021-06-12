import {InMemoryCache, makeVar} from '@apollo/client'

export const cache = new InMemoryCache()

export const currentChat = makeVar<null | string>(null)
