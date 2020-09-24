import { Component, OnInit, ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ServiciosEndpointService } from './servicios/servicios-endpoint.service';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { MatTable } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit{
  title = 'frontend'
  dataTable:any= []
  formOrden:FormGroup
  private res:[]|any
  submitted:boolean = false
  grupo:object|any = []
  cargo:[]|any =[]
  errorFormulario:boolean = false
  msg:string|any = ""
  private ejecutar:boolean = false
  private parametros:Array<any> = []

  constructor(private formBuilder: FormBuilder,
  	private serviciosEndpointService: ServiciosEndpointService){
  	//[Validators.required, Validators.minLength(10)]
  	this.formOrden = this.formBuilder.group({
      State : ['', Validators.required],
      Number : ['', Validators.required],
      Title : ['', Validators.required]
    });
  }


  get f() {
    return this.formOrden.controls;
  }

  async ngOnInit() {
    //obtenergrupos
    await this.obtenerListado()
  }

    updateList(id: number, property: string, event: any) {
    }

    remove(id: any) {
    }

    add() {
    }

    changeValue(id: number, property: string, event: any) {
    }


  registrarDatos($event) {
    if (this.formOrden.invalid) {
      this.submitted = true;
      return;
    } else {
      let datos:any
      console.log(this.formOrden.value,'values')
      datos = this.formOrden.value
      this.serviciosEndpointService.saveData('asosaciones/',datos).toPromise().then(data => {
        let res:object|any = data
        if(res.code == 201){
          this.errorFormulario = true
          this.msg = res.msg
          this.formOrden.reset()
          this.obtenerListado()
        }else {
          this.errorFormulario = true
          this.msg = res.msg
        }
      })
    }
  }

  convertFecha(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  /**OBTENER VALORES DROPDOWNLIST**/
  public obtenerListado() {
    //this.limpiarVariables()
  	this.serviciosEndpointService.getData('asosaciones/')
  	.toPromise().then(data => {
        let datos:any = data
        this.dataTable = datos.rows
        console.log(this.res,'0000')
      })
  }

  eliminarRegistro(event) {
    console.log(event,'event')
    this.serviciosEndpointService.removeData(`asosaciones/${event.Id}/`)
    .toPromise().then(data => {
        let res:object|any = data
        if(res.code == 200){
          this.errorFormulario = true
          this.msg = res.msg
          this.formOrden.reset()
          this.obtenerListado()
        }else {
          this.errorFormulario = true
          this.msg = res.msg
        }
      })
  }

}