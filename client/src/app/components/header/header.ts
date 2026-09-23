import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './header.html'
})
export class Header {

  searchOpen = false;

  searchText = '';

  constructor(private router: Router) {}

  toggleSearch() {
    this.searchOpen = !this.searchOpen;
  }

  search() {

    if (this.searchText.trim()) {

      this.router.navigate(['/search'], {
        queryParams: {
          q: this.searchText
        }
      });

    }
  }
}