import axios from "axios";
import React, { createContext, useEffect, useState } from "react";


const Context = createContext();

export const ContextProvider = ({ children }) => {

  const [customers, setCustomers] = useState([]);
  const temp = [
    {
      uuid: "test84101b8cf7a64884b407bfd7ea69d1cb",
      first_name: "Virat",
      last_name: "Kohli",
      street: "street 4",
      address: "Chandni chowk",
      city: "Delhi",
      state: "Delhi",
      email: "virat18@gmail.com",
      phone: "0011001100"
    },
    {
      uuid: "testba7856f41124446fa823ad0b90709c72",
      first_name: " m s",
      last_name: "dhoni",
      street: "123",
      address: "secret place",
      city: "ranchi",
      state: "jharkhand",
      email: "msd@gmail.com",
      phone: "8484"
    }
  ]
  useEffect(() => {
    const fetch = async () => {
      const fetchedCustomers = await axios.get("/customers/getAll")
      console.log("customers", fetchedCustomers);
      const data = fetchedCustomers.data;
      (data?.length == 0) ? setCustomers(temp) : setCustomers(fetchedCustomers.data)
    }
    fetch()
  },[])

  return (
    <Context.Provider value={{ customers, setCustomers }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
