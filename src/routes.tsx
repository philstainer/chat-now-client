import {useMe} from 'graphql/operations/queries/me'
import {SignIn} from 'pages/SignIn'
import {SignUp} from 'pages/SignUp'
import {Navigate, useRoutes} from 'react-router-dom'

const routeConfig = (isLoggedIn: boolean) => [
  {
    path: '/',
    element: !isLoggedIn ? <Navigate to="/signin" /> : <div>Chat</div>,
  },
  {path: '/signup', element: isLoggedIn ? <Navigate to="/" /> : <SignUp />},
  {
    path: '/signin',
    element: isLoggedIn ? <Navigate to="/" /> : <SignIn />,
  },
  {path: '/*', element: <div>404 - Page not found!</div>},
]

export const Routes = (): any => {
  const {meData, meLoading} = useMe()

  const routes = useRoutes(routeConfig(!!meData))

  if (meLoading) return null

  return routes
}
