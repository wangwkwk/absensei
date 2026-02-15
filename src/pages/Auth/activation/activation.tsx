import { Button } from "@heroui/react"
import { titleChanger } from "../../../components/libs/pageHead/pageHead"

interface PropTypes {
    status: 'success'| 'failed'
}

titleChanger("/Aktivasi")

const Activation = (props: PropTypes) => {
    const {status} = props
    return (
        <div className="flex w-screen flex-col items-center justify-center gap-10 p-4">
            <div className="flex flex-col items-center gap-10">
                
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-3xl font-bold text-secondary">
                    {status==='success'
                    ?'Actvation Success'
                    :'Activation Failed'}
                </h1>
                <p className="text-xl font-bold text-default-500">
                    {status === 'success'
                    ? "your accont have been activated"
                    : "confirmation code is invalid"}
                </p>
                <Button className="mt-4 w-fit" color="secondary" onPress={()=>window.location.href = '/'} >Back to home</Button>
            </div>
        </div>
    )
}

export default Activation