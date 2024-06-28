import { Chart } from "react-google-charts";
import { api } from '@/Enviroments';
import { useAuth, useFetch } from '@/Hooks';
import { useEffect, useState } from 'react';

export const Home = () => {
    // == pra formar os dados do chart == //
    // const data = [
    //     ["Element", "Density", { role: "style" }],
    //     ["Copper", 8.94, "#b87333"], // RGB value
    //     ["Silver", 10.49, "silver"], // English color name
    //     ["Gold", 19.3, "gold"],
    //     ["Platinum", 21.45, "color: #e5e4e2"], // CSS-style declaration
    // ];

    return (
        <div className="container mx-auto">
        <h1 className="text-center text-3xl font-bold mt-3">Home</h1>
    
        {/* <div className="grid grid-cols-12 md:grid-cols-12 gap-6 p-6">
          <div className="col-span-4 md:col-span-4">
            <div className="p-5 bg-white rounded-md shadow-md">
              <Chart chartType="ColumnChart" width="100%" height="300px" data={data} />
            </div>
          </div>
          <div className="col-span-4 md:col-span-4">
            <div className="p-5 bg-white rounded-md shadow-md">
              <Chart chartType="ColumnChart" width="100%" height="300px" data={data} />
            </div>
          </div>
          <div className="col-span-4 md:col-span-4">
            <div className="p-5 bg-white rounded-md shadow-md">
              <Chart chartType="ColumnChart" width="100%" height="300px" data={data} />
            </div>
          </div>
          <div className="col-span-8 md:col-span-8">
            <div className="p-5 bg-white rounded-md shadow-md">
              <Chart chartType="ColumnChart" width="100%" height="300px" data={data} />
            </div>
          </div>
          <div className="col-span-4 md:col-span-4">
            <div className="p-5 bg-white rounded-md shadow-md">
              <Chart chartType="ColumnChart" width="100%" height="300px" data={data} />
            </div>
          </div>
          <div className="col-span-12 md:col-span-12">
            <div className="p-5 bg-white rounded-md shadow-md">
              <Chart chartType="ColumnChart" width="100%" height="300px" data={data} />
            </div>
          </div>
        </div> */}
      </div>
    )
}