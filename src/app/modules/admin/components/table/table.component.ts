import { Component } from '@angular/core';
import { Productos } from "src/app/models/productos";
import { CrudService } from '../../services/crud.service';
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

  nombreImagen!: string; // obtendrá el nombre de la imagen

  imagen!: string; // obtendrá la ruta de la imagen
  
  
  
  Productos= new FormGroup({
    nombre: new FormControl('',Validators.required),
    //imagen: new FormControl('',Validators.required),
    descripcion: new FormControl('',Validators.required),
    precio: new FormControl(0,Validators.required),
    marca: new FormControl('',Validators.required),
    categoria: new FormControl('',Validators.required),
    alt: new FormControl('',Validators.required),
    stock: new FormControl(0,Validators.required)
  })
  constructor(public servicioCrud: CrudService){}

  ngOnInit():void{
    this.servicioCrud.obtenerProducto().subscribe(productos=>{
      this.coleccionProductos=productos;
    })
  }
  async agregarProducto(){
    if(this.Productos.valid){
      let nuevoProducto: Productos = {
        // idProducto no se toma porque es generado por la BD y no por el usuario
        id: '',
        // el resto es tomado con información ingresada por el usuario
        nombre: this.Productos.value.nombre!,
        imagen: "",
        descripcion: this.Productos.value.descripcion!,
        precio:this.Productos.value.precio!,
        marca: this.Productos.value.marca!,
        categoria: this.Productos.value.categoria!,
        stock: this.Productos.value.stock!,
        alt:this.Productos.value.alt!,
      }
      // Enviamos nombre y url de la imagen; definimos carpeta de imágenes como "productos"
      await this.servicioCrud.subirImagen(this.nombreImagen, this.imagen, "productos")
        .then(resp => {
          // encapsulamos respuesta y envíamos la información obtenida
          this.servicioCrud.obtenerUrlImagen(resp)
            .then(url => {
              // ahora método crearProducto recibe datos del formulario y URL creada
              this.servicioCrud.crearProducto(nuevoProducto, url)
                .then(producto => {
                  alert("Ha agregado un nuevo producto con éxito.");

                  // Resetea el formulario y las casillas quedan vacías
                  this.Productos.reset();
                })
                .catch(error => {
                  alert("Ha ocurrido un error al cargar un producto.");

                  this.Productos.reset();
                })
            })
        })
    }
  }


cargarImagen(event: any){
  // Variable para obtener el archivo subido desde el input del HTML
  let archivo = event.target.files[0];

  // Variable para crear un nuevo objeto de tipo "archivo" o "file" y leerlo
  let reader = new FileReader();

  if(archivo != undefined){
    /*
      Llamamos a método readAsDataURL para leer toda la información recibida
      Envíamos como parámetro al "archivo" porque será el encargador de tener la 
      info ingresada por el usuario
    */
    reader.readAsDataURL(archivo);

    // Definimos qué haremos con la información mediante función flecha
    reader.onloadend = () => {
      let url = reader.result;

      // Condicionamos según una URL existente y no "nula"
      if(url != null){
        // Definimos nombre de la imagen con atributo "name" del input
        this.nombreImagen = archivo.name;

        // Definimos ruta de la imagen según la url recibida
        this.imagen = url.toString();
      }
    }
  }
}

  
  mostrarBorrar(productoSeleccionado: Productos){
    this.modalVisibleProducto=true
    this.productoSeleccionado=productoSeleccionado;
  }
  borrarProducto(){
    this.servicioCrud.eliminarProducto(this.productoSeleccionado.id, this.imagen)
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
      //imagen:productosSeleccionado.imagen
      descripcion:productosSeleccionado.descripcion,
      precio:productosSeleccionado.precio,
      marca:productosSeleccionado.marca,
      categoria:productosSeleccionado.categoria,
      alt:productosSeleccionado.alt,
      stock:productosSeleccionado.stock,
    })
  }
  editarProducto(){
    let datos: Productos={
      id:this.productoSeleccionado.id,
      nombre: this.Productos.value.nombre!,
      imagen: this.productoSeleccionado.imagen,
      descripcion: this.Productos.value.descripcion!,
      precio: this.Productos.value.precio!,
      marca: this.Productos.value.marca!,
      categoria: this.Productos.value.categoria!,
      stock:this.Productos.value.stock!,
      alt: this.Productos.value.alt!,
    }
    this.servicioCrud.modificarProducto(this.productoSeleccionado.id, datos)
    .then(producto=>{
      alert("el producto fue modificado con exito")
    })
    .catch(error=>{
      alert("hubo un problema al modificar  el producto")
    })
  }
  
}
