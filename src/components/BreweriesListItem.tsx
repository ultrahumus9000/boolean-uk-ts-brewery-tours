import React, { SyntheticEvent } from "react";
import { useState } from "react";
import BookingForm from "./BookingForm";
import { OpenFormFunction } from "./BreweriesList";
import { postNewBooking } from "../breweryDbClient";
import { Brewery } from "./ListContainer";
const initialForm = {
  firstName: "",
  lastName: "",
  date: "",
  peopleCount: "",
  time: "",
};

type BreweriesListItemProps = {
  brewery: Brewery;
  isFormOpen: boolean;
  setOpenForm: (arg: null | number | OpenFormFunction) => void;
  setIsFormOpen: (arg: boolean) => void;
};

export default function BreweriesListItem({
  brewery: {
    name,
    brewery_type,
    phone,
    website_url,
    street,
    city,
    postal_code,
    id,
  },
  isFormOpen,
  setOpenForm,
  setIsFormOpen,
}: BreweriesListItemProps) {
  const [form, setForm] = useState(initialForm);
  const updateForm = (e: SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement;

    setForm((form) => ({ ...form, [name]: value }));
  };

  const clearForm = () => setForm(initialForm);

  return (
    <li>
      <h2>{name}</h2>
      <div className="type">{brewery_type}</div>
      <section className="address">
        <h3>Address:</h3>
        <p>{street}</p>
        <p>
          <strong>
            {city}, {postal_code}
          </strong>
        </p>
      </section>
      <section className="phone">
        <h3>Phone:</h3>
        <p>{phone || "N/A"}</p>
      </section>
      <section className="booking">
        {
          <button
            onClick={() => {
              setOpenForm((openForm) => (openForm === id ? null : id));
              setIsFormOpen(true);
            }}
          >
            Book a tour
          </button>
        }
      </section>
      <section className="link">
        {website_url && (
          <a href={website_url} target="_blank">
            Visit Website
          </a>
        )}
      </section>
      {isFormOpen && (
        <BookingForm
          handleSubmit={() => {
            postNewBooking({ ...form, breweryId: id });
            clearForm();
            setIsFormOpen(false);
          }}
          updateForm={updateForm}
          form={form}
        />
      )}
    </li>
  );
}
