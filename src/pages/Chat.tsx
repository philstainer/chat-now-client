import {ChatBox} from 'components/ChatBox'
import {ChatList} from 'components/ChatList'

export const Chat = (): JSX.Element => {
  return (
    <div className="h-full flex">
      <ChatList />
      <ChatBox />
    </div>
  )
}
