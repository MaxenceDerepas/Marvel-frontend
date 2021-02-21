const Footer = ({ setPagination, pagination, count, rangeBar }) => {
    const nextClick = (pagination, rangeBar, count) => {
        if (pagination * rangeBar < count - rangeBar) {
            setPagination(pagination + 1);
        }
    };

    const leadingClick = (pagination) => {
        if (pagination > 0) {
            setPagination(pagination - 1);
        }
    };

    return (
        <footer>
            <p
                onClick={() => leadingClick(pagination)}
                style={{
                    color: pagination < 1 ? "grey" : "white",
                    cursor: pagination < 1 ? "default" : "pointer",
                }}
            >
                Precedent
            </p>
            <p
                onClick={() => nextClick(pagination, rangeBar, count)}
                style={{
                    color:
                        pagination * rangeBar < count - rangeBar
                            ? "white"
                            : "grey",
                    cursor:
                        pagination * rangeBar < count - rangeBar
                            ? "pointer"
                            : "default",
                }}
            >
                Suivant
            </p>
        </footer>
    );
};

export default Footer;
