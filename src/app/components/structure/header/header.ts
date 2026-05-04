import { Component, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private router = inject(Router);
  private translate = inject(TranslateService);

  isLangMenuOpen = false;
  idiomaActual = this.translate.currentLang || 'es';
  languages = ['es', 'en'];

  pageTitle = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => this.router.routerState.snapshot.root.firstChild?.data?.['title'] ?? '')
    ),
    { initialValue: this.router.routerState.snapshot.root.firstChild?.data?.['title'] ?? '' }
  );

  toggleMenu() {
    this.isLangMenuOpen = !this.isLangMenuOpen;
  }

  selectLanguage(lang: string) {
    this.translate.use(lang);
    this.idiomaActual = lang;
    this.isLangMenuOpen = false;
  }
}
