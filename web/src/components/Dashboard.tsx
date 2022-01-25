import {
  AspectRatio,
  Box,
  Grid,
  Heading,
  HStack,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

type Notification = {
  offerID: string;
  costCents: number;
  lon: number;
  lat: number;
  content: string;
};

const Notification = (n: Notification) => (
  <Stack
    bg={useColorModeValue("gray.200", "gray.700")}
    borderRadius="md"
    p={4}
    spacing={2}
  >
    <Text isTruncated>{n.content}</Text>
    <HStack spacing={4}>
      <Box>
        <Text fontSize="xs">Offer</Text>
        <Text fontSize="sm" fontWeight="bold">
          {n.offerID}
        </Text>
      </Box>
      <Box>
        <Text fontSize="xs">Location</Text>
        <Text fontSize="sm" fontWeight="bold">
          {Math.abs(n.lat)} {n.lat < 0 ? "N" : "S"} {Math.abs(n.lon)}{" "}
          {n.lon < 0 ? "W" : "E"}
        </Text>
      </Box>
      <Box>
        <Text fontSize="xs">Cost</Text>
        <Text fontSize="sm" fontWeight="bold">
          ${(n.costCents / 100).toFixed(2)}
        </Text>
      </Box>
    </HStack>
  </Stack>
);

export const Dashboard = () => {
  return (
    <Grid
      templateColumns={["minmax(0, 1fr)", null, "2fr minmax(0, 1fr)"]}
      gap={4}
    >
      <Stack spacing={4}>
        <Heading size="md">Notifications</Heading>
        <AspectRatio borderRadius="md" overflow="hidden" ratio={16 / 9}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.5276316452784755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1567723392506!5m2!1sen!2sng" />
        </AspectRatio>
      </Stack>
      <Stack spacing={4}>
        <Heading size="md">Notifications Stream</Heading>
        <Stack spacing={4}>
          <Notification
            {...{
              offerID: "123",
              costCents: 10,
              lon: 56.34,
              lat: -34.23,
              content: "beer, now 50% off",
            }}
          />
          <Notification
            {...{
              offerID: "342",
              costCents: 8,
              lon: -36.34,
              lat: 82.23,
              content:
                "free $20 gift card with purchase of $100asdf asdfjioqawjfewfjowijfoiwajfowjefwaef owe foi wefj wioefj weiof joi",
            }}
          />
        </Stack>
      </Stack>
    </Grid>
  );
};
