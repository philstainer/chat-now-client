import {render, screen} from '__tests__/testUtils'
import {Field} from 'components/Field'

test('should render required field', () => {
  render(<Field label="Full Name" required />)

  const requiredFlag = screen.getByText('*')

  expect(requiredFlag).toBeInTheDocument()
})

test('should render field error', () => {
  const error = 'Some error'

  render(<Field label="Full Name" error={error} />)

  const inputError = screen.getByText(error)

  expect(inputError).toBeInTheDocument()
})

test('should render Field correctly', () => {
  render(<Field label="Full Name" />)

  const input = screen.getByRole('textbox', {name: /full name/i})

  expect(input).toBeInTheDocument()
})
