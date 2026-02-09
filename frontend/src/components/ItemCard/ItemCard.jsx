import dayjs from "dayjs";
import "./ItemCard.css";

const ItemCard = ({ name, quantity, unit, expirationDate }) => {
    const fixedDate = dayjs(expirationDate).format("D MMMM YYYY");
    return (
        <div className="item-main">
            <div className="item-body">
                <p>Name: {name}</p>
                <p>Quantity: {quantity}</p>
                <p>Unit: {unit}</p>
                <p>Expiration Date: {fixedDate}</p>
            </div>
        </div>
    );
};

export default ItemCard;
