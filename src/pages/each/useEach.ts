import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useParams } from "react-router"
import instance from "../../components/axios/instance"
import { toast } from "react-toastify"

const useEach = () =>{
    const {id} = useParams<{id:string}>()
    const [pemainId,setPemainId] = useState<any|string>("")
    const [location, setLocation] = useState<{lat:number,lgt:number}>({lat:0,lgt:0})

    const getAbsen = async () =>{       
        const result = await instance.get(`/absenById/${id}`)
        return result
    }
    
    const {data:dataAbsen, isFetching:isFetchingAbsen} = useQuery({
        queryKey:['EachAbsenData'],
        queryFn:getAbsen
    })

    const hitungJarak = (lat1:number, lon1:number, lat2:number, lon2:number) => {
        const R = 6371e3; // Radius bumi dalam meter
        const φ1 = lat1 * Math.PI / 180; // Konversi ke radian
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lon2 - lon1) * Math.PI / 180;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                    Math.cos(φ1) * Math.cos(φ2) *
                    Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        const jarak = R * c; 
        return Math.round(jarak); 
        }

    const handleUpdate = async () =>{ 
        const getLocation = () => {
            return new Promise<{lat:number,lgt:number}>((resolve)=>{
                navigator.geolocation.getCurrentPosition(
            (position)=>{
                resolve({lat:position.coords.latitude,lgt:position.coords.longitude})
            },
            (error)=>{
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        toast.error("Kamu harus mengizinkan akses lokasi untuk absen.");
                        throw new Error('');
                    case error.POSITION_UNAVAILABLE:
                        toast.error("Informasi lokasi tidak tersedia saat ini.");
                        throw new Error('');
                    case error.TIMEOUT:
                        toast.error("Permintaan lokasi melebihi batas waktu (timeout).");
                        throw new Error('');
                    default:
                        toast.error("Terjadi kesalahan yang tidak diketahui.");
                        throw new Error('');
                        }
                    },
            {
                enableHighAccuracy:true,
                timeout:10000,
                maximumAge:0
            }
        )
            })
        }
        const coordinate = await getLocation()
        setLocation({lat:coordinate.lat,lgt:coordinate.lgt})
        if(coordinate.lat===0||coordinate.lgt===0) throw new Error("Lokasi tidak ditemukan");
        if(dataAbsen?.data?.data?.location!==undefined){
            const absenLocation = dataAbsen?.data?.data?.location
            const jarak = hitungJarak(absenLocation?.lat,absenLocation?.lgt,coordinate.lat,coordinate.lgt)
            console.log(jarak)
            if(jarak > 100) throw new Error("Anda jauh dari lokasi absensi")
        }
        const res = await instance.put(`/absen/each/${id}`,{pemainId:pemainId})
        return res
    }

    const {mutate, isPending} = useMutation({
        mutationFn:handleUpdate,
        onError:(error:any)=>{
            if(error?.response?.data.meta?.message !== undefined){
                toast.error(error?.response?.data.meta.message)
            }else{
                toast.error(error?.message)
            }
        },
        onSuccess:()=>{
            window.location.href = `/forEach/Success`
        }
    })

    const submitUpdate = () => mutate()
    return{
        dataAbsen,
        isFetchingAbsen,
        isPending,
        submitUpdate,
        setPemainId,
        pemainId,
        id,
        location
    }
    
}

export default useEach