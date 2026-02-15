import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/gegaya.css'
import './styles/animasi.css'
import App from './App.tsx' 
import { SessionProvider } from './components/authConfig/session.context.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Login from './pages/Auth/login/login.tsx'
import NavBar from './pages/navBar/navBar.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import Register from './pages/Auth/register/register.tsx'
import RegisterSuccess from './pages/Auth/registerSuccess/registerSuccess.tsx'
import NavBarAbsensi from './pages/navBarAbsensi/navBarAbsensi.tsx'
import AbsenShow from './pages/absenShow/absenShow.tsx'
import EditAbsen from './pages/editAbsen/editAbsen.tsx'
import AuthMiddleware from './AuthMiddleware.tsx'
import BlockAuthMiddleware from './blockAuthMiddleware.tsx'



const router =createBrowserRouter([
          {element:<AuthMiddleware/>,
            children:[
              {
              path: '/', element: <NavBar />,
              children:[{ path: '/', element: <App /> }]
              },
              {
                path:'/category/:id',element:<NavBarAbsensi/>,
                children:[
                  {index:true,element:<AbsenShow/>},
                  {path:'/category/:id/:absenId',element:<EditAbsen/>}
          ]}
            ]
          },
          {element:<BlockAuthMiddleware/>,
            children:[
              {path: '/auth/login', element: <Login/>},
              {path: '/auth/register', element: <Register/>},
              {path: '/auth/success', element: <RegisterSuccess/>},
            ]
          }
      ])

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus:false,
      retry:false,
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <SessionProvider>
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <ToastContainer position='top-center' autoClose={2000} />
            <RouterProvider
              router={router} />
        </QueryClientProvider>
      </StrictMode>
  </SessionProvider>
)
