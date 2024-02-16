import Image from "next/image";
import React from "react";
import QuickAtmGMap from "./QuickAtmGMap";

const QuickAtmData = (props) => {
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
  };

   /* Main */
   return (
    <div>
      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
      />
      {/* Main Body */}
      <div>
        {atmData.map((atm) => (
          <div
            key={Math.random()}
            className="max-w-lg mx-auto bg-white rounded overflow-hidden shadow-lg p-6 mt-6"
          >
            {/* Bank Name */}
            <div className="text-center text-2xl font-semibold mt-4">
              {`${atm.bank} ATM`}
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <span className="">
                  <strong>ATM No </strong>: {atm.part1Code}
                </span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="">
                  <strong>Branch: </strong> {atm.branch}
                </span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="">
                  <strong>City: </strong> {atm.centre}
                </span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="">
                  <strong>Sub-District: </strong> {atm.subdistrict}
                </span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="">
                  <strong>District: </strong> {atm.district}
                </span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="">
                  <strong>State: </strong> {atm.state}
                </span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="">
                  <strong>Population Group: </strong> {atm.populationgroup}
                </span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="">
                  <strong>Region: </strong> {atm.region}
                </span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="flex items-center">
                  <Image
                    src="/address.png"
                    alt="addresspic"
                    width={40}
                    height={40}
                  />
                  : &nbsp;
                  {atm.address}
                </span>
              </div>
            </div>
          </div>
        ))}
        {/* Map below */}
        <QuickAtmGMap atmData={atmData} />;
      </div>
    </div>
  );
};

export default QuickAtmData;
