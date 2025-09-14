import {Injectable, Type} from '@angular/core';
import {SenderEntry} from './SenderEntry';
import {BehaviorSubject, filter, map, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Sender {

  private station: BehaviorSubject<SenderEntry<any, any>[]> = new BehaviorSubject(new Array<SenderEntry<any, any>>())

  public collect<D, S>(destination: Type<D>, sender: Type<S>, packages: Array<any>): void {
    let senderEntry: SenderEntry<D, S> = new SenderEntry(destination, sender, packages)
    const current = this.station.getValue();
    this.station.next([...current, senderEntry]);
  }

  public retrieve<D>(destination: Type<D>): Observable<SenderEntry<any, any>[]> {
    return this.station.pipe(
      map(entries => entries.filter(se => se.destination === destination)),
      filter(matches => matches.length > 0), // doar când avem ceva
      tap(matches => {
        // eliminăm din stație toate entry-urile livrate
        const remaining = this.station.getValue().filter(se => !matches.includes(se));
        this.station.next(remaining);
      }),
    )
  }
}
