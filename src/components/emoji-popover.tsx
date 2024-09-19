import React, { useState } from "react";
import Picker from "@emoji-mart/react"
import data from "@emoji-mart/data"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger}from "../components/ui/tooltip"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  
interface EmojiPopoverPorops{
    children:React.ReactNode;
    hint?:string;
    onEmojiSelect:(emoji:any)=>void;

}
const EmojiPopover=({children,hint="Emoji",onEmojiSelect}:EmojiPopoverPorops)=>{
    const [popoverOpen,setPopoverOen]=useState(false);
    const [tooltipOpen,setTooltipOpen]=useState(false);
    const onSelect=(emoji:any)=>{
        onEmojiSelect(emoji);
        setPopoverOen(false)
        setTimeout(()=>{
            setTooltipOpen(false)
        },500)

    }

    return(
        <TooltipProvider>
            <Popover open={popoverOpen} onOpenChange={setPopoverOen}>
                <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen} delayDuration={50}>
                    <PopoverTrigger asChild>
                        <TooltipTrigger asChild>
                        {children}


                        </TooltipTrigger>
                        </PopoverTrigger>
                        <TooltipContent className="bg-black text-white border border-white/5">
                        <p className="text-xs font-medium">{hint}</p>
                            
                        </TooltipContent>

                   

                </Tooltip>
                <PopoverContent className="p-0 w-full border-none shadow-none">
                    <Picker data={data}onEmojiSelect={onSelect}/>

                </PopoverContent>

            </Popover>

        </TooltipProvider>
    )
}
export default EmojiPopover