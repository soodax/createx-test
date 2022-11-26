import { Component, OnInit } from '@angular/core';
import { Chart, ChartItem } from 'chart.js/auto';
import { ChartsService } from 'src/app/services/charts.service';
import { HostService } from 'src/app/services/host.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent {
  //Получаем через конструктор доступ к сервису
  constructor(private chartService: ChartsService, private hostService: HostService) {}

  //Получаем сортированный массив графиков
  chartsArray = this.chartService.getSortedCharts()

  //Отрисовка данных на всем отрезке времени
  ngAfterViewInit(): void {
    console.log(this.hostService.getHost())
  }
}
