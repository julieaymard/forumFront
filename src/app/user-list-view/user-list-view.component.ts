import { Component, OnInit } from '@angular/core';
import {User} from "../model/user";
import {DataService} from "../data-service.service";
import {Topic} from "../model/topic";


@Component({
  selector: 'app-user-list-view',
  templateUrl: './user-list-view.component.html',
  styleUrls: ['./user-list-view.component.css']
})
export class UserListViewComponent implements OnInit {

  users: User[];
  selectedUser: User;
  createdTopic : Topic = new Topic();
  // createdUser : User = new User();
  selectedTopic: Topic;
  formModel = {
    name :'',
    limit:1000,
    level: 'Kenza'
  };



  constructor(public dataService: DataService) {
    dataService.fetchUsers()
      .then(users => this.users = users)
      .then(users => console.log('Users:', users));
  }

  ngOnInit() {
  }

  details(user: User) {
    this.selectedUser = user;
    this.createdTopic = new Topic();
    this.createdTopic.user = user;
    this.createdTopic.name = user.name+"'s topic"

    console.log('You selected', user);

    this.dataService
      .fetchUserWithTopics(user)
      .then(fullUser => this.selectedUser = fullUser)
      .then(console.log);

  }



}
