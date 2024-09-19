"use client"
import CreateChannelModal from '@/features/channels/components/create-channel-modal'
import CreateWorkSpaceModal from '@/features/workspacess/components/create-workspace-modal'
import React, { useEffect, useState } from 'react'

type Props = {}

const Modals= (props: Props) => {
    const [mounted,setMounted]=useState(false);
    useEffect(()=>{
        setMounted(true)
    },[]);
    if(!mounted) return null;

  return (
   <>
   <CreateChannelModal/>
   <CreateWorkSpaceModal/>
   </>
  )
}

export default Modals
