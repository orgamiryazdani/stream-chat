'use client'

import { PropsWithChildren, useState } from 'react'
import {
  DefaultStreamChatGenerics,
  ChannelListMessengerProps,
  LoadingErrorIndicator,
  LoadingIndicator
} from 'stream-chat-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import NewConversationForm from '@/components/new-conversation-form'
import { MessageSquarePlus } from 'lucide-react'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { ThemeToggle } from './theme-toggle'
import { UserButton } from '@clerk/nextjs'

export default function CustomListContainer(
  props: PropsWithChildren<ChannelListMessengerProps<DefaultStreamChatGenerics>>
) {
  const { error, loading, children } = props
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  function closeDialog() {
    setDialogIsOpen(false)
  }

  if (error) {
    return <LoadingErrorIndicator />
  }

  if (loading) {
    return <LoadingIndicator />
  }

  return (
    <section className='w-full min-w-[300px]'>
      {/* navbar */}
      <div className='relative flex flex-col items-start gap-8 p-4'>
        <header className='w-full'>
          <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-bold'>Chats</h1>
            <div className='flex items-center gap-x-2'>
              <UserButton />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ThemeToggle />
                  </TooltipTrigger>
                  <TooltipContent side='right' sideOffset={5}>
                    Theme
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                <DialogTrigger>
                  <MessageSquarePlus className='size-6' />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create new channel</DialogTitle>
                    <DialogDescription>
                      Start a new conversation with someone
                    </DialogDescription>
                  </DialogHeader>
                  <NewConversationForm onSuccess={closeDialog} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </header>
      </div>
      {/* channel list */}
      <div className='str-chat__channel-list-messenger str-chat__channel-list-messenger-react'>
        <div
          className='str-chat__channel-list-messenger__main str-chat__channel-list-messenger-react__main'
          role='listbox'
        >
          {children}
        </div>
      </div>
    </section>
  )
}
