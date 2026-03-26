import { Navigate } from "react-router-dom"

export const login =  async(user) =>{


    
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`,{
        method: "POST",
        body: JSON.stringify(user),
        headers:{
         "Content-Type":"application/json"
        }
    })

    const data= await response.json()
    localStorage.setItem("token", data.token);
    return data;
  
  
}

export const registro = async(user)=>{


    const response= await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/register`,{
        method:"POST",
        body: JSON.stringify(user),
        headers:{
         "Content-Type":"application/json"
        }    
    })
    const data = await response.json()   
    if (!response.ok){
        alert("algo salio mal en el registro")
        return;
    }
    return data
   
     
};

export const privateCheck = async () => {
    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/profile`,
        {
         headers:{
            authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        },
    );
    const data = await response.json();
        if(!response.ok){
            return false;
        }
        return data;
};