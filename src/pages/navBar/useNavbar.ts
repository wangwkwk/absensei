import useChangeUrl from "../../components/hooks/useChangeUrl"
import instance from "../../components/axios/instance"
import path from "../../components/libs/path"
import { type ErrorExtended } from "../../components/type" 
import { type IData } from "../../components/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import {z} from "zod"

const addCategorySchema = z.object({name:z.string("Masukkan nama kategori").min(1,"Masukkan nama kategori")})

const useNavbar = () =>{
const [create,setCreate] = useState<boolean>(false)

const {
    currentLimit,
    currentPage,
    handlePage
} = useChangeUrl()


const handleData = async () =>{
    const result = await instance.get(`${path.category}?limit=${currentLimit}&page=${currentPage}`)
    return result?.data
}

const handleDeleteKategori = async (id:string) =>{
    const result = await instance.delete(`/category/${id}`)
    return result
}

const {mutate, isPending:isPendingDeleteKategori} = useMutation({
    mutationFn:handleDeleteKategori,
    onError:(error:ErrorExtended)=>{
        toast.error(error.response?.data?.meta?.message)
    },
    onSuccess:()=>{
        toast.success("Sukses menghapus kategori")
        refetchNavbar()
    }
})

const handleDelete = (id:string) => mutate(id)

const {data, refetch:refetchNavbar, isRefetching:isrefetchingNavbar} = useQuery<IData>({
    queryKey:["absensi",currentPage],
    queryFn:handleData,
})

 const {control, handleSubmit, formState:{errors}, reset} = useForm({resolver:zodResolver(addCategorySchema)})

    const handleFetchAddCategory = async (payload:{name:string}) =>{
        const result = await instance.post(`${path.category}`, payload)
        return result.data
    }

    const {mutate:mutateAddCategory, isPending:isPendingAddCategory} = useMutation({
        mutationFn:handleFetchAddCategory,

        onError:(error:ErrorExtended)=>{
            toast.error(error?.response?.data.meta.message)
            reset()
        },
        onSuccess: ()=>{
            toast.success("Berhasil menambah kategori")
            refetchNavbar()
            reset()
            setCreate(false)
        }
    })

    const handleAddCategory = (payload:{name:string}) => mutateAddCategory(payload)

return{
    data,
    handleDelete,
    isPendingDeleteKategori,
    isrefetchingNavbar,
    create,
    setCreate,

    currentPage,
    handlePage,
    
    control,
    handleSubmit,
    handleAddCategory,
    isPendingAddCategory,
    errors
}

}
export default useNavbar