import { AfterViewInit, Component, OnInit, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import {
  NgxMoveableModule,
  NgxMoveableComponent,
} from "ngx-moveable";

const enum Status {
  OFF = 0,
  RESIZE = 1,
  MOVE = 2
}
@Component({
  selector: 'app-resizable-draggable',
  templateUrl: './resizable-draggable.component.html',
  styleUrls: ['./resizable-draggable.component.css']
})
export class ResizableDraggableComponent implements OnInit {
  @Input('width') public width: number;
  @Input('height') public height: number;
  @Input('left') public left: number;
  @Input('top') public top: number;
  @ViewChild("box") public box: ElementRef;
  private boxPosition: { left: number, top: number };
  private containerPos: { left: number, top: number, right: number, bottom: number };
  public mouse: {x: number, y: number}
  public status: Status = Status.OFF;
  private mouseClick: {x: number, y: number, left: number, top: number}
  constructor() { }
  ngOnInit(){}
//   frame = {
//     translate: [0, 0],
//     scale: [1, 1],
// };
// onScaleStart({ set, dragStart }) {
//     set(this.frame.scale);

//     // If a drag event has already occurred, there is no dragStart.
//     dragStart && dragStart.set(this.frame.translate);
// }
// onScale({ target, scale, drag }) {
//     this.frame.scale = scale;
//     // get drag event
//     this.frame.translate = drag.beforeTranslate;
//     target.style.transform
//         = `translate(${drag.beforeTranslate[0]}px, ${drag.beforeTranslate[1]}px)`
//         + `scale(${scale[0]}, ${scale[1]})`;
// }
// onScaleEnd({ target, isDrag, clientX, clientY }) {
//     console.log("onScaleEnd", target, isDrag);
// }

}
