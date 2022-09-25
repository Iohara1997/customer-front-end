import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../../SERVICES/customer.service'
import { IUcustomer } from 'src/app/INTERFACES/IUcustomer';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogContentComponent } from './dialog-content/dialog-content.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})

export class ListComponent implements OnInit {

  @ViewChild(MatTable, { static: false }) table: MatTable<any>;

  list;
  loading = true;

  constructor(private CustomerService: CustomerService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.listCustomers();
  }

  // ngAfterViewInit() {
  //   this.table.dataSource = this.dataSource;
  // }
  // ngAfterContentChecked() {
  //   this.dataSource = new MatTableDataSource(this.list);
  // }

  listCustomers() {
    this.CustomerService.getCustomers().subscribe(
      res => {
        this.list = new MatTableDataSource<IUcustomer[]>(res)
        this.loading = false;
      },
      err => console.error(err)
    )
  }

  delete(customer: string, id: string) {
    const dialogRef = this.dialog.open(DialogContentComponent, { data: customer });

    dialogRef.afterClosed().subscribe(res => {
      if (res === true) {
        this.CustomerService.deleteCustomer(id).subscribe(
          res => {
            this.listCustomers()
          },
          err => console.log(err)
        );
      }
      else return this.listCustomers()
    });
  }

  update(id: number) {
    this.router.navigate(['/edit/' + id]);
  }

  displayedColumns: string[] = ['id_customer', 'name', 'email', 'cpf', 'phone', 'address', 'cep', 'actions'];
}