import { Injectable } from '@angular/core';
import * as pako from 'pako';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  decrypt(data: string): any {
    try {
      data = data.trim();
      const binaryString = atob(data);
      const bytes = new Uint8Array(binaryString.length);

      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const decompressed = pako.ungzip(bytes, { to: 'string' });
      return JSON.parse(decompressed);
    } catch {
      return null;
    }
  }

}