import { cn } from "../../components/libs/cn"
import { DatePicker, Spinner } from "@heroui/react"
import { getLocalTimeZone, today } from "@internationalized/date"
import { type Dispatch, type SetStateAction } from "react"
import { Controller } from "react-hook-form"
import { FaPlus } from "react-icons/fa6"
import { IoMdSend } from "react-icons/io"

interface Props{
    create:boolean;
    setCreate: Dispatch<SetStateAction<boolean>>;
    handleAddAbsensi: any;
    handleSubmit:any;
    isPendingAddAbsensi:any;
    control:any;
    errors:any;
}

const InputNewAbsensi = (props:Props) =>{
    const {create,handleAddAbsensi,handleSubmit,isPendingAddAbsensi,setCreate, control, errors} = props

return(
                            <div className={cn("flex p-2 group w-[90%] items-center justify-center has-[:hover]:bg-primary hover:bg-primary has-[:hover]:cursor-pointer slideRight transition-all rounded-xl",{"bg-primary w-[95%]":create})}>
                            <div onClick={()=>{setCreate(!create)}} className=" w-fit categoryCreate h-fit p-1 border-white border-4 hover:bg-primary rounded-xl">
                                <FaPlus className={cn("semiQuadRotate transition-all",{"-rotate-45":create})}/>
                            </div>
                            <div onClick={()=>setCreate(true)} className={cn("w-full relative pl-2 h-9 transition-all categoryCreate group flex overflow-hidden items-center",{"h-10":create})}>
                                    <form className={cn("flex transition-all scale-80 justify-between w-full pr-4 items-center absolute -translate-y-12",{"translate-0 scale-100":create})} onSubmit={handleSubmit(handleAddAbsensi)} >
                                        <Controller
                                        name="date"
                                        control={control}
                                        render={({field})=>(
                                            <DatePicker
                                            {...field}
                                            value={field.value||today(getLocalTimeZone()) as any}
                                            variant="underlined"
                                            className="w-fit"
                                            hideTimeZone
                                            showMonthAndYearPickers 
                                            isInvalid={errors?.date!==undefined}
                                            errorMessage={errors?.date?.message}
                                            classNames={{
                                            label: "!text-white/80",
                                            // Menargetkan angka (segment) dan memaksanya menjadi putih
                                            segment: [
                                            "!text-white", 
                                            "focus:!bg-white/20", 
                                            "focus:!text-white",
                                            "data-[placeholder=true]:!text-white/50"
                                            ],
                                            input: "!text-white",
                                            inputWrapper: [
                                            // Garis bawah kondisi normal (sebelum diklik)
                                            "before:!border-b-white", 
                                            // Garis bawah saat hover
                                            "hover:before:!border-b-white",
                                            // Garis bawah saat fokus/aktif (menimpa warna biru/hijau default)
                                            "after:!bg-white",
                                            "h-fit",
                                            ],
                                            // Icon kalender
                                            selectorIcon: "text-white items-center justify-center h-full",
                                        }}
                                            />
                                        )}
                                        />
                                        <button type="submit">
                                            {isPendingAddAbsensi?(
                                                <Spinner color="white" size="sm"/>
                                            ):(
                                                <IoMdSend size={22}/>
                                            )}
                                        </button>
                                    </form>
                                    <strong className={cn("absolute lg:text-xl text-md transition-all translate-0",{"translate-y-12 scale-80":create})}>Buat absensi</strong>

                            </div>

                        </div>
)
}

export default InputNewAbsensi