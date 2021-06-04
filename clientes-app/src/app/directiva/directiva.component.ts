import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent  {

  listacurso: string[] = ['TypeScript','JavaScript','Java SE','C#','PHP'];
  habilitar: boolean = true;
  textoboton: string = 'Ocultar';

  setHabilitar(): void{
    this.habilitar=(this.habilitar==true)?false:true;

    if (this.habilitar == true){
      this.textoboton = 'Ocultar';
    }else{
      this.textoboton = 'Mostrar'
    }

  }
  constructor() { }


}
