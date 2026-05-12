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
import Each from './pages/each/each.tsx'
import Success from './pages/each/success.tsx'
import Activation, { activationLoader } from './pages/Auth/activation/activation.tsx'
import { ErrorBoundary } from './error.tsx'

if('serviceWorker' in navigator){    //bila tidak ingin menggunakan PWA
  navigator.serviceWorker.getRegistrations().then((registrations)=>{
    if(registrations.length>0){
      for (let registration of registrations){
        registration.unregister()
      }
      caches.keys().then((keylist)=>{
        return Promise.all(
          keylist.map((key)=>{return caches.delete(key)})
        )
      }).then(()=>{
        window.location.reload()
      })
    }
  })
}

const router =createBrowserRouter([
          {path:'/forEach/:id',element:<Each/>, errorElement:<ErrorBoundary/>},
          {path:"/forEach/Success", element:<Success/>, errorElement:< ErrorBoundary />},
          {path:'/auth/activation', element:<Activation/>, errorElement:< ErrorBoundary />, loader:activationLoader},
          {element:<AuthMiddleware/>,
            children:[
              {
              path: '/', element: <NavBar />,
              children:[{ path: '/', element: <App /> }],
              errorElement:< ErrorBoundary />
              },
              {
                path:'/category/:id',element:<NavBarAbsensi/>,
                children:[
                  {index:true,element:<AbsenShow/>, errorElement:< ErrorBoundary />},
                  {path:'/category/:id/:absenId',element:<EditAbsen/>, errorElement:< ErrorBoundary />}
                  ],
                errorElement:< ErrorBoundary />
                }
            ], 
            errorElement:< ErrorBoundary />
          },
          {element:<BlockAuthMiddleware/>,
            children:[
              {path: '/auth/login', element: <Login/>, errorElement:< ErrorBoundary />},
              {path: '/auth/register', element: <Register/>, errorElement:< ErrorBoundary />},
              {path: '/auth/success', element: <RegisterSuccess/>, errorElement:< ErrorBoundary />},
            ],
            errorElement:< ErrorBoundary />
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
