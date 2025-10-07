import {Injectable} from '@angular/core';

//Works as a middleman sending elements between components

@Injectable({
  providedIn: 'root'
})
export class Grabber {

  private readonly pool: Map<string, any>;

  constructor() {
    this.pool = new Map<string, any>()
  }

  public async request<T>(key: string): Promise<T> {
    return await new Promise<T>((res, rej) => {
      const existing = this.pool.get(key)
      if (existing) {
        res(<T>existing)
        this.pool.delete(key)
        return
      }
      const waiter = setInterval(() => {
        const existing = this.pool.get(key)
        if (existing) {
          clearInterval(waiter)
          res(<T>existing)
          this.pool.delete(key)
        }
      }, 10)

      setTimeout(() => {
        clearInterval(waiter)
        rej(new Error("No response sent for: " + key + " in 2000ms"))
      }, 2000)
    })
  }

  public respond<T>(key: string, element: T): void {
    if (this.pool.has(key)) {
      console.error("Duplicate key: " + key)
      return
    }
    this.pool.set(key, element)
  }
}
