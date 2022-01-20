import { Box, Button, TextField, Stack, Typography, Card, CardContent } from "@mui/material";
import React, { useState } from "react";

export interface IProps {
    onLogin: (username: string, password: string) => string;
}

const Login: React.FC<IProps> = (props: IProps) => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loginResponse, setLoginResponse] = useState("");

    const onChangeUserName = (e: any): void => {
        setUserName(e.target.value);
        setLoginResponse("");
    }

    const onChangePassword = (e: any): void => {
        setPassword(e.target.value);
        setLoginResponse("");
    }

    const Reset = () => {
        setUserName("");
        setPassword("");
        setLoginResponse("");
    }

    const Login = (e: any) => {
        e.preventDefault();
        const result = props.onLogin(userName, password);
        setLoginResponse(result);
        setPassword("");
    }

    return (
        <div>

            <form onSubmit={Login}>

                <Box display="flex">
                    <Box m="auto">

                        <Typography variant="h3" component="div" gutterBottom>
                            Login
                        </Typography>

                        <Card
                            sx={{ minWidth: 275, width: 200 }}
                        >
                            <CardContent>
                                <Stack spacing={2}>
                                    <div>
                                        <TextField id="username" label="User name" variant="standard" required value={userName} onChange={(e) => onChangeUserName(e)} autoComplete="username" />
                                    </div>
                                    <div>
                                        <TextField id="password" label="Password" variant="standard" type="password" required value={password} onChange={(e) => onChangePassword(e)} autoComplete="current-password" />
                                    </div>

                                    <Stack spacing={1} direction="row">
                                        <Button variant="contained" type="submit" disabled={userName === "" || password === ""} onClick={Login}>Log In</Button>
                                        <Button variant="outlined" type="button" className="marginLeft10" onClick={Reset}>Reset</Button>
                                    </Stack>

                                    <div className="warning">{loginResponse}</div>

                                </Stack>
                            </CardContent>

                        </Card>

                    </Box>
                </Box>

            </form>

        </div>
    )

}

export default Login;