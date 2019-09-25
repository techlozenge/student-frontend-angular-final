import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Response } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

    private baseUrl = 'http://localhost:1337/'

    constructor (private http: HttpClient) {}

    // see: https://blog.ninja-squad.com/2017/07/17/http-client-module/
    getRecords(endpoint: string): Observable<any> {
        const apiUrl = this.baseUrl + endpoint;
        console.log('endpoint: ' + apiUrl);
    return this.http.get(apiUrl)
            .catch(this.handleError);
    }

    // getRecords(endpoint: string): Observable<any[]> {
    //     let apiUrl = this.baseUrl+endpoint;
    //     console.log('endpoint: ' + apiUrl);
    //     return this.http.get(apiUrl)
    //         .map(this.extractData)
    //         .catch(this.handleError);
    // }

    getRecord(endpoint: string, id): Observable<object> {
        const apiUrl = `${this.baseUrl}${endpoint}/${id}`;
        console.log('endpoint: ' + apiUrl);
        return this.http.get(apiUrl)
            .catch(this.handleError);
    }

    // getRecord(endpoint: string, id): Observable<object> {
    //     let apiUrl = `${this.baseUrl}${endpoint}/${id}`;
    //     console.log('endpoint: ' + apiUrl);
    //     return this.http.get(apiUrl)
    //         .map(this.extractData)
    //         .catch(this.handleError);
    // }

    deleteRecord(endpoint: string, id: number): Observable<object> {
        const apiUrl = `${this.baseUrl}${endpoint}/${id}`;
        console.log('endpoint: ' + apiUrl);
        return this.http.delete(apiUrl)
            .catch(this.handleError);
    }

    // deleteRecord(endpoint: string, id:number): Observable<object> {
    //     const apiUrl = `${this.baseUrl}${endpoint}/${id}`;
    //     console.log('endpoint: ' + apiUrl);
    //     return this.http.delete(apiUrl)
    //         .map(this.extractData)
    //         .catch(this.handleError);
    // }

    editRecord(endpoint: string, record: object, id: number): Observable<object> {
        const apiUrl = `${this.baseUrl}${endpoint}/${id}`;
        console.log(record)
        console.log(apiUrl)
        return this.http.put(apiUrl, record)
            .catch(this.handleError);
    }

    // editRecord(endpoint: string, record: object, id: number): Observable<object> {
    //     const apiUrl = `${this.baseUrl}${endpoint}/${id}`;
    //     console.log(record)
    //     console.log(apiUrl)
    //     return this.http.put(apiUrl, record)
    //         .map(this.extractData)
    //         .catch(this.handleError);
    // }

    addRecord(endpoint: string, record: object): Observable<object> {
        const apiUrl = `${this.baseUrl}${endpoint}`;
        console.log(apiUrl)
        return this.http.post(apiUrl, record)
            .catch(this.handleError);
    }

    // addRecord(endpoint: string, record: object): Observable<object> {
    //     const apiUrl = `${this.baseUrl}${endpoint}`;
    //     console.log(apiUrl)
    //     return this.http.post(apiUrl, record)
    //         .map(this.extractData)
    //         .catch(this.handleError);
    // }

    // private extractData(res: Response) {
    //     const results = res.json();
    //     return results || [];
    // }

    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (typeof error._body === 'string') {
            errMsg = error._body
        } else {
            if (error instanceof Response) {
                if (error.status === 0){
                    errMsg = 'Error connecting to API'
                } else {
                    const errorJSON = error.json();
                    // errMsg = errorJSON.message;
                }
            }
        }
        return Observable.throw(errMsg);
    }

}
