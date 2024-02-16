import React from "react";
import Link from "next/link";
import Image from "next/image";
import QuickBankGMap from "./QuickBankGMap";
import { logos } from "../../../../utils/bankLogos";

const QuickBankData = (props) => {
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
  return (
    <div>
      <div>
        {/* Add JSON-LD to your page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
        />
        {/* Main Body */}
        {bankData.map((data) => {
          let ifsc = data.IFSC;
          ifsc = ifsc.slice(0, 4);
          let ifscCode = null;

          for (let i = 0; i < logos.length; i++) {
            if (logos[i][ifsc]) {
              ifscCode = logos[i][ifsc];
            }
          }

          return (
            <div key={Math.random()}>
              <div className="max-w-lg mx-auto bg-white rounded overflow-hidden shadow-lg p-6 mt-6">
                {/* Bank Logo at the top center */}
                <div className="flex justify-center">
                  <img
                    className="w-16 h-16 object-contain"
                    src={ifscCode}
                    alt="Bank Logo"
                  />
                </div>

                {/* Bank Name */}
                <div className="text-center text-2xl font-semibold mt-4">
                  {data.BANK}
                </div>

                {/* IFSC and other data */}
                <div className="mt-4">
                  <div className="flex justify-between">
                    <span className="">
                      <strong>IFSC: </strong>: {data.IFSC}
                    </span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="">
                      <strong>Branch: </strong> {data.BRANCH}
                    </span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="">
                      <strong>City: </strong> {data.CITY}
                    </span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="">
                      <strong>District: </strong> {data.DISTRICT}
                    </span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="">
                      <strong>State: </strong> {data.STATE}
                    </span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="">
                      <strong>Website: </strong>
                      {data.website ? (
                        <Link href={data.website}>
                          {data.website.toString()}
                        </Link>
                      ) : (
                        <p>Not Available</p>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="flex items-center">
                      <strong>UPI: </strong>&nbsp;{" "}
                      <Image
                        src="/yesmark.png"
                        alt="yesmark"
                        width={30}
                        height={30}
                      />
                    </span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="flex items-center">
                      <strong>IMPS: </strong>&nbsp;{" "}
                      <Image
                        src="/yesmark.png"
                        alt="yesmark"
                        width={30}
                        height={30}
                      />
                    </span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="flex items-center">
                      <strong>RTGS: </strong>&nbsp;{" "}
                      <Image
                        src="/yesmark.png"
                        alt="yesmark"
                        width={30}
                        height={30}
                      />
                    </span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="flex items-center">
                      <strong>NEFT: </strong>&nbsp;{" "}
                      <Image
                        src="/yesmark.png"
                        alt="yesmark"
                        width={30}
                        height={30}
                      />
                    </span>
                  </div>

                  <div className="flex justify-between mt-2">
                    <span className="flex items-center">
                      <Image
                        src="/call.png"
                        alt="call"
                        width={40}
                        height={40}
                      />
                      : &nbsp; {data.customerCare}
                    </span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="flex items-center">
                      <Image
                        src="/address.png"
                        alt="address"
                        width={40}
                        height={40}
                      />
                      : &nbsp; {data.ADDRESS}
                    </span>
                  </div>
                </div>
              </div>
              {/* Map below */}
              <QuickBankGMap bankData={bankData} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickBankData;
