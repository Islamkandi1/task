import React, { createContext, useState } from 'react'

export const AllDataContext = createContext()
const AllTasksProvider = ({children}) => {
    const [data, setData] = useState([]);
    const values = {
        data, setData
    }
  return (
    <AllDataContext.Provider value={values}>
      {children}
    </AllDataContext.Provider>
  )
}

export default AllTasksProvider
