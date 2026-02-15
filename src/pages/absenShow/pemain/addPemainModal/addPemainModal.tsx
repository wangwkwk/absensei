import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem, Spinner } from "@heroui/react"
import { Controller } from "react-hook-form"
import { useEffect } from "react"
import useAddPemainModal from "./useAddPemainModal"
import { GENDER_LIST } from "../../../../components/hooks/useChangeUrl"

interface Props{
    isOpen:boolean;
    onClose:()=>void;
    refetchAbsen:()=>void;
    onOpenChange:()=>void;
}

const AddPemainModal = (props:Props) =>{
const {isOpen,onClose,onOpenChange,refetchAbsen} = props
const {
    control,
    errors,
    handleSendAbsen,
    handleSubmit,
    isPending,
    isSuccess
} = useAddPemainModal()

useEffect(()=>{
    if(isSuccess){
        onClose()
        refetchAbsen()
    }
},[isSuccess])

return(
    <Modal 
    onOpenChange={onOpenChange}
    onClose={onClose}
    isOpen={isOpen}
    >
            <ModalContent>
                <ModalHeader className="flex w-full justify-center">
                    <strong className="text-secondary">Buat Absensi</strong>
                </ModalHeader>
                <ModalBody >
                    <form className="w-full h-full gap-4 justify-center items-center flex flex-col" onSubmit={handleSubmit(handleSendAbsen)} >
                    <Controller
                    name='name'
                    control={control}
                    render={({field})=>(
                        <Input
                        {...field}
                        type="text"
                        label="Nama"
                        value={field.value?field.value:""}
                        variant="bordered"
                        isInvalid={errors.name!==undefined}
                        errorMessage={errors.name?.message}
                        />
                    )}
                    />
                    <Controller
                    name="gender"
                    control={control}
                    render={({field})=>(
                        
                        <Select 
                        items={GENDER_LIST}
                        label="Gender"
                        variant="bordered"
                        {...field}
                        >
                            {(gender)=>(
                                <SelectItem key={gender.key}>
                                    {gender.label}
                                </SelectItem>
                            )}
                        </Select>
                    )}
                    />

                    <Button color="secondary" className="w-full" type="submit"><strong>{isPending?(<Spinner size="sm" color="white" />):"Buat"}</strong></Button>
                    </form>
                </ModalBody>
            </ModalContent>
    </Modal>
)
}

export default AddPemainModal