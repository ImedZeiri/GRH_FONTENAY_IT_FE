import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthInterceptor} from '../../../../core/interceptors/auth.interceptor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: 'imed@gmail.com',
      password: 'test'
    });
  }

  submit() {
    this.http.post('http://127.0.0.1:8000/api/login', this.form.getRawValue(), {withCredentials: true})
      .subscribe((res: any) => {
        console.log(res);
        AuthInterceptor.accessToken = res.token;
        AuthInterceptor.refreshToken = res.refresh_token;
        console.log('done')
        this.router.navigate(['']);
      });
  }
}
