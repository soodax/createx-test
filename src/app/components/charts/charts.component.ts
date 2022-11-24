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

  dateArray = Array.from(
    new Set(
      this.allCharts
        .sort(
          (a, b) =>
            <number>new Date(a.dt_date).getTime() -
            <number>new Date(b.dt_date).getTime()
        )
        .map((el) => el.dt_date)
    )
  );

  summaryOrders: number[] = [];
  summaryNew: number[] = [];
  summaryDelivered: number[] = [];
  summaryReturned: number[] = [];

  summaryArray = this.dateArray.forEach((date) => {
    let ordersTemp = 0;
    let returnedTemp = 0;
    let deliveredTemp = 0;
    let newTemp = 0;

    this.allCharts.forEach((el) => {
      if (el.dt_date === date) {
        ordersTemp += el.qty_orders;
        returnedTemp += el.qty_return;
        deliveredTemp += el.qty_delivered;
        newTemp += el.qty_new;
      }
    });

    this.summaryOrders.push(ordersTemp);
    this.summaryReturned.push(returnedTemp);
    this.summaryDelivered.push(deliveredTemp);
    this.summaryNew.push(newTemp);
  });

  //Отрисовка данных на всем отрезке времени
  ngAfterViewInit(): void {
    const sumChart = new Chart('sumChart', {
      type: 'line',
      data: {
        labels: this.dateArray,
        datasets: [
          {
            label: 'qty_orders',
            data: this.summaryOrders,
            borderWidth: 1,
          },
          {
            label: 'qty_new',
            data: this.summaryNew,
            borderWidth: 1,
          },
          {
            label: 'qty_delivered',
            data: this.summaryDelivered,
            borderWidth: 1,
          },
          {
            label: 'qty_return',
            data: this.summaryReturned,
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
