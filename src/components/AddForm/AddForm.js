import React, { useState } from "react";
import styles from "./AddForm.module.css";
import { ITEMS_URL } from "../../shared/constans";

export const AddForm = ({ setShowAddForm, info, setInfo }) => {
    const [date, setDate] = useState("");
    const [tool, setTool] = useState("");
    const [price, setPrice] = useState("");

    const handleClick = async (e) => {
        e.preventDefault();

        const item = {
            date: date,
            tool: tool,
            price: price,
        };

        const response = await fetch(ITEMS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
        });
        if (response.ok) {
            const newItem = await response.json();
            setInfo([...info, newItem]);
        } else {
            console.log("error");
        }

        setShowAddForm(false);
    };

    return (
        <>
            <form onSubmit={handleClick} className={styles.form}>
                <div
                    onClick={() => setShowAddForm(false)}
                    className={styles.close}
                >
                    &#10008;
                </div>
                <h1 className={styles.title}>Добавление Данных</h1>
                <div>
                    <input
                        className={styles.input}
                        type="datetime"
                        value={date}
                        placeholder="XX.XX.XXXX"
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Инструмент"
                        value={tool}
                        onChange={(e) => setTool(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        className={styles.input}
                        type="number"
                        placeholder="Стоимость"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className={styles.button}>
                    Добавить
                </button>
            </form>
            <div
                onClick={() => setShowAddForm(false)}
                className={styles.overlay}
            ></div>
        </>
    );
};
