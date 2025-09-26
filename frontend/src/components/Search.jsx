import { SearchIcon } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const debounceTimeout = useRef(null);

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      onSearch(query);
    }, 300);
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [query, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    onSearch(query);
  };

  return (
    <div className="w-full max-w-sm">
      <form
        onSubmit={handleSubmit}
        className="flex items-center border-2 border-gray-600 rounded-2xl px-3 py-2 bg-white shadow-sm focus-within:ring-1 focus-within:ring-gray-500"
      >
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
        />
        <button type="submit" className="ml-2">
          <SearchIcon className="text-gray-600 w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default Search;
