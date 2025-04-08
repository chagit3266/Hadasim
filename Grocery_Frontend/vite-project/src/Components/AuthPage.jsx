import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import AddGoods from "./AddGodds";
import { createUser, userSignin } from "./features/user/userSlice";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true); // האם זה בהתחברות או בהרשמה
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [phone, setPhone] = useState("");

    const [error, setError] = useState("");


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const goods = useSelector((state) => state.goods.goods);

    const handleSubmit = async (e) => {
        debugger
        e.preventDefault();
        if (!password || !phone || (!isLogin && (!userName || !companyName))) {
            setError("כל השדות חייבים להיות מלאים");
            return;
        }
        if (isLogin) {
            try {

                const loginData = { phone, password };
                actionResult = await dispatch(userSignin(loginData));
                console.log(actionResult);
                
            } catch (actionResult.status!==200) {
                debugger
                setError("אירעה שגיאה בעת שליחת המידע");
            }
        } else {
            try {
                const newUser = {
                    user_name: userName,
                    phone: phone,
                    company_name: companyName,
                    password: password,
                    goods: goods.map(goods => ({
                        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                        name: goods.name,
                        price: goods.price,
                        min_amount: goods.min_amount,
                        user_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                    }))
                };
                actionResult = await dispatch(createUser(newUser));
                navigate("/home");
            }
            catch (error) {
                debugger
                setError("אירעה שגיאה בעת שליחת המידע");
            }
        };
    }
    useEffect(() => {

        if (error) {
            const timer = setTimeout(() => {
                setError(""); // איפוס ההודעה אחרי 2 שניות
            }, 2000);

            return () => clearTimeout(timer); // ניקוי טיימר במקרה של רינדור מחדש
        }
    }, [error])
    return (
        <div className="form-input">
            <Box style={{ justifyContent: "center" }}>
                <div className="title">
                    {isLogin ? "התחברות" : "הרשמה"}
                </div>

                <form onSubmit={handleSubmit} style={{ width: "360px" }}>

                    {/* אם אנחנו בהרשמה, נוסיף את כל הפרטים */}
                    {!isLogin && (
                        <TextField
                            label="שם משתמש"
                            type="text"
                            fullWidth
                            required
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            style={{ marginBottom: "10px", padding: "10px 0 " }}
                        />
                    )}
                    {!isLogin && (<TextField
                        label="שם חברה"
                        type="text"
                        fullWidth
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        style={{ marginBottom: "10px", padding: "10px 0 " }}
                    />
                    )}
                    {/* סיסמה */}
                    <TextField
                        label="סיסמה"
                        type="password"
                        fullWidth
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ marginBottom: "10px", padding: "10px 0 " }}
                    />
                    {/* מספר טלפון */}
                    <TextField
                        label="מספר טלפון"
                        type="tel"
                        fullWidth
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{ marginBottom: "10px", padding: "10px 0 " }}
                    />
                    {/* שגיאה */}
                    {error && <Typography color="error">{error}</Typography>}

                    {/* כפתור לשליחה */}
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        {isLogin ? "התחבר" : "הרשם"}
                    </Button>
                </form>
                {/* כפתור להחלפה בין התחברות להרשמה */}
                <Button
                    sx={{
                        marginTop: "20px",
                        '&:focus': {
                            outline: 'none', // מניעת המסגרת כאשר הכפתור מקבל פוקוס
                        },
                    }}
                    onClick={() => {
                        setIsLogin(!isLogin);
                    }}
                >
                    {isLogin ? "אין לך חשבון? הירשם עכשיו" : "יש לך חשבון? התחבר"}
                </Button>
                {(companyName !== 'grocer' && companyName !== 'מכולת') && !isLogin && (
                    <AddGoods />
                )}
            </Box>
        </div>
    );
}