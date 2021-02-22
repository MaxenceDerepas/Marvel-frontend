import axios from "axios";
import { useState, useEffect } from "react";

const Favoris = ({ userId, userToken }) => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [value, setValue] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://app-marvels.herokuapp.com/favorite?id=${userId}`
                );
                console.log(response.data);
                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [userId, value]);

    return isLoading ? (
        <span>downloading...</span>
    ) : (
        <section className="main favoris">
            <h1> Mes favoris</h1>
            <div>
                <div className="col-characters">
                    <h2>Personnages</h2>
                    {data.favoriteCharacters.map((elem, index) => {
                        console.log(elem.id);
                        const functionAdd = async (id, idCharacters) => {
                            const response = await axios.post(
                                "https://app-marvels.herokuapp.com/addFavoriteCharacters",
                                {
                                    _id: id,
                                    id: idCharacters,
                                }
                            );
                            console.log(response.data);
                            setValue(!value);
                        };
                        return (
                            <div className=" fav-char1">
                                <span key={elem._id}>
                                    <section className="fav-char">
                                        <img src={elem.img} alt="" />
                                        <p className="fav-charp">{elem.name}</p>
                                    </section>
                                </span>

                                <p
                                    onClick={() => functionAdd(elem.id, userId)}
                                    className="add-fav1"
                                >
                                    Supprimer
                                </p>
                            </div>
                        );
                    })}
                </div>
                <div className="col-comics">
                    <h2>Comics</h2>
                    {data.favoriteComics.map((elem, index) => {
                        console.log(elem.id);
                        const functionAdd = async (id, idCharacters) => {
                            const response = await axios.post(
                                "https://app-marvels.herokuapp.com/addFavoriteComics",
                                {
                                    _id: id,
                                    id: idCharacters,
                                }
                            );
                            console.log(response.data);
                            setValue(!value);
                        };
                        return (
                            <div className=" fav-char1">
                                <span key={elem._id}>
                                    <section className="fav-char">
                                        <img src={elem.img} alt="" />
                                        <p className="fav-charp">
                                            {elem.title}
                                        </p>
                                    </section>
                                </span>

                                <p
                                    onClick={() => functionAdd(elem.id, userId)}
                                    className="add-fav1"
                                >
                                    Supprimer
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Favoris;
