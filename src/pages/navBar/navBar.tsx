import { useEffect, useRef, useState } from "react"
import useNavbar from "./useNavbar"
import { LuMenu } from "react-icons/lu";
import {Input, Spinner } from "@heroui/react"
import { FaTrash } from "react-icons/fa6"
import { cn } from "../../components/libs/cn";
import { type ICategory } from "../../components/type";
import { FaPlus } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { IoMdSend } from "react-icons/io";
import { Controller } from "react-hook-form";
import { IoIosArrowDropleft, IoIosArrowDropright  } from "react-icons/io";
import { Outlet } from "react-router";
import { useSession } from "../../components/authConfig/useSession";

const NavBar = () =>{
const [kategoryId, setKategoryId] = useState<string|undefined>()
const [open, setOpen] = useState<boolean>(false)
const {signOut} = useSession()
const {
    data,
    handleDelete,
    isPendingDeleteKategori,
    // isrefetchingNavbar,
    create,
    setCreate,

    currentPage,
    handlePage,

    control,
    handleSubmit,
    handleAddCategory,
    isPendingAddCategory,
    errors
} = useNavbar()

//fungsi autofocus di input
const [focus, setFocus] = useState<boolean>(false)
const inputRef = useRef<HTMLInputElement>
useEffect(()=>{
    if(create === true){
        const timeOut = setTimeout(() => {
        setFocus(true)
    }, 100);
    return () => {
            clearTimeout(timeOut)
            setFocus(false)
        }
    }
},[create])
//



const navbar = useRef<HTMLDivElement>(null)

      useEffect(()=>{
        if(window.innerWidth>=1024){setOpen(true)}

        function handleClickOutside(event:MouseEvent) {
            if (navbar.current && !navbar.current.contains(event.target as Node)) {
                setOpen(false) // Tutup modal
            }
        }
      
        if (open === true && window.innerWidth<=1024) {
            document.addEventListener("mousedown", handleClickOutside);
        }
      
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
          },[open])

    return(
        <div className="min-h-screen w-full relative">
            <button className="absolute flex top-0 items-end gap-2 left-0 p-4 z-10" onClick={()=>setOpen(true)}>
                <LuMenu size={40} />
                <strong className="text-secondary font-sans text-3xl">Absensei</strong>
            </button>
            <div className="w-full overflow-hidden relative">
                <div ref={navbar} className={cn(`lg:w-1/5 py-5 w-80 bg-secondary h-full fixed flex-col text-white items-center justify-start shadowing flex translate-0 z-10 transition-all`,{"-translate-x-80":open===false})}>
                    <strong className="text-xl mb-2 border-font w-full h-fit flex justify-center"><a href={`/`}>Kategori Absensi</a></strong>
                    <div className="w-full text-sm lg:text-medium h-full flex-col flex px-5 justify-start  items-start text-shadow-2xs gap-1">
                        <div className={cn("flex p-2 group w-[90%] items-center justify-center has-[:hover]:bg-primary hover:bg-primary has-[:hover]:cursor-pointer slideRight transition-all rounded-xl",{"bg-primary w-[95%]":create})}>
                            <div onClick={()=>{setCreate(!create)}} className=" w-fit categoryCreate h-fit p-1 border-white border-4 hover:bg-primary rounded-xl">
                                <FaPlus className={cn("semiQuadRotate transition-all",{"-rotate-45":create})}/>
                            </div>
                            <div onClick={()=>setCreate(true)} className={cn("w-full relative pl-2 h-9 transition-all categoryCreate group flex overflow-hidden  items-center",{"h-12":create})}>
                                    <form className={cn("flex transition-all scale-80 items-center absolute -translate-y-9",{"translate-0 scale-100":create})} onSubmit={handleSubmit(handleAddCategory)} >
                                        <Controller
                                        name="name"
                                        control={control}
                                        render={({field})=>(
                                            <Input
                                            {...field}
                                            key={focus ? "focused" : "not-focused"} //mengubah key agar dirender ulang
                                            ref={(e:any) => {   //mengubah ref agar dapat dibaca
                                                    field.ref(e);
                                                    (inputRef as any).current = e;
                                                }}
                                            value={field.value||""}
                                            variant="underlined"
                                            placeholder="Nama Kategori"
                                            isInvalid={errors?.name!==undefined}
                                            errorMessage={errors?.name?.message}
                                            autoCapitalize="none"
                                            autoCorrect="off"
                                            autoComplete="off"
                                            spellCheck="false"
                                            autoFocus={focus===true} //mengaktifkan autofocus ketika focus true
                                            classNames={{
                                                input:[
                                                    "!text-white",
                                                    "placeholder:!text-white/60"
                                                ],
                                                inputWrapper:[
                                                    "after:bg-white",
                                                    "border-b-white/40",
                                                    "h-fit",
                                                ]
                                            }}
                                            />
                                        )}
                                        />
                                        <button type="submit" className="z-100 flex items-center">
                                            {isPendingAddCategory?(
                                                <Spinner color="white" size="md"/>
                                            ):(
                                                <IoMdSend size={22}/>
                                            )}
                                        </button>
                                    </form>
                                    <strong className={cn("absolute lg:text-lg text-md transition-all translate-0",{"translate-y-9 scale-80":create})}>Tambah kategori</strong>

                            </div>

                        </div>
                        {(data !== undefined)&&(data!==null)?
                            data.data.length<1?
                                (
                                    <div className="w-full text-lg text-center mt-2">
                                        <strong>Belum ada kategori</strong>
                                    </div>
                                )
                                :
                                data?.data?.map((item:ICategory)=>{
                                    return(
                                        <div 
                                        key={item._id} 
                                        className={cn(
                                            "group w-[90%] relative px-4 hover:bg-primary slideRight transition-all text-lg flex items-center justify-between gap-2 h-12 rounded-2xl"
                                        )}
                                        >
                                        <GoDotFill className="shrink-0" />

                                        {/* Wrapper a yang diam (overflow-hidden) */}
                                        <a 
                                            href={`/category/${item._id}`} 
                                            className="relative overflow-hidden flex-1 flex items-center h-full max-w-[90%] mx-2"
                                        >
                                            {/* Inner Div yang bergerak (animate-marquee) */}
                                            <div className={cn("lg:group-hover-marquee flex gap-4",{"lg:animate-marquee animate-marquee-auto":item?.name?.length>8})}>
                                                <strong className="whitespace-nowrap">{item?.name}</strong>
                                                {/* Duplikasi teks agar tidak putus saat berputar */}
                                                <strong className={cn("whitespace-nowrap",{"hidden":item.name?.length<=8})}>{item.name}</strong>
                                            </div>
                                        </a>

                                        <button 
                                            onClick={() => {
                                            setKategoryId(item._id) 
                                            handleDelete(item._id)
                                            }}
                                            className="cursor-pointer flex items-center justify-end swing shrink-0"
                                            disabled={isPendingDeleteKategori}
                                        >
                                            {isPendingDeleteKategori && kategoryId === item._id ? (
                                                <Spinner size="md" color="white" />
                                            ) : (
                                                <FaTrash />
                                            )}

                                        </button>
                                        </div>
                                    )
                                })
                                :
                                (
                                    <div className="h-full w-full flex items-start pt-14 justify-center">
                                        <Spinner color="white" size="md" />
                                    </div>
                                )
                    }
                    </div>
                    {currentPage!==undefined&&data!==undefined&&(
                    <div className="flex items-center mb-4 gap-2 w-full justify-center">
                        <button className="group" disabled={+currentPage<=1} onClick={()=>handlePage(+currentPage-1)}>< IoIosArrowDropleft size={25} className="group-disabled:text-gray-500 group-hover:cursor-pointer group-hover:animationShakeX"/></button>
                        <strong className="text-xl">{data?.pagination.current}</strong>
                        <button className="group" disabled={+currentPage>=data?.pagination?.totalPage} onClick={()=>handlePage(+currentPage+1)}>< IoIosArrowDropright className="group-disabled:text-gray-500 group-hover:cursor-pointer group-hover:animationShakeX" size={25}/></button>
                    </div>
                    )}
                    <strong onClick={()=>signOut()} className="cursor-pointer hover:animationShakeX">Log Out</strong>
                </div>
            </div>
            <div className={cn("lg:w-4/5 lg:p-0 pt-16 absolute w-full max-w-full max-h-screen overflow-scroll scrollbar-hide lg:right-0")}>
            <Outlet/>
            </div>
        </div>
)
}

export default NavBar