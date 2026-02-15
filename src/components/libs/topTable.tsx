import { Button } from "@heroui/react";
import { useMemo } from "react";
import instance from "../axios/instance";

interface topProps{
    width:number,
    modal:any,

}

const topContent = (props:topProps) => useMemo(()=>{
        const {modal,width} = props
            return(
            <div className="flex lg:flex-row text-medium justify-start items-start  gap-4 lg:items-center">
                <Button size={width<=1024?"md":"lg"} className="" onPress={modal.onOpen}><strong>Buat absensi</strong></Button>
                <Button size={width<=1024?"md":"lg"} className="" 
                onPress={()=>{
                    instance.
                    get("/absen/excel",{responseType:"blob"}). //responseType artinya menentukan hasil res yang akan diterima dari backend, karena akan menerima file maka dipilih "blob"
                    //.then menangani hasil dari instance.get() tadi 
                    then (res=>{ //res berarti response yang diterima dari backend
                        const url = window.URL.createObjectURL(new Blob([res.data])); //membuat url sementara yang menampung data yang diterima dalam hal ini file excel
                        const link = document.createElement("a"); //membuat elemen <a> (link html) secara dinamis
                        link.href = url; //memasukkan url sementara ke dalam link dinamis
                        link.setAttribute("download", "absensi.xlsx"); //mennambah atribut download sehingga ketika link di klik, akan langsung menjalankan rangkaian proses untuk mendownlaod file excel dengan nama "absensi.xlsx"
                        document.body.appendChild(link); //memasukkan link tadi ke dalam body
                        link.click(); //menjalankan otomatis link tadi ketika sudah ada

                        window.URL.revokeObjectURL(url);

                    })
                    
                    }}><strong>Download</strong></Button>
            </div>
        )
    },[])
export default topContent