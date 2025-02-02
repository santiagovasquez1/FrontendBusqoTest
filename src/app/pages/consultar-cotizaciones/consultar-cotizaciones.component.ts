import { DetalleCotizacionComponent } from './../detalle-cotizacion/detalle-cotizacion.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Cotizacion } from 'src/app/models/cotizacion.model';
import { BusqoService } from 'src/app/services/busqo.service';
import { GenerarCotizacionComponent } from '../generar-cotizacion/generar-cotizacion.component';

@Component({
  selector: 'app-consultar-cotizaciones',
  templateUrl: './consultar-cotizaciones.component.html',
  styles: [
  ]
})
export class ConsultarCotizacionesComponent implements OnInit {

  public displayedColumns = [
    'id',
    'nombre',
    'cedula',
    'email',
    'celular',
    'placa',
    'producto',
    'proveedor',
    'valor cotizacion'
  ];

  public mostrarTabla: boolean = false;
  public cotizaciones: MatTableDataSource<Cotizacion>;

  constructor(private busqoService: BusqoService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService) {
    this.cotizaciones = new MatTableDataSource<Cotizacion>();
  }

  ngOnInit(): void {
    this.getCotizaciones();
  }

  getCotizaciones() {
    this.spinner.show();
    this.busqoService.getCotizaciones().subscribe(result => {
      this.toastr.success('Cotizaciones obtenidas correctamente');
      this.cotizaciones.data = result;
      this.mostrarTabla = true;
      this.spinner.hide();
    }, error => {
      this.mostrarTabla = false;
      this.toastr.error('Error al obtener las cotizaciones', 'Error');
      this.spinner.hide();
    });
  }

  agregarCotizacion() {
    const dialogRef = this.dialog.open(GenerarCotizacionComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCotizaciones();
    });
  }

  verDetalle(event: any) {
    this.dialog.open(DetalleCotizacionComponent, {
      width: '500px',
      data: event
    });
  }
}
