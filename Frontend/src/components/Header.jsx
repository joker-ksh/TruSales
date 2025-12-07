import React, { useRef } from "react";

export const Header = ({ setSearchQuery }) => {
  const timerRef = useRef(null); //Think of useRef as a small box that React does NOT reset on every re-render.
  //A normal variable(useState to be precise) inside the component resets every time the component re-renders.
  //Perfect to store 
  // timers (setTimeout IDs)
  // DOM references
  // previous values

  const handleChange = (e) => { //function changes on every key stroke (onchange event)
    const value = e.target.value;//get the value of the search bar

    // reset previous timer -> It will keep reseting the previous timers if changes done
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    //finally when the user stops writing in search bar
    //after this delay the search query will get set and the api call would be made.
    // set new debounce timer
    timerRef.current = setTimeout(() => {
      setSearchQuery(value);
    }, 500); // debounce delay
  };

  return (
    <header className="px-[18px] py-3 bg-white border-b border-gray-200 flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-black">
        Sales Management System
      </h1>

      <div className="w-[400px]">
        <input
          type="text"
          placeholder="Name, Phone no."
          onChange={handleChange}
          className="w-full px-3 py-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:border-gray-400 transition-colors text-sm text-gray-500 placeholder-gray-400"
        />
      </div>
    </header>
  );
};
