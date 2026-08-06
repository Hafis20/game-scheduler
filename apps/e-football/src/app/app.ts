import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'e-football-root',
  template: '<router-outlet />',
  host: { class: 'block min-h-screen' },
})
export class App {}
