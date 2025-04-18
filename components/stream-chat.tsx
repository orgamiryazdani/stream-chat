'use client'

import { createToken } from '@/lib/actions'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import { useCallback } from 'react'
import { ChannelFilters, ChannelOptions, ChannelSort } from 'stream-chat'
import {
  useCreateChatClient,
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
  ChannelList,
  DefaultStreamChatGenerics
} from 'stream-chat-react'
import 'stream-chat-react/dist/css/v2/index.css'
import { EmojiPicker } from 'stream-chat-react/emojis'
import { SearchIndex } from 'emoji-mart';

interface StreamChatProps {
  userData: {
    id: string
    name?: string
    image?: string
  }
}

export default function StreamChat({ userData }: StreamChatProps) {
  const { resolvedTheme } = useTheme()
  const tokenProvider = useCallback(async () => {
    return await createToken(userData.id)
  }, [userData.id, createToken])

  const client = useCreateChatClient({
    userData,
    tokenOrProvider: tokenProvider,
    apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!
  })

  const sort: ChannelSort<DefaultStreamChatGenerics> = { last_message_at: -1 }
  const filters: ChannelFilters<DefaultStreamChatGenerics> = {
    type: 'messaging',
    members: { $in: [userData.id] }
  }
  const options: ChannelOptions = {
    limit: 10
  }

  if (!client) return <div>Setting up client & connection...</div>

  return (
    <Chat
      client={client}
      theme={cn(
        resolvedTheme === 'dark'
          ? 'str-chat__theme-dark'
          : 'str-chat__theme-light'
      )}
    >
      <ChannelList sort={sort} filters={filters} options={options} />
      <Channel EmojiPicker={EmojiPicker} emojiSearchIndex={SearchIndex}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  )
}
