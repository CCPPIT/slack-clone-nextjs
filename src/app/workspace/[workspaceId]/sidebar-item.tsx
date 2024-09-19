import { Button } from '@/components/ui/button'
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { Icon, LucideIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons/lib'
import {cva,type VariantProps}from "class-variance-authority";
import { cn } from '@/lib/utils'


const sidebarItemVariantProps=cva(
    "flex items-center gap-1.5 justify-start font-normal h-7 px-[18px] text-sm overflowhidden",
    {
        variants:{
            varaint:{
                default:"text-[#f9edffcc]",
                active:"text-[#481349] bg-white/90 hover:bg-white/90"

            }

        },
        defaultVariants:{varaint:"default"}

    }
)

type Props = {
    icon:LucideIcon|IconType,
    label:string,
    id:string,
    variant?:VariantProps<typeof sidebarItemVariantProps>["varaint"]

}

const SideBarItem = ({icon:Icon,label,id,variant}: Props) => {
    const workspaceId=useWorkspaceId();
  return (
    <Button asChild
    variant={"transparent"}
    size={"sm"}
    className={cn(sidebarItemVariantProps({varaint:variant}))}
    >
        <Link href={`/workspace/${workspaceId}/channel/${id}`}>
        <Icon className='size-3.5 mr-1 shrink-0'/>
        <span className='text-sm truncate'>{label}</span>
        </Link>
    </Button>
  )
}

export default SideBarItem