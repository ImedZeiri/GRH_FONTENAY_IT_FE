import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.css']
})
export class DoughnutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Sample data object
    const chartData = [
      {
        "country": "USA",
        "visits": 2025
      },
      {
        "country": "China",
        "visits": 1882
      },
      {
        "country": "Japan",
        "visits": 1809
      }
    ];

    // Create chart instance
    const chart = am4core.create("chartdiv", am4charts.XYChart);

    // Add data
    chart.data = chartData;

    // Create axes
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "visits";
    series.dataFields.categoryX = "country";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = .8;

    // Add cursor
    chart.cursor = new am4charts.XYCursor();

    // Add legend
  }

}
