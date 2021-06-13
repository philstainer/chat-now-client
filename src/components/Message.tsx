import classNames from 'classnames'
import {ChatsQuery_chats_messages} from 'generated/ChatsQuery'

interface Props extends ChatsQuery_chats_messages {
  me: string
}

export const Message = ({text, user, me}: Props): JSX.Element => {
  const isMe = user.id === me

  return (
    <div
      className={classNames('p-2 text-sm rounded-lg max-w-3/4', {
        'self-start text-gray-700 bg-gray-300': !isMe,
        'self-end text-white bg-blue-500': isMe,
      })}
    >
      {text}
    </div>
  )
}
