import {useMe} from 'graphql/operations/queries/me'
import {Chat} from 'pages/Chat'
import {SignIn} from 'pages/SignIn'
import {SignUp} from 'pages/SignUp'
import {Navigate, useRoutes} from 'react-router-dom'

const routeConfig = (isLoggedIn: boolean) => [
  {
    path: '/',
    element: !isLoggedIn ? <Navigate to="/signin" /> : <Chat />,
  },
  {path: '/signup', element: isLoggedIn ? <Navigate to="/" /> : <SignUp />},
  {
    path: '/signin',
    element: isLoggedIn ? <Navigate to="/" /> : <SignIn />,
  },
  {path: '/*', element: <div>404 - Page not found!</div>},
]

export const Routes = (): any => {
  const {me, meLoading} = useMe()

  const routes = useRoutes(routeConfig(!!me))

  if (meLoading) return null

  return routes
}
