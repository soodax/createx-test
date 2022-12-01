import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ChartsService } from 'src/app/services/charts.service';
import { HostService } from 'src/app/services/host.service';
import { HOST } from '../../app.module';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  providers: [ChartsService],
})
export class ChartsComponent {
  //Получаем через конструктор доступ к сервису
  constructor(
    private chartService: ChartsService,
    private httpClient: HttpClient,
    @Inject(HOST) private hostService: HostService
  ) {}

  //Получаем сортированный массив графиков
  chartsArray = this.chartService.getSortedCharts();

  //Отрисовка данных на всем отрезке времени
  ngAfterViewInit(): void {
    //Проверка сервиса хоста
    console.log(this.hostService.getHost());

    //Проверка интерсептора
    console.log(
      this.httpClient
        .get('https://jsonplaceholder.typicode.com/todos/1')
        .subscribe((data) => console.log(data))
    );
  }
}
