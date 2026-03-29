import { Button, DatePicker, Modal, ModalBody, ModalContent, ModalHeader, Spinner } from "@heroui/react"
import { Controller } from "react-hook-form"
import useAddAbsenModal from "./useAddAbsenModal"
import { getLocalTimeZone, now } from "@internationalized/date"
import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"

interface Props{
    isOpen:boolean
    onClose:()=>void
    onOpenChange:()=>void
}

const AddAbsenModal = (props:Props) =>{
const queryClient = useQueryClient()
const {isOpen,onClose,onOpenChange} = props
const {
    control,
    errors,
    handleSendAbsen,
    handleSubmit,
    isPending,
    isSuccess,
    setValue
} = useAddAbsenModal()

useEffect(()=>{

    setValue("date",now(getLocalTimeZone()))

    if(isSuccess){
        queryClient.invalidateQueries({queryKey:["ABSEN"]})//absenDashboard
        queryClient.invalidateQueries({queryKey:["absensi"]})//navbar
        onClose()
    }
},[isSuccess])

return(
    <Modal 
    onOpenChange={onOpenChange}
    onClose={onClose}
    isOpen={isOpen}
    >
        <form onSubmit={handleSubmit(handleSendAbsen)}>
            <ModalContent>
                <ModalHeader>
                    Buat Absensi
                </ModalHeader>
                <ModalBody className="w-full h-full flex flex-col">
                    <Controller
                    name='date'
                    control={control}
                    render={({field})=>(
                        <DatePicker
                        {...field as any}
                            label='Start date' 
                            variant="bordered" 
                            defaultValue={now(getLocalTimeZone())}
                            hideTimeZone
                            granularity="day"
                            isInvalid={errors.date!==undefined} 
                            errorMessage={errors.date?.message}
                        />
                    )}
                    />

                    <Button color="secondary" type="submit"><strong>{isPending?(<Spinner color="primary" size="sm" />):"Buat"}</strong></Button>
                </ModalBody>
            </ModalContent>
        </form>
    </Modal>
)
}

export default AddAbsenModal