import { useParams } from "react-router"
import instance from "../../../components/axios/instance"
import useChangeUrl from "../../../components/hooks/useChangeUrl"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "react-toastify"

const usePemainTab = () =>{

    const {
        GENDER_LIST,
        currentGender,
        handleGender,
    } = useChangeUrl()

    const {id:categoryId} = useParams<{id:string}>()

        const {data:dataPemain, refetch:refetchPemain, isLoading:isLoadPemain, isFetching:isFetchingPemain} = useQuery({
        queryKey:[`PEMAIN_${categoryId}_GENDER_${currentGender}`],
        queryFn:()=>getPemain(),
        enabled:categoryId!==undefined && categoryId!==""
    })




    const getPemain = async () => {
        const params = `?gender=${currentGender===undefined?"":currentGender}`
        const result = await instance.get(`/pemain/${categoryId}${params}`)
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
        refetchPemain()
    }
})

const deletePemain = (id:string) =>mutateDeletePemain(id)

    return{
        dataPemain,
        refetchPemain,
        deletePemain,
        isLoadPemain,
        isPendingDeletePemain,
        isFetchingPemain,

        GENDER_LIST,
        currentGender,
        handleGender,
    }
}
export default usePemainTab