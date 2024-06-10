import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'; // Import useLocation
import axiosInstance from '../utils/axiosInstance';

function VerifyUserEmail() {
    const location = useLocation();
    const [isVerified, setisVerified] = useState(false);

    useEffect(()=>{
        const handle = async () => {
            try {
                const params = new URLSearchParams(location.search);
                const emailToken = params.get('emailToken');
                const response = await axiosInstance.patch('/auth/verify-email', {
                    emailToken: emailToken
                });
                
                if(response.data.status === "Success"){
                    setisVerified(true);
                }

                console.log(response);
            } catch (error) {
              console.log(error);
            }
        };
        handle();
    },[]) 

    return (
        <div>
            
            {isVerified ? <h1>Your email has been verified</h1> : <h1>Verifying your email...</h1>}
        </div>
    )
}

export default VerifyUserEmail;