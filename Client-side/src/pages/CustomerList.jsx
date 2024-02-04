// CustomerList.js

import React, { useContext, useState } from 'react';
import './style.css';
import Context from '../context.jsx';
import Table from '../features/table/index.jsx';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { getAuthToken } from '../Helpers/axiosHelper.js';

function CustomerList() {

  const {customers, setCustomers} = useContext(Context)
  const navigate = useNavigate()

  const token = getAuthToken();

  const syncLogic = async () => {
    await axios.post("/customers/addAll",customers,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
  }
  return (
    <div className="customer-list-container">
      <h2>Customer List</h2>
      <Table />
      <button onClick={() => navigate('/customerAdd')} className='add_btn'>Add Customer</button>
      <button className='sync_btn' onClick={syncLogic}>Sync</button>
    </div>
  );
}

export default CustomerList;
