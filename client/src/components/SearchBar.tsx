
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "./Button";

export default function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get('search') || "");

  useEffect(() => {
    setInputValue(searchParams.get('search') || "");
  }, [searchParams]);
  

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    const trimmedQuery = inputValue.trim();
    
    if (trimmedQuery) {
        newParams.set('search', trimmedQuery);
    } else {
        newParams.delete('search');
    }

    setSearchParams(newParams);
  };

  useEffect(() => {
    if (inputValue === "" && searchParams.has('search')) {
        handleSearch();
    }
  }, [inputValue]);

  return (
    <nav className="sticky top-0 z-50 bg-nav-bg backdrop-blur-md border-b border-nav-border">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-start">
        <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-md">
          <input
            type="text"
            placeholder="Search tasks"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 min-w-0 px-4 py-2 rounded-full border border-nav-border shadow-md focus:outline-none focus:ring-2 focus:ring-accent bg-white text-sm"
          />
          <Button className="!px-3 sm:!px-6 py-2 flex items-center gap-2 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span >Search</span>
          </Button>
        </form>
      </div>
    </nav>
  );
}
