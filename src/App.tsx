import { titleChanger } from "./components/libs/pageHead/pageHead"
import type { IUser } from "./components/type"

function App() {
  titleChanger('Home')
  const user:IUser = JSON.parse(`${localStorage.getItem('user')}`)
  return (
   <div className="p-5 flex flex-col">
      <strong className="font-bold text-2xl mb-10">Halo {user.username} !!</strong>
      <div className="flex-col">
        <p className="font-semibold text-xl mb-3 text-secondary text-shadow">Selamat datang di Absensei</p>
        <p>Sebuah platform untuk melakukan absensi berbasis website gratis,</p>
        <p>cocok digunakan untuk absensi sekolah dan lain-lain</p>
      </div>
   </div>
  )
}

export default App
