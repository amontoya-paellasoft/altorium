import { Component, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  private router = inject(Router);

  pageTitle = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => this.router.routerState.snapshot.root.firstChild?.data?.['title'] ?? '')
    ),
    { initialValue: this.router.routerState.snapshot.root.firstChild?.data?.['title'] ?? '' }
  );
}
