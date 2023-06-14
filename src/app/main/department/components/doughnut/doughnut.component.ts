import { Component, OnInit } from '@angular/core';
import { DepartmentService } from "../../services/department.service";
import { Department } from "../../services/department";
declare const google: any;

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.css']
})
export class DoughnutComponent implements OnInit {
  departments: Department[];
  capacityDistribution: { capacity: string }[] = [];
  totalCapacity: number = 0;

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
      this.calculateCapacityDistribution();
    });
  }

  calculateCapacityDistribution() {
    const capacitySet = new Set<string>();
    let totalCapacity = 0;

    this.departments.forEach((department) => {
      capacitySet.add(department.capacity.toString());
      totalCapacity += department.capacity;
    });

    this.capacityDistribution = Array.from(capacitySet).map((capacity) => {
      return { capacity };
    });

    this.totalCapacity = totalCapacity;

    this.drawChart();
  }

  drawChart(): void {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Capacity');
    data.addColumn('number', 'Percentage');

    this.capacityDistribution.forEach(({ capacity }) => {
      const percentage = parseInt(capacity) / this.totalCapacity;
      data.addRow([capacity, percentage]);
    });

    const options = {
      title: 'Department Capacity Distribution',
      legend: 'none',
      pieHole: 0.4,
      backgroundColor: 'transparent',
      chartArea: {
        backgroundColor: 'transparent'
      }
    };

    const chart = new google.visualization.PieChart(document.getElementById('chartContainerDep'));
    chart.draw(data, options);
  }
}
