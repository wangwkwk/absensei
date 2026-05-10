// file: src/components/ErrorBoundary.jsx
import { useRouteError } from "react-router";

export function ErrorBoundary() {
  const error:any = useRouteError();

  // Jika error disebabkan oleh file js yang gagal dimuat (deploy baru)
  if (
    error.message?.includes("Failed to fetch dynamically imported module") || 
    error.name === "ChunkLoadError"
  ) {
    // Paksa browser memuat ulang halaman untuk mengambil file index.html terbaru
    window.location.reload();
    return <div>Memperbarui aplikasi...</div>;
  }

  // Jika error lain
  return <div>Terjadi kesalahan: {error.message || "Unknown error"}</div>;
}