import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders   } from '@angular/common/http';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiciosEndpointService {
  private host:string='http://127.0.0.1:5000/api/v1/'
  private token:any = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJOb21icmVBcHAiOiJBcHBsaWNhY2lvbjEiLCJJZFJvbGVzIjoxLCJDbGF2ZSI6IiQyYiQxMCRsdVNRR0VjV2xxMExBS3dldmprL0Z1SGxUTjJPcnE5U2JNZHVMVWliUW52QzkuMHJnbmNnMiIsIm5vbWJyZVJvbGwiOiJBZG1pbiJ9.3YTBpaFlSsYfQwBaFnhjHWfo1Uqj7tMpQ5Q8kCSFWOo'
  private header = new HttpHeaders({ "Authorization": "Bearer "+this.token})
  private requestOptions = {headers: this.header};
  constructor(private http: HttpClient) { }

  getData(url:string|any){
    return this.http.get(this.host+url,this.requestOptions);
  }

  saveData(url:string|any,body:object|any){
  	return this.http.post(this.host+url, body, this.requestOptions);
  }

  updateData(url:string|any,body:object|any){
  	return this.http.put(this.host+url, body, this.requestOptions);
  }

  removeData(url:string|any){
    return this.http.delete(this.host+url, this.requestOptions);
  }
}
