import { useContext } from "react"
import { sessionContext } from "./session.context"

export const useSession = () =>{
    const context = useContext(sessionContext)

    if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}