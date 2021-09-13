import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import { keyct } from './ChartData'
import { initOptions } from './ChartOptions'


// Load Highcharts modules
highchartsMap(Highcharts);


const Chart = () => {
  const [keyCity, setKeyCity] = useState({});
  const [cases, setCases] = useState([])
  const [options, setOptions] = useState({});

  // Get Map VietNam
  const getMapData = () => import(`@highcharts/map-collection/countries/vn/vn-all.geo.json`);

  // Get all City in Map
  useEffect(() => {
    const getCity = async () => {
      const res = await getMapData("vn");
      setKeyCity(res);
    };
    getCity();
  }, []);

  // Get data cases of city
  useEffect(() => {
    const getCases = async () => {
      await fetch('https://api.zingnews.vn/public/v2/corona/getChart?type=province')
        .then(res => res.json())
        .then(data => setCases(data.data.cases))
    };
    getCases();
  }, []);


  // Check if Data then return key and value of map VN
  useEffect(() => {
    if (keyCity && Object.keys(keyCity).length) {
      // Get Key(cities) cases(cities)
      const nameCity = keyct.map((feature) => feature.keyy)
      const totalCases = cases.map((val) => val.z)

      const newData = nameCity.map((key, value) => {
        return {
          key: key,
          value: totalCases[value]
        }
      });

  // styling,all cities,cases of Map 
      setOptions(() => ({
        ...initOptions,
        series: [{ ...initOptions.series[0], mapData: keyCity, data: newData }]
      }));
    }
  }, [keyCity, cases]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      constructorType={"mapChart"}
    />
  )
}

export default Chart


