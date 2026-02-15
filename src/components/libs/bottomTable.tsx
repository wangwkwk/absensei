import { ListBox, Select, SelectPopover } from "@heroui/react"
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
            <Select variant="primary" className="w-24" aria-label="gender" selectionMode="single" onChange={handleGender}>
                <Select.Trigger>
                    <Select.Value/>
                    <Select.Indicator/>
                </Select.Trigger>
                <SelectPopover>
            {GENDER_LIST.map((list)=>(
                <ListBox>
                    <ListBox.Item id={list.key} key={list.key}>
                        {list.label}
                    </ListBox.Item>
                </ListBox>
            ))}
            {KELAS_LIST.map((list)=>(
                <ListBox>
                    <ListBox.Item id={list.key} key={list.key}>
                        {list.label}
                    </ListBox.Item>
                </ListBox>
            ))}
                </SelectPopover>
            </Select>

        </div>
    )
},[])


export default bottomContent