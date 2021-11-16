import React from "react";

const Input = ({ placeholder, handleChange, value, name }) => {
  return (
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        {placeholder}
      </label>
      <input
        equired={true}
        name={name}
        onChange={handleChange}
        class="appearance-none border rounded w-full py-2 lg:py-5 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-700 focus:bg-gray-50     "
        id="username"
        type="text"
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export default Input;
