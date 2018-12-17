import { Component, OnInit } from '@angular/core';
import { DataSet, Network } from 'vis/index-network';
import 'vis/dist/vis-network.min.css';

@Component({
  selector: 'app-topologia',
  templateUrl: './topologia.component.html',
  styleUrls: ['./topologia.component.css']
})
export class TopologiaComponent implements OnInit {
    servicios: any[];
    serviciosFiltrados: any = {};
    limit: number;
    page: number;
    data: any = {};
    network: any = {};

    constructor() { }

    ngOnInit() {
        this.limit = 10;
        this.page = 1;

        this.servicios = [
          {id: 1, tipo_servicio:{id:1, nombre:'Gul'}, nombre:'Nodo_GUL_0100004_LM_Aeropuerto', datafill: [], ip_mw_gestion_port:'', ip_gateway_mask:'', pe_ran:'LIM_AERO_PAG_1', pe_ran_port:'Gi0/4/0', sitio:{id:1, nombre:'0100004_LM_Aeropuerto'}, nombre_agregador:'0100004_LM_Aeropuerto'},
          {id: 2, tipo_servicio:{id:2, nombre:'Gestión'}, nombre:'Gest_Rect_OYM_2_0100004_LM_Aeropuerto', datafill: [{id:1, idu:{id:1, nombre:'0100004_LM_Aeropuerto to Piedraliza', idu_port_in:'17-EG6-3', idu_port_out:'17-EG6-4'}, salto_datafill: null},{id:2, idu:{id:2, nombre:'0100004_LM_Aeropuerto to Ciudad Satelite', idu_port_in:'17-EG6-4', idu_port_out:'17-EG6-3'}, salto_datafill: 1}], ip_mw_gestion_port:'', ip_gateway_mask:'', pe_ran:'LIM_AERO_PAG_1', pe_ran_port:'Gi0/4/2', sitio:{id:1, nombre:'0100004_LM_Aeropuerto'}, nombre_agregador:'0100004_LM_Aeropuerto'},
        ];

        this.serviciosFiltrados = {
          servicios: [],
          conteoSaltos: function(){
              
          }
        };
        this.serviciosFiltrados.servicios = this.servicios.filter( x => x.id );

        this.network = {
          data: {
            edges: [],
            nodes: []
          },
          network: null,
          destroy: function(){
            if (this.network !== null) {
              this.network.destroy();
              this.network = null;
              this.data.edges = [];
              this.data.edges = [];
            }
          },
          dibujar: function(servicio){
            var $this = this;
            $this.destroy();

            var container = document.getElementById('topologia');
            var directionInput = 'UD'; //document.getElementById("direction").value;
            var options = {
              interaction:{tooltipDelay:350},
              manipulation: {
                enabled: false
              },
              layout: {
                  hierarchical: {
                      direction: directionInput
                  }
              }
            };

            servicio.datafill.forEach(function(e, ind, obj){
              $this.data.nodes.push({id: e.id, label: e.id, title: e.idu.nombre});
              if(e.salto_datafill)
              {
                $this.data.edges.push({from: e.id, to: e.salto_datafill});
              }
            });

            $this.network = new Network(container, $this.data, options);
          }
        };
    }

}
