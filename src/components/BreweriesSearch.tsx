import React, { SyntheticEvent } from "react";
import { useState } from "react";

import ListContainer from "./ListContainer";
import FilterContainer from "./FilterContainer";

type SearchInputProps = {
  searchInput: string;
};

// export type EventArg = {
//   target: {
//     name: string;
//     value: string | [];
//     checked?: boolean;
//     type?: string;
//   };
// };

export default function BreweriesSearch({ searchInput }: SearchInputProps) {
  const [cities, setCities] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    selectedCities: [],
    selectedType: "",
  });

  const updateFilters = (e: SyntheticEvent) => {
    let { name, value, checked, type } = e.target as HTMLInputElement;
    let updatedName;
    if (type === "checkbox") {
      updatedName = checked
        ? [...filters.selectedCities, value]
        : filters.selectedCities.filter((c) => c !== value);

      console.log(value);
      setFilters({ ...filters, [name]: updatedName });
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };
  return (
    <main className="main-search">
      <ListContainer
        stateInput={searchInput}
        setCities={setCities}
        filters={filters}
      />
      <FilterContainer
        cities={cities}
        filterSelections={filters}
        updateFilter={updateFilters}
      />
    </main>
  );
}
