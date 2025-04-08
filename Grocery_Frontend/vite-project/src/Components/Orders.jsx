import { getAll, updateOrder } from "./features/order/orderSlice";
import React, { useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
export default function Orders() {

    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
    const orders=useSelector((state) => state.order.orders)

    useEffect(() => {
        if (currentUser?.id) {
          void (async () => {
            await dispatch(getAll(currentUser.id));
          })();
        }
      }, [currentUser]);
    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>כל ההזמנות</Typography>

            {/* הצגת הזמנות */}
            <Box sx={{ marginBottom: '20px' }}>
                <Typography variant="h6">בחר הזמנה לעדכון</Typography>
                {orders.map((order) => (
                    <Button
                        key={order.id}
                        variant="contained"
                        color="primary"
                        onClick={() => dispatch(updateOrder(order.id))}
                        sx={{ margin: '10px' }}
                    >
                        {order.id},
                        status:{order.status}
                    </Button>
                ))}
            </Box>
        </Box>
    )
}