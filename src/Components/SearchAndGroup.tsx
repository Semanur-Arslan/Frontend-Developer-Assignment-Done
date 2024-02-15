import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";

interface SearchAndGroupComponentProps {
  onSearchAndGroup: (searchTerm: string, groupType: string) => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const SearchAndGroupComponent: React.FC<SearchAndGroupComponentProps> = ({
  onSearchAndGroup,
  setCurrentPage,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [groupType, setGroupType] = useState<string>("");
  const [warning, setWarning] = useState<string | null>(null);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  useEffect(() => {
    setCurrentPage(0);
    onSearchAndGroup(searchTerm, groupType);
    if (searchTerm.length < 3) {
      setWarning("Search term should be at least 3 characters.");
    } else {
      setWarning(null);
      
    }
  }, [searchTerm, groupType, setCurrentPage]);

  const handleSearch = () => {
    if (searchTerm.length < 3) {
      setWarning("Search term should be at least 3 characters.");
    } else {
      setWarning(null);
      onSearchAndGroup(searchTerm, groupType);
    }
  };
  return (
    <div className="table-header">
      <div className="sort">
        <label className="sort-label">Sort by</label>
        <select
          className="sort-select"
          value={groupType}
          onChange={(e) => setGroupType(e.target.value)}
        >
          <option value="">All</option>
          <option value="currency">Currency</option>
          <option value="awsRegion">Region</option>
        </select>
      </div>
      <div className="wrapper-search">
        <div className="search">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            className="searchbox"
            name="q"
            id="q"
            placeholder="Search..."
          />
          <span className="search-btn-wrap">
            <button className="search-btn" onClick={handleSearch}>
              <IoSearch />
            </button>
          </span>
        </div>

        {isInputFocused && warning && <p className="warning"> {warning} </p>}
      </div>
    </div>
  );
};

export default SearchAndGroupComponent;

