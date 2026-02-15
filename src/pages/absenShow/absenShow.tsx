import { Tabs,Tab } from "@heroui/react"
import Absen from "./absen"
import PemainTab from "./pemain/pemain"
import useAbsen from "./absen/useAbsen";
import useNavbarAbsensi from "../navBarAbsensi/useNavbarAbsensi";


const AbsenShow = () =>{
    const {GENDER_LIST,currentGender,data,deletePemain,isFetchingAbsen,isPendingDeletePemain,refetchAbsen,handleGender} = useAbsen()
    const {refetchNavbar} = useNavbarAbsensi()
    return(
        <Tabs className="w-full p-3 overflow-scroll scrollbar-hide">
            <Tab key={'absen'} className="p-3" title="Absensi">
                <Absen refetchNavbar={refetchNavbar} GENDER_LIST={GENDER_LIST} currentGender={currentGender} handleGender={handleGender} data={data}  isFetchingAbsen={isFetchingAbsen} isPendingDeletePemain={isPendingDeletePemain} refetchAbsen={refetchAbsen} deletePemain={deletePemain}/>
            </Tab>
            <Tab key={'pemain'} className="p-3" title="Pemain">
                <PemainTab/>
            </Tab>
        </Tabs>
    )
}

export default AbsenShow