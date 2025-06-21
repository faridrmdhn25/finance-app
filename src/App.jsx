import { Navigate, Route, Routes } from 'react-router'
import './App.css'
import LoginPage from './features/loginPages'
import Layout from './layout'
import Home from './features/homePages'
import Transaction from './features/transactionPages'
import History from './features/historyPages'
import Report from './features/reportPages'
import NotFound from './component/notFound'

function App() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/' element={<Layout />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path='home' element={<Home />} />
        <Route path='transaction' element={<Transaction />} />
        <Route path='history' element={<History />} />
        <Route path='report' element={<Report />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
