import instance from "../../../../components/axios/instance"
import { type IPemain } from "../../../../components/type"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import {useForm}  from "react-hook-form"
import { useParams } from "react-router"
import { toast } from "react-toastify"
import * as yup from 'yup'

const PemainSchema = yup.object().shape({
    name:yup.string().required("Masukkan nama pemain"),
    gender:yup.string().required("Pilih gender pemain")
})

const useAddPemainModal = ()=>{
const {control, handleSubmit, formState:{errors}, reset} = useForm({resolver:yupResolver(PemainSchema)})
const {id:categoryId} = useParams<{id:string}>()
const handlePostAbsen = async (data:IPemain) =>{
    const result = await instance.post('/pemain',data)
    return result
}

const {mutate, isPending, isSuccess} = useMutation({
    mutationFn:handlePostAbsen,
    onError:(error:any)=>{
        toast.error(`${error.response.data.meta.message}`)
    },
    onSuccess:()=>{
        toast.success("Berhasil membuat absensi")
        reset()
    }
})

const handleSendAbsen = (payload:IPemain)=>{
    const data = {
        ...payload,
        categoryId: categoryId as string
    }
    mutate(data)
}

return{
    control,
    errors,
    handleSubmit,
    handleSendAbsen,
    isPending,
    isSuccess
}
}

export default useAddPemainModal