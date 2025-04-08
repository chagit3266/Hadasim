import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addGoodsLocal } from './features/goods/goodsSlice';

export default function AddGoods() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [minAmount, setMinAmount] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = () => {
        debugger
        if (!name || !price || !minAmount) {
            setError("יש למלא את כל השדות");
            return;
        }
        const newGoods = {
            name,
            price:Number(price),
            min_amount: Number(minAmount),
            user_id: currentUser?.id,
        };

        dispatch(addGoodsLocal(newGoods));
        setName("");
        setPrice("");
        setMinAmount("");
        setError("");
    };
    return (

        <Box sx={{ p: 2 }} style={{ width: "360px" }}>
            <Typography variant="h6" gutterBottom>
                הוסף מוצר חדש
            </Typography>

            <TextField
                label="שם מוצר"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                label="מחיר"
                fullWidth
                type="number"
                margin="normal"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
                label="כמות מינימלית"
                fullWidth
                type="number"
                margin="normal"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
            />

            {error && <Typography color="error">{error}</Typography>}

            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ mt: 2 }}
            >
                הוסף
            </Button>
        </Box>

    )
}