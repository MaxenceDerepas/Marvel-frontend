import logoHeader from "../assets/images/logomarvel.jpg";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({ userToken, setUserToken }) => {
    const history = useHistory();
    const handleClick = () => {
        Cookies.remove("userToken");
        Cookies.remove("userId");
        setUserToken(null);
        history.push("/");
    };

    return (
        <header>
            <div className="container">
                <img src={logoHeader} alt="marvel-logo" />
                <nav>
                    <Link to="/">Personnages</Link>
                    <Link to="/comics">Comics</Link>
                    {userToken && <Link to="/favoris">Favoris</Link>}
                </nav>
                <div>
                    {userToken ? (
                        <button
                            className="se-deconnecter"
                            onClick={handleClick}
                            style={{ width: "130px" }}
                        >
                            se deconnnecter
                        </button>
                    ) : (
                        <>
                            {" "}
                            <button
                                onClick={() => {
                                    history.push("/login");
                                }}
                                className="button-1"
                            >
                                se connecter
                            </button>
                            <button
                                onClick={() => {
                                    history.push("/signup");
                                }}
                            >
                                s'inscrire
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
