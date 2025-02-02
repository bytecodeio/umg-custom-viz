import {
  Fields,
  Link,
  LookerChartUtils,
  TooltipData,
  TooltipRow,
  VisConfig,
  VisData,
} from "../types";
import React, { Fragment, useEffect, useMemo, useState, useRef } from "react";


import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import { XYChart } from "@amcharts/amcharts5/xy";

import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import {
  Chart as ChartJS,
  ArcElement,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip as ChartJsTooltip,
  LineController,
  BarController,
  ScatterController,
  ChartType,
  ChartOptions,
  Filler,
  ChartData,
  Point,
  BubbleDataPoint,
  ChartTypeRegistry,
  TooltipModel,
} from "chart.js";
import Tooltip from "./Tooltip";
import { Chart } from "react-chartjs-2";
import * as Gauge from "chartjs-gauge";
import "bootstrap/scss/bootstrap.scss";
// import Button from "react-bootstrap/Button";

import { Button, Overlay, OverlayTrigger, Popover, PopoverBody, PopoverHeader} from 'react-bootstrap';
import styled from "styled-components";
import CSS from 'csstype';

import ButtonGroup from "react-bootstrap/ButtonGroup";
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(
  LinearScale,
  ArcElement,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  ChartJsTooltip,
  LineController,
  BarController,
  Filler,
  ScatterController,
  ChartDataLabels
);





interface BarLineVisProps {
  data: VisData;
  fields: Fields;
  config: VisConfig;
  lookerCharts: LookerChartUtils;
  lookerVis?: any;
  configOptions: configOptions

}

const Styles = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');

  @import url('https://fonts.googleapis.com/css?family=Open+Sans:wght@100;300;400;500;700;900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');

  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,100;1,700&display=swap');

  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital,wght@0,300;0,400;0,500;0,600;1,100;1,700&display=swap');


  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;1,100;1,700&display=swap');
