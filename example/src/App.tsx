import * as React from 'react';
import { Text } from 'react-native';
import { Button, Heading, Wrapper } from 'reactnatively';

export default function App() {
  return (
    <>
      <Wrapper>
        <Text>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod nostrum
          deserunt fuga voluptates quisquam, maxime voluptatibus tenetur
          doloremque iusto porro laborum harum laboriosam quis perspiciatis
          cumque incidunt quam itaque molestiae vero repellendus quia placeat
          libero voluptatum! Ullam vitae laborum cumque eius harum debitis.
          Maiores ad maxime ab aliquam deserunt explicabo.
        </Text>
        <Heading variant="h1" align="left">
          Well done
        </Heading>
        <Button size="lg" onPress={() => console.log('sup with you')}>
          Hi
        </Button>
      </Wrapper>
      {/* <View style={{ width: 100 }}>
        <Button size="lg">Hi</Button>
      </View> */}
    </>
  );
}
