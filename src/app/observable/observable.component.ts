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
