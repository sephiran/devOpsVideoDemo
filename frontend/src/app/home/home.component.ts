import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { CountdownService } from '@app/_services/countdown.service';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  loading = false;
  date = new FormControl(new Date());
  dateTime = '';
  seconds = 0;
  message = '';

  constructor(
    private countdownService: CountdownService,
    private http: HttpClient
  ) {}

  ngOnInit() {
  }

  startCountdown() {
    this.countdownService
      .getSeconds(this.dateTime)
      .pipe(first())
      .subscribe((response) => {
        this.seconds = response.seconds;
        this.message = `Only so many seconds remaining until the big event: ${this.seconds} seconds`;

        // Jede Sekunde die Anzahl der Sekunden reduzieren
        interval(1000).subscribe(() => {
          if (this.seconds > 0) {
            this.seconds--;
            this.message = `Only so many seconds remaining until the big event: ${this.seconds} seconds`;
          }
        });
      });
  }
}
