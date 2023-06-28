import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Users } from "../../services/users";
declare var google: any;

@Component({
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.css']
})
export class Chart1Component implements OnInit, AfterViewInit {
  users: Users[];
  accountStatusCount: number = 0;
  adminCount: number = 0;

  constructor(private service: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit(): void {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  getUsers() {
    this.service.getUsers().subscribe((res) => {
      this.users = res['hydra:member'];
      this.users = this.mappingUsers(res['hydra:member']);
      this.countUsers();
    });
  }

  mappingUsers(data: any[]) {
    let newUsers = data.map(item => {
      return {
        ...item
      }
    });
    return newUsers;
  }

  countUsers() {
    this.accountStatusCount = this.users.filter(user => user['accountStatus'] === 0).length;
    this.adminCount = this.users.filter(user => user['roles'].includes('ROLE_ADMIN')).length;
    this.drawChart();
  }

  drawChart(): void {
    const usersAdminCount = this.adminCount;
    const usersBlockedCount = this.accountStatusCount;

    const dataAdmin = google.visualization.arrayToDataTable([
      ['Category', 'Count', { role: 'style' }],
      ['Admin', usersAdminCount, '#e0a54d'],
      ['Total', this.users.length, 'rgb(163,199,214)'],
    ]);

    const dataBlocked = google.visualization.arrayToDataTable([
      ['Category', 'Count', { role: 'style' }],
      ['Blocked', usersBlockedCount, '#c54de0'],
      ['Total', this.users.length, 'rgb(163,199,214)'],
    ]);

    const options1 = {
      title: 'Admin',
      pieHole: 0.4,
      backgroundColor: 'transparent',
      chartArea: {
        backgroundColor: 'transparent'
      },
      slices: {
        0: { color: '#6a9f85' },
        1: { color: '#4dbfe0' },
      }
    };
    const options2 = {
      title: 'Active and Blocked user',
      pieHole: 0.4,
      backgroundColor: 'transparent',
      chartArea: {
        backgroundColor: 'transparent'
      },
      slices: {
        0: { color: '#ea738d' },
        1: { color: '#4dbfe0' },
      }
    };

    const chart = new google.visualization.PieChart(document.getElementById('chartContainer1'));
    chart.draw(dataAdmin, options1);

    const chart2 = new google.visualization.PieChart(document.getElementById('chartContainer2'));
    chart2.draw(dataBlocked, options2);
  }
}
