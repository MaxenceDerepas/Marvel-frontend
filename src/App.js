import "./App.css";
import Header from "./components/Header";
import Personnage from "./containers/Personnage";
import PersoViewComics from "./containers/PersoViewComics";
import Comics from "./containers/Comics";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Favoris from "./containers/Favoris";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

function App() {
    const [userToken, setUserToken] = useState(
        Cookies.get("userToken") || null
    );
    const [userId, setUserId] = useState(Cookies.get("userId") || null);
    return (
        <div className="App">
            <Router>
                <Header
                    userToken={userToken}
                    setUserToken={setUserToken}
                    setUserId={setUserId}
                />
                <Switch>
                    <Route path="/signup">
                        <Signup
                            setUserToken={setUserToken}
                            setUserId={setUserId}
                        />
                    </Route>
                    <Route path="/login">
                        <Login
                            setUserToken={setUserToken}
                            setUserId={setUserId}
                        />
                    </Route>
                    <Route path="/favoris">
                        <Favoris userId={userId} userToken={userToken} />
                    </Route>
                    <Route path="/comics">
                        <Comics userToken={userToken} userId={userId} />
                    </Route>
                    <Route path="/persoViewComics">
                        <PersoViewComics
                            userToken={userToken}
                            userId={userId}
                        />
                    </Route>
                    <Route path="/">
                        <Personnage userToken={userToken} userId={userId} />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
