import * as React from 'react';
import { Text } from 'react-native';
import {
  Card,
  Button,
  Heading,
  Wrapper,
  CardImage,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
  Avatar,
  TextAvatar,
} from 'reactnatively';

export default function App() {
  return (
    <>
      <Wrapper>
        <Text>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod nostrum
          deserunt fuga voluptates quisquam, maxime voluptatibus tenetur
          doloremque iusto porro laborum harum laboriosam quis perspiciatis
        </Text>
        <Heading variant="h1" align="left">
          Well done
        </Heading>

        <Avatar size={66} src={require('../assets/icon.png')} />

        <Button
          size="lg"
          bg="brown"
          onPress={() => console.log('sup with you')}
        >
          Hi
        </Button>
        <Card>
          <CardImage />

          <CardContent>
            <CardTitle align="right" text="Hi there" />
            <CardDescription text="hello there" align="right" />
            <CardFooter>
              <Text>Hello</Text>
            </CardFooter>
          </CardContent>
        </Card>
        <TextAvatar size={66} bg="red" text="HK" />
      </Wrapper>
    </>
  );
}
