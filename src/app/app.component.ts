import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslocoPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'beminnat';

  isAuthorized: boolean = true;
  user: any;
  data: any[] = [1, 2, 3, 4, 5];

  constructor($auth: AuthService) {
    // $auth.signIn('test@gmail.com', '123456').subscribe((data) => {
    //   console.log(data);
    //   $auth.accessToken = 'test';
    // });
  }
}
