import ChatList from '@/components/ChatList/ChatList'
import React from 'react'

function ChatLayout() {
  return (
    <div className=" flex flex-1 border-1 border-solid h-full">
      <ChatList />
    </div>
  );
}

export default ChatLayout