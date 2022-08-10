export type Role = "USER" | "ADMIN";

export type Email = `${string}@${string}.${string}`;

export type UserAction = "remove" | "promote" | "demote" | "add" | "addAdmin";

export type ApiResponse = { message: string; details?: any };

export type Booking = {
  familyId: string; // Partition key
  startTime: Date; // Sort key
  endTime: Date;
  bookedBy: string;
  comment?: string;
};

export type User = {
  id: string; // Partition key
  name: string;
  email: string;
  image?: string;
  role: Role;
  familyId?: string;
  familyAdmin?: boolean;
};

export type Family = {
  familyId: string;
  familyName: string;
  familyMembers?: string[];
  familyAdmins?: string[];
};
