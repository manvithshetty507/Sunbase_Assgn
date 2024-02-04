import React, { useContext, useEffect, useState } from 'react';
import Context from '../../context';
import TableRow from './TableRow';
import Input from '../common/input';

function Table() {
  const { customers, setCustomers } = useContext(Context);
  const [editingCustomerId, setEditingCustomerId] = useState(null);
  const [selectFilter, setSelectFilter] = useState('')
  const [search, setSearch] = useState('')
  const [filteredCustomers, setFilteredCustomers] = useState(null);


  const handleEdit = (uuid) => {
    setEditingCustomerId(uuid);
  };

  const handleCancelEdit = () => {
    setEditingCustomerId(null);
  };

  const handleSaveEdit = (uuid, updatedCustomer) => {
    // Implement logic to save the edited customer
    console.log(`Saving edits for customer with UUID: ${uuid}`);
    // Update the customers state with the edited customer
    setCustomers((prevCustomers) => ({
      ...prevCustomers,
      [uuid]: updatedCustomer,
    }));
    // Reset editing state
    setEditingCustomerId(null);
  };

  const handleDelete = (email) => {
    // Implement delete functionality here
    const newCustomerList = customers.filter((cur,id) => cur.email !== email)
    console.log(newCustomerList)
    setCustomers(newCustomerList)
  };

  const handleSearch = () => {
    if (selectFilter !== "") {
      const afterFilter = Object.keys(customers).filter((uuid) => {
        const curCustomer = customers[uuid];
        const valueToSearch = curCustomer[selectFilter]?.toLowerCase();
        return valueToSearch?.includes(search.toLowerCase());
      });
  
      // Create a new object with filtered customers
      const filteredCustomers = {};
      afterFilter.forEach((uuid) => {
        filteredCustomers[uuid] = customers[uuid];
      });
  
      setFilteredCustomers(filteredCustomers);
    } else {
      setFilteredCustomers(customers); // If no filter is selected, reset filteredCustomers
    }
  };

  const handleFilterChange = (event) => {
    setSelectFilter(event.target.value);
  };

  return (
    <>
    <div className='top__part'>

    <label htmlFor="filterSelect">Filter by:</label>
    <select id="filterSelect" value={selectFilter} onChange={handleFilterChange}>
        <option value=""></option>
        <option value="first_name">First Name</option>
        <option value="city">City</option>
        <option value="email">Email</option>
        <option value="phone">Phone</option>
      </select>
      <Input type="text" placeholder='search' state={search} setState={setSearch}/>
      <button onClick={handleSearch}>search</button>

    </div>
      <table className="customer-list-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Street</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {Object.keys(filteredCustomers || customers).map((uuid) => (
          <TableRow
            key={uuid}
            uuid={uuid}
            customer={filteredCustomers ? filteredCustomers[uuid] : customers[uuid]}
            editingCustomerId={editingCustomerId}
            onEdit={handleEdit}
            onCancelEdit={handleCancelEdit}
            onSaveEdit={handleSaveEdit}
            onDelete={handleDelete}
          />
        ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;


