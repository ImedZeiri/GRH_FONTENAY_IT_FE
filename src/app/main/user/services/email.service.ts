import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(private http: HttpClient) {
    emailjs.init('d13gU1RPXK0GzNeXR');
  }

  sendEmail(email: string, subject: string, body: string): Observable<any> {
    const templateParams = {
      to_email: email,
      email_subject: subject,
      email_body: body
    };

    return new Observable((observer) => {
      emailjs.send('service_o3g4dvi', 'template_g4seumj', templateParams)
        .then((response: EmailJSResponseStatus) => {
          observer.next(response);
          observer.complete();
        }, (error) => {
          observer.error(error);
        });
    });
  }
}
