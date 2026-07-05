import { type FormEvent, useId, useState } from "react";

// Data roles lebih bersih tanpa hardcode pixel
const roles = [
  { id: "admin", label: "admin" },
  { id: "fisioterapis", label: "fisioterapis" },
  { id: "pasien", label: "pasien" },
]

export const Test = () => {
  const emailId = useId();
  const passwordId = useId();
  const [selectedRole, setSelectedRole] = useState<(typeof roles)[number]["id"]>();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Tambahkan logika login di sini
  };

  return (
    <main
      className="bg-[#ebebeb] w-full min-h-screen flex items-center justify-center p-4"
      data-color-mode="SDS-light"
    >
      <section
        aria-labelledby="login-title"
        className="w-full max-w-[614px] bg-white rounded-[50px] p-10 md:p-[60px] flex flex-col items-center shadow-lg"
      >
        {/* Logo */}
        <div className="w-[133px] h-[133px] mb-8">
          <img
            className="w-full h-full object-cover rounded-full"
            alt="Physiocenter logo"
            src={""}
          />
        </div>

        {/* Judul */}
        <h1
          id="login-title"
          className="mb-8 [text-shadow:0px_4px_4px_#00000040] font-['Imprima-Regular',Helvetica] font-normal text-black text-3xl text-center"
        >
          LOGIN SEBAGAI :
        </h1>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="w-full max-w-120 flex flex-col gap-6">
          
          {/* Pilihan Peran */}
          <fieldset
            className="flex flex-row justify-between gap-3 m-0 border-0 p-0 w-full"
            aria-label="Pilih peran pengguna"
          >
            <legend className="sr-only">Pilih peran pengguna</legend>
            {roles.map((role) => {
              const isSelected = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  aria-pressed={isSelected}
                  className={`flex-1 h-13 transition-all duration-200 ease-in flex items-center justify-center rounded-[10px] border border-solid border-[#120a59] ${
                    isSelected ? "bg-[#120A59] text-white" : "bg-[#d9d9d9]"
                  }`}
                >
                  <span className="font-['Imprima-Regular',Helvetica] text-lg md:text-xl capitalize">
                    {role.label}
                  </span>
                </button>
              );
            })}
          </fieldset>

          {/* Input Email/Username */}
          <div className="flex flex-col gap-2 w-full">
            <label
              className="font-['Imprima-Regular',Helvetica] font-normal text-[#1e1e1e] text-xl drop-shadow-sm"
              htmlFor={emailId}
            >
              Email / Username
            </label>
            <div className="flex items-center px-4 py-3 bg-[#d9d9d9] rounded-lg border border-solid border-[#120a59]">
              <input
                className="flex-1 bg-transparent border-none outline-none text-base text-gray-800 placeholder-gray-500 font-['Inter-Regular',Helvetica]"
                id={emailId}
                name="email"
                autoComplete="username"
                aria-label="Email atau username"
                placeholder="people@physiocenter.id"
                type="email"
                value={''}
                onChange={()=>{}}
              />
            </div>
          </div>

          {/* Input Password */}
          <div className="flex flex-col gap-2 w-full">
            <label
              className="font-['Imprima-Regular',Helvetica] font-normal text-[#1e1e1e] text-xl drop-shadow-sm"
              htmlFor={passwordId}
            >
              Kata Sandi :
            </label>
            <div className="flex items-center px-4 py-3 bg-[#d9d9d9] rounded-lg border border-solid border-red-500">
              <input
                className="flex-1 bg-transparent border-none outline-none text-base text-gray-800 placeholder-gray-500 font-sans"
                id={passwordId}
                name="password"
                type="password"
                autoComplete="current-password"
                aria-label="Kata sandi"
                placeholder="******"
                value={''}
                onChange={()=>{}}
              />
            </div>
          </div>

          {/* Lupa Password */}
          <p className="text-center mt-2">
            <span className="font-['Times_New_Roman-Regular',Helvetica] text-xl">
              <span className="text-[#7b7878]">Lupa Password, </span>
              <span className="text-[#848181] hover:text-black cursor-pointer transition-colors">
                Hubungi Admin Sekarang
              </span>
            </span>
          </p>

          {/* Tombol Submit */}
          <button
            type="submit"
            className="w-full h-[53px] mt-4 bg-[#adc2d4] rounded-[10px] border border-solid border-[#120a59] flex items-center justify-center hover:bg-[#9ab4c8] transition-colors"
            aria-label="Masuk ke sistem"
          >
            <span className="font-['Imprima-Regular',Helvetica] font-normal text-black text-2xl tracking-[-0.43px]">
              MASUK KE SISTEM
            </span>
          </button>
        </form>
      </section>
    </main>
  );
};

export default Test