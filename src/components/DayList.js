import React from "react";

// impoted components
import DayListItem from "components/DayListItem"


export default function DayList(props) {

  // list of the days 
  // properties for DayListItems
  const dayList = props.days.map(item => {

    return (
      <DayListItem
        key={item.id}
        name={item.name}
        spots={item.spots}
        selected={item.name === props.day}
        setDay={props.setDay}
      />
    );
  });

  return (
    <ul>
      {dayList}
    </ul>
  );

}
