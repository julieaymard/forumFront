import {User} from "./user";
/**
 * Created by AELION on 19/02/2018.
 */
export class Topic {
  user: User;
  name: string;
  id: number;

  comments: Comment[]=[];

}
