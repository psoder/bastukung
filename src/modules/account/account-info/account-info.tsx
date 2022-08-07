import { List, ListItem } from "@chakra-ui/react";
import { useAccountContext } from "../account-context";

const AccountInfo = () => {
  const { user } = useAccountContext();

  return (
    <>
      <List>
        <ListItem>Namn: {user.name}</ListItem>
        <ListItem>Användar id: {user.id}</ListItem>
        <ListItem>Epost: {user.email}</ListItem>
        <ListItem>Familjeadmin: {`${user.familyAdmin}`}</ListItem>
        <ListItem>Familjeid: {`${user.familyId}`}</ListItem>
        <ListItem>Roll: {user.role}</ListItem>
      </List>
    </>
  );
};

export default AccountInfo;
