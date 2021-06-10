import {fireEvent, render, screen, waitFor} from '__tests__/testUtils'
import {MockedProvider} from '@apollo/client/testing'
import {SIGN_IN} from 'graphql/operations/mutations/signIn'
import {SignIn} from 'pages/SignIn'

test('should render sign in page', () => {
  render(
    <MockedProvider>
      <SignIn />
    </MockedProvider>
  )

  const title = screen.getByRole('heading', {name: /sign in/i})
  const email = screen.getByRole('textbox', {name: /email \*/i})
  const password = screen.getAllByLabelText(/password \*/i)[0]
  const button = screen.getByRole('button', {name: /sign in/i})
  const signUp = screen.getByText(/don't have an account\?/i)

  expect(title).toBeInTheDocument()
  expect(email).toBeInTheDocument()
  expect(password).toBeInTheDocument()
  expect(button).toBeInTheDocument()
  expect(signUp).toBeInTheDocument()
})

test('should render form errors', async () => {
  render(
    <MockedProvider>
      <SignIn />
    </MockedProvider>
  )

  const button = screen.getByRole('button', {name: /sign in/i})

  fireEvent.click(button)

  const emailError = await screen.findByText(/email is required/i)
  const passwordError = await screen.findByText(/password is required/i)

  expect(emailError).toBeInTheDocument()
  expect(passwordError).toBeInTheDocument()
})

test('should render submit error', async () => {
  const variables = {
    email: 'example@email.com',
    password: 'pass1W@a!uI',
  }

  const error = 'form submit error'

  const signInMock = {
    request: {query: SIGN_IN, variables},
    error: new Error(error),
  }

  render(
    <MockedProvider mocks={[signInMock]} addTypename={false}>
      <SignIn />
    </MockedProvider>
  )

  const email = screen.getByRole('textbox', {name: /email \*/i})
  const password = screen.getAllByLabelText(/password \*/i)[0]
  const button = screen.getByRole('button', {name: /sign in/i})

  fireEvent.change(email, {target: {value: variables.email}})
  fireEvent.change(password, {target: {value: variables.password}})
  fireEvent.click(button)

  const formError = await screen.findByText(error)

  expect(formError).toBeInTheDocument()
})

test('should submit form successfully', async () => {
  const variables = {
    email: 'example@email.com',
    password: 'pass1W@a!uI',
  }

  const signInMock = {
    request: {query: SIGN_IN, variables},
    result: jest.fn(() => ({
      data: {
        signUp: {
          id: '12345',
          fullName: 'full name',
          displayName: null,
          email: variables.email,
          image: null,
        },
      },
    })),
  }

  render(
    <MockedProvider mocks={[signInMock]} addTypename={false}>
      <SignIn />
    </MockedProvider>
  )

  const email = screen.getByRole('textbox', {name: /email \*/i})
  const password = screen.getAllByLabelText(/password \*/i)[0]
  const button = screen.getByRole('button', {name: /sign in/i})

  fireEvent.change(email, {target: {value: variables.email}})
  fireEvent.change(password, {target: {value: variables.password}})
  fireEvent.click(button)

  await waitFor(() => {
    expect(signInMock.result).toHaveBeenCalled()
  })
})
