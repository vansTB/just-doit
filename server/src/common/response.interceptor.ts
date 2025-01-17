import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(5000),
      map((data) =>
        data
          ? {
              code: 200,
              data,
            }
          : null,
      ),
      catchError((err) => {
        console.log('err', err);
        return throwError(() => err);
      }),
    );
  }
}
