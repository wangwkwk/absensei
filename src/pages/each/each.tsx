import { Autocomplete, AutocompleteItem, Button, Skeleton, Spinner } from "@heroui/react"
import useEach from "./useEach"
import { useEffect } from "react"
import { toast } from "react-toastify"

const Each = () =>{
    const {
        setPemainId,
        dataAbsen,
        isPending,
        submitUpdate,
        setLocation,
        id,
        isFetchingAbsen,
        location
    } = useEach()
    
    useEffect(()=>{
        if(!navigator.geolocation) throw new Error('Browser tidak mendukung');
        navigator.geolocation.getCurrentPosition(
            (position)=>{
                setLocation({lat:position.coords.latitude, lgt:position.coords.longitude})
            },
            (error)=>{
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        toast.error("Kamu harus mengizinkan akses lokasi untuk absen.");
                        break
                    case error.POSITION_UNAVAILABLE:
                        toast.error("Informasi lokasi tidak tersedia saat ini.");
                        break
                    case error.TIMEOUT:
                        toast.error("Permintaan lokasi melebihi batas waktu (timeout).");
                        break
                    default:
                        toast.error("Terjadi kesalahan yang tidak diketahui.");
                        break
                        }
                    },
            {
                enableHighAccuracy:true,
                timeout:10000,
                maximumAge:0
            }
        )
    },[id])

    let data:any = [] 
    if(dataAbsen!==undefined){
        data = dataAbsen?.data.data.hasil
    }
    data = data.filter((item:any)=>item.status === false)
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
                        onChange={setPemainId}
                        onSelectionChange={setPemainId}
                    >
                        {data?.map((item:any) => (
                        <AutocompleteItem key={item.pemainId} textValue={item.name}>
                            {item.name}
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