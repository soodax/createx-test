import { Injectable } from '@angular/core';
import charts from '../data/charts.json'
import { IChart } from '../data/types';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor() { }

  //Берем данные из json
  chartsArray = charts

  //Инициализация сгруппированного массива для графиков
  sortChartsArray: IChart[][] = []

  //Закидываем группы данных в массив
  chartsID = Array.from(new Set(charts.map(el => el.src_office_id))).map(chartID => {
    const chartGroup = this.chartsArray.filter(chart => chart.src_office_id === chartID)
    this.sortChartsArray.push(chartGroup)    
  })

  //Метод получения изначального массива
  getCharts(): IChart[] {
    return [...this.chartsArray]
  }

  //Метод получения сгруппированного массива
  getSortedCharts(): IChart[][] {
    return [...this.sortChartsArray]
  }

}
