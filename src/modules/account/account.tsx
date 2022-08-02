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
import { useSession } from "next-auth/react";
import { ReactElement } from "react";
import AccountInfo from "./account-info";
import Bookings from "./bookings";
import Family from "./family";

const Account = () => {
  const { data: session } = useSession();

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
                    Hantera Familj
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

export default Account;
