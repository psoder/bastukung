import { Family, User } from "types";

export const addFamilyMember = async (
  family: Family,
  user: User,
  admin: boolean = false,
  onSuccess: (response: Response) => void = () => {},
  onFailure: (reason: any) => void = () => {}
) => {
  await fetch(`/api/families/${family.familyId}`, {
    method: "PUT",
    body: JSON.stringify({
      ...family,
      familyMembers: [...(family.familyMembers ?? []), user.id],
      familyAdmins: [...(family.familyAdmins ?? []), admin ? user.id : ""],
    }),
  })
    .then((res) => onSuccess(res))
    .catch((reason) => onFailure(reason));
};
