import useChangeUrl from "../../components/hooks/useChangeUrl"
import { toDateStandard } from "../../components/libs/date"
import instance from "../../components/axios/instance"
import path from "../../components/libs/path"
import { type IData } from "../../components/type"
import { type DateValue } from "@heroui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { getLocalTimeZone, now, ZonedDateTime } from "@internationalized/date"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import {z} from "zod"
import { useParams } from "react-router"

const addAbsensiSchema = z.object({date:z.custom<DateValue|ZonedDateTime>((value)=>{return value !== undefined},"Masukkan tanggal absensi")})

const useNavbarAbsensi = () =>{


const {control, handleSubmit, formState:{errors}, reset, setValue} = useForm({resolver:zodResolver(addAbsensiSchema)})
const queryClient = useQueryClient()

const {id:categoryId} = useParams<{id:string}>()

const [create,setCreate] = useState<boolean>(false)

const {
    currentPage,
    handlePage
} = useChangeUrl()


const handleData = async () =>{
    const {data} = await instance.get(`${path.absen}/${categoryId}`)
    return data
}

const handleDeleteAbsensi = async (id:string) =>{
    const {data} = await instance.delete(`${path.absen}ById/${id}`)
    return data
}


const handleDelete = (id:string) => mutate(id)

const {data, refetch:refetchNavbar, isRefetching:isrefetchingNavbar} = useQuery<IData>({
    queryKey:["absensi",currentPage],
    queryFn:handleData,
})

const {mutate, isPending:isPendingDeleteAbsensi} = useMutation({
    mutationFn:handleDeleteAbsensi,
    onError:(error:any)=>{
        toast.error(error.response.data.meta.message)
    },
    onSuccess:()=>{
        toast.success("Sukses menghapus Absensi")
        queryClient.invalidateQueries({queryKey:["absensi"]})
        queryClient.invalidateQueries({queryKey:["ABSEN"]})
    }
})


    const handleFetchAddAbsensi = async (date:any) =>{
        
        const {data} = await instance.post(`${path.absen}`, {
            date:date as DateValue,
            categoryId
        })
        return {data}
    }

    const {mutate:mutateAddAbsensi, isPending:isPendingAddAbsensi} = useMutation({
        mutationFn:handleFetchAddAbsensi,

        onError:(error:any)=>{
            toast.error(error.response.data.meta.message)
            reset()
        },
        onSuccess: ()=>{
            toast.success("Berhasil menambah Absensi")
            queryClient.invalidateQueries({queryKey:["absensi"]})
            queryClient.invalidateQueries({queryKey:["ABSEN"]})
            reset()
            setCreate(false)
        }
    })

    const handleAddAbsensi = (data:any) => {
        const date = toDateStandard(data.date as DateValue)
        mutateAddAbsensi(date)
    }

return{
    data,
    handleDelete,
    isPendingDeleteAbsensi,
    isrefetchingNavbar,
    create,
    setCreate,
    refetchNavbar,
    setValue,

    currentPage,
    handlePage,
    
    control,
    handleSubmit,
    handleAddAbsensi,
    isPendingAddAbsensi,
    errors
}

}
export default useNavbarAbsensi