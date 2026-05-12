import { Button, Input, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@heroui/react"
import usePemainTab from "./usePemainTab"
import { type IPemain } from "../../../components/type"
import { useEffect, useMemo, useState } from "react"
import { FaTrash } from "react-icons/fa6"
import AddPemainModal from "./addPemainModal/addPemainModal"
import { search } from "../../../components/any/search"


const PemainTab = () =>{
    const {
        dataPemain, 
        refetchPemain,
        deletePemain,isPendingDeletePemain, 
        isFetchingPemain,

        GENDER_LIST,
        currentGender,
        handleGender,
        currentSearching,
        handleSearching
    } = usePemainTab()
    const [pemainId, setPemainId] = useState<string|undefined>()
    const [width, setWidth] = useState<number>(0)
    const addPemainModal = useDisclosure()
    
    useEffect(()=>{
            // kode ini hanya jalan di browser
        const handleResize = () => setWidth(window.innerWidth);
        handleResize(); // panggil pertama kali
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    },[])

    const filteredData  = useMemo(()=>{
        let dataFiltered:Array<any> = dataPemain?.data?.data ??  [];
        if(currentGender !== "") dataFiltered = dataPemain!!.data.data.filter((item:IPemain)=>item.gender===currentGender)
        return search(dataFiltered, currentSearching)
    },[dataPemain,currentGender, currentSearching])

    const topContent = useMemo(()=>{
        return(
            <div className="flex text-medium justify-between w-full px-3 items-start  gap-4 lg:items-center">
                <div className="flex">
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

            <Button color="secondary" size={width<=1024?"md":"lg"} className="text-medium" onPress={addPemainModal.onOpen}><strong>Masukkan Pelajar</strong></Button>
                
            </div>
        )
    },[currentGender, handleGender])
    return(
        <div className=" w-full h-full max-w-full items-center justify-center flex flex-col overflow-scroll scrollbar-hide">
            <h1 className="w-full h-fit pl-7 pt-2 ">
                <strong className="text-3xl text-secondary text-shadow-2xs">
                    Seluruh Mahasiswa
                </strong>
            </h1>
                <Table
                aria-label="Tabel absensi"
                className="shadow-md rounded-2xl w-full p-4 overflow-scroll scrollbar-hide"
                isCompact
                isHeaderSticky
                topContent={topContent}
                bottomContentPlacement="outside"
                topContentPlacement="outside"
                >
                    <TableHeader>
                        <TableColumn key="name">Nama</TableColumn>
                        <TableColumn key="name">Nim</TableColumn>
                        <TableColumn key="gender">Gender</TableColumn>
                        <TableColumn key="hapus">Hapus</TableColumn>
                    </TableHeader>
                    <TableBody
                    className="overflow-auto"
                    isLoading={isFetchingPemain}
                    loadingContent={
                        <div className="flex h-full w-full z-10 items-center justify-center bg-foreground-700/30 backdrop-blur-md">
                            <Spinner color="secondary"/>
                        </div>
                    }
                    >
                    {filteredData?.map((pemain: IPemain) => (
                        <TableRow>
                        <TableCell className="font-semibold" key="name">{pemain.name}</TableCell>
                        <TableCell className="font-semibold" key="name">{pemain.nim}</TableCell>
                        <TableCell key="gender">{pemain.gender}</TableCell>
                        <TableCell key={pemain._id} className="w-fit text-center"> 
                            <Button 
                            color="secondary" 
                            isDisabled={pemain._id===pemainId}
                            onPress={
                                ()=>{
                                    setPemainId(pemain._id)
                                    deletePemain(pemain._id||"")
                                }
                                } 
                                size={width<=1024?"sm":"lg"}
                            className="w-fit flex items-center justify-center"
                            >
                                {isPendingDeletePemain&&pemain._id===pemainId? <Spinner color="white" size="sm"/>:<FaTrash/>}
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            <AddPemainModal
            {...addPemainModal}
            refetchAbsen={refetchPemain}
            />
        </div>
    )
}

export default PemainTab