import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class CountdownService {
    constructor(private http: HttpClient) { }

    getSeconds(dateTimeString: string) {
        return this.http.post<{ seconds: number }>(`${environment.apiUrl}/countdown`, { dateTime: dateTimeString })
    }
}
