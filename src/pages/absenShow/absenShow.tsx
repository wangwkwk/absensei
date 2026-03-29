import { Tabs,Tab } from "@heroui/react"
import Absen from "./absen"
import PemainTab from "./pemain/pemain"
import useAbsen from "./absen/useAbsen";

const AbsenShow = () =>{
    const {GENDER_LIST,currentGender,data,deletePemain,isFetchingAbsen,isPendingDeletePemain,handleGender} = useAbsen()
    return(
        <Tabs className="w-full p-3 overflow-scroll scrollbar-hide">
            <Tab key={'absen'} className="p-3" title="Absensi">
                <Absen GENDER_LIST={GENDER_LIST} currentGender={currentGender} handleGender={handleGender} data={data}  isFetchingAbsen={isFetchingAbsen} isPendingDeletePemain={isPendingDeletePemain} deletePemain={deletePemain}/>
            </Tab>
            <Tab key={'pemain'} className="p-3" title="Pemain">
                <PemainTab/>
            </Tab>
        </Tabs>
    )
}

export default AbsenShow