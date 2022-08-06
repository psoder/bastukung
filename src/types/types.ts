export type Role = "USER" | "ADMIN";

export type Email = `${string}@${string}.${string}`;

export type UserAction = "remove" | "promote" | "demote";

export type Booking = {
  familyId: string; // Partition key
  start: Date; // Sort key
  end: Date;
  bookedBy: string;
  comment?: string;
};

export type User = {
  id: string; // Partition key
  name: string;
  email: string;
  image?: string;
  role: Role;
};

export type Family = {
  familyId: string;
  familyName: string;
  familyMembers?:  string[];
  familyAdmins?: string[];
};
