import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Request } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthorizationInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // const body = context.switchToHttp().getRequest().body;
        let request = context.switchToHttp().getRequest();
        console.log('Before...', request.headers);

        const now = Date.now();
        return next
        .handle()
        .pipe(
            tap(() => console.log(`After... ${Date.now() - now}ms`)),
        );
    }
}
