import { useState } from "react"
import {useForm} from 'react-hook-form' 
import {zodResolver} from '@hookform/resolvers/zod'
import { type IRegister } from "../../../components/type"
import {useMutation} from "@tanstack/react-query"
import instance from "../../../components/axios/instance"
import { toast } from "react-toastify"
import {z} from "zod"
import { useNavigate } from "react-router"


// schema dari data yang ingin digunakan atau diminta
const registerSchema = z.object({
  username: z.string().min(1, "please input your username"),
  email: z
    .string()
    .min(1, "please input your email")
    .email("Email format not valid"),
  password: z.string().min(1, "please input your password"),
  confirmPass: z.string().min(1, "please input your confirm password"),
})
.refine((data) => data.password === data.confirmPass, {
  message: "password not match",
  path: ["confirmPass"], // Menentukan pesan error muncul di field confirmPass
});

const useRegister = () =>{
    // funsi usestate untuk mengidentifikasi true/false
    const [visiblePassword, setVisiblePassword] = useState({
        password:false,
        confirmPass: false
    })
   
    const navigate = useNavigate()

    // fungsi menampilkan password atau tidak
    const handleVisiblePassword = (key: "password"| "confirmPass")=> {
        setVisiblePassword({
            ...visiblePassword,
            [key]:!visiblePassword[key],
        })
    }
// mengimport elemen yang dibutuhkan dari useForm
    const {control, handleSubmit, formState:{errors}, reset} = useForm({
        resolver: zodResolver(registerSchema)
    })
    
    // fungsi mengirimkan data Iregister ke endPoint
    const registerService = async (payload: IRegister) =>{
        const result = await instance.post('/auth/register',payload)
        return result.data
    }
// fungsi memutasi apa yang akan terjadi ketika registrasi dilakukan
    const {mutate:mutateRegister, isPending:isPendingRegister} = useMutation({
        mutationFn: registerService,
        onError(error){
            toast.error(error.message)
        },
        onSuccess: ()=>{
            reset()
            toast.success("Register Success")
            navigate('/auth/success')
        }
    })

    const handleRegister = (data: IRegister) => mutateRegister(data)

    return {
        visiblePassword,
        handleVisiblePassword,
        control,
        handleSubmit,
        handleRegister,
        isPendingRegister,
        errors
    }
}

export default useRegister