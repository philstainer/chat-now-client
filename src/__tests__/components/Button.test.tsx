import {render, screen} from '__tests__/testUtils'
import {Button} from 'components/Button'

test('should render loader and be disabled when loading', () => {
  const name = 'Sign up'

  render(<Button loading={true}>{name}</Button>)

  const button = screen.getByRole('button')

  expect(button).toBeInTheDocument()
  expect(button).toBeDisabled()
})

test('should render children when not loading', () => {
  const name = 'Sign up'

  render(<Button loading={false}>{name}</Button>)

  const button = screen.getByRole('button', {name})

  expect(button).toBeInTheDocument()
  expect(button).not.toBeDisabled()
})
