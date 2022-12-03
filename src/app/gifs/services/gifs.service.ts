import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/SearchGifsResponse';

@Injectable({
  providedIn: 'root'
})

export class GifsService {

  private apiKey: string = 'P6PzPLwUrntjWvv0L60yalg88RkE00gw'
  private _historial: string[] = [];

  //TODO: Cambiar any por su tipo
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {

    if (localStorage.getItem('historia')) {
      this._historial = JSON.parse(localStorage.getItem('historia')!);
    }
    if (localStorage.getItem('resultados')) {
      this.resultados = JSON.parse(localStorage.getItem('resultados')!);
    }
  }

  buscatGifs(query: string) {
    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10)

      localStorage.setItem("historia", JSON.stringify(this._historial));
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=P6PzPLwUrntjWvv0L60yalg88RkE00gw&q=${query}&limit=10`)
      .subscribe(resp => {
        console.log(resp.data);
        this.resultados = resp.data
        localStorage.setItem("resultados", JSON.stringify(this.resultados));
      })
  }
}
