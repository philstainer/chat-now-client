import {useChats} from 'graphql/operations/queries/chats'

import {Chat} from './Chat'

export const ChatList = (): JSX.Element => {
  const {chats} = useChats()

  return (
    <div className="w-1/3 border-r border-gray-100 divide-y divide-gray-100">
      {chats?.map(chat => (
        <Chat key={chat.id} {...chat} />
      ))}
    </div>
  )
}
