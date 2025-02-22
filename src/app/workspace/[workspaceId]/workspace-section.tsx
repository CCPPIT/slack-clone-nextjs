import {useToggle} from "react-use"

import Hint from '@/components/hint'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import React from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { cn } from "@/lib/utils"

type Props = {
    children:React.ReactNode,
    label:string,
    hint:string,
    onNew?:()=>void
}

const WorkspaceSection = ({children,label,hint,onNew}: Props) => {
    const [on,toggle]=useToggle(true);
  return (
    <div className='flex flex-col mt-3 px-2'>
        <div className='flex items-center px-3.5 group'>
            <Button
            onClick={toggle}
            variant={"transparent"}
             className='p-0.5 text-sm text-[#f9edffcc] shrink-0 size-6'>
                <FaCaretDown className={cn('size-5 transition-transform',on &&"-rotate-90")}/>
            </Button>
            <Button
            variant={"transparent"}
             className='p-1.5 text-sm text-[#f9edffcc] h-[28px] justify-start overflow-hidden items-center group'>
              <span className='truncate'>{label}</span>
            </Button>
            {onNew&&(
                <Hint label={hint} side='top' align='center'>
                    <Button variant={"transparent"} size={"iconSm"}
                    className='opacity-0 group-hover:opacity-100 transition-opacity ml-auto p-0.5  text-sm text-[#f9edffcc] size-6 shrink-0'
                    onClick={onNew}
                    >
                        <PlusIcon className='size-4'/>

                    </Button>

                </Hint>
            )}

        </div>
        {on&&children}</div>
  )
}

export default WorkspaceSection