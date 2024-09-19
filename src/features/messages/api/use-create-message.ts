import { useCallback, useMemo, useState } from "react"
import { Id } from "../../../../convex/_generated/dataModel"
import { useMutation } from "convex/react"
import { api } from "../../../../convex/_generated/api"

type RequestType={
    body:string,
    workspaceId:Id<"workspace">

    image?:Id<"_storage">,
    channelId?:Id<"channels">,
    parentMessageId?:Id<"messages">
    //TODO:: ConversationId
    conversationId?:Id<"conversations">

}
type ResponseType=Id<"messages">|null
type OPtions={
    onSubmit?:(data:ResponseType)=>void,
    onError?:(error:Error)=>void,
    onSettled?:()=>void,
    throwError?:boolean

}
export const useCreateMessage=()=>{
    const [data,setData]=useState<ResponseType>(null);
    const [error,setError]=useState<Error|null>(null);
    const [status,setStatus]=useState<"success"|"error"|"pending"|"settled"|null>(null);
    const isSuccess=useMemo(()=>status==="success",[status]);
    const isError=useMemo(()=>status==="error",[status]);
    const isPending=useMemo(()=>status==="pending",[status]);
    const isSettled=useMemo(()=>status==="settled",[status]);
    const mutation=useMutation(api.messages.create);
    const mutate=useCallback(async(values:RequestType,options?:OPtions)=>{
        try{
            setData(null);
            setError(null);
            setStatus("pending");
            const response=await mutation(values);
            options?.onSubmit?.(response);
           return response;

        }catch(error){
            setStatus("error")
            options?.onError?.(error as Error);
            if(options?.throwError){
                throw error
            }
        }finally{
            setStatus("settled");
            options?.onSettled?.();
        }

    },[mutation]);
    return{
        mutate,data,isError,isSuccess,isPending,isSettled,error
    }
}