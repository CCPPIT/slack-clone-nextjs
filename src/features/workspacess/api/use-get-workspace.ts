import { useQuery } from "convex/react"
import { Id } from "../../../../convex/_generated/dataModel"
import { api } from "../../../../convex/_generated/api"

interface UseGetWorkSpacePorps{
    id:Id<"workspace">

}

 export const useGetWorkspace = ({id}:UseGetWorkSpacePorps) => {
    const data=useQuery(api.workspaces.getById,{id});
    const isLoading=data===undefined;
    return {data,isLoading}

 
}

