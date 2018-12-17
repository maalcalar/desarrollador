import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
@Injectable()
export class BusquedaComponent implements OnInit {
    servicios: any[];
    serviciosFiltrados: any = {};
    limit: number;
    page: number;

    constructor(private http: HttpClient) {

    }

    ngOnInit() {
        var $this = this;
        this.limit = 10;
        this.page = 1;

        this.serviciosFiltrados = {
            servicios: [],
            conteoSaltos: function(){
                
            }
        };

        this.servicioListadoServicioDatafill(function(){ $this.serviciosFiltrados.servicios = $this.servicios.filter( x => x.id ); console.log(this.servicios); });
        

        /*this.servicios = [
            {id: 1, tipo_servicio:{id:1, nombre:'Gul'}, nombre:'Nodo_GUL_0100004_LM_Aeropuerto', datafill: [], ip_mw_gestion_port:'', ip_gateway_mask:'', pe_ran:'LIM_AERO_PAG_1', pe_ran_port:'Gi0/4/0', sitio:{id:1, nombre:'0100004_LM_Aeropuerto'}, nombre_agregador:'0100004_LM_Aeropuerto'},
            {id: 2, tipo_servicio:{id:2, nombre:'Gestión'}, nombre:'Gest_Rect_OYM_2_0100004_LM_Aeropuerto', datafill: [{id:1, idu:{id:1, nombre:'0100004_LM_Aeropuerto to Piedraliza', idu_port_in:'17-EG6-3', idu_port_out:'17-EG6-4'}},{id:2, idu:{id:2, nombre:'0100004_LM_Aeropuerto to Ciudad Satelite', idu_port_in:'17-EG6-4', idu_port_out:'17-EG6-3'}}], ip_mw_gestion_port:'', ip_gateway_mask:'', pe_ran:'LIM_AERO_PAG_1', pe_ran_port:'Gi0/4/2', sitio:{id:1, nombre:'0100004_LM_Aeropuerto'}, nombre_agregador:'0100004_LM_Aeropuerto'},
        ];*/

        
        

        
    }

    busquedaRapida = function(e){
        var texto = e.target.value;
        this.serviciosFiltrados = this.servicios.filter( x => 
            x.tipo_servicio.nombre.toLowerCase().includes(texto.toLowerCase()) || 
            x.nombre.toLowerCase().includes(texto.toLowerCase()) || 

            ( x.datafill.filter( y => y.idu.nombre.toLowerCase().includes(texto.toLowerCase()) ).length > 0 ) || 
            ( x.datafill.filter( y => y.idu.idu_port_in.toLowerCase().includes(texto.toLowerCase()) ).length > 0 ) || 
            ( x.datafill.filter( y => y.idu.idu_port_out.toLowerCase().includes(texto.toLowerCase()) ).length > 0 ) || 

            x.ip_mw_gestion_port.toLowerCase().includes(texto.toLowerCase()) || 
            x.ip_gateway_mask.toLowerCase().includes(texto.toLowerCase()) || 
            x.pe_ran.toLowerCase().includes(texto.toLowerCase()) || 
            x.pe_ran_port.toLowerCase().includes(texto.toLowerCase()) || 
            x.sitio.nombre.toLowerCase().includes(texto.toLowerCase()) || 
            x.nombre_agregador.toLowerCase().includes(texto.toLowerCase()) );
    }

    servicioListadoServicioDatafill = function(cb){
        var $this = this;
        let obs = this
            .http
            .get('http://localhost:8000/servicios/listado_servicio_datafill');

        obs
            .subscribe((data) => {$this.servicios = data.resp; cb();});
    };
}
