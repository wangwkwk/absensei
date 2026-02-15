import { Select, SelectItem } from "@heroui/react"
import { useMemo } from "react"

interface props {
    GENDER_LIST : Array<{key:string,label:string}>
    KELAS_LIST : Array<{key:string,label:string}>
    currentGender: any,
    currentKelas: any,
    handleGender:any,
    handleKelas:any,

}
const bottomContent = (props:props) => useMemo(()=>{
    const {GENDER_LIST,KELAS_LIST,currentGender,currentKelas,handleGender,handleKelas} = props
    return(
        <div className="w-full flex gap-4">
            <Select label={"Gender"} color="secondary" variant="underlined" className="w-24" aria-label="gender" items={GENDER_LIST} selectedKeys={[`${currentGender}`]} selectionMode="single" onChange={handleGender}>
            {(list)=>(
                <SelectItem className="w-fit" key={list.key}>
                    {list.label}
                </SelectItem>
            )}
            </Select>
            <Select label={"Kelas"} color="secondary" variant="underlined" className="w-24" aria-label="kelas" items={KELAS_LIST} selectedKeys={[`${currentKelas}`]} selectionMode="single" onChange={handleKelas}>
            {(list)=>(
                <SelectItem className="w-fit" key={list.key}>
                    {list.label}
                </SelectItem>
            )}
            </Select>

        </div>
    )
},[])

export default bottomContent