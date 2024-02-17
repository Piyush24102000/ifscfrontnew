"use client";
import React, { useEffect, useState } from "react";
import { sortedBanks } from "../../../utils/banks";
import { useRouter } from "next/navigation";
import { Spinner } from "flowbite-react";
import slugify from "slugify";

const Search = () => {
  /* JSON-LD */
  const jsonld = {
    "@context": "http://schema.org",
    "@type": "WebPage",
    name: "Find Your Bank's IFSC Code and ATM Locator",
    description:
      "Offering both step-by-step and quick search tools to find bank IFSC codes, ATM locations, and branch details across India. Easy and accurate way to access banking information.",
    url: "https://www.yourwebsite.com/search",
    mainEntity: {
      "@type": "SearchAction",
      target:
        "https://www.yourwebsite.com/search?bankName={bankName}&district={district}&city={city}&branch={branch}",
      "query-input": "required name=bankName",
      "query-input": "required name=districtName",
      "query-input": "required name=cityName",
      "query-input": "required name=branchName",
    },
    provider: {
      "@type": "Organization",
      name: "Innerkore Technologies",
      url: "https://www.yourwebsite.com",
    },
  };

  /* States */
  let [loading, setLoading] = useState(false);
  let [bankName, setBankName] = useState("Choose a Bank");
  let [districtName, setDistrictName] = useState("Choose a District");
  let [cityName, setCityName] = useState("Choose a City");
  let [branchName, setBranchName] = useState("Choose a Branch");
  let [quickBank, setQuickBank] = useState("");
  let [districts, setDistricts] = useState([]);
  let [cities, setCities] = useState([]);
  let [branches, setBranches] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (bankName != "Choose a Bank") {
      async function getDistrict() {
        try {
          setLoading(true);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/stepSearch/getDistrict`,
            {
              method: "POST",
              body: JSON.stringify({ bankName }),
              headers: {
                "Content-type": "application/json",
              },
            }
          );
          const returnData = await response.json();
          let sortedDistricts = returnData.data.sort();
          setDistricts(sortedDistricts);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
      getDistrict();
    }
    if (districtName != "Choose a District") {
      async function getCity() {
        try {
          setLoading(true);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/stepSearch/getCity`,
            {
              method: "POST",
              body: JSON.stringify({ bankName, districtName }),
              headers: {
                "Content-type": "application/json",
              },
            }
          );
          const returnData = await response.json();
          let sortedCities = returnData.data.sort();
          setCities(sortedCities);
        } catch (error) {
          console.error("Error fetching city:", error);
        } finally {
          setLoading(false);
        }
      }
      getCity();
    }
    if (cityName != "Choose a City") {
      async function getBranch() {
        try {
          setLoading(true);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/stepSearch/getBranch`,
            {
              method: "POST",
              body: JSON.stringify({ bankName, districtName, cityName }),
              headers: {
                "Content-type": "application/json",
              },
            }
          );
          let branchData = await response.json();
          branchData = branchData.data;
          let branches = [];
          for (let i = 0; i < branchData.length; i++) {
            branches.push(branchData[i]._source.BRANCH);
          }
          setBranches(branches);
        } catch (error) {
          console.error("Error fetching city:", error);
        } finally {
          setLoading(false);
        }
      }
      getBranch();
    }
  }, [bankName, districtName, cityName]);

  function getBankDetails() {
    /* When user gives bank and district and city and branch  */
    if (
      bankName != "Choose a Bank" &&
      districtName != "Choose a District" &&
      cityName != "Choose a City" &&
      branchName != "Choose a Branch"
    ) {
      let bank = bankName;
      bank = slugify(bank);
      let district = districtName;
      let city = cityName;
      let branch = branchName;
      router.push(
        `/bank/${bank}/district/${district}/city/${city}/branch/${branch} `
      );
      return;
    }
    /* When user gives bank and district and city */
    if (
      bankName != "Choose a Bank" &&
      districtName != "Choose a District" &&
      cityName != "Choose a City"
    ) {
      let bank = bankName;
      bank = slugify(bank);
      let district = districtName;
      let city = cityName;
      router.push(`/bank/${bank}/district/${district}/city/${city} `);
      return;
    }
    /* When user gives bank and district */
    if (bankName != "Choose a Bank" && districtName != "Choose a District") {
      let bank = bankName;
      bank = slugify(bank);
      let district = districtName;
      router.push(`/bank/${bank}/district/${district} `);
      return;
    }
    /* When user gives only bank */
    if (bankName != "Choose a Bank") {
      let bank = bankName;
      bank = slugify(bank);
      router.push(`/bank/${bank}`);
      return;
    }
  }

  function getQuickBankDetails() {
    if (quickBank.length > 0) {
      router.push(`/quicksearch/${quickBank}`);
    } else {
      alert("Please enter bank city and branch");
    }
  }
  return (
    <>
      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
      />
      {/* Main Body */}
      <section className="text-gray-600 body-font">
        <h1 className="text-3xl font-medium title-font text-gray-900 mt-10 text-center">
          Go Step-by-Step or Do Quick Search
        </h1>
        <img
          src="downarrow.png"
          width="100"
          height="100"
          alt="downarrow"
          className="mx-auto"
        />
        <div className="container px-5 py-24 -mt-20 mx-auto flex flex-wrap  justify-center">
          <div className="flex flex-wrap -m-4 w-full md:w-1/2">
            {/* Top */}
            <div className="p-4 w-full">
              <div className="flex flex-col border-2 rounded-lg border-gray-800 border-opacity-50 p-8 items-center mx-auto">
                {loading && (
                  <Spinner aria-label="Extra large spinner example" size="xl" />
                )}
                <div className="flex-grow w-full mb-4">
                  {/* Popular Bank Logos */}
                  <div className="mb-4 flex">
                    <div>
                      <img
                        alt="barodalogo"
                        src="/barodalogo.png"
                        onClick={() => {
                          setBankName("bank of baroda");
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <div>
                      <img
                        alt="idbilogo"
                        src="/idbilogo.png"
                        onClick={() => {
                          setBankName("idbi");
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <div>
                      <img
                        alt="unionlogo"
                        src="/unionlogo.png"
                        onClick={() => {
                          setBankName("union bank of india");
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <div>
                      <img
                        alt="punjablogo"
                        src="/punjablogo.png"
                        onClick={() => {
                          setBankName("punjab national bank");
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <div>
                      <img
                        alt="induslogo"
                        src="/induslogo.png"
                        onClick={() => {
                          setBankName("indusind bank");
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <div>
                      <img
                        alt="icicilogo"
                        src="/icicilogo.png"
                        onClick={() => {
                          setBankName("icici bank");
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <div>
                      <img
                        alt="sbilogo"
                        src="/sbilogo.png"
                        onClick={() => {
                          setBankName("state bank of india");
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <div>
                      <img
                        alt="hdfclogo"
                        src="/hdfclogo.png"
                        onClick={() => {
                          setBankName("hdfc bank");
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <div>
                      <img
                        alt="axislogo"
                        src="/axislogo.png"
                        onClick={() => {
                          setBankName("axis bank");
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <div>
                      <img
                        alt="kotaklogo"
                        src="/kotaklogo.png"
                        onClick={() => {
                          setBankName("kotak mahindra bank");
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <div>
                      <img
                        alt="cbilogo"
                        src="/cbilogo.png"
                        onClick={() => {
                          setBankName("central bank of india");
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <div>
                      <img
                        alt="boilogo"
                        src="/boilogo.png"
                        onClick={() => {
                          setBankName("bank of india");
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <div>
                      <img
                        alt="yeslogo"
                        src="/yeslogo.png"
                        onClick={() => {
                          setBankName("yes bank");
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </div>

                  {/* Bank Name */}
                  <div className="mb-4">
                    <label
                      htmlFor="bank"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Bank Name
                    </label>

                    <select
                      id="bank"
                      onChange={(e) => {
                        setBankName(e.target.value);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option>{bankName}</option>
                      {sortedBanks &&
                        sortedBanks.map((bank) => (
                          <option key={Math.random()}>{bank}</option>
                        ))}
                    </select>
                  </div>

                  {/* District Name */}
                  <div className="mb-4">
                    <label
                      htmlFor="district"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      District Name
                    </label>

                    <select
                      id="city"
                      onChange={(e) => setDistrictName(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option>{districtName}</option>
                      {districts.map((district) => (
                        <option key={Math.random()}>{district}</option>
                      ))}
                    </select>
                  </div>

                  {/* City Name */}
                  <div className="mb-4">
                    <label
                      htmlFor="city"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      City Name
                    </label>

                    <select
                      id="city"
                      onChange={(e) => setCityName(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option>{cityName}</option>
                      {cities.map((city) => (
                        <option key={Math.random()}>{city}</option>
                      ))}
                    </select>
                  </div>

                  {/* Branch Name */}
                  <div className="mb-4">
                    <label
                      htmlFor="branch"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Branch Name
                    </label>

                    <select
                      id="branch"
                      onChange={(e) => {
                        setBranchName(e.target.value);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option>{branchName}</option>
                      {branches.map((branch) => (
                        <option key={Math.random()}>{branch}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Search Button */}
                <button
                  onClick={() => {
                    getBankDetails();
                  }}
                  className="mx-auto px-4 py-2 focus:outline-none hover:bg-blue-200 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  Search
                </button>
              </div>
            </div>
            <div className="w-48 mt-10 mb-10 mx-auto h-1 rounded-full bg-indigo-500 inline-flex"></div>

            {/* Bottom */}
            <div className="p-4 w-full">
              <div className="flex border-2 rounded-lg border-gray-800 border-opacity-50 p-8 sm:flex-row flex-col">
                <div className="flex-grow">
                  <h2 className="text-gray-900 text-lg text-center title-font font-medium mb-3">
                    Quick Search
                  </h2>

                  {/* Search Bar */}
                  <div className="mt-4 leading-relaxed text-base relative">
                    <label
                      htmlFor="default-search"
                      className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                      Search
                    </label>
                    <div className="relative flex items-center">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </div>
                      <input
                        type="search"
                        onChange={(e) => {
                          setQuickBank(e.target.value);
                        }}
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Bank District City and Branch"
                        required
                        autoComplete="off"
                      />
                      {/* Display the button inside the input on large screens */}
                      <button
                        onClick={() => {
                          getQuickBankDetails();
                        }}
                        className="hidden md:inline-block absolute inset-y-0 end-0  bg-blue-100 hover:bg-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-100 dark:hover:bg-blue-200 dark:focus:ring-blue-300 dark:text-black"
                      >
                        Search
                      </button>
                    </div>
                    {/* Display the button below the input on small screens */}
                    <button
                      onClick={() => {
                        getQuickBankDetails();
                      }}
                      className="md:hidden block w-full mt-2 bg-blue-100 hover:bg-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-100 dark:hover:bg-blue-200 dark:focus:ring-blue-300 dark:text-black"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/*End*/}
          </div>
        </div>
      </section>
    </>
  );
};
export default Search;
