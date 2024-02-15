import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "graphql-tag";
import SearchAndGroupComponent from "./SearchAndGroup";
import TableFooter from "./TableFooter";


const COUNTRIES_QUERY = gql`
  query GetCountries {
    countries {
      name
      native
      capital
      emoji
      currency
      awsRegion
      languages {
        code
        name
      }
    }
  }
`;

const CountriesList: React.FC = () => {
  const { loading, error, data } = useQuery(COUNTRIES_QUERY);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [groupType, setGroupType] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const currentItems: any[] = [];


  useEffect(() => {
    if (itemsPerPage < 10) {
      setSelectedItem(currentItems[itemsPerPage - 1]?.name || "");
    } else {
      if (currentItems.length > 9) {
        setSelectedItem(currentItems[9].name);
      } else if (currentItems.length > 0) {
        setSelectedItem(currentItems[currentItems.length - 1].name);
      } else {
        setSelectedItem("");
      }
    }
  }, [itemsPerPage, data, groupType, searchTerm]);



  if (loading)  {
    return (
        <div className="wrapper">
            <div className="loader">
          <div className="bar"></div>
        </div>
        <h3>Loading...</h3>
        </div>
    )
  };
  if (error) return <p>Error: {error.message}</p>;

  const handleSearchAndGroup = (
    searchTerm: string,
    groupType: string
  ): void => {
    setSearchTerm(searchTerm);
    setGroupType(groupType);
  };

  const filteredData = data.countries.filter((country: { name: string }) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedData = groupType
    ? filteredData.reduce((acc: any, country: any) => {
        const groupValue = country[groupType];
        if (!acc[groupValue]) {
          acc[groupValue] = [];
        }
        acc[groupValue].push(country);
        return acc;
      }, {})
    : { all: filteredData };

  for (const key in groupedData) {
    if (Object.prototype.hasOwnProperty.call(groupedData, key)) {
      currentItems.push(...groupedData[key]);
    }
  }

  const handlePageChange = (newPage: number): void => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedValue: number = Number(event.target.value);
    setItemsPerPage(selectedValue);
    setCurrentPage(0);
  };

  const handleRowClick = (countryName: string): void => {
    if (selectedItem.includes(countryName)) {
      setSelectedItem("");
    } else {
      setSelectedItem(countryName);
    }
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    countryName: string
  ): void => {
    setSelectedItem(event.target.checked ? countryName : "");
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItemsOnPage = currentItems.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPageCount = Math.ceil(data.countries.length / itemsPerPage);

  return (
    <div className="single-page">
      <SearchAndGroupComponent onSearchAndGroup={handleSearchAndGroup} setCurrentPage={setCurrentPage}/>
      <div className="table-div">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Country Name</th>
              <th>Capital</th>
              <th>Region</th>

              <th>Currency</th>
              <th>Languages</th>
            </tr>
          </thead>
          <tbody>
            {currentItemsOnPage.map((country: any) => (
              <tr
                key={country.name}
                onClick={() => handleRowClick(country.name)}
                className={selectedItem === country.name ? "selected-row" : ""}
              >
                <td>
                  <input
                    className="check-box"
                    type="checkbox"
                    checked={selectedItem.includes(country.name)}
                    onChange={(e) => handleCheckboxChange(e, country.name)}
                  />
                </td>
                <td>
                  <span className="emoji">{country.emoji}</span>
                  {country.name}
                </td>
                <td>{country.capital}</td>
                <td>{country.awsRegion}</td>

                <td>{country.currency}</td>
                <td>
                  {country.languages
                    .map((language: any) => language.name)
                    .join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TableFooter
        currentPage={currentPage}
        totalPageCount={totalPageCount}
        handlePageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        indexOfFirstItem={indexOfFirstItem}
        indexOfLastItem={indexOfLastItem}
        totalCount={data.countries.length}
        handleItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
};

export default CountriesList;
