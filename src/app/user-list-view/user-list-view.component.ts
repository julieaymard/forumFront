import {Component, OnInit} from '@angular/core';
import {User} from "../model/user";
import {DataService} from "../data-service.service";
import {Topic} from "../model/topic";
import {Comment} from "../model/comment";


@Component({
  selector: 'app-user-list-view',
  templateUrl: './user-list-view.component.html',
  styleUrls: ['./user-list-view.component.css']
})
export class UserListViewComponent implements OnInit {

  users: User[];
  topics: Topic[];
  comments: Comment[];
  selectedUser: User;
  createdTopic: Topic = new Topic();
  createdUser: User = new User();
  createdComment: Comment = new Comment();
  selectedTopic: Topic;


  constructor(public dataService: DataService) {
    dataService.fetchUsers()
      .then(users => this.users = users)
      .then(users => console.log('Users:', users));

    dataService.fetchTopics()
      .then(topics => this.topics = topics)
      .then(topics => console.log('Topics:', topics));

    dataService.fetchComments()
      .then(comments => this.comments = comments)
      .then(comments => console.log('Comments:', comments));
  }

  ngOnInit() {
  }

  detailsU(user: User) {
    this.selectedUser = user;
    this.selectedTopic = null;
    this.createdTopic = new Topic();
    this.createdComment = new Comment();
    this.createdTopic.user = user;
    this.createdTopic.name = user.name + "'s topic"

    console.log('You selected', user);

    this.dataService
      .fetchUserWithTopics(user)
      .then(fullUser => this.selectedUser = fullUser)
      .then(console.log);
  }


  detailsT(topic: Topic) {
    this.selectedTopic = topic;
    this.createdComment = new Comment();
    this.createdTopic = new Topic();
    this.createdTopic.user = topic.user;
    this.createdTopic.name = topic.name + "'s topic"


    console.log('You selected', topic);

    this.dataService
      .fetchTopicsWithComments(topic)
      .then(fullTopic => this.selectedTopic = fullTopic)
      .then(console.log);

  }

  createUser() {
    this.dataService.createUser(this.createdUser)
      //.then(() => this.users.push(Object.assign({}, this.createdUser)))
        .then((data) => {
          console.log(data);
          //this.createdUser = data;
          (<any>Object).assign( this.createdUser, data );
          this.users.push(this.createdUser);
        })
      .catch(e => alert(e.message));
  }

  // createTopic() {
  //   this.dataService.createTopic(this.createdTopic)
  //   //.then(() => this.users.push(Object.assign({}, this.createdUser)))
  //     .then((data) => {
  //       console.log(data);
  //       this.createdTopic = data;
  //       (<any>Object).assign( this.createdTopic, data );
  //       this.topics.push(this.createdTopic);
  //     })
  //     .catch(e => alert(e.message));
  // }

  createTopic() {
    this.dataService.createTopic(this.createdTopic)
      .then( ()=> this.selectedUser.topics.push(Object.assign({}, this.createdTopic)))
      .catch(e=> alert(e.message));
  }


  // createTopic() {
  //   console.log(this.createdTopic);
  //   let dto = {
  //     "id": null,
  //     "name": this.createdTopic.name,
  //     "user": {
  //       "id": this.createdTopic.user.id,
  //       "name": this.createdTopic.user.name,
  //       "topics": null
  //     },
  //     "comments": null
  //   }
  //   this.dataService.createTopic(dto)
  //     .then((data) => { // data => from backend "FullTopic"
  //       console.log('Données retournées : ' + JSON.stringify(data));
  //         // Caster les données
  //         (<any>Object).assign( this.createdTopic, data );
  //         this.selectedUser = dto.user;
  //         let topic = {
  //           "id": this.createdTopic.id,
  //           "name": this.createdTopic.name,
  //           "user": this.selectedUser,
  //           "comments": []
  //         };
  //         if(this.selectedUser.topics == null){
  //           this.selectedUser.topics = <any>[];
  //         }
  //         console.log(this.createdTopic + ' -> ' + JSON.stringify(this.selectedUser.topics));
  //         this.selectedUser.topics.push(topic);
  //       }
  //     )
  //     .catch(e => alert(e.message));
  // }

  // createComment() {
  //   this.dataService.createComment(this.createdComment)
  //     .then(() => this.selectedTopic.comments.push(Object.assign({}, this.createdComment)))
  //     .catch(e => alert(e.message));
  // }

}
