import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Toast, ToastPackage, ToastrService, IndividualConfig } from 'ngx-toastr';
import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export interface IToastButton {
  id: string;
  title: string;
  message: string;
};

@Component({
  selector: 'app-custom-toast',
  templateUrl: './custom-toast.component.html',
  styleUrls: ['./custom-toast.component.css'],
  animations: [
    trigger('flyInOut', [
      state('inactive', style({
        opacity: 0,
      })),
      transition('inactive => active', animate('400ms ease-out', keyframes([
        style({
          transform: 'translate3d(100%, 0, 0) skewX(-30deg)',
          opacity: 0,
        }),
        style({
          transform: 'skewX(20deg)',
          opacity: 1,
        }),
        style({
          transform: 'skewX(-5deg)',
          opacity: 1,
        }),
        style({
          transform: 'none',
          opacity: 1,
        }),
      ]))),
      transition('active => removed', animate('400ms ease-out', keyframes([
        style({
          opacity: 1,
        }),
        style({
          transform: 'translate3d(100%, 0, 0) skewX(30deg)',
          opacity: 0,
        }),
      ]))),
    ]),
  ],
  preserveWhitespaces: false
})

export class CustomToastComponent extends Toast {

  public static toastButtons: IToastButton[] = [
    {
      id: "1",
      title: "Si",
      message: "Eliminación confirmada"
    },
    {
      id: "2",
      title: "No",
      message: "Eliminación no confirmada"
    }
  ];

  constructor(
    protected override toastrService: ToastrService,
    public override toastPackage: ToastPackage,
  ) {
    super(toastrService, toastPackage);
  }

  action(btn: IToastButton) {
    event!.stopPropagation();
    this.toastPackage.triggerAction(btn);
    this.toastrService.clear();
    return false;
  }
}
