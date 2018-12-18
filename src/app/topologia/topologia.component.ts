import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataSet, Network } from 'vis/index-network';
import 'vis/dist/vis-network.min.css';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-topologia',
  templateUrl: './topologia.component.html',
  styleUrls: ['./topologia.component.css']
})
@Injectable()
export class TopologiaComponent implements OnInit {
    agregadores: any[];
    serviciosFiltrados: any = {};
    limit: number;
    page: number;
    data: any = {};
    network: any = {};

    constructor(private http: HttpClient) { }

    ngOnInit() {
        var $this = this;
        this.limit = 10;
        this.page = 1;

        this.servicioListadoAgregadores(function(){});

        /*this.agregadores = [
          {agregador: 1, nombre: '0100004_LM_Aeropuerto'},
          {agregador: 6, nombre: '0100033_LM_San_Juan_de_Mirafl'},
          {agregador: 13, nombre: '0100119_LM_Estadio_Alianza'}
        ];*/

        /*this.serviciosFiltrados = {
          servicios: [],
          conteoSaltos: function(){
              
          }
        };
        this.serviciosFiltrados.servicios = this.agregadores.filter( x => x.id );*/

        this.network = {
            dibujando: false,
            direccion: 'UD',
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
                    this.data.nodes = [];
                }
            },
            destroy2: function(){
                if (this.network !== null) {
                    this.network.destroy();
                    this.network = null;
                }
            },
            dibujar: function(agregador){
                var $this = this;
                $this.dibujando = true;
                $this.destroy();

                var container = document.getElementById('topologia');
                var directionInput = $this.direccion; //document.getElementById("direction").value;
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

                $this.data.nodes.push({id: 0, label: agregador.nombre, title: agregador.nombre});

                agregador.datafill.forEach(function(e, ind, obj){
                    $this.data.nodes.push({id: e.id, label: e.id+'', title: e.idu.nombre, info: e});
                    if(e.salto_datafill)
                    {
                        $this.data.edges.push({from: e.id, to: e.salto_datafill});
                    }
                    else if(!e.salto_datafill && !e.idu.nombre)
                    {
                        $this.data.edges.push({from: e.id, to: 0});
                        $this.data.edges.push({from: e.id, to: e.id});
                    }
                    else
                    {
                        $this.data.edges.push({from: e.id, to: 0});
                    }
                });

                $this.network = new Network(container, $this.data, options);

                $this.network.on('afterDrawing', function(){
                    $this.dibujando = false;
                });

                $this.network.on("click", function (params) {
                var pos_nodo = this.getNodeAt(params.pointer.DOM);
                var nodo = $this.data.nodes.filter(x => x.id == pos_nodo)[0];
                var message = '';

                if(!nodo.info)
                {
                    message = "<p><b>Agregador</b>: "+nodo.title+"</p>";
                }
                else
                {
                    message = "<p><b>ID</b>: "+pos_nodo+"</p> <br/> <p><b>IDU</b>: "+nodo.info.idu.nombre+"</p> <br/> <p><b>Port IN</b>: "+nodo.info.idu_port_in+"</p> <br/> <p><b>Port OUT</b>: "+nodo.info.idu_port_out+"</p> <br/> <p><b>PE RAN</b>: "+nodo.info.pe_ran+"</p> <br/> <p><b>PE RAN PORT</b>: "+nodo.info.pe_ran_port+"</p>"
                }

                $.notify({
                            icon: "add_alert",
                            message: message
                        },{
                            type: 'success',
                            timer: 4000,
                            placement: {
                            from: 'top',
                            align: 'center'
                        }
                    });
                });
            },
            dibujar2: function(){
                var $this = this;
                $this.dibujando = true;
                $this.destroy2();

                var container = document.getElementById('topologia');
                var directionInput = $this.direccion; //document.getElementById("direction").value;
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

                $this.network = new Network(container, $this.data, options);

                $this.network.on('afterDrawing', function(){
                    $this.dibujando = false;
                });

                $this.network.on("click", function (params) {
                var pos_nodo = this.getNodeAt(params.pointer.DOM);
                var nodo = $this.data.nodes.filter(x => x.id == pos_nodo)[0];
                var message = '';

                if(!nodo.info)
                {
                    message = "<p><b>Agregador</b>: "+nodo.title+"</p>";
                }
                else
                {
                    message = "<p><b>ID</b>: "+pos_nodo+"</p> <br/> <p><b>IDU</b>: "+nodo.info.idu.nombre+"</p> <br/> <p><b>Port IN</b>: "+nodo.info.idu_port_in+"</p> <br/> <p><b>Port OUT</b>: "+nodo.info.idu_port_out+"</p> <br/> <p><b>PE RAN</b>: "+nodo.info.pe_ran+"</p> <br/> <p><b>PE RAN PORT</b>: "+nodo.info.pe_ran_port+"</p>"
                }

                $.notify({
                            icon: "add_alert",
                            message: message
                        },{
                            type: 'success',
                            timer: 4000,
                            placement: {
                            from: 'top',
                            align: 'center'
                        }
                    });
                });
            },
            cambiarDireccion: function(direccion){
                if(this.direccion != direccion)
                {
                    this.direccion = direccion;
                    if(this.data.edges.length && this.data.nodes.length)
                    {this.dibujar2();}
                }
            }
        };
    }

    servicioListadoAgregadores = function(cb){
        var $this = this;
        let obs = this
            .http
            .get('http://localhost:8000/servicios/listado_agregadores');

        obs
            .subscribe((data) => {$this.agregadores = data.resp; cb();});
    };
}
