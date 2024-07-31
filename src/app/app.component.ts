import {HeaderComponent} from "./components/header/header.component";
import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {filter, interval, map, Observable, tap} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet,
    AsyncPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  interval$!: Observable<number>;

  ngOnInit() {
    this.interval$ = interval(1000).pipe(
      tap(text => this.logger(text)),
      filter(value => value % 3 === 0),
      map(value => value * value),
    );
  }

  logger(text: number) {
    console.log(`text: ${text}`);
  }
}
