import { Family, User as DefaultUser } from "types";

export type User = DefaultUser & { familyAdmin: boolean };
