import {
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Card from "components/Card";
import { ReactElement } from "react";
import { Booking, Family, User } from "types";
import ManageBookings from "./manage-bookings";
import ManageFamilies from "./manage-families";
import ManageUsers from "./manage-users";

const Admin = ({
  users,
  families,
  bookings,
}: {
  users: User[];
  families: Family[];
  bookings: Booking[];
}) => {
  return (
    <Container maxW="8xl" display="flex" p="5%">
      <Tabs orientation="vertical" flex={1}>
        <Grid
          flex={1}
          gap={"3%"}
          gridTemplateAreas={`"titel titel" "menu content"`}
          gridTemplateColumns={"2fr 7fr"}
          gridTemplateRows={"auto 1fr"}
        >
          <GridItem area="titel">
            <Heading as="h1" size="2xl" fontWeight="bold">
              Admin
            </Heading>
          </GridItem>

          <GridItem area="menu" display="flex">
            <Card shadow="xl">
              <TabList>
                <Tab justifyContent="left" textAlign="left">
                  <Heading as="h3" size="md" fontWeight="normal">
                    Hantera Användare
                  </Heading>
                </Tab>
                <Tab justifyContent="left" textAlign="left">
                  <Heading as="h3" size="md" fontWeight="normal">
                    Hantera Familjer
                  </Heading>
                </Tab>
                <Tab justifyContent="left" textAlign="left">
                  <Heading as="h3" size="md" fontWeight="normal">
                    Hantera Bokningar
                  </Heading>
                </Tab>
              </TabList>
            </Card>
          </GridItem>

          <GridItem area="content" display="flex">
            <Card shadow="xl">
              <TabPanels>
                <TabPanel p="0">
                  <TP title="Användare">
                    <ManageUsers users={users} />
                  </TP>
                </TabPanel>

                <TabPanel p="0">
                  <TP title="Familjer">
                    <ManageFamilies families={families} />
                  </TP>
                </TabPanel>

                <TabPanel p="0">
                  <TP title="Bokningar">
                    <ManageBookings bookings={bookings} />
                  </TP>
                </TabPanel>
              </TabPanels>
            </Card>
          </GridItem>
        </Grid>
      </Tabs>
    </Container>
  );
};

const TP = ({
  title,
  children,
}: {
  title?: string;
  children: ReactElement;
}) => {
  return (
    <>
      <Heading as="h2" size="xl" fontWeight="semibold">
        {title}
      </Heading>
      <Divider mb="3" />
      {children}
    </>
  );
};

export default Admin;
