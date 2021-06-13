import {Chat} from 'components/Chat'
import {useChats} from 'graphql/operations/queries/chats'
import {useMe} from 'graphql/operations/queries/me'

export const ChatList = (): JSX.Element => {
  const {me} = useMe()
  const {chats} = useChats()

  return (
    <div className="w-1/3 border-r border-gray-100 divide-y divide-gray-100">
      {chats?.map(chat => (
        <Chat key={chat.id} {...chat} me={me?.id} />
      ))}
    </div>
  )
}
