import {UserIcon} from '@heroicons/react/solid'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'
import {ChatsQuery_chats} from 'generated/ChatsQuery'
import {currentChat} from 'graphql/cache'
import {useMe} from 'graphql/operations/queries/me'

export const Chat = ({id, users, messages}: ChatsQuery_chats): JSX.Element => {
  const {me} = useMe()

  const filteredUsers = users.filter(user => user.id !== me?.id)
  const lastMessage = messages[messages.length - 1]

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
          <div className="truncate">
            {filteredUsers.map(user => user.fullName).join(', ')}
          </div>

          {lastMessage.createdAt && (
            <div className="flex items-center flex-shrink-0 text-sm">
              {formatDistanceToNowStrict(new Date(lastMessage.createdAt), {
                addSuffix: true,
              })}
            </div>
          )}
        </div>

        <div className="flex-1 text-sm text-gray-500">{lastMessage.text}</div>
      </div>
    </div>
  )
}
