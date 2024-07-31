# Snapface

```TypeScript
import {Component} from '@angular/core';
import {Observable, of} from 'rxjs';
import {mergeMap, concatMap, exhaustMap, switchMap, delay, tap} from 'rxjs/operators';

@Component({
  selector: 'app-observable',
  standalone: true,
  template: `
    <button (click)="runOperation('MergeMap', mergeMap)">MergeMap</button>
    <button (click)="runOperation('ConcatMap', concatMap)">ConcatMap</button>
    <button (click)="runOperation('ExhaustMap', exhaustMap)">ExhaustMap</button>
    <button (click)="runOperation('SwitchMap', switchMap)">SwitchMap</button>
  `
})
export class ObservableComponent {
  private simulateHttp(id: number): Observable<string> {
    return of(`Résultat ${id}`).pipe(delay(1000 * id));
  }

  runOperation(name: string, operator: any): void {
    console.log(`${name} débute`);
    let total = 0;
    of(1, 2, 3).pipe(
      operator((id: number) => this.simulateHttp(id)),

      tap(result => {
        console.log(`${name}:`, result);
      })
    ).subscribe({
      complete: () => console.log(`${name} terminé`)
    });
  }

  protected readonly mergeMap = mergeMap;
  protected readonly concatMap = concatMap;
  protected readonly exhaustMap = exhaustMap;
  protected readonly switchMap = switchMap;
}

```

## Résultats Attendus

### mergeMap:
Si vous cliquez sur les boutons "MergeMap Source 1" et "MergeMap Source 2" presque simultanément :

```text
MergeMap: Résultat 1
MergeMap: Résultat 2
MergeMap: Résultat 3
```
- Explication : mergeMap traite toutes les requêtes en parallèle, indépendamment de la source.

### concatMap:
Si vous cliquez sur les boutons "ConcatMap Source 1" et "ConcatMap Source 2" presque simultanément :
text
```text
MergeMap: Résultat 1
MergeMap: Résultat 2
MergeMap: Résultat 3
```

- Explication : concatMap traite les requêtes en séquence pour chaque source indépendamment.

### exhaustMap:
Si vous cliquez sur les boutons "ExhaustMap Source 1" et "ExhaustMap Source 2" presque simultanément :

```text
ExhaustMap: Résultat 1
```

- Explication : exhaustMap ignore les nouvelles émissions tant que la requête en cours n'est pas terminée. Seule la première requête de la première source est traitée.

### switchMap:
Si vous cliquez sur les boutons "SwitchMap Source 1" et "SwitchMap Source 2" presque simultanément :

```text
SwitchMap: Résultat 3
```
- Explication : switchMap annule la requête en cours chaque fois qu'une nouvelle émission arrive. Seule la dernière requête de la dernière source est complétée.
