import { Component } from '@angular/core';

import { Productos } from 'src/app/models/productos';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
public info: Productos[];

constructor(){
  this.info=[
    {
      id: '1',
      nombre: 'Tarjeta graficas',
      imagen: 'https://www.ozeros.com/wp-content/uploads/2021/01/MSI-Radeon-RX-6900-XT-portada-2-525x300.jpg',
      descripcion: 'La tarjeta gráfica se encarga de procesar aquellos datos provenientes del procesador, entre imágenes y videos que se reproducen en la computadora.',
      tipo: 'para PC, para laptops',
      marcas: 'Nvidia, AMD',
    },
    {
      id: '2',
      nombre: 'Procesadores',
      imagen: 'https://www.mundodeportivo.com/alfabeta/hero/2022/06/mejores-procesadores-gaming.jpg?width=1200',
      descripcion: 'es la unidad de procesamiento encargada de interpretar las instrucciones de un hardware haciendo uso de distintas operaciones aritméticas y matemáticas.',
      tipo: '',
      marcas: 'Intel, AMD',
    },
    {
      id: '3',
      nombre: 'RAM',
      imagen: 'https://cdnx.jumpseller.com/mpc-store1/image/30746388/Camilo_Gomez_memory_ram_ddr4_ce880f72-a7f1-48c7-9321-a358ce3e5f5b.jpg.jpg?1673200965',
      descripcion: 'La memoria de acceso aleatorio (Random Access Memory, RAM) es una memoria de almacenaje a corto plazo.',
      tipo: 'DDR3,DDR4',
      marcas: 'kingston, ADATA',
    }
  ]
}

}
