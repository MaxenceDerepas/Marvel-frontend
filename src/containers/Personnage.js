import { useHistory } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";

const Personnage = ({ userToken, userId }) => {
    const history = useHistory();
    const [data, setData] = useState();
    const [dataFavoris, setDataFavoris] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [rangeBar, setRangeBar] = useState("10");
    const [pagination, setPagination] = useState(0);
    const [count, setCount] = useState();
    const [search, setSearch] = useState("");
    const [download, setDownload] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://app-marvels.herokuapp.com/character?limit=${rangeBar}&skip=${pagination}&name=${search}`
                );
                setData(response.data);
                if (userId) {
                    const responseFavoris = await axios.get(
                        `https://app-marvels.herokuapp.com/user/characters?id=${userId}`
                    );
                    setDataFavoris(responseFavoris.data);
                }
                setIsLoading(false);
                setCount(response.data.count);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [rangeBar, pagination, search, download]);

    return isLoading ? (
        <div>
            <span>downloading...</span>
            <Footer />
        </div>
    ) : (
        <div className="main">
            <input
                className="range-bar"
                type="range"
                min="5"
                max="100"
                step="5"
                value={rangeBar}
                onChange={(event) => {
                    setRangeBar(event.target.value);
                }}
            />
            <div className="title">
                <h1>Liste des Personnages</h1>
            </div>
            <input
                type="text"
                className="search"
                value={search}
                onChange={(event) => {
                    setSearch(event.target.value);
                }}
                placeholder="Recherche des personnages"
            />
            {data.results.map((elem, index) => {
                if (userToken) {
                    for (let i = 0; i < dataFavoris.length; i++) {
                        if (elem._id === dataFavoris[i].id) {
                            elem.value = true;
                        }
                    }
                }

                const functionAdd = async (
                    image,
                    name,
                    description,
                    id,
                    idCharacters
                ) => {
                    const response = await axios.post(
                        "https://app-marvels.herokuapp.com/addFavoriteCharacters",
                        {
                            img: image,
                            name: name,
                            description: description,
                            id: id,
                            _id: idCharacters,
                        }
                    );
                    console.log(response.data);
                    setDownload(!download);
                };
                return (
                    <div className="card">
                        <span
                            key={elem.id}
                            onClick={() => {
                                history.push("/persoViewComics", {
                                    id: elem._id,
                                    name: elem.title,
                                    img: `${elem.thumbnail.path}/portrait_xlarge.${elem.thumbnail.extension}`,
                                    description: elem.description,
                                    card: "comics",
                                });
                            }}
                        >
                            {" "}
                            <Card
                                userToken={userToken}
                                imgPath={elem.thumbnail.path}
                                imgExtension={elem.thumbnail.extension}
                                name={elem.name}
                                description={elem.description}
                                card={"characters"}
                            />
                        </span>

                        {userToken && (
                            <p
                                onClick={() =>
                                    functionAdd(
                                        `${elem.thumbnail.path}/portrait_xlarge.${elem.thumbnail.extension}`,
                                        elem.name,
                                        elem.description,
                                        userId,
                                        elem._id
                                    )
                                }
                                style={{
                                    color: elem.value ? "black" : "white",
                                    backgroundColor: elem.value
                                        ? "#FEAF1D"
                                        : "#000",
                                }}
                                className="add-fav"
                            >
                                + favoris
                            </p>
                        )}
                    </div>
                );
            })}
            <Footer
                setPagination={setPagination}
                pagination={pagination}
                count={count}
                rangeBar={rangeBar}
            />
        </div>
    );
};

export default Personnage;
