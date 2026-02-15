import instance from "../../components/axios/instance"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "react-toastify"
import useChangeUrl from "../../components/hooks/useChangeUrl"
import { useParams } from "react-router"

const useEditAbsen = () =>{
    const {absenId}= useParams<{absenId:string}>()
    const [pemainId,setPemainId] = useState<string|null>()
    const [selectedId, setSelectedId] = useState<{id:string}[]>([])

    const handleMany = (id:string, isChecked:boolean)=>{
        if(isChecked){
            setSelectedId((prev)=>[...prev,{id}])
        }else{
            setSelectedId((prev)=>prev.filter((item)=>item.id!==id))
        }
    }

    const {data:dataEditAbsen, refetch:refetchDataEditAbsen, isLoading:isLoadingEditAbsen} = useQuery({
        queryKey:["EDITABSEN",absenId],
        queryFn:()=>getAbsen(),
    })

    const {
    currentGender,
    handleGender,
} = useChangeUrl()

    const getAbsen = async () =>{       
        const params = `?gender=${currentGender}`
        const result = await instance.get(`/absenById/${absenId}${params}`)
        return result
    }

    const editAbsen = async (status:boolean) =>{
        if(pemainId!==null){
            const result = await instance.put(`/absen`,{
                pemainId,
                absenId:absenId,
                status
            })
            return result
        }
    }

    const {isPending:isPendingEditAbsen, mutate:mutateEditAbsen} = useMutation({
        mutationFn:editAbsen,
        onError:(error:any)=>{
            toast.error(error.response.data.meta.message)
        },
        onSuccess:()=>{
            refetchDataEditAbsen()
            setPemainId(null)
        }
    })

    const handleEdit = async (status:boolean) =>{
        mutateEditAbsen(status)
    }

    const handleChangeMany = async () =>{
        const result = await instance.put("/absen/many",
            {
                absenId:absenId,
                dataPemain:selectedId
            }
        )
        return result
    }

    const {mutate:mutateMany, isPending:isPendingMany} = useMutation({
        mutationFn:handleChangeMany,
        onError:(error:any)=>{toast.error(error.response.data.meta.message)},
        onSuccess:()=>{
            refetchDataEditAbsen()
            setSelectedId([])
        }
    })

    const handleSendMany =()=>mutateMany()

    return{
        dataEditAbsen,
        refetchDataEditAbsen,
        handleEdit,
        isPendingEditAbsen,
        isLoadingEditAbsen,
        pemainId,
        setPemainId,
            currentGender,
            handleGender,
        handleMany,
        selectedId,
        
        handleSendMany,
        isPendingMany
    }

}

export default useEditAbsen