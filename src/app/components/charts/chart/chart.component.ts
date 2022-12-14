import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Chart, ChartItem } from 'chart.js/auto';
import { IChart } from 'src/app/data/types';
import { ChartsService } from 'src/app/services/charts.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {
  constructor(private chartService: ChartsService) {}

  //Поле для изменения фулскрина
  isFullscreen = false;

  //Получаем id графика
  @Input() id: ChartItem;

  //Получаем группу данных для графика
  @Input() chartData: IChart[];

  //В случае нажатия ESC будет сбрасываться fullscreen
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    this.isFullscreen = false;
  }

  //Метод переключения фулскрина
  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
  }

  //Отрисовка графика по ID
  ngAfterViewInit(): void {
    if (this.id === 'sumChart') {
      const sumChart = new Chart(this.id, {
        type: 'line',
        data: {
          labels: this.chartService.getDateArray(),
          datasets: [
            {
              label: 'qty_orders',
              data: this.chartService.getSummaryOrders(),
              borderWidth: 1,
            },
            {
              label: 'qty_new',
              data: this.chartService.getSummaryNew(),
              borderWidth: 1,
            },
            {
              label: 'qty_delivered',
              data: this.chartService.getSummaryDelivered(),
              borderWidth: 1,
            },
            {
              label: 'qty_return',
              data: this.chartService.getSummaryReturned(),
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
    } else {
      const chart = new Chart(this.id, {
        type: 'line',
        data: {
          labels: this.chartData.map((el) => el.dt_date),
          datasets: [
            {
              label: 'qty_orders',
              data: this.chartData.map((el) => el.qty_orders),
              borderWidth: 1,
            },
            {
              label: 'qty_new',
              data: this.chartData.map((el) => el.qty_new),
              borderWidth: 1,
            },
            {
              label: 'qty_delivered',
              data: this.chartData.map((el) => el.qty_delivered),
              borderWidth: 1,
            },
            {
              label: 'qty_return',
              data: this.chartData.map((el) => el.qty_return),
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
}
