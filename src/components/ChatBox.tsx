import {useReactiveVar} from '@apollo/client'
import {UserIcon} from '@heroicons/react/solid'
import {currentChat} from 'graphql/cache'
import {useChats} from 'graphql/operations/queries/chats'
import {useMe} from 'graphql/operations/queries/me'

import {Message} from './Message'

export const ChatBox = (): JSX.Element | null => {
  const {me} = useMe()
  const {chats} = useChats()
  const rCurrentChat = useReactiveVar(currentChat)

  const chat = chats?.find(chat => chat.id === rCurrentChat)
  const filteredUsers = chat?.users.filter(user => user.id !== me?.id)

  if (!chat || !me) return null

  return (
    <div className="w-2/3 overflow-hidden flex flex-col" data-testid="chatbox">
      <div className="p-3 flex items-center flex-shrink-0 space-x-2 bg-gray-100">
        <UserIcon className="flex-shrink-0 h-10 w-10 p-3 rounded-full text-gray-100 bg-gray-600" />

        <div className="truncate font-medium">
          {filteredUsers?.map(user => user.fullName).join(', ')}
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6 space-y-3">
        {/* TODO: Add virtualized rows for performance */}

        {chat?.messages.map(message => (
          <Message key={message.id} {...message} me={me.id} />
        ))}
      </div>

      <div className="h-16 flex flex-shrink-0 p-3 bg-gray-100">
        <input
          type="text"
          className="w-full rounded-full border-none px-5"
          placeholder="Type a message"
        />
      </div>
    </div>
  )
}
