'use client'

import {
  ChannelPreviewMessenger,
  ChannelPreviewUIComponentProps,
  DefaultStreamChatGenerics
} from 'stream-chat-react'

type Props = ChannelPreviewUIComponentProps<DefaultStreamChatGenerics> & {
  setShowChat: (value: boolean) => void
}

export default function CustomPreview(props: Props) {
  const { setShowChat, channel, setActiveChannel } = props

  return (
    <div
      onClick={() => {
        setActiveChannel?.(channel)
        setShowChat(true)
      }}
    >
      <ChannelPreviewMessenger {...props} />
    </div>
  )
}
