import { PixiMap } from "@/components/PixiMap";
import { useNotifications } from "@/data/useNotifications";
import { useNotificationsRenderer } from "@/render/notifications";
import { Flex, Heading, Stack } from "@chakra-ui/react";

export const Map = () => {
  const notificationEmitter = useNotifications();
  const renderer = useNotificationsRenderer(notificationEmitter);

  return (
    <Flex
      gap={4}
      justifyContent="space-between"
      direction={["column", "column", "row"]}
      height="100%"
    >
      <Stack spacing={4} flex="2 2 0" minHeight="200px" maxHeight="100%">
        <Heading size="md">Map</Heading>
        <PixiMap renderer={renderer} />
      </Stack>
      <Stack spacing={4} flex="1 1 0" minWidth="0">
        <Heading size="md">Stats</Heading>
      </Stack>
    </Flex>
  );
};
