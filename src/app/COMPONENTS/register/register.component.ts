import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUuser } from '../../INTERFACES/IUuser';
import { UserService } from '../../SERVICES/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formLogin: FormGroup;
  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      name: ['', [Validators.required]]
    });
  }

  register() {

    if (this.formLogin.invalid) return;
    let user = this.formLogin.getRawValue() as IUuser;
    this.userService.register(user).subscribe(
      res => {
        this.snackBar.open('Usuário cadastrado com sucesso!', 'Usuário logado.', {
          duration: 3000
        });
      },
      err => {
        this.snackBar.open('Usuário já existe.', 'Por favor, realize o login.', {
          duration: 3000
        });
      }
    )
  }

}
