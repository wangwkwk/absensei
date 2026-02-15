import { type ReactNode } from "react"
import { titleChanger } from "../../libs/pageHead/pageHead"

interface PropTypes{
    children: ReactNode,
    title?: string,
}

const AuthLayout = (props:PropTypes) =>{
    const {children,title} = props
    titleChanger(title||"Absensi")
    return(
        <div className="flex min-h-screen flex-col min-w-full items-center justify-center gap-10 py-10 lg:py-0">
        <section  className="max-w-screen-3xl 3xl:container p-6" >{children}</section>
        </div>
    )
}

export default AuthLayout