import React from "react";
import { useState } from "react";
import BreweriesListItem from "./BreweriesListItem";

import { AllBreweries } from "./ListContainer";

type BreweriesListProps = {
  breweries: AllBreweries;
};

export type OpenFormFunction = (arg: number) => number | null;
export default function BreweriesList({ breweries }: BreweriesListProps) {
  const [openForm, setOpenForm] = useState<number | null | OpenFormFunction>(
    null
  );

  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <article>
      <ul className="breweries-list">
        {breweries.map((brewery) => (
          <BreweriesListItem
            key={brewery.id}
            brewery={brewery}
            setOpenForm={setOpenForm}
            isFormOpen={isFormOpen}
            setIsFormOpen={setIsFormOpen}
          />
        ))}
      </ul>
    </article>
  );
}
