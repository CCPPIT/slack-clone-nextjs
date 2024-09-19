import React, { useState } from 'react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TrashIcon } from 'lucide-react';
import { useUpdateWorkspace } from '@/features/workspacess/api/use-update-workspace';
import { useRemoveWorkspace } from '@/features/workspacess/api/use-remove-workspace';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useConfirm } from '@/hooks/use-confirm';

interface Props  {
    open:boolean,
    setOpent:(open:boolean)=>void,
    initialValue:string
}

const PreferencesModal = ({open,setOpent,initialValue}: Props) => {
  const router=useRouter();
const workspaceId=useWorkspaceId();
const [ConfirmDialog,confirm]=useConfirm(
  "Are you sure?",
  "This action is irreversible"
);
    const [value,setValue]=useState(initialValue);
    const {mutate:updateworkspace,isPending:isUpdatePendingWorkspace}=useUpdateWorkspace();
    const {mutate:removeworkspace,isPending:isRemovingWorkspace}=useRemoveWorkspace();
    const [editeOpent,setEditOpent]=useState(false);
    const handleRemoveworkspace=async()=>{
      const ok =await confirm();
      if(!ok)return;
      removeworkspace({
        id:workspaceId,
      },{
       
        onSuccess:()=>{
          toast.success("Workspace removed")
          router.replace("/")

        },
        onError:()=>{
          toast.error("Faild to remove workspace")
        }
      })
    }
    const handleEdit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    updateworkspace({
    id:workspaceId,
    name:value
    },{
    onSuccess:()=>{
    toast.success("workspace updated");
    setEditOpent(false)
    },
    onError:() =>{
      toast.error("Failed to update workspace")
    },
    }
    )

    }

  return (
    <>
    <ConfirmDialog/>
  <Dialog open={open} onOpenChange={setOpent} >
    <DialogContent className='p-0 bg-gray-50'>
        <DialogHeader className='p-4 border-b bg-white'>
            <DialogTitle>{value}</DialogTitle>
        </DialogHeader>
        <div className='px-4 pb-4 flex flex-col gap-y-2'>
          <Dialog open={editeOpent}onOpenChange={setEditOpent}>
            <DialogTrigger asChild>

            
          <div className='px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50'>
            <div className='flex items-center justify-between'>
              <p className='text-sm font-semibold'>workspace name</p>
              <p className='text-sm text-[#1264a3] hover:underline font-semibold'>Edit</p>
            </div>
            <p className='text-sm'>
              {value}
            </p>

          </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rename this workspace</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEdit} className='space-y-4'>
              <Input
              disabled={isUpdatePendingWorkspace}
              value={value}
              onChange={(e)=>setValue(e.target.value)}
              required 
              autoFocus
              minLength={3}
              maxLength={80}
              placeholder="Workspace name e.g 'Work', 'Personal', 'Home',"

              />
              <DialogFooter>
              <DialogClose asChild>
              <Button variant={"outline"} disabled={isUpdatePendingWorkspace}>
              Cancel
              </Button>
              </DialogClose>
              <Button disabled={isUpdatePendingWorkspace} type='submit'>Save</Button>
              </DialogFooter>

            </form>
          </DialogContent>
          </Dialog>
          <button disabled={isRemovingWorkspace}
          onClick={handleRemoveworkspace}
          className='flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600'
          >
            <TrashIcon className='size-4'/>
            <p className='text-sm font-semibold'>Delete workspace</p>

          </button>
          

        </div>
    </DialogContent>

  </Dialog>
  </>
 
  )
}

export default PreferencesModal