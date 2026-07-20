import { TestBed } from '@angular/core/testing';
import * as pako from 'pako';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [DataService] });
    service = TestBed.inject(DataService);
  });

  it('decompresses base64 gzip JSON payloads', () => {
    const payload = { Table: [{ CertificationNumber: 'QLSS/IATF/IA/001' }] };
    const compressed = pako.gzip(JSON.stringify(payload));
    const encoded = btoa(String.fromCharCode(...compressed));

    expect(service.decrypt(` ${encoded}\n`)).toEqual(payload);
  });

  it('returns null for invalid data', () => {
    expect(service.decrypt('not valid base64')).toBeNull();
  });
});
