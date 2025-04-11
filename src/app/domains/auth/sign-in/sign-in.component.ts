import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrorComponent } from '../../../shared/components/error/error.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ErrorComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SignInComponent {
  private fb = inject(FormBuilder);

  loginForm = this.fb.group({
    login: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(8),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.maxLength(8),
      Validators.minLength(3),
    ]),
    age: new FormControl({ value: 0, disabled: true }),
  });

  submit() {
    console.log('submit', this.loginForm.getRawValue());
    if (this.loginForm.invalid) {
      alert('invalid form');
      return;
    }

    console.log(this.loginForm.value);
    console.log(this.loginForm.getRawValue());

    console.log(this.loginForm.controls.login.value);
    console.log(this.loginForm.get('login')?.value);
  }
  // loginForm = new FormGroup({
  //   login: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //   password: new FormControl('', [
  //     Validators.required,
  //     Validators.maxLength(8),
  //   ]),
  // });
}
