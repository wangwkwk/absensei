import { Button, Card, Input, Spinner } from "@heroui/react"
import useRegister from "./useRegister"
import { FaEye, FaEyeSlash } from "react-icons/fa6"
import { Controller } from "react-hook-form"
import { cn } from "../../../components/libs/cn"
import { titleChanger } from "../../../components/libs/pageHead/pageHead"

const Register = () => {
// mengimport fungsi funsi yang dibuat di useRegister
    const { visiblePassword, handleVisiblePassword, control, handleRegister, handleSubmit, isPendingRegister, errors } = useRegister()

    titleChanger("Login")


    return (
        <div className="flex  w-full h-screen items-center justify-center gap-10 lg:gap-20">
                <Card className="bg-[#c4e4f8] flex items-center justify-center w-fit">
                        <h2 className="text-2xl font-bold text-center text-secondary" >Buat Akun</h2>
                        <p className="mb-4 mt-2 text-small" >Sudah punya akun?&nbsp;<a className="font-semibold text-secondary" href="/auth/login">Login disini</a></p>

                        {errors.root && (
                            <p className="mb-2 font-medium text-danger">{errors?.root?.message}</p>
                    )}
                        <form 
                        className={cn("flex w-80 flex-col items-center justify-center", Object.keys(errors).length > 0 ? "gap-2" : "gap-4")} 
                        onSubmit={handleSubmit(handleRegister)}>
                            {/* basic penggunaan react-hook-form untuk mengatur control*/}
                            <Controller name="username" 
                            control={control} 
                            render={({field}) => (
                                <Input
                                    {...field}
                                    value={field.value||""}
                                    type="text"
                                    variant="bordered"
                                    autoComplete="off"
                                    className={'font-semibold text-primary'}
                                    isInvalid={errors?.username !== undefined}
                                    errorMessage={errors.username?.message}
                                    />
                            )} />

                            <Controller name="email" control={control} render={({field}) => (
                               <Input
                                    {...field}
                                    value={field.value||""}
                                    variant="bordered"
                                    autoComplete="off"
                                    className={'font-semibold text-primary'}
                                    isInvalid={errors?.email !== undefined}
                                    errorMessage={errors.email?.message}
                                    />
                            )} />

                            <Controller name="password" control={control} render={({field}) => (
                                        <Input
                                        {...field}
                                        value={field.value||""}
                                        type={visiblePassword.password ? "text" : "password"}
                                        autoComplete="off"
                                        className={`font-semibold text-primary `}
                                        isInvalid={errors?.password !== undefined}
                                        errorMessage={errors.password?.message}
                                        endContent={
                                            <button className="focus:outline-none absolute right-3"
                                                type="button"
                                                onClick={()=>handleVisiblePassword("password")}>
                                                {visiblePassword.password ? (
                                                    <FaEye className="text-xl text-secondary pointer-events-none" />
                                                ) : (<FaEyeSlash className="text-xl text-secondary pointer-events-none" />)}
                                            </button>}
                                    />
                                
                            )} />

                            <Controller name="confirmPass" control={control} render={({field}) => (
                                <Input
                                    {...field}
                                    value={field.value||""}
                                    type={visiblePassword.confirmPass ? "text" : "password"}
                                    autoComplete="off"
                                    className={`font-semibold text-primary `}
                                    isInvalid={errors?.password !== undefined}
                                    errorMessage={errors.password?.message}
                                    endContent={
                                        <button className="focus:outline-none absolute right-3"
                                            type="button"
                                            onClick={()=>handleVisiblePassword("confirmPass")}>
                                            {visiblePassword.confirmPass ? (
                                                <FaEye className="text-xl text-secondary pointer-events-none" />
                                            ) : (<FaEyeSlash className="text-xl text-secondary pointer-events-none" />)}
                                        </button>}
                                    />
                                
                            )} />

                            
                            
                            <Button size="lg" className={`bg-secondary`} type="submit">{isPendingRegister? (
                                <Spinner size="sm" />
                                ):<strong>Daftar</strong>}</Button>
                        </form>
                </Card>
            </div>
    )
}
export default Register