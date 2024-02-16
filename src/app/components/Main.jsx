import Image from "next/image";
import React from "react";

const Main = () => {
  /* JSON-LD */
  const jsonld = {
    "@context": "http://schema.org",
    "@type": "WebPage",
    name: "Find Your Bank's IFSC Code and ATM Locator",
    description:
      "Search for the IFSC (Indian Financial System Code) of any bank branch in India with ease. Instantly access accurate information to facilitate hassle-free transactions.",
    provider: {
      "@type": "Organization",
      name: "Innerkore Technologies",
      url: "https://www.yourwebsite.com",
    },
    audience: {
      "@type": "Audience",
      audienceType: "Banking Customers in India",
    },
  
  };
  return (
    <div>
      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
      />
      {/* Main Body */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto">
          <div className="text-center mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
              Find Your Banks IFSC Code
            </h1>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500">
              Search for the IFSC (Indian Financial System Code) of any bank
              branch in India with ease. Instantly access accurate information
              to facilitate hassle-free transactions.
            </p>
            <div className="flex mt-6 justify-center">
              <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
            </div>
          </div>
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                <Image src="/bank.svg" alt="bank" width={55} height={55} />
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  Search by Bank
                </h2>
                <p className="leading-relaxed text-base">
                  Effortlessly find the IFSC code of any bank branch. Our
                  comprehensive database ensures accurate and up-to-date
                  information.
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                <Image src="/city.svg" alt="city" width={55} height={55} />
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  Search by City
                </h2>
                <p className="leading-relaxed text-base">
                  Locate the IFSC code of bank branches in specific cities.
                  Simplify your transactions by knowing the exact code you need.
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                <Image src="/home.svg" alt="home" width={70} height={70} />
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  Search by Branch
                </h2>
                <p className="leading-relaxed text-base">
                  Find the IFSC code of a specific bank branch by entering
                  relevant details. Simplify your transactions with accurate
                  branch information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Main;
