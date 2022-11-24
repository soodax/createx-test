import { Component, OnInit } from '@angular/core';
import { Chart, ChartItem } from 'chart.js/auto';
import { ChartsService } from 'src/app/services/charts.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent {
  //Получаем через конструктор доступ к сервису
  constructor(private chartService: ChartsService) {}

  //Получаем сортированный массив графиков
  chartsArray = this.chartService.getSortedCharts();

  //Получаем начальный массив графиков
  allCharts = this.chartService.chartsArray;

  //Отрисовка данных на всем отрезке времени
  ngAfterViewInit(): void {
    const sumChart = new Chart('sumChart', {
      type: 'line',
      data: {
        labels: this.allCharts
          .sort((a, b) => <number>new Date(a.dt_date).getTime() - <number>new Date(b.dt_date).getTime())
          .map((el) => el.dt_date),
        datasets: [
          {
            label: 'qty_orders',
            data: this.allCharts.map((el) => el.qty_orders),
            borderWidth: 1,
          },
          {
            label: 'qty_new',
            data: this.allCharts.map((el) => el.qty_new),
            borderWidth: 1,
          },
          {
            label: 'qty_delivered',
            data: this.allCharts.map((el) => el.qty_delivered),
            borderWidth: 1,
          },
          {
            label: 'qty_return',
            data: this.allCharts.map((el) => el.qty_return),
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
