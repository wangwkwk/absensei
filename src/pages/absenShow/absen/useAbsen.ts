import useChangeUrl from "../../../components/hooks/useChangeUrl"
import instance from "../../../components/axios/instance"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"

const useAbsen = ()=>{
const {id:categoryId} = useParams<{id:string}>()
const {handleGender,
    currentGender,
    currentSearching,
    handleSearching,
    GENDER_LIST} = useChangeUrl()

const {data:dataAbsen, isFetching:isFetchingAbsen} =useQuery({
    queryKey:["ABSEN"],
    queryFn:()=>handleGetAbsen(),
})

const handleGetAbsen = async () => {
    const result = await instance.get(`/absenAll/${categoryId}`)
    return result
}



return{
    data:dataAbsen,
    isFetchingAbsen,

    handleGender,
    handleSearching,
    currentSearching,
    currentGender,
    GENDER_LIST
}
}

export default useAbsen