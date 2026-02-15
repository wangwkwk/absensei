import { Button } from "@heroui/react"

const RegisterSuccess = () => {
    return (
        <div className="flex w-screen h-screen items-center justify-center gap-10 p-4">
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-4xl font-bold text-secondary">
                    Sukses Membuat Akun
                </h1>
                <p className="text-xl font-bold text-default-500">
                    Cek Email Kamu Untuk Melakukan Aktivasi
                </p>
                <Button className="mt-4 w-fit bg-secondary"   onPress={()=>window.location.href="/"} >Back to home</Button>
            </div>
        </div>
    )
}

export default RegisterSuccess