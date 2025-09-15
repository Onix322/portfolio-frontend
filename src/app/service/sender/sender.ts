import {Injectable, Type} from '@angular/core';
import {SenderEntry} from './SenderEntry';
import {BehaviorSubject, filter, map, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Sender {

  private warehouse: BehaviorSubject<SenderEntry<any, any>[]> = new BehaviorSubject(new Array<SenderEntry<any, any>>())

  public collect<D, S>(destination: Type<D>, sender: Type<S>, parcel: any): void {
    let senderEntry: SenderEntry<D, S> = new SenderEntry(destination, sender, parcel)
    const current = this.warehouse.getValue();
    this.warehouse.next([...current, senderEntry]);
  }

  public retrieve<D>(destination: Type<D>): Observable<SenderEntry<any, any>[]> {
    return this.warehouse.pipe(
      map(entries => entries.filter(se => se.destination === destination)),
      filter(matches => matches.length > 0),
      tap(matches => {
        const remaining = this.warehouse.getValue().filter(se => !matches.includes(se));
        this.warehouse.next(remaining);
      }),
      tap(() => console.log(this.warehouse))
    )
  }
}
