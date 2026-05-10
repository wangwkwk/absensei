import { Button } from "@heroui/react"
import { titleChanger } from "../../../components/libs/pageHead/pageHead"
import instance from "../../../components/axios/instance"
import { useLoaderData } from "react-router" // Tambahkan ini

titleChanger("Activation")

export async function activationLoader({ request }: { request: Request }) {
    const url = new URL(request.url)
    const code = url.searchParams.get("code")

    if (!code) {
        return { status: "failed" }
    }

    try {
        const result = await instance.post('/auth/activation', { code })
        if (result.data.data) {
            return { status: "success" }
        } else {
            return { status: "failed" }
        }
    } catch (error) {
        return { status: "failed" }
    }
}

const Activation = () => {
    // Ambil data hasil balikan dari loader di atas menggunakan useLoaderData
    const { status } = useLoaderData() as { status: 'success' | 'failed' }

    return (
        <div className="flex w-screen flex-col items-center justify-center gap-10 p-4">
            <div className="flex flex-col items-center gap-10">
                
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-3xl font-bold text-secondary">
                    {status === 'success'
                        ? 'Activation Success'
                        : 'Activation Failed'}
                </h1>
                <p className="text-xl font-bold text-default-500">
                    {status === 'success'
                        ? "Your account has been activated"
                        : "Confirmation code is invalid"}
                </p>
                <Button className="mt-4 w-fit" color="secondary" onPress={() => window.location.href = '/'} >Back to home</Button>
            </div>
        </div>
    )
}

export default Activation