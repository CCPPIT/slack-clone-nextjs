import { useCurrentMember } from '@/features/members/api/use-current-member';
import { useGetWorkspace } from '@/features/workspacess/api/use-get-workspace';
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { AlertTriangle, HashIcon, Loader, MessageSquareText, SendHorizonal } from 'lucide-react';
import React from 'react'
import WorkspaceHeader from './workspace-header';
import SideBarItem from './sidebar-item';
import { useGetChannels } from '@/features/channels/api/use-get-channels';
import WorkspaceSection from './workspace-section';
import { useGetMembers } from '@/features/members/api/use-get-members';
import UserItem from './user-item';
import { useCreateChannelModal } from '@/features/channels/store/use-create-channel-modal';
import { useChannelId } from '@/hooks/use-channel-id';

type Props = {}

const WorkSpaceSideBar = (props: Props) => {
    const workspaceId=useWorkspaceId();
    const channelId=useChannelId();
    const[_open,setOpen]=useCreateChannelModal();
    const {data:member,isLoading:memberLoading}=useCurrentMember({workspaceId});
    const {data:workspace,isLoading:workspaceLoading}=useGetWorkspace({id:workspaceId});
    const {data:channels,isLoading:isLoadingChannels}=useGetChannels({workspaceId});
    const {data:members,isLoading:membersLoading}=useGetMembers({workspaceId})
    if(workspaceLoading||memberLoading){
        return(
            <div className='flex flex-col h-full bg-[#5E2C5F] justify-center items-center'>
                <Loader className='size-5 animate-spin text-white'/>

            </div>
        )
    }
    if(!workspace||!member){
        return(
            <div className='flex flex-col gap-y-2 h-full bg-[#5E2C5F] justify-center items-center'>
                <AlertTriangle className='size-5  text-white'/>
                <p className='text-white text-sm'>Workspace not found</p>

            </div>
        )
    }

  return (
    <div className='flex flex-col h-full  bg-[#5E2C5F]'>
        <WorkspaceHeader workspace={workspace} isAdmin={member.role === "admin"}/>
        <div className='flex flex-col px-2 mt-3'>
           <SideBarItem icon={MessageSquareText} label='Threads' id='threads'/>
           
           <SideBarItem icon={SendHorizonal}
            label='Drafts & Sent' id='drafts'/>
            </div>
            <WorkspaceSection
            label='Channel'
            hint='New channel'
            onNew={member.role==="admin"?()=>setOpen(true):undefined}
            >
            {channels?.map((item)=>(
                <SideBarItem
                key={item._id}
                icon={HashIcon}
                label={item.name}
                id={item._id}
                variant={channelId===item._id?"active":"default"}
                />
            ))}
            </WorkspaceSection>
            <WorkspaceSection
            label='Direct Messages'
            hint='New direct message'
            onNew={()=>{}}

            >

            
            {members?.map((item)=>(
                <UserItem
                key={item._id}
                id={item._id}
                image={item.user.image}
                label={item.user.name}
                />
            ))}
            </WorkspaceSection>


        

    </div>
  )
}

export default WorkSpaceSideBar