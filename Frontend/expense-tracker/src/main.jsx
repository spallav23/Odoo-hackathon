import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './store/store';
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import MainLayout from './layouts/Main-layout.jsx'
import LoginLayout from './layouts/Login-layout.jsx'
import NotFoundPage from './components/404/NotFoundPage.jsx'
import NotificationPopup from './components/NotificationPopup/NotificationPopup.jsx'
import LandingPage from './pages/LandingPage.jsx';

const router = createBrowserRouter([
  {
    path:'/',
    element:<MainLayout />,
    children:[
      {
        path:'/',
        element:<LandingPage />
      },
      {
        path:'login',
        element:<LoginLayout/>,
        children:[
          {
            index:true,
            element:<App/>
          }
        ]
        
      },
      {
        path:'*',
        element: <NotFoundPage />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <NotificationPopup/>
    </Provider>
  </StrictMode>,
)
