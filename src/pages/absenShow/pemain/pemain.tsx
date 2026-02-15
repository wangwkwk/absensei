import { Button, Card, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@heroui/react"
import usePemainTab from "./usePemainTab"
import { type IPemain } from "../../../components/type"
import { useEffect, useMemo, useState } from "react"
import { FaTrash } from "react-icons/fa6"
import AddPemainModal from "./addPemainModal/addPemainModal"


const PemainTab = () =>{
    const {
        dataPemain, 
        refetchPemain,
        deletePemain,isPendingDeletePemain, 
        isFetchingPemain,

        GENDER_LIST,
        currentGender,
        handleGender,
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

    const topContent = useMemo(()=>{
        return(
            <div className="lg:flex-row text-medium justify-start items-start  gap-4 lg:items-center">
                <Button color="secondary" size={width<=1024?"md":"lg"} className="" onPress={addPemainModal.onOpen}><strong>Daftar Pemain</strong></Button>
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
    return(
        <Card className=" w-full h-full max-w-full overflow-scroll scrollbar-hide">
                <Table
                aria-label="Tabel absensi"
                className="shadow-md rounded-2xl w-full p-4 overflow-scroll scrollbar-hide"
                isCompact
                isHeaderSticky
                topContent={topContent}
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                topContentPlacement="outside"
                >
                    <TableHeader>
                        <TableColumn key="hapus">Hapus</TableColumn>
                        <TableColumn key="name">Nama</TableColumn>
                        <TableColumn key="gender">Gender</TableColumn>
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
                    {dataPemain?.data?.data?.map((pemain: IPemain) => (
                        <TableRow>
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
                        <TableCell className="font-semibold" key="name">{pemain.name}</TableCell>
                        <TableCell key="gender">{pemain.gender}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            <AddPemainModal
            {...addPemainModal}
            refetchAbsen={refetchPemain}
            />
        </Card>
    )
}

export default PemainTab