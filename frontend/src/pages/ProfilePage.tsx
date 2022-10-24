import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const ProfilePage = () => {

  const [myData, setMyData] = useState({})
  const navigate = useNavigate();

  useEffect(() => {
    fetchData()
    console.log(myData)
  }, []);

  function fetchData () {
    const url = 'http://localhost:4000/users/profile'
    const token = localStorage.getItem('backend3-ecom')
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    fetch(url, { 
      headers: headers 
    })
      .then(response => response.json())
      .then(data => setMyData(data))
  }


  function handleOnClick() {
    localStorage.removeItem("backend3-ecom")
    setMyData("")
    // sessionStorage.removeItem("todoapp")
    navigate("/")
  };



  return (
    <div>
            {myData && (
              console.log(myData),
                <>
                    <h2>THE USER IS LOGGED IN</h2>
                    
                </>
            )}

           <button onClick={handleOnClick}>Log out</button>
    </div>
  )


//     <div className='wrapper--allProducts'>

//     <h2 className='title'>User profile</h2>

//     <div className='container--all-product-items'> 
//             <div className='container--product-item'>
//                 <br />
//                 <p><strong>First name:</strong></p>
//                 <p><strong>Last name:</strong></p>
//                 <p><strong>E-mail:</strong></p>
//             </div>
//     </div>
// </div>
//   )
}
