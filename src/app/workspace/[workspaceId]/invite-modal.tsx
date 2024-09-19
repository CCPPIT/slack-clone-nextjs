import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useNewJoinCode } from '@/features/workspacess/api/use-new-join-code'
import { useConfirm } from '@/hooks/use-confirm'
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { CopyIcon, RefreshCcw } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

type Props = {
    open:boolean,
    setOpen:(open:boolean)=>void,
    name:string,
    joinCode:string
}

const InviteModal = ({open,setOpen,name,joinCode}: Props) => {
    const workspaceId=useWorkspaceId()
    const {mutate, isPending}=useNewJoinCode();
    const[ConfirmDialog,confirm]=useConfirm(
        "Are you sure?",
        "This will deactivate the current invite code and generate a new one."
    );
    const handleNewCode=async()=>{
        const ok=await confirm();
        if(!ok)return;
        mutate({
            workspaceId
        },{
            onSuccess:()=>{
                toast.success("Invite code regenerated")
            },
            onError:()=>{
                toast.error("Failed to regenerate invite code")
            }
        })
    }
    const handleCopy=()=>{
      const inviteCopyLink=  `${window.location.origin}/join/${workspaceId}`;
        navigator.clipboard
        .writeText(inviteCopyLink)
        .then(()=>toast.success("Invite link copied to clipboard"))


    }
  return (
    <>
    <ConfirmDialog />
   
   <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Invite people to {name}</DialogTitle>
            <DialogDescription>
                Use the code below to invite people to  your workspace
            </DialogDescription>
            <div className='flex flex-col gap-y-4 items-center justify-center py-10'>
                <p className='text-4xl tracking-widest uppercase'>
                {joinCode}

                </p>
                <Button
                onClick={handleCopy}
                 variant={"ghost"} size={"sm"}>
                    Copy Link
                   
                   {<CopyIcon className='size-4 ml-2'/>}
                </Button>
                

            </div>
            <div className='flex items-center justify-between w-full'>
                <Button  disabled={isPending}variant={"outline"} onClick={handleNewCode}>
                    New Code
                    <RefreshCcw className='size-4 ml-2'/>

                </Button>
                <DialogClose asChild>
                    <Button>Close</Button>

                </DialogClose>

            </div>
        </DialogHeader>
    </DialogContent>

   </Dialog>
   </>
  )
}

export default InviteModal