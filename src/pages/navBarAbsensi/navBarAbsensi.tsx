import { useEffect, useRef, useState } from "react"
import { LuMenu } from "react-icons/lu";
import { Spinner } from "@heroui/react"
import { FaTrash } from "react-icons/fa6"
import { cn } from "../../components/libs/cn";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowDropleft, IoIosArrowDropright  } from "react-icons/io";
import { type IAbsen } from "../../components/type";
import InputNewAbsensi from "./InputAbsensi";
import { Outlet, useParams } from "react-router";
import useNavbarAbsensi from "./useNavbarAbsensi";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const NavBarAbsensi = () =>{
const [kategoryId, setKategoryId] = useState<string|undefined>()
const [open, setOpen] = useState<boolean>(false)
const {id:categoryId} = useParams<{id:string}>()
const {absenId} = useParams<{absenId:string}>()

const {
    data,
    handleDelete,
    isPendingAddAbsensi,
    create,
    setCreate,
    setValue,
    currentPage,
    handlePage,

    control,
    handleSubmit,
    handleAddAbsensi,
    isPendingDeleteAbsensi,
    errors
    } = useNavbarAbsensi()
    

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
        <div className="min-h-screen w-full">
            <button className="absolute flex top-0 items-end gap-2 left-0 p-4 z-10" onClick={()=>setOpen(true)}>
                <LuMenu size={40} />
                <strong className="text-secondary font-sans text-3xl">Absensei</strong>
            </button>
            <div className="w-full overflow-hidden relative">
                <div ref={navbar} className={cn("lg:w-1/5 py-5 w-fit bg-secondary h-full fixed flex-col text-white items-center justify-start shadowing flex translate-0 z-10 transition-all",{"-translate-x-80":open===false})}>
                    <strong className="text-xl mb-2 border-font w-full h-fit flex justify-center"><a href={`/category/${categoryId}`}>Daftar Absensi</a></strong>
                    <div className="w-full text-sm lg:text-medium h-10/12 flex-col flex px-5 justify-start  items-start text-shadow-2xs gap-1">
                    <InputNewAbsensi create={create} setCreate={setCreate} control={control} errors={errors} handleAddAbsensi={handleAddAbsensi} handleSubmit={handleSubmit} isPendingAddAbsensi={isPendingAddAbsensi} setValue={setValue} />
                        {(data !== undefined)&&(data!==null)?
                            data?.data?.length<1?
                                (
                                    <div className="w-full text-lg text-center mt-2">
                                        <strong>Belum ada absensi</strong>
                                    </div>
                                )
                                :
                                data?.data?.map((item:IAbsen)=>{

                                    const hari =  format(new Date(item.date),"EEEE",{locale:id}) as string
                                    return(
                                        <div 
                                        key={item._id} 
                                        className={cn(
                                            "group w-[90%] relative px-4 hover:bg-primary slideRight transition-all text-sm flex items-center justify-between gap-2 h-12 rounded-2xl",
                                            {"bg-primary": absenId === item._id}
                                        )}
                                        >
                                        <div className="flex items-center gap-2">
                                             <GoDotFill className="" />
                                        <a 
                                            href={`/category/${categoryId}/${item._id}`} 
                                            className="relative overflow-hidden flex-1 flex items-center h-full mx-2"
                                        >
                                            <div className={cn("flex gap-4")}>
                                                <strong className="md:text-md text-sm overflow-hidden text-nowrap lg:text-md"> {hari.substring(0,3)} {`${new Date(item.date).toLocaleDateString('id')}`}</strong>
                                            </div>
                                        </a>

                                        </div>
                                       
                                        <button 
                                            onClick={() => {
                                            setKategoryId(item._id)
                                            handleDelete(item._id)
                                            }}
                                            className={cn("cursor-pointer swing shrink-0",{"hidden":absenId === item._id})}
                                            disabled={isPendingDeleteAbsensi || absenId===item._id}
                                        >
                                            <strong>
                                            {isPendingDeleteAbsensi && kategoryId === item._id ? (
                                                <Spinner color="white" size="sm" />
                                            ) : (
                                                <FaTrash />
                                            )}
                                            </strong>
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
                    <div className="w-full px-4 h-10 justify-center  relative items-center">
                        {/* <a href="/" className="hidden lg:flex hover:animationShakeX absolute left-4">
                        <strong>Kembali</strong>
                        </a> */}
                        {currentPage!==undefined&&data!==undefined&&(
                        <div className="flex items-center gap-2 w-full justify-center">
                            <button className="group" disabled={+currentPage<=1} onClick={()=>handlePage(+currentPage-1)}>< IoIosArrowDropleft size={25} className="group-disabled:text-gray-500 group-hover:cursor-pointer group-hover:animationShakeX"/></button>
                            <strong className="text-xl">{data?.pagination.current}</strong>
                            <button className="group" disabled={+currentPage>=data?.pagination?.totalPage} onClick={()=>handlePage(+currentPage+1)}>< IoIosArrowDropright className="group-disabled:text-gray-500 group-hover:cursor-pointer group-hover:animationShakeX" size={25}/></button>
                        </div>
                        )}
                    </div>
                    <a href="/" className="flex hover:animationShakeX">
                        <strong>Kembali</strong>
                    </a>

                </div>
            </div>
            <div className={cn("lg:w-4/5 lg:p-0 pt-16 absolute w-full max-w-full max-h-screen overflow-scroll scrollbar-hide lg:right-0")}>
            <Outlet/>
            </div>
        </div>
)
}

export default NavBarAbsensi