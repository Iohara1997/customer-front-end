import { Component, OnInit } from '@angular/core';
import { UserService } from '../../SERVICES/user.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})

export class StartComponent implements OnInit {

  list: any = [];

  constructor(private UserService: UserService) { }

  ngOnInit(): void { }

  logout() {
    this.UserService.logout();
  }
}
