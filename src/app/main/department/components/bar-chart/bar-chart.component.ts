import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DepartmentService } from '../../services/department.service';
import { Department } from '../../services/department';

declare const google: any;

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, AfterViewInit {
  departments: Department[];
  categoryData: any[] = [];

  constructor(private service: DepartmentService) { }

  ngOnInit(): void {
    this.getDepartments();
  }

  ngAfterViewInit(): void {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  getDepartments() {
    this.service.getDepartments().subscribe((res) => {
      this.departments = res['hydra:member'];
      this.departments = this.mappingDep(res['hydra:member']);
      this.CategoryData();
      this.drawChart();
    });
  }

  mappingDep(data: any[]) {
    let newDep = data.map(item => {
      return {
        ...item
      };
    });
    return newDep;
  }

  CategoryData() {
    const categoryCounts: any = {};

    this.departments.forEach(dep => {
      const category = dep.category; // Remplacez "category" par le nom de la propriété contenant la catégorie du département
      const capacity = dep.capacity; // Remplacez "capacity" par le nom de la propriété contenant la capacité du département

      if (categoryCounts[category]) {
        categoryCounts[category] += capacity;
      } else {
        categoryCounts[category] = capacity;
      }
    });

    this.categoryData = Object.entries(categoryCounts).map(([category, count]) => [category, count]);
  }

  drawChart(): void {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Category');
    data.addColumn('number', 'Capacity');
    data.addRows(this.categoryData);

    const options = {
      title: 'Category Capacity',
      backgroundColor: 'transparent',
      chartArea: {
        backgroundColor: 'transparent'
      }
    };

    const chart = new google.visualization.ColumnChart(document.getElementById('categoryChartContainer'));
    chart.draw(data, options);
  }
}
