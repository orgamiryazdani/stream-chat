'use client'

import {
  ChannelPreviewMessenger,
  ChannelPreviewUIComponentProps,
  DefaultStreamChatGenerics
} from 'stream-chat-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'
import { Trash2 } from 'lucide-react'
import { Button } from './ui/button'
import { toast } from 'sonner'

type Props = ChannelPreviewUIComponentProps<DefaultStreamChatGenerics> & {
  setShowChat: (value: boolean) => void
}

export default function CustomPreview(props: Props) {
  const { setShowChat, channel, setActiveChannel } = props

  const deleteChannel = async () => {
    if (!channel) return
    try {
      await channel.delete()
      toast.success('Channel deleted successfully')
    } catch (error) {
      toast.error('Error deleting channel')
    }
  }

  return (
    <div
      onClick={() => {
        setActiveChannel?.(channel)
        setShowChat(true)
      }}
      className='relative'
    >
      <ChannelPreviewMessenger {...props} />
      <Dialog>
        <DialogTrigger>
          <Trash2 className='absolute right-2 top-3 size-5 cursor-pointer text-red-500' />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              channel and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => deleteChannel()}>Yes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
