import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Signup = ({ setUserToken, setUserId }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                "https://app-marvels.herokuapp.com//user/signup",
                {
                    email: email,
                    username: username,
                    password: password,
                }
            );
            setMessage(response.data.message);
            setUserToken(Cookies.set("userToken", response.data.token));
            setUserId(Cookies.set("userId", response.data._id));
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <section className="signup">
            <h1>Inscription</h1>
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
                    <p>Username :</p>
                    <input
                        type="text"
                        value={username}
                        onChange={(event) => {
                            setUsername(event.target.value);
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
                <button type="submit">Inscription</button>
                {message && (
                    <p
                        style={{ marginTop: "20px" }}
                    >{`${message} Vous etes connecté`}</p>
                )}
            </form>
        </section>
    );
};

export default Signup;
