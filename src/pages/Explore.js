import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { API_URL } from "../API";
import "../App.css";
import BookList from "./BookList"; // Assuming BookList is in the same directory
import { useAppContext } from "../context/appContext"; // Replace with the actual path

const Explore = () => {
    const { favorites, addToFavorites, removeFromFavorites } = useAppContext();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [filteredData, setFilteredData] = useState([]); // Fix: Rename to avoid conflict with the function name

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setSearchResults([]);
            setFilteredData([]); // Fix: Clear filteredData when there is no search query
            return;
        }

        axios
            .get(`${API_URL}/search?title=${searchQuery}`)
            .then((res) => {
                setSearchResults(res.data);
                filterData(res.data); // Fix: Call filterData with the fetched data
            })
            .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery]);

    const filterData = (data) => { // Fix: Rename parameters for consistency
        console.log("Filtering With text: ", searchQuery);
        const filtered = data.filter((book) =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) // Fix: Use book.title instead of book.data
        );
        console.log("Filtered Data: ", filtered);
        setFilteredData(filtered);
    }

    const favoritesChecker = (id) => {
        return favorites.some((book) => book.id === id);
    };

    return (
        <div>
            <div className="search-bar">
                <input
                    className="input-box"
                    type="text"
                    placeholder="Search by title..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setFilteredData([]); // Fix: Clear filteredData when the search query changes
                    }}
                />
            </div>
            <h2 id="exp-book">Explore Books</h2>
            {searchResults.length > 0 ? (
                <ul className="book-fav">
                    {filteredData.length > 0 ? (
                        filteredData.map((book) => (
                            <li key={book.id} className="book-item">
                                <Link to={`/books/${book.id}`}>
                                    <img src={book.image_url} alt="#" className="book-image"/>
                                    <h3 id="bk-title">{book.title}</h3>
                                    <div>
                                        {favoritesChecker(book.id) ? (
                                            <button onClick={() => removeFromFavorites(book.id)}>
                                                Remove From Favorites
                                            </button>
                                        ) : (
                                            <button className="btn-fav" onClick={() => addToFavorites(book)}>
                                                Add to Favorites
                                            </button>
                                        )}
                                    </div>
                                </Link>
                            </li>
                        ))
                    ) : (
                        <p>No matching results found.</p>
                    )}
                </ul>
            ) : (
                <p></p>
            )}
            {/* Display BookList only if there are no search results */}
            {searchResults.length === 0 && <BookList />}
        </div>
    );
};

export default Explore;
