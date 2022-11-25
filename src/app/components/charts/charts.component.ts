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
  // chartsArray = this.chartService.getSortedCharts();
  chartsArray = this.chartService.getSortedCharts()
  // summaryArray = this.chartService.getSummaryArray()

  // //Получаем начальный массив графиков
  // allCharts = this.chartService.chartsArray;


  //Отрисовка данных на всем отрезке времени
  ngAfterViewInit(): void {

  }
}
