export type Role = "USER" | "ADMIN";

export type Email = `${string}@${string}.${string}`;

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
  emailVerified?: Date;
  familyId: string;
  familyAdmin: boolean;
  dateCreated?: Date;
};

export type Family = {
  familyName: string;
  familyMembers: string[];
  familyAdmins: string[];
};
