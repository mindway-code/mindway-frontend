
import { Family } from "./family";
import { User } from "./user";

export interface FamilyMember {
  id: number;
  family_id?: number;
  family?: Family[];
  role: string;
  member: User;
}
