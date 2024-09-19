"use client"
import { useGetChannel } from '@/features/channels/api/use-get-channel'
import { useChannelId } from '@/hooks/use-channel-id'
import { Loader, TriangleAlert } from 'lucide-react'
import React from 'react'
import Header from './header'
import ChatatInput from './chat-input'
import { useGetMessages } from '@/features/messages/api/use-get-messages'
import MessageList from '@/components/message-list'

type Props = {}

const ChannelIdPage = (props: Props) => {
    const channelId=useChannelId();
    const {data:channel,isLoading:channelLoading}=useGetChannel({id:channelId});
    const {results,status,loadMore}=useGetMessages({channelId});
    if(channelLoading||status==="LoadingFirstPage"){
        return(
            <div className='h-full flex-1 flex items-center justify-center'>
                <Loader className='size-6 animate-spin text-muted-foreground'/>
            </div>
        )
    }
    if(!channel){
        return(
            <div className='h-full flex-1 flex flex-col gap-y-2 items-center justify-center'>
                <TriangleAlert className='siz-6 text-muted-foreground'/>
                <span className='text-sm text-muted-foreground'>Channel Not Found</span>
            </div>
        )
    }
  return (
    <div className='h-full flex flex-col'>
        <Header title={channel.name}/>
        
           <MessageList
           data={results}
           loadMore={loadMore}
           channelName={channel.name}
           channelCreationTime={channel._creationTime}
           memberName={''}
           memberImage=''
           cnaLoadMore={status==="CanLoadMore"}
           isLoadingMore={status==="LoadingMore"}
           />
       
        <ChatatInput placeholder={`Message # ${channel.name}`}/>
    </div>
  )
}

export default ChannelIdPage