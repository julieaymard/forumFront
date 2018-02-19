import {Component, OnInit} from '@angular/core';
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
  createdTopic: Topic = new Topic();
  createdUser : User = new User();
  selectedTopic: Topic;



  constructor(public dataService: DataService) {
    dataService.fetchUsers()
      .then(users => this.users = users)
      .then(users => console.log('Users:', users));
  }

  ngOnInit() {
  }

  detailsU(user: User) {
    this.selectedUser = user;
    this.selectedTopic = null;
    // this.createdTopic = new Topic();
    // this.createdTopic.user = user;
    // this.createdTopic.name = user.name + "'s topic"

    console.log('You selected', user);

    this.dataService
      .fetchUserWithTopics(user)
      .then(fullUser => this.selectedUser = fullUser)
      .then(console.log);
  }

  detailsT(topic: Topic) {
    this.selectedTopic = topic;
    // this.createdTopic = new Topic();
    // this.createdTopic.user = user;
    // this.createdTopic.name = user.name + "'s topic"

    console.log('You selected', topic);

    this.dataService
      .fetchTopicsWithComments(topic)
      .then(fullTopic => this.selectedTopic = fullTopic)
      .then(console.log);

  }

  createUser(){
    this.dataService.createUser(this.createdUser)
      .then ( ()=> this.users.push(Object.assign({}, this.createdUser)))
      .catch(e=> alert(e.message));
  }

}
