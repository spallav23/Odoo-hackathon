import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './store/store';
import { initializeAuth } from './store/authSlice.js';
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import MainLayout from './layouts/Main-layout.jsx'
import NotFoundPage from './components/404/NotFoundPage.jsx'
import NotificationPopup from './components/NotificationPopup/NotificationPopup.jsx'
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import LoginPage from './pages/Login/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage/RegisterPage.jsx';
import ResetPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage.jsx';
import DashboardPage from './pages/DashboardPage/DashboardPage.jsx';
import AddExpensePage from './pages/AddExpensePage/AddExpensePage.jsx';
import AdminPage from './pages/AdminPage/AdminPage.jsx';
import ExpensesPage from './pages/ExpensesPag/ExpensesPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

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
        element:<LoginPage/>
        
      },
      {
        path:'register',
        element:<RegisterPage/>
        
      },
      {
        path:'reset',
        element:<ResetPasswordPage/>
        
      },
      {
        path:'dashboard',
        element:<ProtectedRoute children={<DashboardPage/>} />,
        
      },
      {
        path:'add-expense',
        element:<ProtectedRoute children={<AddExpensePage/>} />
        
      },
      {
        path:'expenses',
        element:<ProtectedRoute children={<ExpensesPage/>} />
        
      },
      {
        path:'admin',
        element:<ProtectedRoute children={<AdminPage/>} allowedRoles={'Admin'} />
        
      },
      {
        path:'*',
        element: <NotFoundPage />
      }
    ]
  }
])
store.dispatch(initializeAuth());
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <NotificationPopup/>
    </Provider>
  </StrictMode>,
)
