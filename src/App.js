import TimeSlider, { STEPS } from "./TimeSlider";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";


export default function App() {

  const [defaultStartDate, setdefaultStartDate] = useState(moment().startOf("week"));
  const [defaultEndDate, setdefaultEndDate] = useState(moment().add(1, "week").startOf("week"));

  const onZoomInClick = () => {
    console.log(defaultStartDate);
    // todo
  }

  const onZoomOutClick = () => {

  }

  return (
    <div id="App" className="container my-3" style={{ marginTop: "200px" }}>
      <button onClick={onZoomInClick}>+</button>
      <TimeSlider
        defaultStartDate={defaultStartDate}
        defaultEndDate={defaultEndDate}
        step={STEPS["3H"]}
        maxSpan={{ days: 7 }}
      />
      <button onClick={onZoomOutClick}>-</button>
    </div>
  );
}
