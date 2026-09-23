import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-spot',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './spot.html'
})
export class Spot {

  @Input() title = '';
  @Input() image = '';
  @Input() link = '';

}