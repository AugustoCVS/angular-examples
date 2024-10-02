import { Injectable, signal } from "@angular/core";
import { BehaviorSubject, interval } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SignalExemploService {
  // private count$ = new BehaviorSubject(1);

  private count = signal(1)

  getCount() {
    return this.count.asReadonly()
  }
}