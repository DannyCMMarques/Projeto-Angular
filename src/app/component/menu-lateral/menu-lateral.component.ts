import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'src/interfaces/menuContentInterface';
import menuContentItens from 'src/utils/content/menuContent';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css'],
})
export class MenuLateralComponent {
  constructor(private router: Router) {}

  private readonly MOBILE_BREAKPOINT = 768;
  public collapsed: boolean = true;
  public menu: MenuItem[] = [];

  public isMobile(): boolean {
    return window.innerWidth <= this.MOBILE_BREAKPOINT;
  }

  public toggleCollapse(): void {
    if (!this.isMobile()) {
      this.collapsed = !this.collapsed;
    }
  }

  public menuAtivo() {
    const currentPath = window.location.pathname;
    const menuMarcado = menuContentItens.map((item) => ({
      ...item,
      active:
        item.link === '/'
          ? currentPath === '/'
          : currentPath.startsWith(item.link),
    }));
    this.menu = menuMarcado;
  }

  public handleMenu(index: number) {
    const updated = this.menu.map((item, i) => ({
      ...item,
      active: i === index,
    }));
    this.menu = updated;
    this.router.navigate([this.menu[index].link]);
  }

  ngOnInit(): void {
    if (this.isMobile()) {
      this.collapsed = true;
    }
    this.menuAtivo();
  }
}
