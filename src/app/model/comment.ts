
import {User} from "./user";
import {Topic} from "./topic";


export class Comment {
  user?:User;
  topic? : Topic;
id : number;
  user_id: number;
  topic_id: number;
  content: string;


}
