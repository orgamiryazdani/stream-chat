'use client'

import { cn } from '@/lib/utils'
import { useCallback, useState } from 'react'
import { useTheme } from 'next-themes'
import { createToken } from '@/lib/actions'
import type {
  ChannelSort,
  ChannelFilters,
  ChannelOptions,
  Channel as ChannelType
} from 'stream-chat'
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageInput,
  MessageList,
  Thread,
  Window,
  useCreateChatClient,
  DefaultStreamChatGenerics
} from 'stream-chat-react'
import { EmojiPicker } from 'stream-chat-react/emojis'
import { init, SearchIndex } from 'emoji-mart'
import data from '@emoji-mart/data'
import CustomListContainer from '@/components/custom-list-container'
import 'stream-chat-react/dist/css/v2/index.css'
import CustomPreview from './custom-preview'
import { ArrowLeft } from 'lucide-react'

init({ data })

interface StreamChatProps {
  userData: {
    id: string
    name?: string
    image?: string
  }
}

export default function StreamChat({ userData }: StreamChatProps) {
  const { resolvedTheme } = useTheme()
  const [showChat, setShowChat] = useState(false)
  console.log(showChat)

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

  if (!client) {
    return null
  }

  return (
    <Chat
      client={client}
      theme={cn(
        resolvedTheme === 'dark'
          ? 'str-chat__theme-dark'
          : 'str-chat__theme-light'
      )}
    >
      <ChannelList
        sort={sort}
        filters={filters}
        options={options}
        List={listProps => <CustomListContainer {...listProps} />}
        Preview={previewProps => (
          <CustomPreview {...previewProps} setShowChat={setShowChat} />
        )}
        sendChannelsToList
      />

      <div
        className={`absolute left-0 top-0 h-full w-full sm:relative ${showChat ? 'flex' : 'hidden sm:flex'}`}
      >
        <Channel EmojiPicker={EmojiPicker} emojiSearchIndex={SearchIndex}>
          <Window>
            <div className='flex w-full items-center gap-x-2 bg-zinc-900 pl-1 sm:pl-0'>
              <ArrowLeft
                onClick={() => setShowChat(false)}
                className='cursor-pointer sm:hidden'
              />
              <ChannelHeader />
            </div>
            <MessageList />
            <MessageInput audioRecordingEnabled />
          </Window>
          <Thread />
        </Channel>
      </div>
    </Chat>
  )
}
