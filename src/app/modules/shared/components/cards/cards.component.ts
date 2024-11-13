import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { Productos } from 'src/app/models/productos';
import { CrudService } from 'src/app/modules/admin/services/crud.service';
import { CarritoService } from 'src/app/modules/carrito/services/carrito.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
public info: Productos[];
coleccionProducto:Productos[]=[]
productoSeleccionado!:Productos
modalVisible:boolean=false
compraVisible:boolean=false

@Input() productoReciente:string=''
@Output() productoAgregado=new EventEmitter<Productos>;
stock:number=0

constructor(
  public servicioCrud:CrudService,
  public servicioCarrito:CarritoService
){
  this.info=[
    {
      id: '1',
      nombre: 'Tarjeta graficas',
      imagen: 'https://www.ozeros.com/wp-content/uploads/2021/01/MSI-Radeon-RX-6900-XT-portada-2-525x300.jpg',
      descripcion: 'La tarjeta gráfica se encarga de procesar aquellos datos provenientes del procesador, entre imágenes y videos que se reproducen en la computadora.',
      precio:200,
      marca: 'Nvidia, AMD',
      stock:0,
      categoria:'a',
      alt:''
    },
    {
      id: '2',
      nombre: 'Procesadores',
      imagen: 'https://www.mundodeportivo.com/alfabeta/hero/2022/06/mejores-procesadores-gaming.jpg?width=1200',
      descripcion: 'es la unidad de procesamiento encargada de interpretar las instrucciones de un hardware haciendo uso de distintas operaciones aritméticas y matemáticas.',
      precio:200,
      marca: 'Intel, AMD',
      stock:0,
      categoria:'a',
      alt:''
    },
    {
      id: '3',
      nombre: 'RAM',
      imagen: 'https://cdnx.jumpseller.com/mpc-store1/image/30746388/Camilo_Gomez_memory_ram_ddr4_ce880f72-a7f1-48c7-9321-a358ce3e5f5b.jpg.jpg?1673200965',
      descripcion: 'La memoria de acceso aleatorio (Random Access Memory, RAM) es una memoria de almacenaje a corto plazo.',
      precio:200,
      marca: 'kingston, ADATA',
      stock:0,
      categoria:'a',
      alt:''
    }
  ]
}



  ngOnInit(): void{
    this.servicioCrud.obtenerProducto().subscribe(producto=>{
      this.coleccionProducto = producto
    })
  }

  mostrarVer(info:Productos){
    this.modalVisible=true

    this.productoSeleccionado=info
  }

  agregarproducto(info:Productos){
    this.productoAgregado.emit(info)

    this.compraVisible= true;

    const stockDeseado=Math.trunc(this.stock)
    if(stockDeseado<=0 || stockDeseado){
      Swal.fire({
        title:"error al agregar producto",
        text:"el stock ingresado no es valido",
        icon:"error"
      })
    }

  }
}
