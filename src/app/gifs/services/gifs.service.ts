import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/SearchGifsResponse';

@Injectable({
  providedIn: 'root'
})

export class GifsService {

  private apiKey: string = 'P6PzPLwUrntjWvv0L60yalg88RkE00gw';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
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

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe(resp => {
        console.log(resp.data);
        this.resultados = resp.data
        localStorage.setItem("resultados", JSON.stringify(this.resultados));
      })


  }
}
