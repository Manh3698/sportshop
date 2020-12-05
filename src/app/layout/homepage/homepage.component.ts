import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public sliders: Array<any> = [];
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
}
