import { Family, User } from "types";

export const addFamilyMember = async (
  family: Family,
  user: User,
  admin: boolean = false,
  onSuccess: (response: Response) => void = () => {},
  onFailure: (reason: any) => void = () => {}
) => {
  await fetch(`/api/families/${family.familyId}`, {
    method: "PATCH",
    body: JSON.stringify({
      userId: user.id,
      action: admin ? "addAdmin" : "add",
    }),
  })
    .then((res) => onSuccess(res))
    .catch((reason) => onFailure(reason));
};
