import react, { useState, useEffect } from "react";
import axios from "axios";
import Datatable from "./datatable/index.js";

function App() {

    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get("http://jsonplaceholder.typicode.com/posts")
            .then(response => setData(response.data)
            )
            .catch(error => console.log(error))

    }, []);

    function search(rows) {
        const columns = rows[0] && Object.keys(rows[0]);

        return rows.filter((row) =>
            columns.some(
                (column) => row[column].toString().toLowerCase().indexOf(filter.toLowerCase()) > -1
            )
        );
        /*return rows.filter(
            (row) =>
                row.title.toLowerCase().indexOf(filter) > -1 ||
                row.body.toLowerCase().indexOf(filter) > -1
        );*/
    }

    return (
        <div className="container">
            <div>
                <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />
            </div>

            <div>
                <Datatable data={search(data)} />
            </div>
        </div>
    );
}

export default App;
