
import { useCreateMessage } from '@/features/messages/api/use-create-message'
import { useGenerateUploadUrl } from '@/features/upload/api/use-generate-upload-url'
import { useChannelId } from '@/hooks/use-channel-id'
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import dynamic from 'next/dynamic'
import Quill from 'quill'
import React, { useRef, useState } from 'react'
import { toast } from 'sonner'
import { Id } from '../../../../../../convex/_generated/dataModel'
const Editor=dynamic(()=>import('@/components/editor'),{ssr:false})

type Props = {
  placeholder:string;
}
type CreateMessagesValues={
  channelId:Id<"channels">,
  workspaceId:Id<"workspace">,
  body:string,
  image:Id<"_storage"> | undefined
}

const ChatatInput = ({placeholder}: Props) => {
  const [editorKey,setEditorKey]=useState(0)
  const [isPending,setIsPending]=useState(false)

  const workspaceId=useWorkspaceId();
  const channelId=useChannelId();
  const {mutate:createMessage}=useCreateMessage();
  const {mutate:generateUploadUrl}=useGenerateUploadUrl();
  const editorRef=useRef<Quill|null>(null);
  const handleOnsubmit=async({body,image}:{body:string,image:File|null})=>{
    try{
      setIsPending(true);
      editorRef?.current?.enable(false);
      const values:CreateMessagesValues={
        channelId,
        workspaceId,
        body,
        image: undefined,
      }
      if(image){
        const url=await generateUploadUrl(
          {},
          {throwError:true}
        );
       

        if(!url){
          throw new Error("Url not Found")
        }
        const result=await fetch(url,{
          method:"POST",
          headers:{"Content-Type": image.type},
          body: image,

        });
        if(!result.ok){
          throw new Error("Failed to upload image");

        }
        const {storagedId}= await result.json();
        values.image=storagedId;
      }

    
   await createMessage(values
    ,{
      throwError:true,

      
    });

    setEditorKey((prevKey)=>prevKey+1)
  }catch(error){
    toast.error("Failed to send message")

  }finally{
    setIsPending(false);
    editorRef?.current?.enable(true);
  }
    

  }

  return (
    <div
    className='px-5 w-full'>
        <Editor 
        key={editorKey}
        placeholder={placeholder}
         onSubmit={handleOnsubmit}
         innerRef={editorRef}
         disabled={isPending}

         />
    </div>
  )
}

export default ChatatInput