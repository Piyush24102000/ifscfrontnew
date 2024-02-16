"use client";
import React, { useState } from "react";
import { Pagination } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";

const Branches = (props) => {
  let branches = props.branches || [];
  let city = props.city;
  let distName = props.distName;
  let bankName = props.bankName;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30; // Set how many items you want per page

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the items to show on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems;
  let totalPages;

  if (branches) {
    currentItems = branches.slice(indexOfFirstItem, indexOfLastItem);
    totalPages = Math.ceil(branches.length / itemsPerPage); // Should always be 10 given 300 items
  }
  return (
    <div>
      {/* Card component */}
      <div className=" flex items-center justify-center py-8 px-4">
        <div className="lg:w-1/2 md:w-10/12 w-full flex flex-col items-center ">
          <div className="w-full bg-white p-6 shadow rounded-md ">
            <div className="md:flex items-center justify-between">
              <h1
                tabIndex={0}
                role="heading"
                aria-label="Product ranking"
                className="text-2xl font-medium leading-normal mx-auto text-gray-800"
              >
                Branches Available in {city}
              </h1>
            </div>
          </div>
          {currentItems.map((branch, index) => (
            <div
              key={index}
              className="bg-white w-full shadow rounded-lg mt-3 p-6"
            >
              <Link
                href={`/bank/${bankName}/district/${distName}/city/${city}/branch/${branch} `              }
              >
                <div className="md:flex items-center">
                  <div className="w-20 h-20rounded flex flex-shrink-0 items-center justify-center">
                    <Image
                      src="/skyline.png"
                      height={80}
                      width={80}
                      alt="hexa-logo"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="md:ml-6 md:mt-0 mt-4 w-full ">
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-semibold leading-5 text-gray-800">
                        {branch}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/* Pagination */}
      <div className="flex overflow-x-auto sm:justify-center mb-5">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default Branches;
