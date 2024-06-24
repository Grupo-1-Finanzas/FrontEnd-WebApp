import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {TheToolbarComponent} from "./smart_wallet/components/the-toolbar/the-toolbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TheToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'untitled';
  constructor(private router: Router) { }
  isLoginOrRegisterRoute() {
    const route = this.router.url;
    return route === '/login' || route === '/register' || route === '/page-not-found';
  }
}
