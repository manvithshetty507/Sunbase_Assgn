import React, { useContext, useState } from 'react'
import Input from '../features/common/input'
import './style.css'
import Context from '../context'
import { getAuthToken } from '../Helpers/axiosHelper'
import axios from 'axios'
import { useNavigate } from 'react-router'

function AddCustomer() {
  const {customers, setCustomers} = useContext(Context)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [street,setStreet] = useState('')
  const [address,setAddress] = useState('')
  const [city,setCity] = useState('')
  const [stateName, setStateName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [phone, setPhone] = useState('')
  const navigate = useNavigate()

  const addCustomerHandle = async () => {
    if(firstName && lastName && street && address && city && stateName && emailAddress && phone) {
      const newCustomer = {
        first_name:firstName,
        last_name:lastName,
        street,
        address,
        city,
        state:stateName,
        email:emailAddress,
        phone
      }
      setCustomers([...customers,newCustomer])
      const token = getAuthToken();

      await axios.post("/customers/add", newCustomer, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });   
      navigate("/customerList")

    }else {

    }
  }

  
  return (
    <div className='add__customer'>
      <div className='input__wrapper'>
        <Input type="text" placeholder="FirstName" state={firstName} setState={setFirstName} />
        <Input type="text" placeholder="LastName" state={lastName} setState={setLastName} />
        <Input type="text" placeholder="Street" state={street} setState={setStreet} />
        <Input type="text" placeholder="Address" state={address} setState={setAddress} />
        <Input type="text" placeholder="City" state={city} setState={setCity} />
        <Input type="text" placeholder="State" state={stateName} setState={setStateName} />
        <Input type="text" placeholder="Email" state={emailAddress} setState={setEmailAddress} />
        <Input type="text" placeholder="Phone" state={phone} setState={setPhone} />
      </div>

      <button className='add_btn' onClick={addCustomerHandle}>Add Customer</button>

    </div>
  )
}

export default AddCustomer