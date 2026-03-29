import { Button } from "@heroui/react";
import { titleChanger } from "./components/libs/pageHead/pageHead"
import type { IUser } from "./components/type"

function App() {
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

// 1. Simpan event dalam variabel global atau state (jika menggunakan React/Vue)
let deferredPrompt: BeforeInstallPromptEvent | null = null;

// 2. Tangkap event 'beforeinstallprompt'
window.addEventListener('beforeinstallprompt', (e: Event) => {
  // Kita cast 'e' ke tipe kustom kita
  const installEvent = e as BeforeInstallPromptEvent;

  // Mencegah banner bawaan muncul otomatis
  installEvent.preventDefault();
  
  // Simpan event untuk digunakan nanti
  deferredPrompt = installEvent;
  
  console.log('✅ PWA: Event beforeinstallprompt berhasil ditangkap.');
  
  // Di sini Anda bisa memicu munculnya tombol "Install" di UI Anda
});

// 3. Fungsi untuk mengeksekusi instalasi
const installApp = async (): Promise<void> => {
  if (!deferredPrompt) {
    console.warn('❌ PWA: Prompt instalasi belum tersedia.');
    return;
  }

  // Munculkan prompt instalasi ke user
  await deferredPrompt.prompt();

  // Tunggu jawaban user
  const { outcome } = await deferredPrompt.userChoice;
  
  if (outcome === 'accepted') {
    console.log('🎉 User menerima instalasi PWA');
  } else {
    console.log('👋 User menolak instalasi PWA');
  }

  // Reset deferredPrompt karena hanya bisa digunakan sekali
  deferredPrompt = null;
};

// 4. (Opsional) Deteksi jika aplikasi sudah terinstall
window.addEventListener('appinstalled', () => {
  console.log('🚀 Aplikasi berhasil terinstall di perangkat!');
  deferredPrompt = null;
});

  titleChanger('Home')
  const user:IUser = JSON.parse(`${localStorage.getItem('user')}`)
  return (
   <div className="p-5 flex flex-col">
      <strong className="font-bold text-2xl mb-10">Halo {user.username} !!</strong>
      <div className="flex-col">
        <p className="font-semibold text-xl mb-3 text-secondary text-shadow">Selamat datang di Absensei</p>
        <p>Sebuah platform untuk melakukan absensi berbasis website gratis,</p>
        <p className="mb-4">cocok digunakan untuk absensi sekolah dan lain-lain</p>
        <p className="mb-2 font-semibold">Untuk kenyamanan pengguna, saya menyarankan mendownload aplikasi dengan menekan tombol dibawah</p>
        <Button color="secondary" onPress={()=>installApp()} className="font-bold">Install Aplikasi</Button>
      </div>
   </div>
  )
}

export default App
