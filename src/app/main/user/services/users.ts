import {UserSkill} from "./UserSkill";

export class Users {
  id: number;
  email: string;
  username: string;
  birthday: any;
  status: string;
  cin: string;
  hiringDate: Date;
  roles: string[];
  phone: string;
  first_name: string;
  tokenExpiresAt: any;
  userRights: any;
  gender: any;
  account_status: number;
  accountStatus: number;
  skills: string[];
  userSkillsId: UserSkill[];
}
