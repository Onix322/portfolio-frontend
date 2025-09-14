import {Type} from '@angular/core';

export class SenderEntry<D, S> {
  private _destination: Type<D>;
  private _sender: Type<S>;
  private _packages: Array<any>;

  constructor(destination: Type<D>, sender: Type<S>, packages: Array<any>) {
    this._destination = destination;
    this._sender = sender;
    this._packages = packages;
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

  get packages(): Array<any> {
    return this._packages.slice();
  }

  set packages(value: Array<any>) {
    this._packages = value;
  }

  public addPackage(p: any) {
    this._packages.push(p)
  }
}
