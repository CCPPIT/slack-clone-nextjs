import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useGetWorkspace } from '@/features/workspacess/api/use-get-workspace'
import { useGetWorkspaces } from '@/features/workspacess/api/use-get-workspacess'
import { useCreateWorkspaceModal } from '@/features/workspacess/store/use-create-workspace-modal'
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { Loader, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

const WorkSpaceSwitcher = (props: Props) => {
    const workspaceId=useWorkspaceId();
    const {data:workspace,isLoading:workspaceLoding}=useGetWorkspace({id:workspaceId});
    const {data:workspacess,isLoading:workspacessLoading}=useGetWorkspaces();
    const [open,setOpen]=useCreateWorkspaceModal();

    const router=useRouter();
    const filteredWorkspaces=workspacess?.filter(
        (workspace)=>workspace._id!==workspaceId
    )
  return (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
        <Button className='size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-xl'>
            {workspaceLoding?(
                <Loader className='size-5 animate-spin shrink-0'/>
            ):(
                workspace?.name.charAt(0).toUpperCase()

            )}
        </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent side='bottom' align='start'className='w-64'>
        <DropdownMenuItem
        onClick={()=>router.push(`/workspace/${workspaceId}`)}
         className='cursor-ponter flex-col justify-start items-start capitalize'>
            {workspace?.name}
            <span className='text-xs text-muted-foreground'>Active workspace</span>

        </DropdownMenuItem>
        {filteredWorkspaces?.map((workspace)=>(
            <DropdownMenuItem 
            key={workspace._id}
            className='cursor-pointer capitalize overflow-hidden'
            onClick={()=>router.push(`/workspace/${workspace._id}`)}
            >
             <div className=' shrink-0 size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-lg rounded-md flex items-center justify-center mr-2'>

                {workspace.name.charAt(0).toUpperCase()}
            </div>
            <p className='truncate'>{workspace.name}</p>
            


            </DropdownMenuItem>
        ))}
        <DropdownMenuItem 
        className='cursor-pointer'
        onClick={()=>setOpen(true)}
        >
            <div className='size-9 relative overflow-hidden bg-[#F2F2F2] text-slate-800 font-semibold text-lg rounded-md flex items-center justify-center mr-2'>
                <Plus/>
                

            </div>
            Create a new workspace
        </DropdownMenuItem>

    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default WorkSpaceSwitcher