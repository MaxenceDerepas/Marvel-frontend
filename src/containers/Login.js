import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

const Login = ({ setUserToken, setUserId }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                "https://app-marvels.herokuapp.com//user/login",
                {
                    email: email,
                    password: password,
                }
            );
            setUserToken(Cookies.set("userToken", response.data.token));
            setMessage(response.data.message);
            setUserId(Cookies.set("userId", response.data._id));
            console.log(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <section className="login">
            <h1>Se connecter</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <p>Email :</p>
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                    />
                </div>
                <div>
                    <p>Mot de pass :</p>
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />
                </div>
                <button type="submit">Se connecter</button>
                {message && (
                    <p style={{ marginTop: "20px", textAlign: "center" }}>
                        {message}
                    </p>
                )}
            </form>
        </section>
    );
};

export default Login;
