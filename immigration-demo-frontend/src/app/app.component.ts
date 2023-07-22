import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'immigration-demo-frontend';
  showIframeComponent = true;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private themeService: NbThemeService
  ) { }

  ngOnInit() {
    this.breakpointObserver.observe([
      Breakpoints.XSmall, // 'xs' breakpoint
      Breakpoints.Small,  // 'sm' breakpoint
    ]).subscribe(result => {
      if (result.matches) {
        // Apply styles for small screens (xs and sm)
        // this.themeService.changeTheme('small-theme');
        this.showIframeComponent = false; // Set showComponent to false for small screens (xs and sm)
      } else {
        // Apply styles for medium, large, and extra-large screens
        // this.themeService.changeTheme('default');
        this.showIframeComponent = true; // Set showComponent to true for medium, large, and extra-large screens
      }
    });
  }


}
