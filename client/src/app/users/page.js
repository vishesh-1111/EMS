"use client"
import { useEffect,useState } from "react"
async function fetchUsers() {
  const response = await fetch(`http://localhost:5000/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const result = await response.json();
  if(response.ok){
    return result;
  }
  else{
    return null;
  }
};

export default function RenderUsers(){
    const [users, setUsers] = useState(null); 

  useEffect(() => {
     if(!users){
         const GetUsers = async () => {
             const Users = await fetchUsers();
             setUsers(Users);
            };
            GetUsers();
        }
  }, []);  

   if(!users){
    return(
        <div className="">
            Loading Users....
        </div>
    )
   }  
        

    return(
        <div className="">
          {users.map((user)=>{
            return (
                <div key={user._id}>
                {user.name} 
              </div>
            )
          })} 
        </div>
    )
}