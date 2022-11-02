import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const accessToken = localStorage.getItem('access_token');
		console.log('UNAUTHORICED');

		if (accessToken) {
			const cloned = req.clone({
				headers: req.headers.set('Authorization', 'Bearer ' + accessToken),
			});
			/* const serverRequest = next.handle(cloned);
			serverRequest.subscribe({
				error: (err: any) => {
					if (err instanceof HttpErrorResponse) {
						if (err.status === 401) {
							// Refresh Tokens
						}
					}
				},
			});
			return serverRequest; */

			return next.handle(cloned);
		} else {
			return next.handle(req);
		}
	}
}
