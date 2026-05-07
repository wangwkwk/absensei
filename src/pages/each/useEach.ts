import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useParams } from "react-router"
import instance from "../../components/axios/instance"
import { toast } from "react-toastify"

const useEach = () =>{
    const {id} = useParams<{id:string}>()
    const [pemainId,setPemainId] = useState<any|string>("")

    const getAbsen = async () =>{       
        const result = await instance.get(`/absenById/${id}`)
        return result
    }
    
    const {data:dataAbsen, isFetching:isFetchingAbsen} = useQuery({
        queryKey:['EachAbsenData'],
        queryFn:()=>getAbsen()
    })

    const handleUpdate = async () =>{ 
        const res = await instance.put(`/absen/each/${id}`,{pemainId:pemainId})
        return res
    }

    const {mutate, isPending} = useMutation({
        mutationFn:handleUpdate,
        onError:(error:any)=>toast.error(error.response.data.meta.message),
        onSuccess:()=>{
            window.location.href = `/each/absen/berhasil`
        }
    })

    const submitUpdate = () => mutate()

    console.log(pemainId)
    return{
        dataAbsen,
        isFetchingAbsen,
        isPending,
        submitUpdate,
        setPemainId
    }
    
}

export default useEach