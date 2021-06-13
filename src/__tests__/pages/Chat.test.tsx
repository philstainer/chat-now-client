import {fireEvent, render, screen} from '__tests__/testUtils'
import {MockedProvider} from '@apollo/client/testing'
import {within} from '@testing-library/react'
import subHours from 'date-fns/subHours'
import faker from 'faker'
import {CHATS} from 'graphql/operations/queries/chats'
import {ME} from 'graphql/operations/queries/me'
import {Chat} from 'pages/Chat'

const users = [
  {
    id: faker.datatype.uuid(),
    fullName: faker.name.findName(),
    displayName: null,
    image: null,
  },
  {
    id: faker.datatype.uuid(),
    fullName: faker.name.findName(),
    displayName: null,
    image: null,
  },
  {
    id: faker.datatype.uuid(),
    fullName: faker.name.findName(),
    displayName: null,
    image: null,
  },
]

const messages = [
  {
    id: faker.datatype.uuid(),
    text: faker.lorem.words(2),
    user: users[0],
    createdAt: subHours(new Date(), 4).toISOString(),
  },
  {
    id: faker.datatype.uuid(),
    text: faker.lorem.words(2),
    user: users[1],
    createdAt: subHours(new Date(), 3).toISOString(),
  },
  {
    id: faker.datatype.uuid(),
    text: faker.lorem.words(2),
    user: users[2],
    createdAt: subHours(new Date(), 2).toISOString(),
  },
]

const chat = {
  id: faker.datatype.uuid(),
  users,
  messages,
  createdAt: new Date().toISOString(),
}

describe('ChatList', () => {
  test('should render list of chats', async () => {
    const meMock = {
      request: {query: ME},
      result: jest.fn(() => ({
        data: {me: {...users[0], email: faker.internet.email()}},
      })),
    }

    const chatsMock = {
      request: {query: CHATS},
      result: {data: {chats: [chat]}},
    }

    render(
      <MockedProvider mocks={[meMock, chatsMock]} addTypename={false}>
        <Chat />
      </MockedProvider>
    )

    const chatItem = await screen.findByTestId('chat')

    const usersTitle = await within(chatItem).findByText(
      `${users[1].fullName}, ${users[2].fullName}`
    )
    const time = await within(chatItem).findByText(/2 hours/i)
    const text = await within(chatItem).findByText(messages[2].text)

    expect(usersTitle).toBeInTheDocument()
    expect(time).toBeInTheDocument()
    expect(text).toBeInTheDocument()
  })
})

describe('ChatBox', () => {
  test('should not show chatbox when no chat selected', async () => {
    const meMock = {
      request: {query: ME},
      result: jest.fn(() => ({
        data: {me: {...users[0], email: faker.internet.email()}},
      })),
    }

    const chatsMock = {
      request: {query: CHATS},
      result: {data: {chats: [chat]}},
    }

    render(
      <MockedProvider mocks={[meMock, chatsMock]} addTypename={false}>
        <Chat />
      </MockedProvider>
    )

    await screen.findByTestId('chat')
    const chatBox = screen.queryByTestId('chatbox')

    expect(chatBox).not.toBeInTheDocument()
  })

  test('should show chatbox when selected', async () => {
    const meMock = {
      request: {query: ME},
      result: jest.fn(() => ({
        data: {me: {...users[0], email: faker.internet.email()}},
      })),
    }

    const chatsMock = {
      request: {query: CHATS},
      result: {data: {chats: [chat]}},
    }

    render(
      <MockedProvider mocks={[meMock, chatsMock]} addTypename={false}>
        <Chat />
      </MockedProvider>
    )

    const chatItem = await screen.findByTestId('chat')
    fireEvent.click(chatItem)

    const chatBox = await screen.findByTestId('chatbox')
    const title = await within(chatBox).findByText(
      `${users[1].fullName}, ${users[2].fullName}`
    )
    const message1 = await within(chatBox).findByText(messages[0].text)
    const message2 = await within(chatBox).findByText(messages[1].text)
    const message3 = await within(chatBox).findByText(messages[2].text)
    const textbox = await within(chatBox).findByRole('textbox')

    expect(title).toBeInTheDocument()
    expect(message1).toBeInTheDocument()
    expect(message2).toBeInTheDocument()
    expect(message3).toBeInTheDocument()
    expect(textbox).toBeInTheDocument()
  })
})
