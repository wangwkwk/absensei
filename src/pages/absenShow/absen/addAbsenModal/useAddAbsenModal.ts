import { toDateStandard } from "../../../../components/libs/date"
import instance from "../../../../components/axios/instance"
import { type DateValue } from "@heroui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { ZonedDateTime } from "@internationalized/date"
import { useMutation } from "@tanstack/react-query"
import {useForm}  from "react-hook-form"
import { toast } from "react-toastify"
import * as yup from 'yup'
import { useParams } from "react-router"
import type { IAbsenForm } from "../../../../components/type"

const AbsenSchema = yup.object().shape({
    date:yup.mixed<DateValue|ZonedDateTime>().required("Masukkan tanggal absensi")
})

const useAddAbsenModal = ()=>{
const {control, handleSubmit, formState:{errors}, setValue} = useForm({resolver:yupResolver(AbsenSchema)})
const {id} = useParams<{id:string}>()
const handlePostAbsen = async (payload:IAbsenForm) =>{
    const result = await instance.post('/absen',payload)
    return result
}

const {mutate, isPending, isSuccess} = useMutation({
    mutationFn:handlePostAbsen,
    onError:(error:any)=>{
        toast.error(`${error.response.data.meta.message  }`)
    },
    onSuccess:()=>{
        toast.success("Berhasil membuat absensi")
    }
})

const handleSendAbsen = (data:IAbsenForm|any)=>{
    const payload = {
        ...data,
        date: data.date? toDateStandard(data.date as any):"",
        categoryId: id as string
    }
    mutate(payload)
}

return{
    control,
    errors,
    handleSubmit,
    handleSendAbsen,
    isPending,
    isSuccess,
    setValue
}
}

export default useAddAbsenModal