'use client'

import { createToken } from '@/lib/actions'
import { useCallback } from 'react'
import { Chat, useCreateChatClient } from 'stream-chat-react'

interface StreamChatProps {
  userData: {
    id: string
    name?: string
    image?: string
  }
}

export default function StreamChat({ userData }: StreamChatProps) {
  const tokenProvider = useCallback(async () => {
    return await createToken(userData.id)
  }, [userData.id, createToken])

  const client = useCreateChatClient({
    userData,
    tokenOrProvider: tokenProvider,
    apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!
  })

  if (!client) return <div>Setting up client & connection...</div>

  return <Chat client={client}>Chat with client is ready!</Chat>
}
