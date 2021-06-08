import {render, RenderResult} from '@testing-library/react'
import {ComponentType} from 'react'
import {MemoryRouter} from 'react-router-dom'

type Props = {
  children: JSX.Element
}

const Providers = ({children}: Props) => {
  return <MemoryRouter>{children}</MemoryRouter>
}

const customRender = (ui: JSX.Element, options = {}): RenderResult =>
  render(ui, {wrapper: Providers as ComponentType, ...options})

export * from '@testing-library/react'

export {customRender as render}
