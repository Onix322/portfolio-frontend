import {Type} from '@angular/core';

export class SenderEntry<D, S> {
  private _destination: Type<D>;
  private _sender: Type<S>;
  private _parcel: any;

  constructor(destination: Type<D>, sender: Type<S>, parcel: any) {
    this._destination = destination;
    this._sender = sender;
    this._parcel = parcel;
  }

  get destination(): Type<D> {
    return this._destination;
  }

  set destination(value: Type<D>) {
    this._destination = value;
  }

  get sender(): Type<S> {
    return this._sender;
  }

  set sender(value: Type<S>) {
    this._sender = value;
  }

  get parcel(): any {
    return this._parcel;
  }

  set parcel(value: any) {
    this._parcel = value;
  }
}
