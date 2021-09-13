import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";


// Load Highcharts modules
highchartsMap(Highcharts);

const initOptions = {
  chart: {
    height: "500"
  },

  mapNavigation: {
    enabled: true
  },
  colorAxis: {
    min: 0,
    stops: [
      [0.2, "#FFC4AA"],
      [0.4, "#FF8A66"],
      [0.6, "#FF392B"],
      [0.7, "#B71525"],
      [1, "	#7A0826"]
    ]
  },
  legend: {
    layout: "vertical",
    align: "right",
    verticalAlign: "center"
  },
  series: [
    {
      name: "Số ca nhiễm",
      joinBy: ["hc-key", "key"]
    }
  ]
};

const Chart = () => {
  const [mapData, setMapData] = useState({});
  const [data, setData] = useState([])
  const [map, setMap] = useState({})

  const getMapData = () =>
    import(`@highcharts/map-collection/countries/vn/vn-all.geo.json`);

  useEffect(() => {

    const getData = async () => {
      const res = await getMapData("vn");
      setMapData(res);
    };
    getData();
  }, []);
  const [options, setOptions] = useState({});


  useEffect(() => {
    if ( Object.keys(mapData).length) {
      fetch('https://api.zingnews.vn/public/v2/corona/getChart?type=province')
        .then(res => res.json())
        .then(data => {
          setData(data.data.cases)
        })


      const keyMap = mapData.features.map((feature) => feature.properties['hc-key']);
      const valueMap = data.map((val) => val.z)


      const newData = keyMap.map((key, index) => {
        return {
          value: valueMap[index],
          key: key,
        }
      });

      setOptions(() => ({
        ...initOptions,
        series: [{ ...initOptions.series[0], mapData: mapData, data: newData }]
      }));
    }
  }, [mapData]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      constructorType={"mapChart"}
    />
  )
}

export default Chart
