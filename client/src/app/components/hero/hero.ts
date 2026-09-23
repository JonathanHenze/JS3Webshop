import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html'
})
export class Hero {

  @Input() title = '';
  @Input() text = '';
  @Input() buttonText = '';

}