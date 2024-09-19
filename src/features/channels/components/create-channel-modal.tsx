import React, { useState } from 'react'
import { useCreateChannelModal } from '../store/use-create-channel-modal'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCreateChannel } from '../api/use-create-channels';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type Props = {}

const CreateChannelModal = (props: Props) => {
    const router=useRouter();
    const workspaceId=useWorkspaceId();
    const [open,setOpen]=useCreateChannelModal();
    const [name,setName]=useState("")
    const {mutate,isPending}=useCreateChannel()
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const value=e.target.value.replace(/\s+/g,"-").toLowerCase();
        setName(value)
    }

    const handleClose=()=>{
        setName("")
        setOpen(false)
    }
    const handelSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        mutate({
            name,
            workspaceId
        },{
            onSuccess:(id)=>{
                router.push(`/workspace/${workspaceId}/channel/${id}`)
                toast.success("Channels created");
                handleClose();
            },
            onError:()=>{
                toast.error("Failed to create a channel")
            }

        })

    }
  return (
 <Dialog open={open} onOpenChange={handleClose}>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Add a channel</DialogTitle>
        </DialogHeader>
        <form  onSubmit={handelSubmit}className='space-y-4'>
            <Input
            disabled={isPending}
            value={name}
            onChange={handleChange}
            autoFocus
            minLength={3}
            maxLength={80}
            placeholder="e.g. plan-budget"
            />
            <div className='flex justify-end'>
                <Button disabled={false}>
                    Create
                </Button>

            </div>

        </form>
    </DialogContent>

 </Dialog>
  )
}

export default CreateChannelModal