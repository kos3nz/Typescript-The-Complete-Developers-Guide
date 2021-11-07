import axios, { AxiosPromise } from 'axios';
import { Sync } from './Model';

interface HasId {
  id?: number;
}

// new Sync<any>('https://example.com')
export class ApiSync<T extends HasId> implements Sync<T> {
  constructor(public rootUrl: string) {}

  fetch = (id: number): AxiosPromise => {
    return axios.get(`${this.rootUrl}/${id}`);
  };

  save = (data: T): AxiosPromise => {
    const { id } = data;

    if (id) {
      // PUT
      return axios.put(`${this.rootUrl}/${id}`, data);
    } else {
      // POST
      return axios.post(this.rootUrl, data);
    }
  };
}
