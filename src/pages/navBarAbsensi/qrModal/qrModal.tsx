import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import QRCode from 'react-qr-code';

interface Props{
    isOpen:boolean;
    onClose:()=>void;
    onOpenChange:()=>void;
    id:string
}

const QrModal = (p:Props) =>{
const {isOpen,onClose,onOpenChange,id} = p


const qr = `https://absensei.vercel.app/forEach/${id}` 

    return(
        <Modal
        onOpenChange={onOpenChange}
        onClose={onClose}
        isOpen={isOpen}
        placement="center">
            <ModalContent className="flex items-center justify-center w-fit h-fit p-3">
                <ModalHeader className="flex w-full justify-center">
                    <h1>
                        <strong className="text-secondary">QR code</strong>
                    </h1>
                </ModalHeader>
                <ModalBody>
                    <QRCode
                    value={qr}                    
                    />
                    <p>
                        link : <a href={qr} target="_blank">Absen</a> 
                    </p>        
                </ModalBody>
            </ModalContent>
        </Modal>
    )

}

export default QrModal