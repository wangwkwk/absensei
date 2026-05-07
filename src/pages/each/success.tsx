import { Button } from "@heroui/react"
import { titleChanger } from "../../components/libs/pageHead/pageHead"

const Success = () => {
    titleChanger("Absen Berhasil")
    return (
        <div className="flex w-screen h-screen items-center justify-center gap-10 p-4">
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-4xl font-bold text-secondary">
                    Berhasil hadir !!
                </h1>
                <div>
                    <img
                    src="/file/stiker.jpeg"
                    />
                </div>
                </div>
        </div>
    )
}

export default Success