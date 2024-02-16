"use client";
import React, { useEffect, useState } from "react";

const QuickAtmGMap = (props) => {
  let atmData = props.atmData;

  /* JSON-LD */
  const jsonld = {
    "@context": "http://schema.org",
    "@type": "FinancialService",
    description: "Automated Teller Machine (ATM)",
    name: atmData[0].bank,
    address: {
      "@type": "PostalAddress",
      streetAddress: atmData[0].address,
      addressLocality: atmData[0].centre,
      addressRegion: atmData[0].subdistrict,
      addressCountry: "India",
    },
  }

  /* Main */
  let bank = atmData[0].bank + " ATM";
  let city = atmData[0].city;
  let subdistrict = atmData[0].subdistrict;
  let district = atmData[0].district;
  let state = atmData[0].state;

  const [url, setUrl] = useState("");

  useEffect(() => {
    function createGoogleMapsURL(base, queryParams) {
      const encodedQuery = encodeURIComponent(queryParams.q);
      return `${base}?width=100%25&height=600&hl=en&q=${encodedQuery}&t=&z=14&ie=UTF8&iwloc=B&output=embed`;
    }
    const baseURL = "https://maps.google.com/maps";
    const queryParams = {
      q: `${bank} ${city} ${subdistrict}  ${district} ${state}  `,
    };
    const googleMapsURL = createGoogleMapsURL(baseURL, queryParams);
    setUrl(googleMapsURL);
  }, [atmData]);

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

export default QuickAtmGMap;
