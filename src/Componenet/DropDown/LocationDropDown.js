import React, { useState } from 'react';
function LocationDropdown(props) {
  const { data } = props;
  const field  = props.field;
  const [selectedValue, setSelectedValue] = useState({});
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    data[field] = event.target.value;
  };
  return (
    <div className='margin-align' >
      <select value={selectedValue} onChange={handleChange}>
        <option value="">Select Location</option>
        <option value="Nishikasai">Nishikasai</option>
        <option value="Ojima">Ojima</option>
        <option value="Roppongi 1-chome">Roppongi 1-chome</option>
        <option value="Tenkubashi">Tenkubashi</option>
        <option value="Azabudai">Azabudai</option>
        <option value="Shinkiba">Shinkiba</option>
        <option value="Tonomachi">Tonomachi</option>
      </select>
    </div>
  );
}

export default LocationDropdown;