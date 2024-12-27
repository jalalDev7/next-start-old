import React from "react";

const SearchBar = () => {
  return (
    <section className="flex flex-col w-full ">
      <div className="flex flex-col w-full max-w-[1300px] mx-auto bg-primary text-secondary rounded-xl p-4 -translate-y-1/4 border border-secondary">
        <div className="flex flex-row w-full text-xl font-semibold gap-8">
          <div className="flex flex-col">
            <h2>Start date:</h2>
            <select className="min-w-[300px] rounded-lg text-primary p-2">
              <option>08/12/2024</option>
            </select>
          </div>
          <div className="flex flex-col">
            <h2>End date:</h2>
            <select className="min-w-[300px] rounded-lg text-primary p-2">
              <option>08/12/2024</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchBar;
