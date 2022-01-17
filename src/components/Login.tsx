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
    }

    const onChangePassword = (e: any): void => {
        setPassword(e.target.value);
    }

    const Reset = () => {
        setUserName("");
        setPassword("");
        setLoginResponse("");
    }

    const Login = () => {
        const result = props.onLogin(userName, password);
        setLoginResponse(result);
    }

    return (
        <div>
            <h2>Login</h2>

            <table>
                <tr>
                    <td>User Name:</td>
                    <td>
                        <input type="text" value={userName} onChange={(e) => onChangeUserName(e)}></input>
                        {userName === "" &&
                            <span className="warning marginLeft10">required</span>
                        }
                    </td>
                </tr>
                <tr>
                    <td>Password:</td>
                    <td>
                        <input type="password" value={password} onChange={(e) => onChangePassword(e)}></input>
                        {password === "" &&
                            <span className="warning marginLeft10">required</span>
                        }
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <button disabled={userName === "" || password === ""} onClick={Login}>Log In</button>
                        <button className="marginLeft10" onClick={Reset}>Reset</button>
                    </td>
                </tr>
            </table>

            <div className="warning">{loginResponse}</div>

        </div>
    )

}

export default Login;