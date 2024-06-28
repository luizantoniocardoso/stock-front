import React from "react";
import { TEChart } from "tw-elements-react";

export function Home(): JSX.Element {
  return (
    <main className='w-full'>
      <div className="max-h-11">
      <TEChart
        type="bar"
        style={{ height: "500px" }}
        data={{
          labels: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          datasets: [
            {
              label: "Traffic",
              data: [2112, 2343, 2545, 3423, 2365, 1985, 987],

            },
          
          ],
        }}
      />
      </div>  
    </main>
  );
}