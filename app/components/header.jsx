import * as React from "react";
import { Input } from "antd";
import '../styles/header.css'

export default function Header({ searchText, onSearchInput }) {
    return (
        <>
            <div className="search-modal">
                <Input
                    type="text"
                    value={searchText}
                    onChange={onSearchInput}
                    placeholder="Введите название фильма..."
                />
            </div>
        </>
    )
}
