import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Box, Typography } from '@mui/material';
import { getAll as getAllUsers } from './features/user/userSlice';
import { getAll as getAllGoods } from './features/goods/goodsSlice';
import { createOrder } from './features/order/orderSlice';
export default function CreateOrder() {

    const [selectedSupplierId, setSelectedSupplierId] = useState("")
    const [selectedProducts, setSelectedProducts] = useState({})

    const dispatch = useDispatch();
    const suppliers = useSelector((state) => state.user.users)
    const ListGoods = useSelector((state) => state.goods.goods)
    const StatusTypes = useSelector((state) => state.order.statusTypes)
    const orderStatus = useSelector((state) => state.order.status);

    useEffect(() => {
        void (async () => {
          await dispatch(getAllUsers());
        })();
      }, []);

    // כשנבחר ספק
    const handleSelectSupplier = (supplier) => {
        setSelectedSupplierId(supplier.id);
        //צריך לשלוח לקבלת רשימת מוצרים לפי ספק
        dispatch(getAllGoods(supplier.id))
    };

    // הוספת מוצר להזמנה
    const handleAddProduct = (product) => {

        const minAmount = product.min_amount || 1;

        let input = prompt(`הכנס כמות עבור "${product.name}" (מינימום: ${minAmount})`);

        // בדיקת ביטול או ערך ריק
        if (input === null || input.trim() === '') return;

        const amount = Number(input);

        if (isNaN(amount)) {
            alert("הכמות שהוזנה אינה מספר תקין");
            return;
        }

        if (amount < minAmount) {
            alert(`כמות מינימלית היא ${minAmount}`);
            return;
        }
        setSelectedProducts([...selectedProducts, {
            goods_id: product.id,
            quantity: amount
          }])
    };

    const handleSubmitOrder = async () => {
        const orderData = {
            user_id: selectedSupplierId,
            status: StatusTypes.PENDING,
            goods: selectedProducts,
        };
        await dispatch(createOrder(orderData));
    };
    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>הזמנה חדשה</Typography>

            {/* הצגת ספקים */}
            <Box sx={{ marginBottom: '20px' }}>
                <Typography variant="h6">בחר ספק</Typography>
                {suppliers.map((supplier) => (
                    <Button
                        key={supplier.id}
                        variant="contained"
                        color="primary"
                        onClick={() => handleSelectSupplier(supplier)}
                        sx={{ margin: '10px' }}
                    >
                        {supplier.user_name}
                    </Button>
                ))}
            </Box>

            {/*  המוצרים של הספק הנבחר */}
            {selectedSupplierId && (
                <Box sx={{ marginBottom: '20px' }}>
                    <Typography variant="h6">בחר מוצרים</Typography>
                    {ListGoods && ListGoods.map((product, index) => (
                        <Button
                            key={index}
                            variant="outlined"
                            onClick={() => handleAddProduct(product)}
                            sx={{ margin: '10px' }}
                        >
                            {product.name},
                            price:{product.price},
                            min amount:{product.min_amount}
                        </Button>
                    ))}
                </Box>
            )}

            {/* הצגת המוצרים שנבחרו */}
            <Box sx={{ marginBottom: '20px' }}>
                <Typography variant="h6">המוצרים שהזמנת</Typography>
                {selectedProducts.length === 0 ? (
                    <Typography>לא נבחרו מוצרים</Typography>
                ) : (
                    selectedProducts.map((product, index) => (
                        <Typography key={index}>
                            מזהה מוצר: {product.goods_id}, כמות: {product.quantity}
                        </Typography>
                    ))
                )}
            </Box>

            {/* כפתור שליחת הזמנה */}
            <Button
                variant="contained"
                color="secondary"
                onClick={handleSubmitOrder}
                sx={{ marginTop: '20px' }}
                disabled={selectedProducts.length === 0 || orderStatus === 'loading'}
            >
                ביצוע הזמנה
            </Button>
        </Box>
    )
}