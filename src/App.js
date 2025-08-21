
import './App.css';
import { useState } from 'react';
import LocationDropdown from './Componenet/DropDown/LocationDropDown';
import MonthDropdown from './Componenet/DropDown/MonthDropDown';
import YearDropdown from './Componenet/DropDown/YearDropDown';
import GeneratePdfPopup from './Componenet/Button/AnaCommute/GeneratePdfPopup';
import TcsPdfPopup from './Componenet/Button/TcsCommute/TcsPdfPopup';
import MultiDatePicker from './Componenet/DatePicker/MultiDatePicker';
import 'reactjs-popup/dist/index.css';

function App() {
  const [commuteClaimDetails, setCommuteClaimDetails] = useState({});
  const handleSubmit = () => {
  };

  const handleChange = (e) => {
    setCommuteClaimDetails({
      ...commuteClaimDetails,
      [e.target.id]: e.target.value,
    });
  };

  const handleReset = () => {
    window.location.reload();
  }

  return (
    <div>
      <div class="App">
        <h1> Generate Commute Claim PDF </h1>
        <form onSubmit={handleSubmit}>
          <label>
            Employee No
          </label>
          <input
            type="number"
            id="empNo"
            onChange={handleChange}
            placeholder="Enter Employee No"
          />
          <label>
            Employee Name
          </label>
          <input
            type="text"
            id="empName"
            onChange={handleChange}
            placeholder="Enter Employee Name"
          />
          <label>
            Month
          </label>
          <MonthDropdown data={commuteClaimDetails} />
          <label>
            Year
          </label>
          <YearDropdown data={commuteClaimDetails} />
          <div class="center-align">
            <div class="margin-align">
              <label >
                Local Conveyance
              </label>
              <label >
                From
              </label>
              <LocationDropdown data={commuteClaimDetails} field={"localConvyFrom"} />
              <label>
                To
              </label>
              <LocationDropdown data={commuteClaimDetails} field={"localConvyTo"} />
              <label >
                One-Way fare
              </label>
              <input
                type="number"
                id="localOneWayFare"
                onChange={handleChange}
                placeholder="Enter One-way Fare amount"
              />
              <label >
                Select Dates
              </label>
              <MultiDatePicker data={commuteClaimDetails} field={"localConvyDates"} />
            </div>
            <div>
              <label >
                Monthly Commute
              </label>
              <label >
                From
              </label>

              <LocationDropdown data={commuteClaimDetails} field={"monthlyCommuteFrom"} />
              <label>
                To
              </label>
              <LocationDropdown data={commuteClaimDetails} field={"monthlyCommuteTo"} />
              <label>
                One-Way fare
              </label>
              <input
                type="number"
                id="monthlyOneWayFare"
                onChange={handleChange}
                placeholder="Enter One-way Fare amount"
              />
              <label >
                Select Dates
              </label>
              <MultiDatePicker data={commuteClaimDetails} field={"monthlyCommuteDates"} />
            </div>
          </div>
        </form>
      </div>
      <div class="center-align-button padding-align">
        <GeneratePdfPopup class='ana' data={commuteClaimDetails}></GeneratePdfPopup>
        <TcsPdfPopup data={commuteClaimDetails}></TcsPdfPopup>
        <button class="button-color button" onClick={handleReset} >Reset</button>
      </div>
    </div>
  );
}

export default App;