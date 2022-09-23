import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../SERVICES/customer.service'
@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})

export class StartComponent implements OnInit {

  constructor(private CustomerService: CustomerService) { }

  ngOnInit(): void {
    this.listCustomers()
  }

  listCustomers() {
    this.CustomerService.getCustomers().subscribe(
      res => {
        console.log(res)
      },
      err => console.log(err)
    )
  }

}
