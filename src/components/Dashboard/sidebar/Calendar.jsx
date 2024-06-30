import React, { useState } from "react";
import CalendarPakage from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calender.css";
const Calendar = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
  };

  return (
    <div className="center">
      <CalendarPakage
        onChange={onChange}
        calendarType={"hebrew"}
        value={date}
      />
    </div>
  );
};

export default Calendar;
