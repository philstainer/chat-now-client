import './index.css'

import {ApolloProvider} from '@apollo/client'
import {client} from 'graphql/client'
import {StrictMode} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'

import {App} from './App'

ReactDOM.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
  document.getElementById('root')
)
