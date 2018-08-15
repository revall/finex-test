import ReactHighcharts from 'react-highcharts';
import React from "react";

const PieChart = (props) => {
  const {chartData} = props;
  const chartConfig = {

    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Процентное распределение стоимости'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          style: {
            color: 'black'
          }
        }
      }
    },
    series: [{
      name: 'Доля в стоимости',
      colorByPoint: true,
      data: chartData
    }]
  };
  return <ReactHighcharts config={chartConfig} domProps={{id: 'chartId'}}></ReactHighcharts>;
};

const dataWraper = (Component) => (props) => {
  const {data} = props;
  const sum = data.reduce((total, row) => {
    return total + row.quantity * row.basePrice;
  }, 0);

  const chartData = data.map(row => ({name: row.name, y: ((row.basePrice * row.quantity) / sum) * 100}));


  return (<PieChart chartData={chartData}/>);
};


export default dataWraper(PieChart);
