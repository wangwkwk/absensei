import { Button, Chip, Input, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react"
import { type IAbsenAllRecord, type IAbsenRecord, type tanggalList, } from "../../../components/type"
import { useEffect, useMemo, useState } from "react"
import {format} from "date-fns"
import {id} from "date-fns/locale"
import instance from "../../../components/axios/instance"
import { cn } from "../../../components/libs/cn"
import { useParams } from "react-router"
import { search } from "../../../components/any/search"

interface Props{
    data:any;
    isFetchingAbsen:boolean;
        
    handleGender:(e:any)=>void;
    handleSearching:any
    currentSearching:string
    currentGender:string
    GENDER_LIST:{key:string,label:string}[]
}

const Absen = (props:Props) =>{
const {
    data,
    isFetchingAbsen,
    currentSearching,
    handleSearching,

    handleGender,
    currentGender,
    GENDER_LIST,

} = props

const {id:CategoryId} = useParams()
const [width, setWidth] = useState<number>(0)

useEffect(()=>{
        // kode ini hanya jalan di browser
    const handleResize = () => setWidth(window.innerWidth);
    handleResize(); // panggil pertama kali
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
},[])


const topContent = useMemo(()=>{
        return(
            <div className="flex lg:flex-row px-3 text-medium justify-between items-start  gap-4 lg:items-center">
                <div className="flex w-fit">
                    <Select label={"Gender"} color="secondary" variant="underlined" className="w-24" aria-label="gender" items={GENDER_LIST} selectedKeys={[`${currentGender}`]} selectionMode="single" onChange={handleGender}>
                    {(list)=>(
                        <SelectItem className="w-fit" key={list.key}>
                            {list.label}
                        </SelectItem>
                    )}
                    </Select>

                    <Input
                            onChange={handleSearching}
                            className="w-fit"
                            variant="underlined"
                            label="Cari"
                            color="secondary"
                            />
                </div>

                <Button color="secondary" size={width<=1024?"md":"lg"} className="" 
                onPress={()=>{
                    instance.
                    get(`/absen/${CategoryId}/excel`,{responseType:"blob"}). //responseType artinya menentukan hasil res yang akan diterima dari backend, karena akan menerima file maka dipilih "blob"
                    //.then menangani hasil dari instance.get() tadi 
                    then (res=>{ //res berarti response yang diterima dari backend
                        const url = window.URL.createObjectURL(new Blob([res.data])); //membuat url sementara yang menampung data yang diterima dalam hal ini file excel
                        const link = document.createElement("a"); //membuat elemen <a> (link html) secara dinamis
                        link.href = url; //memasukkan url sementara ke dalam link dinamis
                        link.setAttribute("download", "absensi.xlsx"); //mennambah atribut download sehingga ketika link di klik, akan langsung menjalankan rangkaian proses untuk mendownlaod file excel dengan nama "absensi.xlsx"
                        document.body.appendChild(link); //memasukkan link tadi ke dalam body
                        link.click(); //menjalankan otomatis link tadi ketika sudah ada

                        window.URL.revokeObjectURL(url);

                    })
                    
                    }}><strong>Download</strong>
                    </Button>
                
            </div>
        )
    },[currentGender, handleGender])


    const dataAbsen = useMemo(()=>{
        let dataFiltered:Array<any> = data?.data?.data?.data ?? []
        if(currentGender!=="") {
            dataFiltered = dataFiltered.filter((item:IAbsenRecord)=>item.gender === currentGender)
        }
        return search(dataFiltered,currentSearching)
    },[data,currentGender,currentSearching])    
    
    if(!!data){
    return(
        <div className=" w-full h-full overflow-scroll scrollbar-hide">
            <h1 className="w-full h-fit pl-7 pt-2 ">
                <strong className="text-3xl text-secondary text-shadow-2xs">
                    Rekap Absensi
                </strong>
            </h1>
            <Table
            aria-label="Tabel absensi"
            className="shadow-md rounded-2xl px-4 pb-4 pt-2 w-full"
            isCompact
            isHeaderSticky
            topContent={topContent}
            topContentPlacement="outside"
            bottomContentPlacement="outside"
            classNames={{
                base:'max-w-full',
                wrapper:cn({'overflow-x-hidden':isFetchingAbsen})
            }}
            >
                <TableHeader>
                    <TableColumn aria-label="name" key="name">Nama</TableColumn>
                    <TableColumn aria-label="nim" key="nim">Nim</TableColumn>
                    <TableColumn aria-label="gender" key="gender">Gender</TableColumn>
                    {!!data && data?.data.data.tanggalList.map((t:tanggalList) => {
                        const hari = format(new Date(t.date),"EEEE",{locale:id})
                        const tanggal = format(new Date(t.date),"dd-mm",{locale:id})
                        return(
                        <TableColumn className="text-center" key={t.index}>
                        {tanggal}
                        <div className="text-xs text-gray-400">{hari}</div>
                        </TableColumn>
                    )})}
                </TableHeader>
                <TableBody
                className="overflow-auto"
                isLoading={isFetchingAbsen}
                loadingContent={
                    <div className="flex z-10 h-full w-full items-center justify-center bg-foreground-700/30 backdrop-blur-md">
                        <Spinner color="secondary"/>
                    </div>
                    }
                >
                {dataAbsen?.map((pemain: IAbsenAllRecord) => (
                    <TableRow>
                    <TableCell className="h-10 font-semibold" aria-label="name" key="name">{pemain.name}</TableCell>
                    <TableCell className="font-semibold" aria-label="nim" key="nim">{pemain.nim}</TableCell>
                    <TableCell aria-label="gender" key="gender">{pemain.gender}</TableCell>
                    {data.data.data.tanggalList.map((t:any) => (
                        <TableCell aria-label={`absen${t.index}`} key={t.index} className="text-center">
                        {pemain.kehadiran[t.index] === true ? (
                            <Chip color="success" size="sm" variant="flat">✔</Chip>
                        ) : (
                            <Chip color="danger" size="sm" variant="flat">✘</Chip>
                        )}
                        </TableCell>
                    ))}
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
    )
}else{
    return(
        <div className="absolute w-full h-screen flex items-center justify-center"><Spinner color="secondary"/></div>
    )
}
}

export default Absen