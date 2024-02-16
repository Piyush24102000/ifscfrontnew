import React from "react";

const History = (props) => {
  let history = props.history;
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-6 mx-auto flex flex-wrap">
          {history.map((item, index) => {
            const [year, description] = item.split(/:(.+)/);
            return (
              <div
                key={index}
                className="flex relative pb-10 sm:items-center md:w-2/3 mx-auto"
              >
                <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm"></div>
                <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                  <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                    <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">
                    {year.trim()}
                    </h2>
                    <p className="leading-relaxed">{description.trim()}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default History;
