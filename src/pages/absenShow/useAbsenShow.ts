import instance from "../../components/axios/instance"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "react-toastify"

const useAbsenShow = ()=>{

const handleGetAbsen = async () => {
    const result = await instance.get('/absenAll')
    return result
}

const {data:dataAbsen, isEnabled:isEnableAbsen, refetch:refetchHomePage, isLoading:isLoadingAbsen} =useQuery({
    queryKey:["ABSEN"],
    queryFn:handleGetAbsen,
})


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
        refetchHomePage()
    }
})

const deletePemain = (id:string) =>mutateDeletePemain(id)


return{
    data:dataAbsen,
    isEnableAbsen,
    deletePemain,
    isPendingDeletePemain,
    refetchHomePage,
    isLoadingAbsen
}
}

export default useAbsenShow