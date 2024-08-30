import { Component } from '@angular/core';
import { Productos } from "src/app/models/productos";
import { ServiceService } from '../../service.service';
import { FormControl, FormGroup, Validators, Validator  } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  coleccionProductos:Productos[]=[];
  
  modalVisibleProducto: boolean = false
  
  productoSeleccionado!:Productos; //recibe valores vacios
  
  
  
  Productos= new FormGroup({
    nombre: new FormControl('',Validators.required),
    imagen: new FormControl('',Validators.required),
    descripcion: new FormControl('',Validators.required),
    tipo: new FormControl('',Validators.required),
    marca: new FormControl('',Validators.required),
  })
  constructor(public servicioCrud: ServiceService){}
  ngOnInit():void{
    this.servicioCrud.obtenerProducto().subscribe(productos=>{
      this.coleccionProductos=productos})
  }
  async agregarProducto(){
    if(this.Productos.valid){
      let nuevoProducto: Productos = {
        // idProducto no se toma porque es generado por la BD y no por el usuario
        id: '',
        // el resto es tomado con información ingresada por el usuario
        nombre: this.Productos.value.nombre!,
        imagen: this.Productos.value.imagen!,
        descripcion: this.Productos.value.descripcion!,
        tipo: this.Productos.value.tipo!,
        marca: this.Productos.value.marca!,
      }
      await this.servicioCrud.crearProducto(nuevoProducto)
        .then(producto => {
          alert("Ha agregado un nuevo producto con éxito :)");
        })
        .catch(error => {
          alert("Hubo un problema al agregar un nuevo producto :(");
        })
      }
    }
  
  
  mostrarBorrar(productoSeleccionado: Productos){
    this.modalVisibleProducto=true
    this.productoSeleccionado=productoSeleccionado;
  }
  borrarProducto(){
    this.servicioCrud.eliminarProducto(this.productoSeleccionado.id)
    .then(respuesta=>{
      alert("el producto se a elemininado correctamente")
    })
    .catch(error=>{
      alert("no se ha podido eliminar el producto \n"+error)
    })
  }
  
  mostrarEditar(productosSeleccionado: Productos){
    this.productoSeleccionado = productosSeleccionado
  
    this.Productos.setValue({
      nombre: productosSeleccionado.nombre,
      imagen:productosSeleccionado.imagen,
      descripcion:productosSeleccionado.descripcion,
      tipo:productosSeleccionado.tipo,
      marca:productosSeleccionado.marca,
    })
  }
  editarProducto(){
    let datos: Productos={
      id:this.productoSeleccionado.id,
      nombre: this.Productos.value.nombre!,
      imagen: this.Productos.value.imagen!,
      descripcion: this.Productos.value.descripcion!,
      tipo: this.Productos.value.tipo!,
      marca: this.Productos.value.marca!,
    }
    this.servicioCrud.modificarProducto(this.productoSeleccionado.id, datos)
    .then(prodducto=>{
      alert("el producto fue modificado con exito")
    })
    .catch(error=>{
      alert("hubo un problema al modificar  el producto")
    })
  }
  
  }