import axios, { AxiosPromise } from 'axios';

interface HasId {
  id?: number;
}

// new Sync<any>('https://example.com')
export class Sync<T extends HasId> {
  constructor(public rootUrl: string) {}

  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`);
  }

  save(data: T): AxiosPromise {
    const { id } = data;

    if (id) {
      // PUT
      return axios.put(`${this.rootUrl}/${id}`, data);
    } else {
      // POST
      return axios.post(this.rootUrl, data);
    }
  }
}
