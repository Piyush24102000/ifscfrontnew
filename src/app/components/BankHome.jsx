import { React } from "react";
import Link from "next/link";
import Image from "next/image";
import History from "./history";
import Services from "./Services";
import { logos } from "../../../utils/bankpic";
import { actualBankNames } from "../../../utils/actualBankNames";
import Cities from "./Cities";

const BankHome = (props) => {
  let bankData = props.bankData;
  let bankName = props.bankName;
  let distName = props.distName;
  let cityName = props.cityName;

  let logoUrl;
  let logo = logos.find((item) => Object.keys(item)[0] === bankName);
  if (logo) {
    logoUrl = logo[bankName];
  }
  let history = props.bankData.History || [];
  let services = props.bankData.Services || [];

  function replaceWithActualBankName(name) {
    const lowerCaseBankName = name.toLowerCase();

    const matchedBank = actualBankNames.find((actualBankName) => {
      return actualBankName.toLowerCase().includes(lowerCaseBankName);
    });

    // If a match is found, return it; otherwise, return the original business logic bank name
    return matchedBank || name;
  }
  let actualBankName = replaceWithActualBankName(bankData.bankActualName);

  return (
    <>
      <div>
        {/* Information (We will not show other info if distName or cityName is present) */}
        {bankName && !distName && !cityName ? (
          <>
            <div className="flex flex-col items-center justify-start pt-10 pb-8 bg-gray-50">
              <Image alt="logourl" src={logoUrl} width={60} height={60} />
              <h1 className="text-5xl font-bold mb-4 text-indigo-600">
                {actualBankName}
              </h1>
              <div className="w-full mt-10 px-4 max-w-4xl">
                <div className="bg-white shadow-xl rounded-lg p-6">
                  <h3 className="text-2xl font-semibold mb-2 mt-4 text-indigo-500">
                    Introduction
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold"></span>{" "}
                    {bankData.Introduction}
                  </p>
                  {bankData.Presence ? (
                    <>
                      <h3 className="text-2xl font-semibold mb-2 mt-4 text-indigo-500">
                        Presence
                      </h3>
                      <p className="text-gray-700 mb-2">
                        <span className="font-semibold"></span>{" "}
                        {bankData.Presence}
                      </p>
                    </>
                  ) : (
                    <></>
                  )}
                  {history.length > 0 && <History history={history} />}
                  {services.length > 0 && <Services services={services} />}
                  {bankData.Conclusion ? (
                    <>
                      <h3 className="text-2xl font-semibold mb-2 mt-4 text-indigo-500">
                        Conclusion
                      </h3>
                      <p className="text-gray-700 ">
                        <span className="font-semibold text-2xl mb-6 text-indigo-500"></span>
                        {bankData.Conclusion}
                      </p>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className=" flex flex-col items-center justify-start pt-10 pb-8 bg-gray-50">
              <Image alt="logourl" src={logoUrl} width={60} height={60} />
              <h1 className="text-5xl ml-5 font-bold mb-4 text-indigo-600">
                {actualBankName}
              </h1>
              <div className="w-full mt-10 px-4 max-w-4xl">
                <div className="bg-white shadow-xl rounded-lg p-6">
                  <h3 className="text-2xl font-semibold mb-2 mt-4 text-indigo-500">
                    Introduction
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold"></span>{" "}
                    {bankData.Introduction}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Stats */}
        <div className="container mx-auto mt-10 px-4 lg:px-20">
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-800 mx-auto">
              Your Trusted Partner in Global Finance
            </h1>
            <p className="text-xl text-gray-600 mx-auto pt-5 pb-8">
              In response to changing financial landscapes, we're dedicated to
              maintaining our promise of delivering exceptional, cost-effective
              banking services. Our unwavering commitment to quality is why
              customers worldwide trust us as their banking partner.
            </p>

            {/* Adjusted container to ensure more flexibility for child components */}
            <div className="flex flex-wrap justify-center items-center bg-white mx-auto py-8">
              {bankName && !distName && !cityName ? (
                <>
                  <div className="text-center px-4">
                    <p className="text-5xl font-bold text-indigo-700">
                      {bankData.districtCount}
                    </p>
                    <p className="text-2xl text-gray-600">Districts</p>
                    <Link href={`/bank/${bankName}/districts`}>
                      <button className="inline-block bg-white transition duration-150 ease-in-out focus:outline-none rounded text-gray-800 border border-gray-300 px-6 py-2 text-sm my-2">
                        View Districts
                      </button>
                    </Link>
                  </div>
                  <div className="text-center px-4">
                    <p className="text-5xl font-bold text-indigo-700">
                      {bankData.citiesCount}
                    </p>
                    <p className="text-2xl text-gray-600">Cities</p>
                    <Link href={`/bank/${bankName}/cities`}>
                      <button className="inline-block bg-white transition duration-150 ease-in-out focus:outline-none rounded text-gray-800 border border-gray-300 px-6 py-2 text-sm my-2">
                        View Cities
                      </button>
                    </Link>
                  </div>
                </>
              ) : bankName && distName && !cityName ? (
                <div className="w-full">
                  <Cities
                    cities={bankData.distinctCities}
                    district={distName}
                    bankName={bankName}
                  />
                </div>
              ) : (
                <div className="text-center px-4">
                  <p className="text-5xl font-bold text-indigo-700">
                    {bankData.branchCount}
                  </p>
                  <p className="text-2xl text-gray-600">
                    Branches
                  </p>
                  <Link href={`/bank/${bankName}/district/${distName}/city/${cityName}/branches`}>
                    <button className="inline-block bg-white transition duration-150 ease-in-out focus:outline-none rounded text-gray-800 border border-gray-300 px-6 py-2 text-sm my-2">
                      View Branches
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default BankHome;
{
  /* <p className="text-5xl font-bold text-indigo-700 pb-1">
                            {bankData.citiesCount}
                          </p>
                          <p className="text-2xl text-gray-600 font-normal">
                            Cities
                          </p>
                          <Link
                            href={`/bank/${bankName}/district/${distName}/cities`}
                          >
                            <button className="mx-2 my-2 bg-white transition duration-150 ease-in-out focus:outline-none rounded text-gray-800 border border-gray-300 px-6 py-2 text-xs">
                              View Cities
                            </button>
                          </Link> */
}
