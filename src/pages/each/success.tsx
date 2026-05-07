import { titleChanger } from "../../components/libs/pageHead/pageHead"

const Success = () => {
    titleChanger("Absen Berhasil")
    return (
        <div className="flex w-screen h-screen items-center justify-start flex-col  gap-10 p-10">
            <h1 className="text-5xl text-secondary text-shadow-2xs mb-16"><strong>Absensei</strong></h1>

            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-4xl font-bold text-secondary">
                    Berhasil hadir !!
                </h1>

                <img
                src="/file/stiker.jpeg"
                />
            </div>
        </div>
    )
}

export default Success