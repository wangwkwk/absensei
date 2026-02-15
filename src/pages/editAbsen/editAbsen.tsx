import { type IAbsen, type IAbsenRecord } from "../../components/type"
import useEditAbsen from "./useEditAbsen"
import { Button, Checkbox, Chip, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react"
import { type Key, useMemo } from "react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { GENDER_LIST } from "../../components/hooks/useChangeUrl"

const EditAbsen = () =>{
    const {
        dataEditAbsen, 
        handleEdit, 
        isPendingEditAbsen,
        pemainId,
        setPemainId,
        currentGender,
        handleGender,
        handleMany,
        selectedId,

        handleSendMany,
        isPendingMany
    } = useEditAbsen()

    const DATA_COLUMNS=[
        {"label":"Nama","key":"nama"},
        {"label":"Kelas","key":"kelas"},
        {"label":"gender","key":"gender"},
        {"label":"Status","key":"status"},
        {"label":"Action","key":"action"}
    ]

        const data  = dataEditAbsen?.data.data.hasil as unknown as IAbsen as any
        
        const rawDate = dataEditAbsen?.data?.data?.date
        
        const filteredData = useMemo(()=>{
            if(!data) return []
            if(currentGender === ""|| currentGender===undefined) return data
            return data.filter((item:IAbsenRecord)=>item.gender===currentGender)
        },[data, currentGender])
        
        const hari = useMemo(()=>{
            if(!rawDate) return ""
            const day = new Date(rawDate)
            return isNaN(day.getTime())?"":format(day,"EEEE",{locale:id})
        },[rawDate])
        const tanggal = useMemo(()=>{
            if(!rawDate) return ""
            const date = new Date(rawDate)
            // isNan(date.getTime()) adalah pengecekan apakah format date sudah dikenali oleh javascript
            return isNaN(date.getTime())?"":format(date,"dd-mm-yyyy",{locale:id})
        },[rawDate])
        
        const topContent =useMemo(()=>{
            return(
                <div className="w-full justify-start">
                    <strong>
                        Absensi hari {hari}, {tanggal}
                    </strong>
                </div>
            )
        },[hari,tanggal])

        const bottomContent = useMemo(()=>{
            return(
                <div className="w-full flex relative items-center gap-4">
                    <Select label={"Gender"} color="secondary" variant="underlined" className="w-24" aria-label="gender" selectedKeys={[`${currentGender}`]} selectionMode="single" onChange={handleGender}>
                    {GENDER_LIST.map((gender)=>(
                        <SelectItem className="w-fit" key={gender.key}>
                            {gender.label}
                        </SelectItem>
                    ))}
                    </Select>

                    <Button isDisabled={selectedId.length<1||isPendingMany} className="absolute w-fit h-9 right-2/6" color="secondary" onPress={handleSendMany}>
                        Kirim
                    </Button>
                </div>
            )
        },[currentGender, handleGender, handleSendMany, isPendingMany, selectedId])
    
    if(!!dataEditAbsen){
            // titleChanger(`${format(new Date(dataEditAbsen.data.data.date),"EEEE",{locale:id})}, ${format(new Date(dataEditAbsen.data.data.date),"dd-MM-yyyy",{locale:id})}`)


        return(
            <div className="w-full p-12 h-full">
                <Table
                aria-label="Tabel absensi"
                className="shadow-md rounded-2xl overflow-auto"
                isCompact
                isHeaderSticky
                bottomContent={bottomContent}
                topContent={topContent}
                >
                    <TableHeader columns={DATA_COLUMNS}>
                        {(column)=>(
                            <TableColumn key={column.key}>
                                {column.label}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody loadingContent={
                        <div className="flex h-full w-full items-center justify-center bg-foreground-700/30 backdrop-blur-md">
                            <Spinner color="secondary"/>
                        </div>
                    }>
                        {filteredData.map((item:IAbsenRecord)=>{
                            return(
                            <TableRow key={item.pemainId as Key} >
                                <TableCell key={'name'}>
                                    {item.name}
                                </TableCell>
                                <TableCell key={'kelas'}>
                                    {item.kelas}
                                </TableCell>
                                <TableCell key={'gender'}>
                                    {item.gender}
                                </TableCell>
                                <TableCell key={'status'}>
                                    {item.status===true?(
                            <Chip    color="success" size="sm" variant="flat">✔</Chip>
                        ) : (
                            <Chip color="danger" size="sm" variant="flat">✘</Chip>
                        )}
                                </TableCell>
                                <TableCell key={'action'} className="gap-10 w-full relative flex items-center justify-baseline ">
                                    <Checkbox 
                                    isSelected={
                                        selectedId.some((object)=>object.id === item.pemainId)
                                    } 
                                    onValueChange={
                                        (isSelected)=>handleMany(item.pemainId,isSelected)
                                    } 
                                    isDisabled={item.status}
                                    />
                                    
                                    <Button 
                                        color={item.status===false?"secondary":"danger"}
                                        onPress={()=>{
                                            setPemainId(item.pemainId)
                                            handleEdit(!item.status)
                                        }}
                                        isDisabled={selectedId.length>=1||isPendingEditAbsen||isPendingMany}
                                        >
                                            {isPendingEditAbsen === true&&pemainId===item.pemainId?(
                                                <Spinner color="white" size="sm"/>
                                            ):(
                                                <strong>
                                                    {item.status===false?"Hadir":"Tidak Hadir"}
                                                </strong>
                                            )}
                                        </Button>
    
                                </TableCell>
                            </TableRow>
                        )})}
                    </TableBody>
                </Table>
            </div>
        )
    }else{
        return(
            <div className="w-full h-screen flex items-center justify-center">
                <Spinner color="secondary" size="lg" />
            </div>
        )
    }
}

export default EditAbsen