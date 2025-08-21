import React, { useState } from 'react';
function MonthDropdown(props) {
  const { data } = props;
  const [selectedValue, setSelectedValue] = useState({});
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    data[event.target.id] = event.target.value;
  };
  return (
    <div className='margin-align'>
      <select id="month" value={selectedValue} onChange={handleChange}>
        <option value="">Select Month</option>
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        <option value="April">April</option>
        <option value="May">May</option>
        <option value="June">June</option>
        <option value="July">July</option>
        <option value="August">August</option>
        <option value="Septemper">Septemper</option>
        <option value="October">October</option>
        <option value="November">November</option>
        <option value="December">December</option>

      </select>
    </div>
  );
}

export default MonthDropdown;