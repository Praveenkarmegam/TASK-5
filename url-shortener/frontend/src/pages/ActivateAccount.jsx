import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

function ActivateAccount() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function activate() {
      try {
        const res = await axios.get(`/activate/${token}`);
        alert(res.data.message);
        navigate('/login');
      } catch (err) {
        alert('Activation failed or token expired');
        navigate('/register');
      }
    }
    activate();
  }, [token, navigate]);

  return <div className="text-center mt-5">Activating your account...</div>;
}

export default ActivateAccount;