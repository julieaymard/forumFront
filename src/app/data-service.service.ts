import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./model/user";
import {Topic} from "./model/topic";


@Injectable()
export class DataService{

  constructor(public http: HttpClient){

  }

  fetchUsers(): Promise<User[]> {

    return this.http
      .get('http://localhost:8080/forum/api/users')
      .toPromise()
      .then(data => data as User[])
  }

  createUser(user: User) {
    let url = ('http://localhost:8080/forum/api/users')
    let dto = {
      name: user.name,
      id: user.id
    };

    console.log('sending user:', dto);

    return this.http.post(url, dto)
      .toPromise()
      .then(data => console.log('Success :)', data))
    //.catch (e => console.error('Fail :(', e));

  }

  // fetchTopics(): Promise<Topic[]> {
  //
  //   return this.http
  //     .get('http://localhost:8080/forum/api/topics')
  //     .toPromise()
  //     .then(data => data as Topic[])
  //
  //
  // }

  fetchUserWithTopics(user: User): Promise<User> {
  let url = ('http://localhost:8080/forum/api/users/' + user.id)
  return this.http
    .get(url)
    .toPromise()
    .then(data => {
      console.log('user with topics:', data);
      return data as User
    })
}

  fetchTopicsWithComments(topic: Topic): Promise<Topic> {
    let url = ('http://localhost:8080/forum/api/topics/' + topic.id)
    return this.http
      .get(url)
      .toPromise()
      .then(data => {
        console.log('topics with comments:', data);
        return data as Topic
      })
  }
}
