import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public sliders: Array<any> = [];
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartColor = 'blue';

  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' }
  ];
  constructor() { 
    this.sliders.push(
      {
          imagePath: 'assets/images/banner/bannerkm2.webp',
          label: 'First slide label',
          text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
      },
      {
          imagePath: 'assets/images/banner/banner1.jpg',
          label: 'Second slide label',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
          imagePath: 'assets/images/banner/banner_clb_2.jpg',
          label: 'Third slide label',
          text: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
      }
  );
  }
  
  ngOnInit(): void {
  }
  addNew(){
    
  }

}
