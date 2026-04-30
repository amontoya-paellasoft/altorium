import { Component, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  private translate = inject(TranslateService);
  private router = inject(Router);

  pageTitle = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => this.router.routerState.snapshot.root.firstChild?.data?.['title'] ?? '')
    ),
    { initialValue: this.router.routerState.snapshot.root.firstChild?.data?.['title'] ?? '' }
  );

  isLangMenuOpen = false;
  idiomaActual = localStorage.getItem('idioma_preferido') || 'es';

  selectLanguage(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('idioma_preferido', lang);
    this.idiomaActual = lang;
    this.isLangMenuOpen = false;
  }

  toggleMenu(): void {
    this.isLangMenuOpen = !this.isLangMenuOpen;
  }

}
