import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Canal } from './../../models/canal';
import { API_CONFIG } from './../api/api';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class CanalProvider {
 
  constructor(public http: HttpClient) {
  }

  findAll(): Observable<Canal[]> {
    return this.http.get<Canal[]>(`${API_CONFIG.baseUrl}/canal-entities`);
  }
}
