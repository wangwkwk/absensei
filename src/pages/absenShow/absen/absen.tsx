import { Button, Card, Chip, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@heroui/react"
import { type IAbsenAllRecord, type tanggalList, } from "../../../components/type"
import { useEffect, useMemo, useState } from "react"
import AddAbsenModal from "./addAbsenModal/addAbsenModal"
import { FaTrash } from "react-icons/fa6"
import {format} from "date-fns"
import {id} from "date-fns/locale"
import instance from "../../../components/axios/instance"
import { cn } from "../../../components/libs/cn"

interface Props{
    refetchNavbar:()=>void
    data:any;
    deletePemain:(id:string)=>void;
    isPendingDeletePemain:boolean;
    isFetchingAbsen:boolean;
    refetchAbsen:()=>void;
    
    handleGender:(e:any)=>void;
    currentGender:string
    GENDER_LIST:{key:string,label:string}[]
}

const Absen = (props:Props) =>{
const {
    refetchNavbar,
    data,
    refetchAbsen,
    deletePemain,
    isPendingDeletePemain,
    isFetchingAbsen,
    
    handleGender,
    currentGender,
    GENDER_LIST,

} = props


const [pemainId, setPemainId] = useState<string|undefined>()
const [width, setWidth] = useState<number>(0)

useEffect(()=>{
        // kode ini hanya jalan di browser
    const handleResize = () => setWidth(window.innerWidth);
    handleResize(); // panggil pertama kali
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
},[])

const addAbsenModal = useDisclosure()

const topContent = useMemo(()=>{
        return(
            <div className="flex lg:flex-row text-medium justify-start items-start  gap-4 lg:items-center">
                <Button color="secondary" size={width<=1024?"md":"lg"} className="" onPress={addAbsenModal.onOpen}><strong>Buat absensi</strong></Button>
                <Button color="secondary" size={width<=1024?"md":"lg"} className="" 
                onPress={()=>{
                    instance.
                    get("/absen/excel",{responseType:"blob"}). //responseType artinya menentukan hasil res yang akan diterima dari backend, karena akan menerima file maka dipilih "blob"
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
                    
                    }}><strong>Download</strong></Button>
            </div>
        )
    },[])

const bottomContent = useMemo(()=>{
    return(
        <div className="w-full flex gap-4">
            <Select label={"Gender"} color="secondary" variant="underlined" className="w-24" aria-label="gender" items={GENDER_LIST} selectedKeys={[`${currentGender}`]} selectionMode="single" onChange={handleGender}>
            {(list)=>(
                <SelectItem className="w-fit" key={list.key}>
                    {list.label}
                </SelectItem>
            )}
            </Select>


        </div>
    )
},[currentGender, handleGender])


    const dataAbsen = useMemo(()=>{
        if(data === undefined|| data === null) return []
        if(currentGender===""||currentGender===undefined) return data.data.data.data
        return data.data.data.data.filter((item:any)=>item.gender===currentGender)
    },[data,currentGender])

console.log(data?.data.data)

if(!!data){
    return(
        <Card className=" w-full h-full overflow-scroll scrollbar-hide">
                <Table
                aria-label="Tabel absensi"
                className="shadow-md rounded-2xl p-4 w-full"
                isCompact
                isHeaderSticky
                topContent={topContent}
                bottomContent={bottomContent}
                topContentPlacement="outside"
                bottomContentPlacement="outside"
                classNames={{
                    base:'max-w-full',
                    wrapper:cn({'overflow-x-hidden':isFetchingAbsen})
                }}
                >
                    <TableHeader>
                        <TableColumn aria-label="hapus" key="hapus">Hapus</TableColumn>
                        <TableColumn aria-label="name" key="name">Nama</TableColumn>
                        <TableColumn aria-label="gender" key="gender">Gender</TableColumn>
                        {!!data && data?.data.data.tanggalList.map((t:tanggalList) => {
                            const hari = format(new Date(t.date),"EEEE",{locale:id})
                            return(
                            <TableColumn className="text-center" key={t.index}>
                            {t.index}
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
                        <TableCell key={pemain.pemainId} aria-label="hapus" className="w-fit text-center"> 
                            <Button 
                            color="secondary" 
                            isDisabled={pemain.pemainId===pemainId}
                            onPress={
                                ()=>{
                                    setPemainId(pemain.pemainId)
                                    deletePemain(pemain.pemainId)
                                }
                                } 
                                size={width<=1024?"sm":"lg"}
                            className="w-fit p-0 m-0 flex items-center justify-center"
                            >
                                {isPendingDeletePemain&&pemain.pemainId===pemainId? <Spinner color="white" size="sm"/>:<FaTrash/>}
                            </Button>
                        </TableCell>
                        <TableCell className="font-semibold" aria-label="name" key="name">{pemain.name}</TableCell>
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
            <AddAbsenModal
            {...addAbsenModal}
            refetchAbsen=
            {refetchAbsen}
            refetchNavbar={refetchNavbar}
            />
        </Card>
    )
}else{
    return(
        <div className="absolute w-full h-screen flex items-center justify-center"><Spinner color="secondary"/></div>
    )
}
}

export default Absen