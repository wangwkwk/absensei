import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem, Spinner, Tab, Tabs } from "@heroui/react"
import { Controller } from "react-hook-form"
import { useEffect } from "react"
import useAddPemainModal from "./useAddPemainModal"
import { GENDER_LIST } from "../../../../components/hooks/useChangeUrl"
import { FaFileExcel } from "react-icons/fa";

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
    isSuccess,
    handleExcel,
    handleExcelSubmit,
    excelIsPending
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
    placement="center"
    >
            <ModalContent className="w-fit">
                <ModalHeader className="flex w-full justify-center">
                    <h1>
                        <strong className="text-secondary">Masukkan Pelajar</strong>
                    </h1>
                </ModalHeader>
                <ModalBody className="pb-10">
                    <Tabs>
                        <Tab key={'manual'} title="Manual">
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
                                name='nim'
                                control={control}
                                render={({field})=>(
                                    <Input
                                    {...field}
                                    type="text"
                                    label="Nim"
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
                        </Tab>
                        <Tab key={"excel"} title="Excel" className="w-full h-fit gap-3 flex flex-col items-center justify-center">
                            <a href="/file/file.xlsx" target="_blank" rel="noopener noreferrer" download={"file.xlsx"}>
                            <FaFileExcel size={55} color="green"/>
                            </a>
                            <p className="text-center">Klik ikon diatas untuk mendownload template file lalu isi dengan data kamu dan masukkan ke bawah</p>
                            <Input 
                                className='w-1/2'
                                onChange={handleExcel}
                                type='file'
                                accept=".xlsx, .xls, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                variant='bordered'
                                />
                            <Button onPress={handleExcelSubmit} color='primary' size='lg'>{excelIsPending?(<Spinner size="md" color="white"/>):('Register')}</Button>
                            
                        </Tab>
                    </Tabs>

                </ModalBody>
            </ModalContent>
    </Modal>
)
}

export default AddPemainModal