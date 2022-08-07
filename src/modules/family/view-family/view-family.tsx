import { Box, Divider, Flex, Heading, List, ListItem } from "@chakra-ui/react";
import { Family } from "types";

const ViewFamily = ({ family }: { family: Family }) => {
  return (
    <Flex flexDir="column" gap={5}>
      <Box>
        <Heading size="md">{family.familyName}</Heading>
        <Divider mb={2} mt={2} />
        {family.familyId}
      </Box>

      <Box>
        <Heading size="md">Familjeadministratörer</Heading>
        <Divider mb={2} mt={2} />
        <List>
          {family.familyAdmins?.map((id) => (
            <ListItem key={id}>{id}</ListItem>
          ))}
        </List>
      </Box>

      <Box>
        <Heading size="md">Familjemedlemmar</Heading>
        <Divider mb={2} mt={2} />
        <List>
          {family.familyMembers?.map((id) => (
            <ListItem key={id}>{id}</ListItem>
          ))}
        </List>
      </Box>
    </Flex>
  );
};

export default ViewFamily;
