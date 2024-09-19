"use client"

import { Button } from "@/components/ui/button";
import UserButton from "@/features/auth/components/user-button";
import { useCreateWorkspaceModal } from "@/features/workspacess/store/use-create-workspace-modal";
import { useGetWorkspaces } from "@/features/workspacess/api/use-get-workspacess";
import { useAuthActions } from "@convex-dev/auth/react";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const {data,isLoading}=useGetWorkspaces();
  const workspacesId=useMemo(()=>data?.[0]?._id,[data]);
  const [open,setOpen]=useCreateWorkspaceModal();
  const router=useRouter();
  useEffect(()=>{
    if(isLoading)return ;
    if(workspacesId){
      router.replace(`/workspace/${workspacesId}`)
     
    }else if(!open){
      setOpen(true)

    }
  },[workspacesId,isLoading,open,setOpen])
  return (
    <div>
     
       <UserButton/>

    </div>
  
    
   );
}
