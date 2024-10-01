import { JsonPipe } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-wallets',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './wallets.component.html',
  styleUrl: './wallets.component.scss'
})
export class WalletsComponent {

  protected exemploCount = signal(1)

  protected showCount = signal(true)
  protected computedExemplo = computed(() => {
    console.log('computed acionado')

    if (this.showCount()) {
      return `${this.exemploCount()} computed!`
    } else {
      return 'NADA'
    }
  })

  executar() {
    this.exemploCount.update(atual => atual + 1)
  }

  toggleShowCount() {
    this.showCount.update(val => !val)
  }

  constructor() {
    effect(() => {
      console.log(`ALTEROU NO EFFECT ${this.exemploCount()}`)
    })
  }

}
