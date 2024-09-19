 "use client"
import { useGetChannels } from '@/features/channels/api/use-get-channels';
import { useCreateChannelModal } from '@/features/channels/store/use-create-channel-modal';
import { useCurrentMember } from '@/features/members/api/use-current-member';
import { useGetWorkspace } from '@/features/workspacess/api/use-get-workspace';
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { Loader, TriangleAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo } from 'react'



const WorkSpaceIdPage = () => {
  const router=useRouter();
    const workspaceId=useWorkspaceId();
    const{data}=useGetWorkspace({id:workspaceId});
    const [open,setOpen]=useCreateChannelModal();
    const{data:workspace,isLoading:workspaceisLoading}=useGetWorkspace({id:workspaceId});
    const {data:channels,isLoading:channelsLoading}=useGetChannels({
      workspaceId
    });
    const {data:member,isLoading:memberLoading}=useCurrentMember({workspaceId});
    const isAdmin=useMemo(()=>member?.role==="admin",[member?.role])
    const channelId=useMemo(()=>channels?.[0]?._id,[channels]);

    useEffect(()=>{
      if(workspaceisLoading||channelsLoading||memberLoading||!member||!workspace)return;
      if(channelId){
        router.push(`/workspace/${workspaceId}/channel/${channelId}`)
      }else if(!open&&isAdmin){
        setOpen(true);
      }

    },[workspace,workspaceId,workspaceisLoading,
      channelId,channelsLoading,open,setOpen,router,member,memberLoading,isAdmin]);
      if(workspaceisLoading||channelsLoading||memberLoading){
        return(
        <div className='h-full flex-1 flex items-center justify-center flex-col gap-2'>
          <Loader className='size-6 animate-spin text-muted-foreground'/>

        </div>
        )
      }
      if(!workspace||!member){
        return(
          <div className='h-full flex-1 flex items-center justify-center flex-col gap-2'>
            <TriangleAlert className='size-6 animate-spin text-muted-foreground'/>
            <span className='text-sm text-muted-foreground'>Workspace Not Found</span>
  
          </div>
          )

      }

  return(
    <div className='h-full flex-1 flex items-center justify-center flex-col gap-2'>
      <TriangleAlert className='size-6  text-muted-foreground'/>
      <span className='text-sm text-muted-foreground'>No Channel Found</span>

    </div>
    )
    
}

export default WorkSpaceIdPage