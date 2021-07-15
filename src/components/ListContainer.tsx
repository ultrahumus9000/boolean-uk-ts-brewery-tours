import React from "react";
import { useState, useEffect } from "react";

import { getBreweriesByState } from "../breweryDbClient";

import BreweriesList from "./BreweriesList";

export type Brewery = {
  id: number;

  name: string;
  brewery_type: string;
  street: string;
  address_2: null | string;
  address_3: null | string;
  city: string;
  state: string;
  postal_code: string;
  phone: null | string;
  website_url: null | string;
  county_province: null | string;
};

export type AllBreweries = Brewery[];

type ListContainerProps = {
  stateInput: string;
  setCities: (arg: string[]) => void;
  filters: { selectedCities: string[]; selectedType: string };
};

type isSelectedProps = {
  city: string;
  brewery_type: string;
  name: string;
};

type EventProps = {
  target: { value: any; name: string };
};
const parseData = (allBreweries: AllBreweries) =>
  allBreweries.filter((brewery) =>
    ["micro", "regional", "brewpub"].includes(brewery["brewery_type"])
  );

const extractCities = (allBreweries: AllBreweries) =>
  allBreweries.reduce(
    (acc: string[], brewery) =>
      acc.includes(brewery.city) ? acc : [...acc, brewery.city],
    []
  );

export default function ListContainer({
  stateInput,
  setCities,
  filters: { selectedCities, selectedType },
}: ListContainerProps) {
  const [breweries, setBreweries] = useState<AllBreweries>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  const applyFilters = (allBreweries: AllBreweries) =>
    allBreweries.filter(isSelected);

  const isSelected = ({ city, brewery_type, name }: isSelectedProps) => {
    const lowerCasedInput = searchInput.toLowerCase();
    return (
      (selectedType ? selectedType === brewery_type : true) &&
      (selectedCities.length ? selectedCities.includes(city) : true) &&
      (searchInput
        ? city.toLowerCase().includes(lowerCasedInput) ||
          name.toLowerCase().includes(lowerCasedInput)
        : true)
    );
  };

  useEffect(() => {
    stateInput &&
      getBreweriesByState(stateInput).then((data) => {
        const breweries = parseData(data);
        setBreweries(breweries);
        setCities(extractCities(breweries));
      });
  }, [stateInput]);

  return (
    <>
      <h1>List of Breweries from {breweries[0]?.state || "nowhere"}</h1>
      <header className="search-bar">
        <form id="search-breweries-form" autoComplete="off">
          <label htmlFor="search-breweries">
            <h2>Search breweries:</h2>
          </label>
          <input
            id="search-breweries"
            name="search-breweries"
            value={searchInput}
            onInput={({ target }: any) => setSearchInput(target.value)}
            type="text"
          />
        </form>
      </header>
      <BreweriesList breweries={applyFilters(breweries)} />
    </>
  );
}
