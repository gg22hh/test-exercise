import { useEffect, useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import "./App.css";
import { AddForm } from "./components/AddForm/AddForm";
import { DataListItem } from "./components/DataListItem/DataListItem";
import { ITEMS_URL } from "./shared/constans";

function App() {
    const [info, setInfo] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        const getItems = async () => {
            const response = await fetch(ITEMS_URL);
            if (response.ok) {
                const json = await response.json();
                setInfo(json);
            } else {
                console.log("error");
            }
        };
        getItems();
    }, []);

    const dataList = info.map((item) => {
        return (
            <DataListItem
                key={item.id}
                id={item.id}
                date={item.date}
                tool={item.tool}
                price={item.price}
                info={info}
                setInfo={setInfo}
            />
        );
    });
    return (
        <div className="App">
            <div className="container">
                <div className="task">
                    <h1>Таблица</h1>
                    <table border="1" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>ДАТА</th>
                                <th>ИНСТРУМЕНТ</th>
                                <th>СТОИМОСТЬ</th>
                            </tr>
                        </thead>
                        <tbody>{dataList}</tbody>
                    </table>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="app__button"
                    >
                        Добавить
                    </button>
                    {showAddForm && (
                        <AddForm
                            info={info}
                            setInfo={setInfo}
                            setShowAddForm={setShowAddForm}
                        />
                    )}
                </div>
                <div className="schedule">
                    <BarChart width={500} height={300} data={info}>
                        <CartesianGrid strokeDasharray="6 3" />
                        <XAxis dataKey="date" />
                        <YAxis type="number" domain={[0, "auto"]} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="price" fill="teal" />
                    </BarChart>
                </div>
            </div>
        </div>
    );
}

export default App;
