import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectNewsApi } from "../stores/newsApi"
const Filter = () => {
  const { sources, categories, authors } = useSelector(selectNewsApi);
  const [sourceFilter, setSourceFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [authorFilter, setAuthorFilter] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");

  const handleSourceFilterChange = (event) => {
    setSourceFilter(event.target.value);
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleAuthorFilterChange = (event) => {
    const authorName = event.target.name;
    const isChecked = event.target.checked;

    if (isChecked) {
      setAuthorFilter([...authorFilter, authorName]);
    } else {
      setAuthorFilter(authorFilter.filter((name) => name !== authorName));
    }
  };

  const handleSearchFilterChange = (event) => {
    setSearchFilter(event.target.value);
  };

  const sourceOptions = sources && Array.isArray(sources) ? sources.map((source) => (
    <option key={source.id} value={source.id}>
      {source.name}
    </option>
  )) : null;
  

  // const categoryOptions = [{ label: "All", value: "all" }, ...categories].map(
  //   (category) => (
  //     <option key={category.id} value={category.id}>
  //       {category.name}
  //     </option>
  //   )
  // );

  // const authorCheckboxes = authors.map((author) => (
  //   <label key={author.id} className="inline-flex items-center">
  //     <input
  //       type="checkbox"
  //       className="form-checkbox"
  //       name={author.name}
  //       onChange={handleAuthorFilterChange}
  //       checked={authorFilter.includes(author.name)}
  //     />
  //     <span className="ml-2">{author.name}</span>
  //   </label>
  // ));

  return (
    <div className="flex justify-center">
      <div className="flex-1 p-4">
        <div>
            <label htmlFor="sourceFilter" className="block font-medium mb-1">
              Source
            </label>
            <select
              id="sourceFilter"
              name="sourceFilter"
              className="form-select w-full"
              value={sourceFilter}
              onChange={handleSourceFilterChange}
            >
              {sourceOptions}
            </select>
          </div>
      </div>
      {/* <div className="flex-1 p-4">
          <div className="col-span-2">
              <label htmlFor="searchFilter"className="block font-medium mb-1">Search</label>
              <div className="relative">
              <input
              id="searchFilter"
              name="searchFilter"
              type="text"
              placeholder="Search articles"
              className="form-input w-full pr-10"
              value={searchFilter}
              onChange={handleSearchFilterChange}
            />
            <button
              type="submit"
              className=" inset-y-0 right-0 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md"
              //  onClick={handleSearch}
            >
            Search
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 p-4">
        <div className="col-span-2">
            <label htmlFor="searchFilter"className="block font-medium mb-1">Search</label>
            <div className="relative">
            <input
            id="searchFilter"
            name="searchFilter"
            type="text"
            placeholder="Search articles"
            className="form-input w-full pr-10"
            value={searchFilter}
            onChange={handleSearchFilterChange}
          />
          <button
            type="submit"
            className=" inset-y-0 right-0 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md"
            //  onClick={handleSearch}
          >
          Search
          </button>
        </div>
      </div>
      </div> */}
    </div>

  )
}
export default Filter