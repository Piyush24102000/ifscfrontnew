"use client";
import React, { useState, useEffect } from "react";

const BankGMap = (props) => {
  let bankData = props.bankData;
  /* JSON-LD */
  const jsonld = {
    "@context": "http://schema.org",
    "@type": "BankOrCreditUnion",
    name: bankData[0].bank,
    address: {
      "@type": "PostalAddress",
      streetAddress: bankData[0].address,
      addressLocality: bankData[0].city,
      addressRegion: bankData[0].state,
      addressCountry: "India",
    },
    url: bankData[0].website,
  };

  /* Main */
  let bank = bankData[0].BANK;
  let branch = bankData[0].BRANCH;
  let address = bankData[0].ADDRESS;
  let city = bankData[0].CITY;
  let centre = bankData[0].CENTRE;
  let state = bankData[0].STATE;

  const [url, setUrl] = useState("");

  useEffect(() => {
    function createGoogleMapsURL(base, queryParams) {
      const encodedQuery = encodeURIComponent(queryParams.q);
      return `${base}?width=100%25&height=600&hl=en&q=${encodedQuery}&t=&z=14&ie=UTF8&iwloc=B&output=embed`;
    }
    const baseURL = "https://maps.google.com/maps";
    const queryParams = {
      q: `${bank} ${branch} ${address}  ${state} India `,
    };
    const googleMapsURL = createGoogleMapsURL(baseURL, queryParams);
    console.log(googleMapsURL);
    setUrl(googleMapsURL);
  }, [bankData]);

  return (
    <div>
      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
      />
      {/* Main Body */}
      <iframe
        width="100%"
        height="500"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        src={url}
      ></iframe>
    </div>
  );
};
export default BankGMap;
