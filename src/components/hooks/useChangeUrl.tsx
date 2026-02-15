import { type ChangeEvent, type Key, useEffect } from "react"
import { useSearchParams } from "react-router"

export const GENDER_LIST = [
    {key:"Putra",label:"Putra"},
    {key:"Putri",label:"Putri"},    
]
const useChangeUrl = () =>{
    // mengganti userouter menjadi useSearchParams mengganti router.query menjadi searchParams.get('key)
    const [searchParams, setSearchParams] = useSearchParams()
    const currentGender = searchParams.get("gender")||"";
    const currentLimit = searchParams.get("limit")||"10";
    const currentPage = searchParams.get("page")||"1";

    const updateParams = (newParams:Record<string, string|number>) =>{
        const params = new URLSearchParams(searchParams)
        Object.entries(newParams).forEach(([key, value])=>{
            params.set(key, String(value))
        })
        setSearchParams(params)
    }
    const handlePage = (page:number) =>{
        updateParams({page})
    }

    const handleLimit = (e:ChangeEvent<HTMLSelectElement>) =>{
        const limit = e.target.value
        updateParams({limit, page:1})
    }

    const handleGender = (e:ChangeEvent<HTMLSelectElement>)=>{
        const gender = e.target.value
        updateParams({gender})
    }

    useEffect(()=>{
        const params = new URLSearchParams(searchParams)
        let changed = false
        if(!searchParams.get("limit")){
            params.set("limit", currentLimit)
            changed = true
        }
        if(!searchParams.get("page")){
            params.set("page", currentPage)
            changed = true
        }
        if(changed){
            setSearchParams(params,{replace:true})
        }
    },[searchParams, setSearchParams])

    return{
        currentGender,
        currentLimit,
        currentPage,
        handleGender,
        handleLimit,
        handlePage,
        GENDER_LIST
    }
}


export default useChangeUrl