@import url("https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css");

  `;



const chartPlugins = [
  {
    id: "padding-below-legend",
    beforeInit(chart: any) {
      // Get a reference to the original fit function
      const originalFit = chart.legend.fit;

      chart.legend.fit = function fit() {

        originalFit.bind(chart.legend)();
        this.height += 10;
      };
    },
  },
];


// ChartJS.defaults.font.family = "Roboto";
ChartJS.defaults.font.size = 13;
ChartJS.defaults.color = "#262D33";


function BarLineVis({ data, fields, config, lookerCharts, lookerVis, configOptions, }: BarLineVisProps): JSX.Element {


  // config values
  const {
    isYAxisCurrency,
    showXGridLines,
    showYGridLines,
    showXAxisLabel,
    xAxisText,
    showYAxisLabel,
    yAxisText,
    textTitle,
    showKpi,
    kpiUnit,
    isStacked,
    showLineChartGradient,
    showAllValuesInTooltip,
    showPoints,
    xAxisDropdown,
    yAxisDropdown,
    symbol,
    symbol2,
    showYAxis2,
    yAxisRightDropdown,
    showYAxis2Value,
    yAxisRightValues,
    isYAxisCurrency2,
    choosePoints,
    color_range,
    yAxisLeftValues,
    firstmeasure,
    borderLine,
    hideTarget,
    writeTitle,
    showDatalabels,
    writeTooltip,
    toolOn,
    showX,
    showTwo,
    hideBox,
    hideColors,
    hideBottom,
    writeTarget,
    color_title,
    lastBar,
    titleColor,
    firstmeasure,
    fieldOptions0,
    sign,
    kpiField,
    dollar,
    percentSign,
    xFontSize,
    yFontSize,
    legendSize,
    diagonal,
    changeLegend,
    labelPercent,
    hideTitle,
    bodyStyle,
    showDifference,
    writeTargetLabel,
    targetLabel,
    showAverage,
    hideCaret,
    showDifferenceBottom,
    lineChart,
    autoData,


    dollar1,
    percentSign1,
    dollar2,
    percentSign2,
    dollar3,
    percentSign3,
    reachLeft1,
    reach2Left1,
    reach3Left1,
    reachLeft2,
    reach2Left2,
    reach3Left2,
    reach2Left3,
    reach3Left3,
    reachLeft3,
    reachRight,
    reach2Right,
    reach3Right,
    effectivenessLeft1,
    effectivenessLeft2,
    effectivenessLeft3,
    effectivenessRight,

    effectiveness2Left1,
    effectiveness2Left2,
    effectiveness2Left3,
    effectiveness2Right,

    effectiveness3Left1,
    effectiveness3Left2,
    effectiveness3Left3,
    effectiveness3Right,

    efficiencyLeft1,
    efficiencyLeft2,
    efficiencyLeft3,
    efficiencyRight,

    efficiency2Left1,
    efficiency2Left2,
    efficiency2Left3,
    efficiency2Right,

    efficiency3Left1,
    efficiency3Left2,
    efficiency3Left3,
    efficiency3Right,

    write1,
    write2,
    write3,
    write4,
    write5,
    write6,
    write7,
    write8,
    write9,
    write10,
    write11,
    write12,
    right1,
    iya1,
    reach2right1,
    reach2iya1,

    reach3right1,
    reach3iya1,
    iya2,
    right2,
    effectivenessright2,

    effectiveness2right2,
    effectiveness2iya2,
    effectiveness3right2,
    effectiveness3iya2,
    right3,
    iya3,
    effectivenessiya2,
    efficiency2right2,
    efficiency2iya2,
    efficiency3right2,
    efficiency3iya2,
    leftTitle,
      chooseDimension,
        yAxisLeftValues2
  } = config;



  // Chart type toggle
  interface ChartTypeOption {
    label: string;
    value: ChartType;
  }

  const chartTypeOptions: ChartTypeOption[] = [
    {
      label: "Bar",
      value: "bar",
    },

  ];

  const [selectedChartType, setSelectedChartType] = useState(
    chartTypeOptions[0].value
  );

  // map Looker query data to ChartJS data format
  const dimensionName = fields.dimensions[0];
  const measureName = fields.measures[0];
  const previousPeriodFieldName = fields.measures[0];

  const dimensionLabel = fields.dimensionsLabel[0];
  const measureLabel = fields.measuresLabel[0];



  const colors = config.color_range

  const background = config.color_title




const chartRef = useRef(null);








  const Content = config.yAxisLeftValues.split(",").map((d, i) => ({
    yAxisLeftValues: d,
    chooseDimension:config.chooseDimension.split(",")[i],
    yAxisLeftValues2:config.yAxisLeftValues2.split(",")[i],

    // symbol:config.symbol.split(",")[i],
    // yAxisLeftValues:config.yAxisLeftValues.split(",")[i],


  }))




  const yAxisValues = data.map(item => item[yAxisLeftValues].value)

  const yAxisValues2 = data.map(item => item[yAxisLeftValues2].value)

const xAxisValues = data.map(item => item[chooseDimension].value)

console.log(yAxisValues)

console.log(xAxisValues)


const data2 = xAxisValues.map((category, index) => {
return {
  category,
  value1: yAxisValues[index],
  value2: yAxisValues2[index]
};
});

    console.log(data2)

useEffect(() => {
  const root = am5.Root.new("chartdiv");
  const chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panY: false,
      layout: root.verticalLayout
    })
  );

  root.setThemes([am5themes_Animated.new(root)]);  

  const yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {})
    })
  );
  const xAxis = chart.xAxes.push(
    am5xy.CategoryAxis.new(root, {
      renderer: am5xy.AxisRendererX.new(root, {}),
      categoryField:  
"category"
    })
  );
  xAxis.data.setAll(data2);  


  // Create series
  const series1 = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: "Series",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value1",
      categoryXField:  
"category"
    })
  );
  series1.data.setAll(data2);  


  const series2 = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: "Series",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value2",
      categoryXField: "category"
    })
  );
  series2.data.setAll(data2);  

  chart.children.push(am5.Legend.new(root, {}));
  chart.set("cursor", am5xy.XYCursor.new(root, {}));

  chartRef.current = chart;

  return () => {
    if (chart) {
      chart.dispose();
      root.dispose();
    }
  };
}, [data2]);





  return (
    <Fragment>
    <Styles>

      <div className="d-flex flex-column align-items-center mt-1 mb-1" style={{fontFamily: bodyStyle ? bodyStyle : "'Roboto'"}}>

        <img style={{width:"60px"}} src="https://ixd-studio.wesdemo.com/idc-preschool/static/media/Collect-data.77f54676.svg"/>

        <h2 style={{color:"black", fontSize: "24px", fontWeight: "400"}}>Analytics</h2>

        </div>



      <div className="d-flex justify-content-center align-items-center across mt-1 mb-1" style={{fontFamily: bodyStyle ? bodyStyle : "'Roboto'"}}>
{data.slice(0, 1).map((item, i) => (
<p className="purple"><i class="fal fa-calendar-alt"></i>&nbsp;<span className="gray">Period End Date</span>&nbsp;&nbsp;<span className="black">{item[reach2Right].value}</span></p>
  ))}

<p className="blue"><i class="fal fa-download"></i>&nbsp;Download</p>

      </div>

      <div className="d-flex justify-content-center align-items-center across mt-2 mb-1" style={{fontFamily: bodyStyle ? bodyStyle : "'Roboto'"}}>

    {data.slice(0, 1).map((item, i) => (
      <>
    <div className="d-flex align-items-center">
    <img src="https://ca.slack-edge.com/E030KNUNZJ6-URACD97SR-b4bfc3bccff1-512"/>
    <p><span className="black">{item[reachRight].value}</span></p></div>


      <p>&nbsp;<span className="gray">Account</span>&nbsp;&nbsp;<span className="black">{item[reach2Left1].value}</span></p>



        <p>&nbsp;<span className="gray">Payee</span>&nbsp;&nbsp;<span className="black">{item[reach2Left2].value}</span></p>



              <p>&nbsp;<span className="gray">Vendor</span>&nbsp;&nbsp;<span className="black">{item[reach2Left3].value}</span></p>

</>

  ))}
      </div>

    <div id="vis-wrapper" style={{height:"2000px !important", fontFamily: bodyStyle ? bodyStyle : "'Roboto'"}}>




    <div className="blueBubble reach" style={{ backgroundColor: color_title ? background[0] : '#fff'}}>

{data.slice(0, 4).map((item, i) => (

      <>

      <div className="whiteAcross">
      <div className="d-flex flex-column">


    <p className="mt-0 mb-0" style={{color:"black !important"}}>
      {item[reachLeft1].value}
    </p>

    <p className="mb-0 mt-0 small">
    {item[reachLeft3].rendered} of Total Earnings

    </p>

      <p className="large mb-0">

     {item[reachLeft2].rendered}
      </p>
      </div>


      </div>


      </>


    ))}

    </div>

    <div className="d-flex flex-column align-items-center mt-4 mb-4" style={{fontFamily: bodyStyle ? bodyStyle : "'Roboto'"}}>
    <Button className="gradient" style={{fontFamily: bodyStyle ? bodyStyle : "'Roboto'"}}><i class="fal fa-filter"></i>&nbsp;Show Filter Options</Button>

</div>

    <div className="d-flex justify-content-between align-items-center mt-5 mb-3" style={{fontFamily: bodyStyle ? bodyStyle : "'Roboto'"}}>
<h3 id="heavy" style={{color:"black", fontWeight: "700 !important"}}>{leftTitle}</h3>

<div className="d-flex justify-content-between icons">
<i class="fal fa-chart-bar active"></i>
<i class="fal fa-chart-line"></i>
</div>

    </div>

<div id="chartdiv" ref={chartRef} style={{ width: "100%", height: "900px" }}></div>

    </div>
    </Styles>
  </Fragment>

  );
}

export default BarLineVis;
