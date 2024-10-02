import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

import { OnPushTesteComponent } from '../../components/onpush/onpush.component';
import { SignalExemploService } from '../../core/service/signals/signal-exemplo.service';

@Component({
  selector: 'app-wallets',
  standalone: true,
  imports: [JsonPipe, OnPushTesteComponent, AsyncPipe],
  templateUrl: './wallets.component.html',
  styleUrl: './wallets.component.scss'
})
export class WalletsComponent {

  private signalService = inject(SignalExemploService)
  protected exemploCount = signal(1)
  protected showCount = signal(true)
  protected exemploCount$ = toObservable(this.exemploCount)
  protected exemploObservableToSignal = toSignal(this.exemploCount$)

  constructor() {
    effect(() => {
      console.log(`ALTEROU NO EFFECT ${this.exemploCount()}`)
    })
  }

  protected computedExemplo = computed(() => {
    console.log('computed acionado')

    if (this.showCount()) {
      return `${this.exemploCount()} computed!`
    } else {
      return 'NADA'
    }
  })

  meuObs$ = this.signalService.getCount()

  executar() {
    this.exemploCount.update(atual => atual + 1)
  }

  toggleShowCount() {
    this.showCount.update(val => !val)
  }

}
