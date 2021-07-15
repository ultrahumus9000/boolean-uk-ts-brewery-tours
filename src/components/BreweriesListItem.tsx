import React from "react";
import { useState } from "react";
import BookingForm from "./BookingForm";
import { OpenFormFunction } from "./BreweriesList";
import { postNewBooking } from "../breweryDbClient";

const initialForm = {
  firstName: "",
  lastName: "",
  date: "",
  peopleCount: "",
  time: "",
};

type BreweriesListItemProps = {
  brewery: {
    id: number;
    obdb_id: string;
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
    country: string;
    longitude: null | string;
    latitude: null | string;
    updated_at: string;
    created_at: string;
  };
  isFormOpen: boolean;
  setOpenForm: (arg: null | number | OpenFormFunction) => void;
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
}: BreweriesListItemProps) {
  const [form, setForm] = useState(initialForm);
  const updateForm = (e: any) => {
    const { name, value } = e.target;

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
            onClick={() =>
              setOpenForm((openForm) => (openForm === id ? null : id))
            }
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
          }}
          updateForm={updateForm}
          form={form}
        />
      )}
    </li>
  );
}
