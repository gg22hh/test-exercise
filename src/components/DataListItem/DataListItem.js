import React, { useRef, useState } from "react";
import { ITEMS_URL } from "../../shared/constans";
import s from "./DataListItem.module.css";

export const DataListItem = ({ date, tool, price, id, info, setInfo }) => {
    const [inputDate, setInputDate] = useState(date);
    const [inputTool, setInputTool] = useState(tool);
    const [inputPrice, setInputPrice] = useState(price);

    const changedDate = useRef();
    const changedTool = useRef();
    const changedPrice = useRef();

    const handleChangeDate = async () => {
        const updatedInfo = [...info];
        updatedInfo[id - 1] = {
            ...updatedInfo[id - 1],
            date: changedDate.current.value,
        };

        const response = await fetch(ITEMS_URL + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedInfo[id - 1]),
        });

        if (response.ok) {
            const updatedItemFromServer = await response.json();
            setInfo(
                info.map((item) => {
                    if (item.id === updatedItemFromServer.id) {
                        return updatedItemFromServer;
                    }

                    return item;
                })
            );
        } else {
            console.log(`Error`);
        }

        console.log(updatedInfo[id - 1]);
    };
    const handleChangeTool = async () => {
        const updatedInfo = [...info];
        updatedInfo[id - 1] = {
            ...updatedInfo[id - 1],
            tool: changedTool.current.value,
        };

        const response = await fetch(ITEMS_URL + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedInfo[id - 1]),
        });

        if (response.ok) {
            const updatedItemFromServer = await response.json();
            setInfo(
                info.map((item) => {
                    if (item.id === updatedItemFromServer.id) {
                        return updatedItemFromServer;
                    }

                    return item;
                })
            );
        } else {
            console.log(`Error`);
        }

        console.log(updatedInfo[id - 1]);
    };
    const handleChangePrice = async (e) => {
        const updatedInfo = [...info];
        updatedInfo[id - 1] = {
            ...updatedInfo[id - 1],
            price: changedPrice.current.value,
        };

        const response = await fetch(ITEMS_URL + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedInfo[id - 1]),
        });

        if (response.ok) {
            const updatedItemFromServer = await response.json();
            setInfo(
                info.map((item) => {
                    if (item.id === updatedItemFromServer.id) {
                        return updatedItemFromServer;
                    }

                    return item;
                })
            );
        } else {
            console.log(`Error`);
        }

        console.log(updatedInfo[id - 1]);
    };
    return (
        <tr>
            <td>
                <input
                    className={s.input}
                    type="text"
                    value={inputDate}
                    onChange={(e) => setInputDate(e.target.value)}
                    onBlur={handleChangeDate}
                    ref={changedDate}
                />
            </td>
            <td>
                <input
                    className={s.input}
                    type="text"
                    value={inputTool}
                    onChange={(e) => setInputTool(e.target.value)}
                    onBlur={handleChangeTool}
                    ref={changedTool}
                />
            </td>
            <td>
                <input
                    className={s.input}
                    type="text"
                    value={inputPrice}
                    onChange={(e) => setInputPrice(e.target.value)}
                    onBlur={handleChangePrice}
                    ref={changedPrice}
                />
            </td>
        </tr>
    );
};
