import instance from "../../../../components/axios/instance"
import { type IPemain } from "../../../../components/type"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type React from "react"
import { useState } from "react"
import {useForm}  from "react-hook-form"
import { useParams } from "react-router"
import { toast } from "react-toastify"
import * as yup from 'yup'

const PemainSchema = yup.object().shape({
    name:yup.string().required("Masukkan nama pemain"),
    nim:yup.string(),
    gender:yup.string().required("Pilih gender pemain")
})

const useAddPemainModal = ()=>{
const queryclient = useQueryClient()
const [file,setFile] = useState<File|undefined>(undefined)
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

const handleExcel = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setFile(e.target.files![0])
}

const handleExcleSubmit = async ()=>{
    if(file===undefined) throw new Error("Masukkan file");
    if(file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") throw new Error('Format file bukan Excel');
    const formData = new FormData()
    formData.append("file",file)
    const res = await instance.post(`/pemainExcel/${categoryId}`,formData,{headers:{"Content-Type":"multipart/form-data"}})
    return res
}

const {mutate:excelMutate, isPending:excelIsPending} = useMutation({
    mutationFn:handleExcleSubmit,
    onError:(error:any)=>toast.error(`${error.response.data.meta.message}`),
    onSuccess:()=>{
        toast.success("Berhasil mendaftarkan siswa")
        queryclient.invalidateQueries({queryKey:[`PEMAIN_${categoryId}`]})
    }
})

const handleExcelSubmit = () =>{
    excelMutate()
}

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
    isSuccess,
    handleExcel,
    handleExcelSubmit,
    excelIsPending
}
}

export default useAddPemainModal