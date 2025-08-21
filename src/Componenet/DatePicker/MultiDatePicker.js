import { useState } from "react";
import DatePicker from "react-multi-date-picker";

function MultiDatePicker(props) {
  const format = "DD/MM/YYYY";

  const [dates, setDates] = useState([]);
  const { data } = props;
  const field = props.field;
  const handleChange = (dates) => {
    setDates(dates);
    data.monthlyCommuteDatesList = dates.map((date) => {
      return date.day + '-' + date.month.shortName + '-' + String(date.year).substring(2);
    });
    data[field] = dates.map((date) => {
      return date.day;
    });
  };
  return (
    <DatePicker
      multiple
      value={dates}
      sort
      onChange={handleChange}
      format={format}
      placeholder="Select Dates from Calender"
    />
  );
}

export default MultiDatePicker;