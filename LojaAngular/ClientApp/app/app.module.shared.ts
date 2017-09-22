import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { NavComponent } from "./components/nav/nav.component";
import { EventoComponent } from "./components/evento/evento.component";
import { FooterComponent } from "./components/footer/footer.component";
import { EventoService } from "./components/evento/evento.service";
import { InjectorHttpService } from "./components/base/http.injector.service";
import { HttpInterceptorModule } from "./components/base/http.interceptor.module";
import { ObjetivoComponent } from "./components/objetivo/objetivo.component";
import { ObjetivoService } from "./components/objetivo/objetivo.service";
import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CarreiraComponent } from "./components/carreira/carreira.component";
import { ReuniaoComponent } from "./components/reuniao/reuniao.component";
import { CarreiraService } from "./components/carreira/carreira.service";
import { ReuniaoService } from "./components/reuniao/reuniao.service";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from "./components/authentication/auth.guard";
import { AuthenticationService } from "./components/authentication/authentication.service";
import { ClienteComponent } from "./components/cliente/cliente.component";
import { ClienteService } from "./components/cliente/cliente.service";

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        NavComponent,
        EventoComponent,
        FooterComponent,
        ObjetivoComponent,
        CarreiraComponent,
        ReuniaoComponent,
        LoginComponent,
        ClienteComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        HttpInterceptorModule,
        FormsModule,
        NgbModule.forRoot(),
        RouterModule.forRoot([
            { path: '', component: LoginComponent },
            { path: 'login', component: LoginComponent },
            { path: 'objetivos', component: ObjetivoComponent },
            { path: 'carreira', component: CarreiraComponent },
            { path: 'reunioes', component: ReuniaoComponent, canActivate: [AuthGuard] },
            { path: 'desempenho', component: EventoComponent, canActivate: [AuthGuard] },
            { path: 'feedbacks', component: EventoComponent, canActivate: [AuthGuard] },
            { path: 'clientes', component: ClienteComponent, canActivate: [AuthGuard] }
        ])
    ],
    providers: [
        InjectorHttpService,
        EventoService,
        ObjetivoService,
        ReuniaoService,
        CarreiraService,
        AuthenticationService,
        AuthGuard,
        ClienteService
    ],
    bootstrap: [AppComponent]
})
export class AppModuleShared {
}
