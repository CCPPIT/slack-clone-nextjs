"use client"
import React from 'react'
import ToolBar from './toolbar'
import SideBar from './SideBar'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import WorkSpaceSideBar from './workspace-sidebar'


type Props = {
    children:React.ReactNode
}

const WorkSpaceLayout = ({children}: Props) => {
  return (
    <div className='h-full'>
        <ToolBar/>
        <div className='flex h-[calc(100vh-40px)]'>
            <SideBar/>
           <ResizablePanelGroup direction='horizontal'
           autoSaveId={"ca-workspacelayout"}
           >
            <ResizablePanel defaultSize={20}
            minSize={11}
            className='bg-[#5E2C5F]'
            >
             <WorkSpaceSideBar/>
              
            </ResizablePanel>
            <ResizableHandle withHandle/>
            <ResizablePanel minSize={20}>

          
        {children}
        </ResizablePanel>
        </ResizablePanelGroup>

        </div>
        
    </div>
  )
}

export default WorkSpaceLayout