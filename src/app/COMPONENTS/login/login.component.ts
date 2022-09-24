import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUuser } from '../../INTERFACES/IUuser';
import { UserService } from '../../SERVICES/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {

    if (this.formLogin.invalid) return;
    let user = this.formLogin.getRawValue() as IUuser;
    this.userService.login(user).subscribe(
      res => {
        this.snackBar.open('Seja bem vindo (a)!', 'Usuário logado.', {
          duration: 3000
        });
      },
      err => {
        this.snackBar.open('Falha na autenticação', 'Usuário ou senha incorretos.', {
          duration: 3000
        });
      }
    )
  }
}
