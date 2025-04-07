import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { DITokens } from '../../core/utils/di.tokens';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  providers: [
    AuthService,
    {
      provide: DITokens.API_ENDPOINT,
      useValue: 'http://localhost:4000',
    },
  ],
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor($auth: AuthService) {
    $auth.signIn('test123@gmail.com', '1234567').subscribe(console.log);
  }
}
