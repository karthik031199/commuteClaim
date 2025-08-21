import React, { useState } from 'react';
function YearDropdown(props) {
  const { data } = props;
  const [selectedValue, setSelectedValue] = useState({});
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    data[event.target.id] = event.target.value;
  };
return (
    <div className='margin-align' >
      <select id="year" value={selectedValue} onChange={handleChange}>
        <option value="">Select Year</option>
        <option value="2025">2025</option>
        <option value="2026">2026</option>
        <option value="2027">2027</option>
        <option value="2028">2028</option>
        <option value="2029">2029</option>
        <option value="2030">2030</option>
      </select>
    </div>
  );
}

export default YearDropdown;