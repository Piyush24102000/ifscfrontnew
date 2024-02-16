import React from "react";

const Services = (props) => {
  let services = props.services;
  return (
    <div>
      <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-4 mt-4 text-indigo-500">
          Services Offered
        </h3>
        <div className="space-y-4">
          {services.map((service, index) => {
            // Extract key and value from each service object
            const [key, value] = Object.entries(service)[0];
            return (
              <div
                key={index}
                className="flex flex-col md:flex-row justify-start items-start md:items-center"
              >
                <div className="text-lg font-medium text-gray-800 mb-2 md:mb-0 mr-4 capitalize">
                  {key}:
                </div>
                <p className="text-md text-gray-600">{value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;
