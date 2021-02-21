import axios from "axios";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";

const Comics = ({ userToken, userId }) => {
    const [data, setData] = useState();
    const [dataFavoris, setDataFavoris] = useState();
    const [isLoading, setIsloading] = useState(true);
    const [rangeBar, setRangeBar] = useState("10");
    const [pagination, setPagination] = useState(0);
    const [count, setCount] = useState();
    const [search, setSearch] = useState("");
    const [download, setDownload] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                `https://app-marvels.herokuapp.com//comics?limit=${rangeBar}&skip=${pagination}&title=${search}`
            );
            setData(response.data);
            if (userId) {
                const responseFavoris = await axios.get(
                    `https://app-marvels.herokuapp.com//user/comics?id=${userId}`
                );
                setDataFavoris(responseFavoris.data);
            }

            setIsloading(false);
            setCount(response.data.count);
        };
        fetchData();
    }, [rangeBar, pagination, search, download]);

    return isLoading ? (
        <div>
            <span>downloading</span>
            <Footer />
        </div>
    ) : (
        <section className="comics main">
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
                <h1>Liste des Comics</h1>
            </div>
            <input
                type="text"
                className="search"
                value={search}
                onChange={(event) => {
                    setSearch(event.target.value);
                }}
                placeholder="Recherche des comics"
            />
            {data.results.map((elem) => {
                for (let i = 0; i < dataFavoris.length; i++) {
                    if (elem._id === dataFavoris[i].id) {
                        elem.value = true;
                    }
                }

                const functionAdd = async (
                    image,
                    name,
                    description,
                    id,
                    idComics
                ) => {
                    const response = await axios.post(
                        "https://app-marvels.herokuapp.com//addFavoriteComics",
                        {
                            img: image,
                            title: name,
                            description: description,
                            id: id,
                            _id: idComics,
                        }
                    );
                    console.log(response.data);
                    setDownload(!download);
                    setDownload(!download);
                };
                return (
                    <div key={elem._id} className="card">
                        <Card
                            userToken={userToken}
                            imgPath={elem.thumbnail.path}
                            imgExtension={elem.thumbnail.extension}
                            name={elem.title}
                            description={elem.description}
                            card={"comics"}
                        />
                        {userToken && (
                            <p
                                style={{
                                    color: elem.value ? "black" : "white",
                                    backgroundColor: elem.value
                                        ? "#FEAF1D"
                                        : "#000",
                                }}
                                onClick={() =>
                                    functionAdd(
                                        `${elem.thumbnail.path}/portrait_xlarge.${elem.thumbnail.extension}`,
                                        elem.title,
                                        elem.description,
                                        userId,
                                        elem._id
                                    )
                                }
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
        </section>
    );
};

export default Comics;
