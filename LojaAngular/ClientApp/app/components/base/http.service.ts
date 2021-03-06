import { Injectable, Inject } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { InterceptorService } from 'ng2-interceptors';


@Injectable()
export abstract class HttpService {

    private headers: Headers;
    private options: RequestOptions;

    constructor(
        public http: InterceptorService) {
        if (typeof window !== 'undefined') {
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser != null) {
                var token = currentUser.token;
            }

            this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + token });
            this.options = new RequestOptions({ headers: this.headers });
        }
    }

    private getRequestOptions(contentType?: string, responseType?: string) {
        let headerOptions: any = [];

        if (contentType != null && contentType != undefined && contentType != "") {
            headerOptions.push({ 'Content-Type': contentType });
        }

        if (responseType != null && responseType != undefined && responseType != "") {
            headerOptions.push({ 'responseType': responseType });
        }

        headerOptions.push({ 'Authorization': 'bearer: ' + localStorage.getItem('token') });

        let header = new Headers(headerOptions);
        let requestOptions = new RequestOptions({ headers: header });
        return requestOptions;
    }

    protected _getAll(method: string) {
        return this.http.get(
            method, this.options).map((res) => res.json());
    }

    protected _getById(id: number, method: string, contentType: string) {
        return this.http.get(
            method + "/" + id, this.getRequestOptions(contentType)).map((res) => res.json());
    }

    protected _post(obj: any, method: string, contentType: string) {
        let requestOptions = null;
        if (contentType !== null &&
            contentType !== 'application/x-www-form-urlencoded') {
            requestOptions = this.getRequestOptions(contentType);
        }

        return this.http.post(method, obj, requestOptions).map((res) => res.json());
    }

    protected _put(id: number, obj: any, method: string, contentType: string) {
        return this.http.put(
            method + "/" + id, obj, this.getRequestOptions(contentType)).map((res) => res.json());
    }

    protected _patch(id: number, obj: any, method: string, contentType: string) {
        return this.http.patch(
            method + "/" + id, obj, this.getRequestOptions(contentType)).map((res) => res.json());
    }

}

