import { useCallback, useMemo, useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

type RequestType={id:Id<"workspace">}
type ResponseType=Id<"workspace">|null;
type Opions={
    onSuccess?:(data:ResponseType)=>void,
    onError?:(error:Error)=>void,
    onSettled?:()=>void,
    throwError?:boolean
}
export const useRemoveWorkspace=()=>{
    const [data,setData]=useState<ResponseType|null>(null);
    const [error,setError]=useState<Error|null>(null);
    const [status,setStatus]=useState<"success"|"error"|"peding"|"settled"|null>(null);
    const isPending=useMemo(()=>status==="peding",[status]);
    const isSuccess=useMemo(()=>status==="success",[status]);
    const isError=useMemo(()=>status==="error",[status]);
    const isSettled=useMemo(()=>status==="settled",[status]);

    const mutation=useMutation(api.workspaces.remove);
    const mutate=useCallback(async(values:RequestType,options?:Opions)=>{
        try{
            setData(null);
            setError(null);
            setStatus("peding")
            const response=await mutation(values);
            options?.onSuccess?.(response);
            return response;

        }catch(error){
            setStatus("error");
            options?.onError?.(error as Error);
            if(options?.throwError){
                throw error
            }
        }finally{
            setStatus("settled")
            options?.onSettled?.();
        }

    },[mutation]);
    return{mutate,data,isError,isPending,isSettled,isSuccess,error}
}