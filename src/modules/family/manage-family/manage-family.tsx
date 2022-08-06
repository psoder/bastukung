import { Divider, Grid, GridItem, Heading } from "@chakra-ui/react";
import AddFamilyMember from "modules/family/add-family-member";
import { useEffect, useState } from "react";
import { Family } from "types";
import FamilyMemberRow from "./components/family-member-row";
import { User } from "./types";

const ManageFamily = ({ family }: { family: Family }) => {
  const [members, setMembers] = useState<User[]>();

  useEffect(() => {
    fetch(`/api/families/${family.familyId}/members`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setMembers(data.members);
      })
      .catch(console.error);
  }, [family.familyId]);

  return (
    <Grid
      gridTemplateAreas={`
      "members bookings"
      "addMembers bookings"
    `}
      gap="10"
      gridTemplateColumns="1fr 1fr"
    >
      <GridItem area="members">
        <Heading size="md">Familjeadministratörer</Heading>
        <Divider mb={2} mt={2} />
        {members
          ?.filter((member) => member.familyAdmin)
          .map((member) => (
            <FamilyMemberRow key={member.id} family={family} member={member} />
          ))}

        <Heading size="md" mt={5}>
          Familjemedelemmar
        </Heading>
        <Divider mb={2} mt={2} />
        {members
          ?.filter((member) => !member.familyAdmin)
          .map((member) => (
            <FamilyMemberRow key={member.id} family={family} member={member} />
          ))}
      </GridItem>

      <GridItem area="addMembers">
        <Heading size="md">Lägg till familjemedlem</Heading>

        <AddFamilyMember family={family} />
      </GridItem>

      <GridItem area="bookings">
        <Heading size="md">Bokingar</Heading>
        bokningar
      </GridItem>
    </Grid>
  );
};

export default ManageFamily;
