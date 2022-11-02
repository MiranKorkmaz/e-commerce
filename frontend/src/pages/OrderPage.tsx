import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL =
process.env.REACT_APP_SERVER_PORT || "http://localhost:4000";


export const OrderPage = () => {
  
  return (
    <div>
      <h1>Order Page</h1>



    </div>
  )
}
