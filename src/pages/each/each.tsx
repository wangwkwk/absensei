import { Autocomplete, AutocompleteItem, Button, Skeleton, Spinner } from "@heroui/react"
import useEach from "./useEach"
import { useEffect } from "react"

const Each = () =>{
    const {
        setPemainId,
        dataAbsen,
        isPending,
        submitUpdate,
        pemainId,
        isFetchingAbsen,
        location,
        id
    } = useEach()

    let data:Array<any> = dataAbsen?.data?.data?.hasil ?? []
    data = data.filter((item:any)=>item?.status === false)
    useEffect(()=>{
        const sudah = localStorage.getItem('sudah')
        if(id === sudah){
            window.location.href = `/forEach/Success`
        }
    },[])
    console.log(pemainId,location)
    return(
        <div className="w-full h-fit p-10">
            <h1 className="text-5xl text-secondary text-shadow-2xs mb-16"><strong>Absensei</strong></h1>
            
            <div className="w-full h-full gap-4 flex flex-col items-center justify-center">
                <p className="font-semibold text-center">
                    Pilih nama anda, dan izinkan pengecekan lokasi untuk mencegah adanya titip absen
                </p>
                <p>lokasi saat ini : </p>
                <p>{location.lat},{location.lgt}</p>
                <form onSubmit={
                    (e)=>{
                        e.preventDefault()
                        submitUpdate()
                    }} className="flex lg:flex-row flex-col gap-4 items-center">
                    <Skeleton isLoaded={!isFetchingAbsen} className="rounded-2xl">
                        <Autocomplete
                        label="Pilih Nama"
                        placeholder="Ketik untuk mencari..."
                        className="max-w-xs"
                        defaultItems={dataAbsen?.data}
                        onSelectionChange={(e)=>{setPemainId(e)}}>
                        {data?.map((item:any) => (
                        <AutocompleteItem key={item?.pemainId} textValue={item?.name}>
                            {item?.name}
                        </AutocompleteItem>
                        ))}
                    </Autocomplete>
                    
                    </Skeleton>
                    <Button type="submit" color="secondary" isDisabled={isPending}><strong>{isPending?(<Spinner variant="simple" color="white" size="sm"/>):("Kirim")}</strong></Button>
                </form>
            </div>

        </div>
    )
}

export default Each