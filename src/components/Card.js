const Card = ({ imgPath, imgExtension, name, description, card }) => {
    return (
        <section
            className="container section-home liste-comics"
            style={{ cursor: card === "characters" ? "pointer" : "default" }}
        >
            <div>
                <img
                    src={`${imgPath}/portrait_xlarge.${imgExtension}`}
                    alt=""
                />
                <div>
                    <h1>{name}</h1>
                    <p className="description">{description}</p>
                </div>
            </div>
        </section>
    );
};
export default Card;
