import {fireEvent, render, screen} from '__tests__/testUtils'
import {MockedProvider} from '@apollo/client/testing'
import {ChatList} from 'components/ChatList'
import subHours from 'date-fns/subHours'
import {currentChat} from 'graphql/cache'
import {CHATS} from 'graphql/operations/queries/chats'
import {ME} from 'graphql/operations/queries/me'

jest.mock('graphql/cache', () => ({currentChat: jest.fn()}))

test('should render list of chats', async () => {
  const users = [
    {
      id: '1',
      email: 'some@email.com',
      fullName: 'name',
      displayName: null,
      image: null,
    },
    {
      id: '2',
      email: 'some2@email.com',
      fullName: 'name 2',
      displayName: null,
      image: null,
    },
    {
      id: '3',
      email: 'some3@email.com',
      fullName: 'name 3',
      displayName: null,
      image: null,
    },
  ]

  const message = {
    id: '4',
    text: 'Text',
    user: users[0],
    createdAt: subHours(new Date(), 2).toISOString(),
  }

  const meMock = {
    request: {query: ME},
    result: jest.fn(() => ({
      data: {me: users[0]},
    })),
  }

  const chatsMock = {
    request: {query: CHATS},
    result: {
      data: {
        chats: [
          {
            id: '5',
            messages: [message],
            users,
            createdAt: new Date().toISOString(),
          },
        ],
      },
    },
  }

  render(
    <MockedProvider mocks={[chatsMock, meMock]} addTypename={false}>
      <ChatList />
    </MockedProvider>
  )

  const text = await screen.findByText(message.text)
  const usersTitle = await screen.findByText(
    `${users[1].fullName}, ${users[2].fullName}`
  )
  const time = await screen.findByText(/2 hours ago/i)

  expect(text).toBeInTheDocument()
  expect(usersTitle).toBeInTheDocument()
  expect(time).toBeInTheDocument()
})

test('should set current chat onClick', async () => {
  const users = [
    {
      id: '1',
      email: 'some@email.com',
      fullName: 'name',
      displayName: null,
      image: null,
    },
  ]

  const message = {
    id: '4',
    text: 'Text',
    user: users[0],
    createdAt: subHours(new Date(), 2).toISOString(),
  }

  const meMock = {
    request: {query: ME},
    result: {
      data: {me: users[0]},
    },
  }

  const chat = {
    id: '5',
    messages: [message],
    users,
    createdAt: new Date().toISOString(),
  }

  const chatsMock = {
    request: {query: CHATS},
    result: jest.fn(() => ({
      data: {
        chats: [chat],
      },
    })),
  }

  render(
    <MockedProvider mocks={[chatsMock, meMock]} addTypename={false}>
      <ChatList />
    </MockedProvider>
  )

  const chatDiv = await screen.findByTestId('chat')

  expect(chatDiv).toBeInTheDocument()

  fireEvent.click(chatDiv)

  expect(currentChat).toHaveBeenCalledWith(chat.id)
})
