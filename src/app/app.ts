import { Component } from '@angular/core';
import { HeaderComponent } from './header/header';
import { BodyComponent } from './body/body';
import { FooterComponent } from './footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, BodyComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'sistema-asistencia';
}