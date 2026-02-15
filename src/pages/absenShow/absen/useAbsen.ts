import useChangeUrl from "../../../components/hooks/useChangeUrl"
import instance from "../../../components/axios/instance"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { useParams } from "react-router"

const useAbsen = ()=>{
const {id:categoryId} = useParams<{id:string}>()
const {handleGender,
    currentGender,
    GENDER_LIST} = useChangeUrl()

const {data:dataAbsen, refetch:refetchAbsen, isFetching:isFetchingAbsen} =useQuery({
    queryKey:["ABSEN"],
    queryFn:()=>handleGetAbsen(),
})

const handleGetAbsen = async () => {
    const result = await instance.get(`/absenAll/${categoryId}`)
    return result
}


const handleDeletePemain = async (id:string)=>{
    const result = await instance.delete(`/pemain/${id}`)
    return result
}

const {mutate:mutateDeletePemain, isPending:isPendingDeletePemain} = useMutation({
    mutationFn:handleDeletePemain,
    onError:(error:any)=>{
        toast.error(error.response.data.meta.message)
    },
    onSuccess:()=>{
        toast.success("sukses menghapus pemain")
        refetchAbsen()
    }
})

const deletePemain = (id:string) =>mutateDeletePemain(id)


return{
    data:dataAbsen,
    deletePemain,
    isPendingDeletePemain,
    refetchAbsen,
    isFetchingAbsen,

    handleGender,
    currentGender,
    GENDER_LIST
}
}

export default useAbsen