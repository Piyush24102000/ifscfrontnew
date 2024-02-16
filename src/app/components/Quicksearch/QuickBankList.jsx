"use client"
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { logos } from "../../../../utils/bankLogos";

const QuickBankList = (props) => {
  let bankData = props.bankData || [];
  let bank = props.bank;
  let router = useRouter();

  function handleBankPage(id) {
    router.push(`/quicksearch/${bank}/bankdata/${id}`);
  }

  return (
    <div>
      {/* Main Body */}
      <div className="flex items-center justify-center py-8 px-4">
        <div className="w-full flex flex-col items-center">
          {/* <div className="lg:w-1/2 md:w-10/12 w-full flex flex-col items-center "> */}
          <div className=" bg-white  rounded-md ">
            <div className="md:flex items-center justify-between">
              <h1
                tabIndex={0}
                role="heading"
                aria-label="Product ranking"
                className="text-2xl font-medium leading-normal text-gray-800"
              >
                Banks Data
              </h1>
            </div>
          </div>

          {/* Loop Data */}
          {/* {bankData &&  bankData.length == 0 ? ( */}
          {bankData.length == 0 ? (
            <div className="flex flex-col items-center justify-center h-full mt-10">
              <Image
                src="/notfound.png"
                alt="notfound"
                height={100}
                width={100}
              />
              &nbsp;
              <p className="text-gray-500">No data found</p>
              <p className="text-gray-500">Please search above again !!!</p>
            </div>
          ) : (
            bankData.map((bank, index) => {
              let ifsc = bank._source.IFSC;
              ifsc = ifsc.slice(0, 4);
              let ifscCode = null;

              for (let i = 0; i < logos.length; i++) {
                if (logos[i][ifsc]) {
                  ifscCode = logos[i][ifsc];
                }
              }

              return (
                <div
                  key={index}
                  onClick={() => {
                    handleBankPage(bank._id);
                  }}
                  className="bg-white w-full shadow border rounded-lg mt-3 p-6 cursor-pointer"
                >
                  <div className="md:flex items-center">
                    <div className="w-20 h-20 bg-yellow-50 rounded flex flex-shrink-0 items-center justify-center">
                      {ifscCode && (
                        <img
                          src={ifscCode}
                          alt="hexa-logo"
                          className="w-full h-full rounded"
                        />
                      )}
                    </div>
                    <div className="md:ml-6 md:mt-0 mt-4 w-full">
                      <div className="flex items-center justify-between">
                        <p className="text-xl font-semibold leading-5 text-gray-800">
                          {bank._source.BANK}
                        </p>
                        <p className="text-xs font-semibold leading-3 text-indigo-700 px-4 py-2 bg-indigo-100 rounded-full">
                          IFSC: {bank._source.IFSC}
                        </p>
                      </div>
                      <p className="text-sm pt-3 text-gray-600">
                        <strong>IFSC: </strong> {bank._source.IFSC}
                      </p>
                      <p className="text-sm pt-3 text-gray-600">
                        <strong>Branch:</strong> {bank._source.BRANCH}
                      </p>
                      <p className="text-sm pt-3 text-gray-600">
                        <strong>City:</strong> {bank._source.CITY}
                        &nbsp; <strong>District:</strong>{" "}
                        {bank._source.DISTRICT}
                        &nbsp;
                        <strong>State:</strong> {bank._source.STATE}
                      </p>
                      <p className="text-sm pt-3 text-gray-600">
                        <strong>Address:</strong> {bank._source.ADDRESS}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickBankList;
