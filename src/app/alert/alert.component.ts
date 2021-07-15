import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

import { Alert } from './alert.model';
import { AlertService } from './alert.service';

@Component({ selector: 'alert', templateUrl: 'alert.component.html', styleUrls: ['alert.component.scss'] })
export class AlertComponent implements OnInit, OnDestroy {
  @Input() id = 'default-alert';
  @Input() fade = true;

  alerts: Alert[] = [];
  alertSubscription: Subscription = new Subscription();
  //routeSubscription: Subscription;

  constructor(private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    // subscribe to new alert notifications
    this.alertSubscription = this.alertService.onAlert(this.id)
      .subscribe(alert => {
        // clear alerts when an empty alert is received
        if (!alert.message) {
          return;
        }

        // add alert to array
        this.alerts.push(alert);
      });
  }

  ngOnDestroy() {
    // unsubscribe to avoid memory leaks
    this.alertSubscription.unsubscribe();
    //this.routeSubscription.unsubscribe();
  }

  removeAlert(alert: Alert) {
    // check if already removed to prevent error on auto close
    if (!this.alerts.includes(alert)) return;

    // remove alert after faded out
    setTimeout(() => {
      this.alerts = this.alerts.filter(x => x !== alert);
    }, 250);
  }

  cssClass(alert: Alert) {
    if (!alert) return;

    const classes = ['alert', 'alert-dismissable'];




    classes.push('fade');


    return classes.join(' ');
  }
}