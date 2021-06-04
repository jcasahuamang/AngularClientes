import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Cliente} from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  constructor(private clienteService: ClienteService ) { }

  ngOnInit(){
    this.clienteService.getClientes().subscribe(

      clientes => this.clientes = clientes
     /*
      function (clientes) {
          this.clientes = this.clientes
        }
        */

    );
  }

  delete(cliente: Cliente): void{

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: "Estás seguro?",
      text: "¿Estás seguro que deseas eliminar al cliente: "+cliente.nombre+' '+cliente.apellido,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'El cliente ha sido eliminado: '+cliente.nombre+' '+cliente.apellido,
              'success'
            )
          }

        )


      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado!',
          'El cliente esta seguro :)',
          'error'
        )
      }
    })

  }
}


