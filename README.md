# Snapface

```TypeScript
import { Component } from '@angular/core';
import { of, merge } from 'rxjs';
import { mergeMap, concatMap, exhaustMap, switchMap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="runMergeMapSource1()">MergeMap Source 1</button>
    <button (click)="runMergeMapSource2()">MergeMap Source 2</button>
    <button (click)="runConcatMapSource1()">ConcatMap Source 1</button>
    <button (click)="runConcatMapSource2()">ConcatMap Source 2</button>
    <button (click)="runExhaustMapSource1()">ExhaustMap Source 1</button>
    <button (click)="runExhaustMapSource2()">ExhaustMap Source 2</button>
    <button (click)="runSwitchMapSource1()">SwitchMap Source 1</button>
    <button (click)="runSwitchMapSource2()">SwitchMap Source 2</button>
  `
})
export class AppComponent {
  private simulateHttp(id: number, source: string) {
    return of(`Résultat ${id} de ${source}`).pipe(delay(1000 * id));
  }

  runMergeMapSource1() {
    of(1, 2, 3).pipe(
      mergeMap(id => this.simulateHttp(id, 'Source 1'))
    ).subscribe(result => console.log('MergeMap:', result));
  }

  runMergeMapSource2() {
    of(1, 2, 3).pipe(
      mergeMap(id => this.simulateHttp(id, 'Source 2'))
    ).subscribe(result => console.log('MergeMap:', result));
  }

  runConcatMapSource1() {
    of(1, 2, 3).pipe(
      concatMap(id => this.simulateHttp(id, 'Source 1'))
    ).subscribe(result => console.log('ConcatMap:', result));
  }

  runConcatMapSource2() {
    of(1, 2, 3).pipe(
      concatMap(id => this.simulateHttp(id, 'Source 2'))
    ).subscribe(result => console.log('ConcatMap:', result));
  }

  runExhaustMapSource1() {
    of(1, 2, 3).pipe(
      exhaustMap(id => this.simulateHttp(id, 'Source 1'))
    ).subscribe(result => console.log('ExhaustMap:', result));
  }

  runExhaustMapSource2() {
    of(1, 2, 3).pipe(
      exhaustMap(id => this.simulateHttp(id, 'Source 2'))
    ).subscribe(result => console.log('ExhaustMap:', result));
  }

  runSwitchMapSource1() {
    of(1, 2, 3).pipe(
      switchMap(id => this.simulateHttp(id, 'Source 1'))
    ).subscribe(result => console.log('SwitchMap:', result));
  }

  runSwitchMapSource2() {
    of(1, 2, 3).pipe(
      switchMap(id => this.simulateHttp(id, 'Source 2'))
    ).subscribe(result => console.log('SwitchMap:', result));
  }
}
```

## Résultats Attendus

### mergeMap:
Si vous cliquez sur les boutons "MergeMap Source 1" et "MergeMap Source 2" presque simultanément :

```text
MergeMap: Résultat 1 de Source 1
MergeMap: Résultat 1 de Source 2
MergeMap: Résultat 2 de Source 1
MergeMap: Résultat 2 de Source 2
MergeMap: Résultat 3 de Source 1
MergeMap: Résultat 3 de Source 2
```
- Explication : mergeMap traite toutes les requêtes en parallèle, indépendamment de la source.

### concatMap:
Si vous cliquez sur les boutons "ConcatMap Source 1" et "ConcatMap Source 2" presque simultanément :
text
```text
ConcatMap: Résultat 1 de Source 1
ConcatMap: Résultat 2 de Source 1
ConcatMap: Résultat 3 de Source 1
ConcatMap: Résultat 1 de Source 2
ConcatMap: Résultat 2 de Source 2
ConcatMap: Résultat 3 de Source 2
```

- Explication : concatMap traite les requêtes en séquence pour chaque source indépendamment.

### exhaustMap:
Si vous cliquez sur les boutons "ExhaustMap Source 1" et "ExhaustMap Source 2" presque simultanément :

```text
ExhaustMap: Résultat 1 de Source 1
```

- Explication : exhaustMap ignore les nouvelles émissions tant que la requête en cours n'est pas terminée. Seule la première requête de la première source est traitée.

### switchMap:
Si vous cliquez sur les boutons "SwitchMap Source 1" et "SwitchMap Source 2" presque simultanément :

```text
SwitchMap: Résultat 3 de Source 2
```
- Explication : switchMap annule la requête en cours chaque fois qu'une nouvelle émission arrive. Seule la dernière requête de la dernière source est complétée.
