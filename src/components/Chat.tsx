import {UserIcon} from '@heroicons/react/solid'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'
import {ChatsQuery_chats, ChatsQuery_chats_messages} from 'generated/ChatsQuery'
import {currentChat} from 'graphql/cache'

interface Props extends ChatsQuery_chats {
  me?: string
}

export const Chat = ({id, users, messages, me}: Props): JSX.Element => {
  const filteredUsers = users.filter(user => user.id !== me)
  const lastMessage = messages[
    messages.length - 1
  ] as ChatsQuery_chats_messages | null

  const onClick = () => currentChat(id)

  return (
    <div
      className="flex space-x-3 p-3 cursor-pointer transition-colors hover:bg-gray-100"
      onClick={onClick}
      data-testid="chat"
    >
      <UserIcon className="flex-shrink-0 h-12 w-12 p-3 rounded-full text-gray-100 bg-gray-600" />

      <div className="flex flex-col overflow-hidden space-y-1">
        <div className="flex-1 flex text-gray-700 space-x-2">
          <div className="truncate font-medium">
            {filteredUsers.map(user => user.fullName).join(', ')}
          </div>

          {lastMessage?.createdAt && (
            <div className="flex items-center flex-shrink-0 text-xs text-gray-500">
              {formatDistanceToNowStrict(new Date(lastMessage.createdAt), {
                addSuffix: true,
              })}
            </div>
          )}
        </div>

        <div className="flex-1 text-sm text-gray-500">{lastMessage?.text}</div>
      </div>
    </div>
  )
}
