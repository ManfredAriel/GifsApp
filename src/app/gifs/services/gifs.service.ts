import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GifsService {

  private apiKey: string = 'P6PzPLwUrntjWvv0L60yalg88RkE00gw'
  private _historial: string[] = [];

  //TODO: Cambiar any por su tipo
  public resultados: any[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) { }

  buscatGifs(query: string) {
    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10)
    }

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=P6PzPLwUrntjWvv0L60yalg88RkE00gw&q=${query}&limit=10`)
      .subscribe((resp: any) => {
        console.log(resp.data);
        this.resultados = resp.data
      })
  }
}
