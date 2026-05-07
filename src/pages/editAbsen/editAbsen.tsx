import { type IAbsen, type IAbsenRecord } from "../../components/type"
import useEditAbsen from "./useEditAbsen"
import { Button, Checkbox, Chip, Input, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react"
import { type Key, useMemo } from "react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { GENDER_LIST } from "../../components/hooks/useChangeUrl"
import { search } from "../../components/any/search"

const EditAbsen = () =>{
    const {
        dataEditAbsen, 
        handleEdit, 
        isPendingEditAbsen,
        setPemainId,
        currentGender,
        handleGender,
        currentSearching,
        handleSearching,
        handleMany,
        selectedId,

        handleSendMany,
        isPendingMany
    } = useEditAbsen()

    const DATA_COLUMNS=[
        {"label":"Nama","key":"nama"},
        {"label":"Nim", "key": "nim"},
        {"label":"Status","key":"status"},
        {"label":"Action","key":"action"}
    ]
    const data  = dataEditAbsen?.data.data.hasil as unknown as IAbsen as any
        
        const rawDate = dataEditAbsen?.data?.data?.date

        const filteredData = useMemo(()=>{
            if(!data) {return []}
            let dataFiltered:any = []
            if(currentGender==="") {
                dataFiltered = data
            }
            else if(currentGender!==""){
                const filtered = data.filter((item:IAbsenRecord)=>item.gender===currentGender)
                dataFiltered = filtered
            }
            
            return search(dataFiltered, currentSearching) 
            
        },[data, currentGender, currentSearching])


        const hari = useMemo(()=>{
            if(!rawDate) return ""
            const day = new Date(rawDate)
            return isNaN(day.getTime())?"":format(day,"EEEE",{locale:id})
        },[rawDate])
        const tanggal = useMemo(()=>{
            if(!rawDate) return ""
            const date = new Date(rawDate)
            // isNan(date.getTime()) adalah pengecekan apakah format date sudah dikenali oleh javascript
            return isNaN(date.getTime())?"":format(date,"dd MMMM yyyy",{locale:id})
        },[rawDate])
        

        const topContent =useMemo(()=>{
            return(
                <div className="w-full justify-start">
                    <h1>
                        <strong className="text-2xl">
                            Absensi hari {hari}, {tanggal}
                        </strong>
                    </h1>
                     <div className="w-full flex items-center">
                        <Select label={"Gender"} color="secondary" variant="underlined" className="w-24" aria-label="gender" selectedKeys={[`${currentGender}`]} selectionMode="single" onChange={handleGender}>
                        {GENDER_LIST.map((gender)=>(
                            <SelectItem className="w-fit" key={gender.key}>
                                {gender.label}
                            </SelectItem>
                        ))}
                        </Select>
                        <Input
                        onChange={handleSearching}
                        className="w-fit"
                        variant="underlined"
                        label="Cari"
                        color="secondary"
                        />
                        <div className="flex w-8/12 justify-end">
                            <Button isDisabled={selectedId.length<1||isPendingMany} className="w-fit h-9" color="secondary" onPress={handleSendMany}>
                                Kirim
                            </Button>
                        </div>
                    </div>
                </div>
            )
        },[hari,tanggal, currentGender, handleGender, handleSendMany, isPendingMany, selectedId])

    if(!!dataEditAbsen){
            // titleChanger(`${format(new Date(dataEditAbsen.data.data.date),"EEEE",{locale:id})}, ${format(new Date(dataEditAbsen.data.data.date),"dd-MM-yyyy",{locale:id})}`)


        return(
            <div className="w-full p-12 h-full">
                <Table
                aria-label="Tabel absensi"
                className="shadow-md rounded-2xl overflow-auto"
                isCompact
                isHeaderSticky
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
                                <TableCell className="h-10" key={'name'}>
                                    {item.name}
                                </TableCell>
                                <TableCell key={'nim'}>
                                    {item.nim}
                                </TableCell>                                
                                <TableCell key={'status'}>
                            <Chip 
                            color={item.status===true?"success":"danger"} 
                            size="md" 
                            variant="flat"
                            className="cursor-pointer hover:scale-150 transition-all"
                            onClick={
                                ()=>{
                                    setPemainId(item.pemainId)
                                    handleEdit(!item.status)
                                }}
                            isDisabled={selectedId.length>=1||isPendingEditAbsen||isPendingMany}
                            >{item.status===true?"✔":"✘"}</Chip>

                                </TableCell>
                                <TableCell key={'action'} className="gap-10 w-full relative flex items-center justify-baseline ">
                                    <Checkbox 
                                    disableAnimation
                                    isSelected={
                                        selectedId.some((object)=>object.id === item.pemainId)
                                    } 
                                    onValueChange={
                                        (isSelected)=>handleMany(item.pemainId,isSelected)
                                    } 
                                    isDisabled={item.status}
                                    />
    
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