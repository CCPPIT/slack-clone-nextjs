"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import React, { useState } from 'react'
import { useCreateWorkspaceModal } from '../store/use-create-workspace-modal'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useCreateWorkspace } from '../api/use-create-workspace'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type Props = {}

const CreateWorkSpaceModal = (props: Props) => {
    const [open,setOpen]=useCreateWorkspaceModal();
    const [name,setName]=useState("");
    const {mutate,isPending,isError,isSettled,isSuccess}=useCreateWorkspace();
    const router=useRouter()
    const handleClose=()=>{
        // TODO:: CLEAR FORM
        setOpen(false)
        setName("")
    };
    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{

        
      mutate({
            name

        },
        {onSuccess(id){
            toast.success("workspace created")
        router.push(`/workspace/${id}`);
        handleClose()
            
        },
        onError(){},
        onSettled(){}
    },
        
    )
}catch(error){}

    }
  return (
    <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Add a workspace
                </DialogTitle>
            </DialogHeader>
            <form 
            
            onSubmit={handleSubmit} className='space-y-4'>
                <Input
                disabled={isPending}
                value={name}
                onChange={(e)=>setName(e.target.value)}
                autoFocus
                minLength={3}
                placeholder="Workspace name e.g. 'Work' 'Personal' 'Home'"
                />
                <div className='flex justify-end'>
                    <Button disabled={isPending}>
                        Create
                    </Button>

                </div>

            </form>
        </DialogContent>

    </Dialog>
  )
}

export default CreateWorkSpaceModal