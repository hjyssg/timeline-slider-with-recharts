import { useCallback, useEffect, useMemo, useState } from "react";
import moment from "moment";
import TimeRange from "./react-timeline-range-slider-master";
import DarkAreaChart from "./DarkAreaChart";
import "./TimeSlider.css";



export const STEPS = {
  "30M": 1800000,
  "1H": 3600000,
  "3H": 10800000,
  "6H": 21600000,
  "12H": 43200000,
  "24H": 86400000,
  "7D": 604800000
};

//TODO 
// 传入chart data
// 传入时间类型 day week month和对应的tick render
// 给出select range onchange
export default function TimeSlider({
  defaultStartDate,
  defaultEndDate,
  step = 1800000,
  maxSpan = { days: 7 }
}) {
  const [error, setError] = useState(false);
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [selectedInterval, setSelectedInterval] = useState([
    startDate,
    endDate
  ]);
  const [data, setData] = useState([]);

  function errorHandler({ error }) {
    setError(error);
  }

  function onChangeCallback(selectedInterval) {
    setSelectedInterval(selectedInterval);
  }

  function formatTick(ms) {
    switch (step) {
      case STEPS["30M"]:
      case STEPS["1H"]:
        return moment(ms).format("MMM DD h:mm A");
      case STEPS["3H"]:
      case STEPS["6H"]:
      case STEPS["12H"]:
      case STEPS["24H"]:
      case STEPS["7D"]:
        // return moment(ms).format("MMM DD h:mm A");
        return moment(ms).format("MMDDh:mm");

      default:
        return;
    }
  }

  useEffect(() => {
    // setData(generateFakeData(startDate, endDate, step));
  }, [startDate, endDate, step]);

  // const modifiedData = useMemo(() => {
  //   const modifiedData = { ...data };
  //   modifiedData.datasets = modifiedData.datasets.map((dataset) => {
  //     return {
  //       ...dataset,
  //     };
  //   });

  //   return modifiedData;
  // }, [selectedInterval, data]);

  function changeDates(e, picker) {
    setStartDate(picker.startDate);
    setEndDate(picker.endDate);
    setSelectedInterval([picker.startDate, picker.endDate]);
  }

  return (
    <>
      <div className="timeslider row gx-0">
        <div className="col-8" style={{ position: "relative" }}>
          <TimeRange
            error={error}
            ticksNumber={4}
            step={step}
            selectedInterval={selectedInterval}
            timelineInterval={[startDate, endDate]}
            onUpdateCallback={errorHandler}
            onChangeCallback={onChangeCallback}
            disabledIntervals={[]}
            formatTick={formatTick}
          />
          <div
            style={{
              height: "calc(100px - 30px)",
              width: "calc(100% - 50px)",

              // height: "100%",
              // width: "100%",
              position: "absolute",
              top: "20px",
              left: "25px"
            }}
          >
            <DarkAreaChart />
          </div>

        </div>
      </div>
      <pre>
        Start Date: {moment(startDate).format("MMM DD")} <br />
        End Date: {moment(endDate).format("MMM DD")} <br />
        Start Interval: {moment(selectedInterval[0]).format(
          "MMM DD h:mm a"
        )}{" "}
        <br />
        End Interval:{moment(selectedInterval[1]).format("MMM DD h:mm a")}
      </pre>
    </>
  );
}
