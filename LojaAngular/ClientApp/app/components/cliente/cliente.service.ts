import { HttpBaseService } from "../base/http.base.service";
import { InjectorHttpService } from "../base/http.injector.service";
import { Inject } from "@angular/core";
import { APIConfig } from "../app/app.config";
import { environment } from "../../environments/environment";

export class ClienteService extends HttpBaseService {
    constructor( @Inject(InjectorHttpService) public injectorHttpService: InjectorHttpService) {
        super(injectorHttpService, "", "http://localhost:7001/api/Clientes?pagina=1&porPagina=10");
    }

    //Exemplo
    public getClientes() {
        return this._getAll(this.urlBase);
    }
}