import { LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent {
  constructor(private location: LocationStrategy) {}

  ngOnInit() {}

  back = () => {
    this.location.back();
  };
}
