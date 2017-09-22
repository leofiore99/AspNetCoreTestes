import { Component, Input, OnInit, Inject, forwardRef } from '@angular/core';
import * as jQuery from 'jquery';
import { Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { NavComponent } from "../nav/nav.component";
import { ClienteService } from "./cliente.service";

@Component({
    selector: 'app-evento',
    templateUrl: './cliente.component.html',
    styleUrls: ['../evento/evento.component.css']
})
export class ClienteComponent implements OnInit {

    ngOnInit() {
        this.data = this.getClientes();
        setTimeout(this.showPage(), 1500);
    }

    constructor(private clienteService: ClienteService) { }

    data: any;
    objeto: any;

    private getClientes() {
        //debugger;
        return this.clienteService.getClientes()
            .subscribe(data => {
                console.log(data);
            });
    }

    resizeFooter(positionCollapse: string, positionCollapseActivity: string) {
        if (positionCollapse == 'open' && positionCollapseActivity == 'closed') {
            $('#footerBar').css({ width: "81%" });
        } else if (positionCollapse == 'closed' && positionCollapseActivity == 'open') {
            $('#footerBar').css({ width: "81%" });
        } else if (positionCollapse == 'closed' && positionCollapseActivity == 'closed') {
            $('#footerBar').css({ width: "100%" });
        } else {
            $('#footerBar').css({ width: "65%" });
        }
    }

    showPage() {
        document.getElementById("starter-template").style.display = "block";
        document.getElementById("loader").style.display = "none";
    }
}
