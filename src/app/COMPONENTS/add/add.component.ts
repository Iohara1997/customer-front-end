import { Component, Input, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/SERVICES/customer.service';
import { CepService } from '../../SERVICES/cep.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  formCreate: FormGroup;
  @Input() street: boolean = false;

  constructor(private CustomerService: CustomerService,
    private formBuilder: FormBuilder, private snackBar: MatSnackBar, private CepService: CepService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formCreate = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(10), this.validate_name]],
      cpf: ['', [Validators.required, this.validate_cpf]],
      phone: ['', [Validators.required, this.validate_phone]],
      cep: [, [Validators.required, this.validate_cep]],
      num: ['', [Validators.required]],
      street: ['', [Validators.required]],
    });
  }

  create() {
    if (this.formCreate.invalid) return;
    let customer = this.formCreate.getRawValue()
    this.CustomerService.createCustomer(customer).subscribe(
      res => {
        this.snackBar.open('Usuário adicionado com sucesso!', '', {
          duration: 3000
        });
      },
      err => {
        console.log(err)
        this.snackBar.open('Verifique os dados, e tente novamente.', 'Erro.', {
          duration: 3000
        });
      }
    );
  }

  generateAddress(value) {
    let cep = String(value).length;
    if (cep == 8) {
      this.getDataCep(value);
    }
    else this.formCreate.get('street').setValue('');

  }

  async getDataCep(cep) {
    (await this.CepService.getDataCep(cep)).subscribe(data => {
      if (data['erro']) return this.street = true;
      this.formCreate.get('street').setValue(data['logradouro']);
      this.street = false;
    })
  }

  validate_cep(control: AbstractControl): { [key: string]: boolean } | null {
    const cep = String(control.value).length;
    if (control.value !== undefined && (isNaN(control.value) || cep != 8)) {
      return { 'cepError': true };
    }
    return null;
  }

  validate_phone(control: AbstractControl): { [key: string]: boolean } | null {
    const regex = new RegExp("^((1[1-9])|([2-9][0-9]))((3[0-9]{3}[0-9]{4})|(9[0-9]{3}[0-9]{5}))$");
    if (regex.test(control.value)) return null;
    return { 'phoneError': true }
  }

  validate_name(control: AbstractControl): { [key: string]: boolean } | null {
    const regex = /[0-9]/;
    if (regex.test(control.value)) return { 'nameError': true };
    return null;
  }

  validate_cpf(control: AbstractControl): { [key: string]: boolean } | null {
    const cpf = String(control.value);
    if (cpf.length != 11 ||
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999")
      return { cpfNotValid: true };
    let add = 0;
    for (let i = 0; i < 9; i++)
      add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
      rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
      return { cpfNotValid: true };
    add = 0;
    for (let i = 0; i < 10; i++)
      add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
      rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
      return { cpfNotValid: true };
    return null;
  }
}
