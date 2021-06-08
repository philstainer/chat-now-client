import {fireEvent, render, screen, waitFor} from '__tests__/testUtils'
import {MockedProvider} from '@apollo/client/testing'
import {SIGN_UP} from 'graphql/operations/mutations/signUp'
import {SignUp} from 'pages/SignUp'

test('should render sign up page', () => {
  render(
    <MockedProvider>
      <SignUp />
    </MockedProvider>
  )

  const title = screen.getByRole('heading', {name: /sign up/i})
  const fullName = screen.getByRole('textbox', {name: /full name \*/i})
  const email = screen.getByRole('textbox', {name: /email \*/i})
  const password = screen.getAllByLabelText(/password \*/i)[0]
  const confirmPassword = screen.getByLabelText(/confirm password \*/i)
  const button = screen.getByRole('button', {name: /sign up/i})
  const signIn = screen.getByText(/already have an account\?/i)

  expect(title).toBeInTheDocument()
  expect(fullName).toBeInTheDocument()
  expect(email).toBeInTheDocument()
  expect(password).toBeInTheDocument()
  expect(confirmPassword).toBeInTheDocument()
  expect(button).toBeInTheDocument()
  expect(signIn).toBeInTheDocument()
})

test('should render form errors', async () => {
  render(
    <MockedProvider>
      <SignUp />
    </MockedProvider>
  )

  const button = screen.getByRole('button', {name: /sign up/i})

  fireEvent.click(button)

  const fullNameError = await screen.findByText(/enter your full name/i)
  const emailError = await screen.findByText(/email is required/i)
  const passwordError = await screen.findByText(/password is required/i)

  expect(fullNameError).toBeInTheDocument()
  expect(emailError).toBeInTheDocument()
  expect(passwordError).toBeInTheDocument()
})

test('should render submit error', async () => {
  const variables = {
    fullName: 'Some Name',
    email: 'example@email.com',
    password: 'pass1W@a!uI',
  }

  const error = 'form submit error'

  const signUpMock = {
    request: {query: SIGN_UP, variables},
    error: new Error(error),
  }

  render(
    <MockedProvider mocks={[signUpMock]} addTypename={false}>
      <SignUp />
    </MockedProvider>
  )

  const fullName = screen.getByRole('textbox', {name: /full name \*/i})
  const email = screen.getByRole('textbox', {name: /email \*/i})
  const password = screen.getAllByLabelText(/password \*/i)[0]
  const confirmPassword = screen.getByLabelText(/confirm password \*/i)
  const button = screen.getByRole('button', {name: /sign up/i})

  fireEvent.change(fullName, {target: {value: variables.fullName}})
  fireEvent.change(email, {target: {value: variables.email}})
  fireEvent.change(password, {target: {value: variables.password}})
  fireEvent.change(confirmPassword, {target: {value: variables.password}})
  fireEvent.click(button)

  const formError = await screen.findByText(error)

  expect(formError).toBeInTheDocument()
})

test('should submit form successfully', async () => {
  const variables = {
    fullName: 'Some Name',
    email: 'example@email.com',
    password: 'pass1W@a!uI',
  }

  const signUpMock = {
    request: {query: SIGN_UP, variables},
    result: jest.fn(() => ({
      data: {
        signUp: {
          id: '12345',
          fullName: variables.fullName,
          displayName: null,
          email: variables.email,
          image: null,
        },
      },
    })),
  }

  render(
    <MockedProvider mocks={[signUpMock]} addTypename={false}>
      <SignUp />
    </MockedProvider>
  )

  const fullName = screen.getByRole('textbox', {name: /full name \*/i})
  const email = screen.getByRole('textbox', {name: /email \*/i})
  const password = screen.getAllByLabelText(/password \*/i)[0]
  const confirmPassword = screen.getByLabelText(/confirm password \*/i)
  const button = screen.getByRole('button', {name: /sign up/i})

  fireEvent.change(fullName, {target: {value: variables.fullName}})
  fireEvent.change(email, {target: {value: variables.email}})
  fireEvent.change(password, {target: {value: variables.password}})
  fireEvent.change(confirmPassword, {target: {value: variables.password}})
  fireEvent.click(button)

  await waitFor(() => {
    expect(signUpMock.result).toHaveBeenCalled()
  })
})
