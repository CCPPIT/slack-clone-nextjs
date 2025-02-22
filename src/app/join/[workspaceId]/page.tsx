"use client"
import { Button } from '@/components/ui/button';
import { useGetWorkspaceInfo } from '@/features/workspacess/api/use-get-workspace-info';
import { useJoin } from '@/features/workspacess/api/use-join';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo } from 'react'
import VerificationInput from "react-verification-input";
import { toast } from 'sonner';


type Props = {}

const JoinPage = (props: Props) => {
  const router=useRouter()
  const workspaceId=useWorkspaceId();
  const {mutate,isPending}=useJoin();
  const {data,isLoading}=useGetWorkspaceInfo({id:workspaceId});
  const isMember=useMemo(()=>data?.isMember,[data?.isMember]);
  useEffect(()=>{
    if(isMember){
      router.push(`/workspace/${workspaceId}`)
    }
  },[isMember,router,workspaceId])
  if(isLoading){
    return(
      <div className='h-full flex items-center justify-center'>
        <Loader className='size-6 animate-spin text-muted-foreground'/>

      </div>
    );
    
  }
  const handleComplate=(value:string)=>{
    mutate({
      workspaceId,
      joinCode:value
    },{
      onSuccess(id) {
        router.replace(`/workspace/${id}`)
        toast.success("Workspace joined.");

        
      },
      onError:()=>{
        toast.error("Failed to join workspace")
      }
    }
  )
  }
  return (
    <div className='h-full flex flex-col items-center justify-center bg-white gap-y-8 p-8 rounded-lg shadow-md'>
    <Image src={'/logo-black.svg'} height={100} width={100} alt='logo'/>
    <div className='flex flex-col gap-y-4 items-center justify-center max-w-md'>
    <div className='flex flex-col gap-y-2 items-center justify-center'>
        <h1 className='text-2xl font-bold'>
        Join workspace {data?.name}

        </h1>
        <p className='text-md text-muted-foreground'>
            Enter the workspace code to join

        </p>
       
    </div>
    <VerificationInput
    onComplete={handleComplate}
    length={6}
      classNames={{
        container: cn("flex gap-x-2",isLoading&&"opacity-50 cursor-not-allowed",),
        character: "uppercase h-auto rounded-md border border-gray-300 flex items-center justify-center text-lg font-medium text-gray-500",
         characterInactive:"bg-muted",
         characterSelected: "bg-white text-black",
         characterFilled:  "bg-white text-black",
      }}
      autoFocus
     />

       
    </div>
    <div className='flex gap-x-4'>
        <Button variant={"outline"} size={"lg"} asChild>
            <Link href={"/"}>
            Back to home
            </Link>

        </Button>
    </div>
    </div>
  )
}

export default JoinPage