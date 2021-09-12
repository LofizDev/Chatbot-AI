import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import { cloneDeep } from "lodash";


// Load Highcharts modules
highchartsMap(Highcharts);

const initOptions = {
  chart: {
    height: "500"
  },
  title: {
    text: 'hi'
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
      [0.8, "#B71525"],
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
  const getMapData = (id) =>
    import(`@highcharts/map-collection/countries/${id}/${id}-all.geo.json`);

  useEffect(() => {
    // .then((res) => {
    //   setMapData(res);
    // })
    // .catch((err) => console.log({ err }));
    const getData = async () => {
      const res = await getMapData("vn");
      setMapData(res);
    };
    getData();
  }, []);
  const [options, setOptions] = useState({});

  useEffect(() => {
    if (mapData && Object.keys(mapData).length) {
      console.log(mapData);
      const fakeData = mapData.features.map((feature, index) => ({
        key: feature.properties["hc-key"],
        value: index
      }));

      setOptions(() => ({
        ...initOptions,
        title: {
          text: 'Bản đồ vùng dịch'
        },
        series: [{ ...initOptions.series[0], mapData: mapData, data: fakeData }]
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
