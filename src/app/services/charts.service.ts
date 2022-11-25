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

  dateArray = Array.from(
    new Set(
      this.chartsArray
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

    this.chartsArray.forEach((el) => {
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

  //Метод получения изначального массива
  getCharts(): IChart[] {
    return [...this.chartsArray]
  }

  //Метод получения сгруппированного массива
  getSortedCharts(): IChart[][] {
    return [...this.sortChartsArray]
  }

  getSummaryNew(): number[] {
    return [...this.summaryNew]
  }

  getSummaryOrders(): number[] {
    return [...this.summaryOrders]
  }

  getSummaryDelivered(): number[] {
    return [...this.summaryDelivered]
  }

  getSummaryReturned(): number[] {
    return [...this.summaryReturned]
  }

  getDateArray(): string[] {
    return [...this.dateArray]
  }

}

