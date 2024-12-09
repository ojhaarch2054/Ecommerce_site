import { useEffect, useState } from "react";
import axios from "axios";

const Everything = () => {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        console.log('effect');
        axios.get('http://localhost:3000/products')
            .then(response => {
                console.log('promise fulfilled');
                console.log('response data:', response.data);
                if (Array.isArray(response.data.products)) {
                    setLists(response.data.products);
                } else {
                    console.error("API response is not an array");
                    setLists([]);
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLists([]);
            });
    }, []);

    console.log('render', lists.length, 'items');

    const listItems = lists.map((list) => (
        <li key={list.id}>
            <h2>{list.title}</h2>
            <p>{list.description}</p>
        </li>
    ));

    return (
        <div>
            <h1>Everything</h1>
            <ul>
                {listItems}
            </ul>
        </div>
    );
}

export default Everything;