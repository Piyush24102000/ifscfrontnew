"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const QuickAtmList = (props) => {
  let atmData = props.atmData || [];
  let bank = props.bank;
  let router = useRouter();

  function handleAtmPage(id) {
    router.push(`/quicksearch/${bank}/atmdata/${id}`);
  }

  return (
    <div>
      <div>
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
                  ATM's Data
                </h1>
              </div>
            </div>

            {/* Loop Data */}
            {atmData.length == 0 ? (
              <div className="flex flex-col items-center justify-center h-full mt-10">
                <Image src="/notfound.png" height={100} width={100} />
                &nbsp;
                <p className="text-gray-500">No data found</p>
                <p className="text-gray-500">Please search above again !!!</p>
              </div>
            ) : (
              atmData.map((atm) => {
                return (
                  <div
                    key={atm._id}
                    onClick={() => {
                      handleAtmPage(atm._id);
                    }}
                    className="bg-white w-full shadow border rounded-lg mt-3 p-6 cursor-pointer"
                  >
                    <div className="md:flex items-center">
                      <div className="w-20 h-20 bg-yellow-50 rounded flex flex-shrink-0 items-center justify-center">
                        <img
                          src="/atm.png"
                          alt="atm-logo"
                          className="w-full h-full rounded"
                        />
                      </div>
                      <div className="md:ml-6 md:mt-0 mt-4 w-full">
                        <div className="flex items-center justify-between">
                          <p className="text-xl font-semibold leading-5 text-gray-800">
                            {atm._source.bank}
                          </p>
                          <p className="text-xs font-semibold leading-3 text-indigo-700 px-4 py-2 bg-indigo-100 rounded-full">
                            Code: {atm._source.part1Code}
                          </p>
                        </div>
                        <p className="text-sm pt-3 text-gray-600">
                          <strong>Code: </strong> {atm._source.part1Code}
                        </p>
                        <p className="text-sm pt-3 text-gray-600">
                          <strong>Branch:</strong> {atm._source.branch}
                        </p>
                        <p className="text-sm pt-3 text-gray-600">
                          <strong>Bank Group:</strong> {atm._source.bankgroup}
                        </p>
                        <p className="text-sm pt-3 text-gray-600">
                          <strong>City:</strong> {atm._source.centre}
                          &nbsp; <strong>Sub District: </strong>
                          {atm._source.subdistrict}
                          &nbsp; <strong>District: </strong>
                          {atm._source.district}
                          &nbsp;
                          <strong>State:</strong> {atm._source.state}
                        </p>
                        <p className="text-sm pt-3 text-gray-600">
                          <strong>Group:</strong> {atm._source.populationgroup}
                        </p>
                        <p className="text-sm pt-3 text-gray-600">
                          <strong>Address:</strong> {atm._source.address}
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
    </div>
  );
};

export default QuickAtmList;
