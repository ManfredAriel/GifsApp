import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})

export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor (private gifsServices:GifsService) {}

  buscar(): void {
    const valor = this.txtBuscar.nativeElement.value;
    this.gifsServices.buscatGifs(valor);
    this.txtBuscar.nativeElement.value = '';
  }



}
