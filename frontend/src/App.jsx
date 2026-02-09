import { useEffect, useState } from "react";
import ItemCard from "./components/ItemCard/ItemCard.jsx";

const App = () => {
    const [pantryItems, setPantryItems] = useState([]);

    useEffect(() => {
        fetch("/api/v1/items")
            .then((data) => data.json())
            .then((json) => setPantryItems(json))
            .catch((error) => console.log(error));
    }, []);

    console.log(pantryItems);

    return (
        <>
            <div className="card-container">
                {pantryItems.map((item) => (
                    <ItemCard key={item.id} {...item} />
                ))}
            </div>
        </>
    );
};

export default App;
