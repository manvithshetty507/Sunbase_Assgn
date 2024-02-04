import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SignUpLogin from './pages/SignUpLogin'
import CustomerList from './pages/CustomerList'
import AddCustomer from './pages/AddCustomer'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUpLogin />}/>
        <Route path="/customerList" element={<CustomerList />}/>
        <Route path="/customerAdd" element={<AddCustomer />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
