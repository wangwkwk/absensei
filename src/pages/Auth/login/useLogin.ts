import { useState } from "react"
import * as yup from "yup"
import {useForm} from 'react-hook-form' 
import {yupResolver} from '@hookform/resolvers/yup'
import { type ILogin } from "../../../components/type"
import {useMutation} from "@tanstack/react-query"
import { toast } from "react-toastify"
import { useSearchParams } from "react-router"
import instance from "../../../components/axios/instance"
import endPoint from "../../../components/any/endPoint"
import { useSession } from "../../../components/authConfig/useSession"

// schema dari data yang ingin digunakan atau diminta
const loginSchema = yup.object().shape({
    identifier: yup.string().required("please input your email or username"),
    password: yup.string() .required("please input your password"),
    
})

const useLogin = () =>{
    const [searchParams,setSearchParams] = useSearchParams()
    const {signIn} = useSession()
    // funsi usestate untuk mengidentifikasi true/false
    const [isVisible, setIsVisible] = useState(false)
    // fungsi menampilkan password atau tidak
    const toggleVisibility = () =>{
        setIsVisible(!isVisible)
    }

    const callbackUrl: string = (searchParams.get("callbackUrl") as string) || '/'


// mengimport elemen yang dibutuhkan dari useForm
    const {control, handleSubmit, formState:{errors}, reset, setError} = useForm({
        resolver: yupResolver(loginSchema)
    })
    
    // fungsi mengirimkan data Iregister ke endPoint
    const loginsService = async (payload: ILogin) =>{

            const result = await instance.post(`${endPoint.auth}/login`,payload)
            
            if(result.data?.data){
                signIn(result.data?.data,null)
                const {data:user} = await instance.get(`${endPoint.auth}/me`)
                signIn(result.data?.data,user.data) 
            }

            return result
    }
// fungsi memutasi apa yang akan terjadi ketika registrasi dilakukan
    const {mutate:mutateLogin, isPending:isPendingLogin} = useMutation({
        mutationFn: loginsService,
        onError(error:any){
            toast.error(error.response.data.meta.message)
            setError("root",{message:error.message})

        },
        onSuccess: ()=>{
            reset()
            toast.success("Berhasil Login")
            window.location.href = callbackUrl
        }
    })

    const handleLogin = (data: ILogin) => mutateLogin(data)

    return {
        isVisible,
        toggleVisibility,
        control,
        handleSubmit,
        handleLogin,
        isPendingLogin,
        errors
    }
}

export default useLogin