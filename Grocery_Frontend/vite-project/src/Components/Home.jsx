import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';

export default function Home() {

  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.user.currentUser);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (currentUser && (currentUser.company_name === 'מכולת' || currentUser.company_name === 'grocer')) {
      setIsOwner(true);
    }
  }, [currentUser]);

  const handleOrders = () => {
    navigate('/orders'); // עובר לדף ההזמנות
  };

  const handleCreateOrder = () => {
    navigate('/create-order'); // עובר ביצוע הזמנה
  };

  return (
    <Box sx={{
      textAlign: 'center',
      padding: '20px',
      width: '100%',
      height: '100%',
      margin: '0 auto',
    }}>
      <Button
        onClick={handleOrders}
        variant="contained"
        color="primary"
        style={{ marginTop: '20px' }}
      >
        לראות את ההזמנות
      </Button>

      {/* אם בעל המכולת */}
      {isOwner && (
        <Button
          onClick={handleCreateOrder}
          variant="contained"
          color="secondary"
          style={{ marginTop: '20px' }}
        >
          ביצוע הזמנה
        </Button>
      )}
      
      {isOwner && ( //אם בעל מכולת תהיה לו אופציה להכניס קבלה
        <Button
          onClick={handle}
          variant="contained"
          color="secondary"
          style={{ marginTop: '20px' }}
        >
          שליחת קבלה
        </Button>
      )}
    </Box>
  )
}