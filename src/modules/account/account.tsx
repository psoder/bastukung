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
import ManageBookings from "modules/booking/manage-bookings";
import ManageFamily from "modules/family/manage-family";
import ViewFamily from "modules/family/view-family";
import { ReactElement } from "react";
import { useAccountContext } from "./account-context";
import AccountInfo from "./account-info";

const Account = () => {
  const { user } = useAccountContext();

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
              Mitt Konto
            </Heading>
          </GridItem>

          <GridItem area="menu" display="flex">
            <Card shadow="xl">
              <TabList>
                <Tab justifyContent="left" textAlign="left">
                  <Heading as="h3" size="md" fontWeight="normal">
                    Hantera Konto
                  </Heading>
                </Tab>
                <Tab justifyContent="left" textAlign="left">
                  <Heading as="h3" size="md" fontWeight="normal">
                    {user.familyAdmin ? "Hantera familj" : "Visa familj"}
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
                  <TP title="Konto">
                    <AccountInfo />
                  </TP>
                </TabPanel>

                <TabPanel p="0">
                  <TP title="Familj">
                    <Family />
                  </TP>
                </TabPanel>

                <TabPanel p="0">
                  <TP title="Bokningar">
                    <Bookings />
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

const Family = () => {
  const { user, family } = useAccountContext();

  if (!family) {
    return <>Ingen familj :(</>;
  }

  if (user.familyAdmin) {
    return <ManageFamily family={family} />;
  } else {
    return <ViewFamily family={family} />;
  }
};

const Bookings = () => {
  const { bookings } = useAccountContext();
  return (
    <>
      <ManageBookings bookings={bookings} />
    </>
  );
};

export default Account;
