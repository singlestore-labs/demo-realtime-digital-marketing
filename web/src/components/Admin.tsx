import { CityMap } from "@/components/CityMap";
import { MarkdownText } from "@/components/MarkdownText";
import { Container } from "@chakra-ui/react";

export const Admin = () => {
  return (
    <Container maxW="container.lg" mt={10} mb="30vh">
      <Container maxW="container.md" mb={4}>
        <MarkdownText>
          {`
            ## City Admin

            You can create and remove cities by interacting with the map below.
            Click anywhere to define a new city, or click an existing city to
            remove it.
          `}
        </MarkdownText>
      </Container>
      <CityMap
        // show the entire USA by default
        defaultZoom={4}
        defaultCenter={[39.716470511656766, -99.59395661915288]}
        height={500}
      />
    </Container>
  );
};
