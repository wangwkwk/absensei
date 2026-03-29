import { Button, Card, Input, Spinner,} from "@heroui/react"
import useLogin from "./useLogin"
import { FaEye, FaEyeSlash } from "react-icons/fa6"
import { Controller } from "react-hook-form"
import { cn } from "../../../components/libs/cn"
import { titleChanger } from "../../../components/libs/pageHead/pageHead"

const Login = () => {
// mengimport fungsi funsi yang dibuat di useRegister   
    const { isVisible, toggleVisibility, control, handleLogin, handleSubmit, isPendingLogin, errors } = useLogin()
    
    titleChanger("Login")
    
    return (
        <div className="flex w-full min-h-screen items-center justify-center">
                <Card className=" border-secondary bg-[#dbf4ff] p-5">
                        <h2 className="text-3xl text-center font-bold text-black" >Login</h2>
                        <p className="mb-4 mt-2 text-center text-small" >Belum punya akun?&nbsp;<a className="font-semibold text-secondary hover:text-secondary-600" href="/auth/register">Daftar disini</a></p>
                        <form 
                        className={cn("flex w-80 justify-center items-center flex-col", Object.keys(errors).length > 0 ? "gap-2" : "gap-4")} 
                        onSubmit={handleSubmit(handleLogin)}>
                            {/* basic penggunaan react-hook-form untuk mengatur control*/}
                            <Controller name="identifier" control={control} render={({field}) => (
                                    <Input
                                    {...field}
                                    value={field.value||""}
                                    placeholder="Username/email"
                                    autoComplete="off"
                                    className={'font-semibold text-primary'}
                                    isInvalid={errors?.identifier !== undefined}
                                    errorMessage={errors.identifier?.message}
                                    classNames={{
                                        input:[
                                            "font-semibold"        
                                        ]
                                    }}
                                    />
                            )} />

                            <Controller name="password" control={control} render={({field}) => (
                                    <Input
                                        {...field}
                                        value={field.value||""}
                                        type={isVisible ? "text" : "password"}
                                        autoComplete="off"
                                        placeholder="Password"
                                        className={`font-semibold text-primary `}
                                        isInvalid={errors?.password !== undefined}
                                        errorMessage={errors.password?.message}
                                        classNames={{
                                            input:["font-semibold"]
                                        }}
                                        endContent={
                                        <button className="focus:outline-none absolute right-3"
                                                type="button"
                                                onClick={toggleVisibility}>
                                                {isVisible ? (
                                                    <FaEye className="text-xl text-secondary pointer-events-none" />
                                                ) : (<FaEyeSlash className="text-xl text-secondary pointer-events-none" />)}
                                            </button>}
                                        />
                            )} />
                            <Button size="lg" className={"bg-secondary w-24"} type="submit">{isPendingLogin? (
                                <Spinner size="sm" color="white" />
                                ): <strong className="text-white">Login</strong>}</Button>
                        </form>
                </Card>
        </div>
    )
}
export default Login