export const initOptions = {
    chart: {
      height: "500",
      map: 'countries/vn/vn-all'
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
        [0.8, "	#7A0826"]
      ]
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "center"
    },
    series: [
      {
        name: "Tổng ca nhiễm",
        joinBy: ["hc-key", "key"]
      }
    ]
  };