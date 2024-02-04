import React, { useContext, useState } from 'react';
import { VscEdit } from 'react-icons/vsc';
import { MdDelete } from 'react-icons/md';
import Context from '../../context';

const TableRow = ({ uuid, customer, editingCustomerId, onEdit, onCancelEdit, onSaveEdit, onDelete }) => {
  const [editFirstName, setEditFirstName] = useState(customer.first_name);
  const [editLastName, setEditLastName] = useState(customer.last_name);
  const [editStreet, setEditStreet] = useState(customer.street);
  const [editAddress, setEditAddress] = useState(customer.address);
  const [editCity, setEditCity] = useState(customer.city);
  const [editState, setEditState] = useState(customer.state);
  const [editEmail, setEditEmail] = useState(customer.email);
  const [editPhone, setEditPhone] = useState(customer.phone);

  return (
    <tr key={uuid}>
      {editingCustomerId === uuid ? (
        <>
          <td>
            <input
              type="text"
              value={editFirstName}
              onChange={(e) => setEditFirstName(e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              value={editLastName}
              onChange={(e) => setEditLastName(e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              value={editStreet}
              onChange={(e) => setEditStreet(e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              value={editAddress}
              onChange={(e) => setEditAddress(e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              value={editCity}
              onChange={(e) => setEditCity(e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              value={editState}
              onChange={(e) => setEditState(e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              value={editPhone}
              onChange={(e) => setEditPhone(e.target.value)}
            />
          </td>
          <td>
            <button onClick={() => onSaveEdit(uuid, {
              first_name: editFirstName,
              last_name: editLastName,
              street: editStreet,
              address: editAddress,
              city: editCity,
              state: editState,
              email: editEmail,
              phone: editPhone,
            })}>
              Save
            </button>
            <button onClick={onCancelEdit}>Cancel</button>
          </td>
        </>
      ) : (
        <>
          <td>{customer.first_name}</td>
          <td>{customer.last_name}</td>
          <td>{customer.street}</td>
          <td>{customer.address}</td>
          <td>{customer.city}</td>
          <td>{customer.state}</td>
          <td>{customer.email}</td>
          <td>{customer.phone}</td>
          <td>
            <button onClick={() => onEdit(uuid)}>
              <VscEdit />
            </button>
            <button onClick={() => onDelete(customer.email)}>
              <MdDelete />
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default TableRow;
