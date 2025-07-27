import React, { useState } from "react";

const filterData = [
  {
    filterType: "Location",
    array: ["Rajkot", "Ahmedabad", "Gandhinagar", "Suredranagar"],
  },
  {
    filterType: "Job Type",
    array: ["Part-Time", "Full-Time", "Internship", "Remote"],
  },
  {
    filterType: "Salary",
    array: ["8-12K", "15-25K", "25-50k", "50-70K"],
  },
];

function FilterCard() {
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleChange = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  return (
    <div>
      <h1 className="font-bold mb-2">Job Filter</h1>
      {filterData.map((item, index) => {
        return (
          <div key={index}>
            <h2 className="font-bold">{item.filterType}</h2>
            <hr />
            <ul className="mb-3">
              {item.array.map((ele, idx) => (
                <div className="flex items-center mr-2 p-1 space-x-2" key={idx}>
                  <input
                    type="radio"
                    name={item.filterType}
                    value={ele}
                    onChange={() => handleChange(item.filterType, ele)}
                    checked={selectedFilters[item.filterType] === ele}
                  />
                  <label>{ele}</label>
                </div>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default FilterCard;
