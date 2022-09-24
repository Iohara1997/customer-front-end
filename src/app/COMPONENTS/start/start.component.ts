import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../SERVICES/customer.service'
import { UserService } from '../../SERVICES/user.service';
@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})

export class StartComponent implements OnInit {

  constructor(private CustomerService: CustomerService, private UserService: UserService) { }

  ngOnInit(): void {
    this.listCustomers()
  }

  logout() {
    this.UserService.logout();
  }

  listCustomers() {
    this.CustomerService.getCustomers().subscribe(
      res => {
        console.log(res)
      },
      err => console.error(err)
    )
  }

}
