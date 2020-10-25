import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit, OnChanges {

  @Input() topicsPourcentage: any;
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  constructor() {

  }

  ngOnInit() {
  }

  getChartData() {
    // tslint:disable-next-line:forin
    this.pieChartLabels = [];
    this.pieChartData = [];
    const backgroundColor = [];
    for (const label in this.topicsPourcentage) {
      this.pieChartLabels.push(label);
      this.pieChartData.push(this.topicsPourcentage[label]);
      const R = Math.floor(Math.random() * (255));
      const G = Math.floor(Math.random() * (255));
      const B = Math.floor(Math.random() * (255));
      backgroundColor.push('rgba(' + R + ',' + G + ',' + B + ',0.3)');
    }
    this.pieChartColors = [{backgroundColor}];
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.getChartData();
  }

}
