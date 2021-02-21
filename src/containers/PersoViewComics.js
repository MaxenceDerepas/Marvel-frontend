import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "../components/Card";

const PersoViewComics = ({ userToken, userId }) => {
    const location = useLocation();
    const { id, name, img } = location.state;
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://app-marvels.herokuapp.com//comics/${id}`
                );
                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [id]);

    return isLoading ? (
        <span>downloading...</span>
    ) : (
        <section className="main section-comics">
            <div>
                <img src={img} alt="" />
                <h1>{name}</h1>
            </div>
            <div>
                {data.comics.map((elem) => {
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
                    };
                    return (
                        <div key={elem._id} className="card ">
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
            </div>
        </section>
    );
};

export default PersoViewComics;
