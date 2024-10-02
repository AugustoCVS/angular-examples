import { ChangeDetectionStrategy, Component, signal } from "@angular/core";


@Component({
  selector: 'app-onpush',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>OnPush</h1>
    <p>{{value()}}</p>
  `
})
export class OnPushTesteComponent {
  value = signal(1)

  constructor() {
    setInterval(() => {
      this.value.update(val => val + 1)
    }, 2000);
  }
}