import { Booking, Family, User } from "types";

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

export const deleteBooking = async (
  booking: Booking,
  onSuccess: (response: Response) => void = () => {},
  onReject: (response: Response) => void = () => {},
  onFailure: (reason: any) => void = () => {}
) => {
  await fetch(
    `/api/families/${booking.familyId}/bookings/${booking.startTime.getTime()}`,
    {
      method: "DELETE",
    }
  )
    .then((res) => {
      if (res.ok) {
        onSuccess(res);
      } else {
        onReject(res);
      }
    })
    .catch(onFailure);
};
