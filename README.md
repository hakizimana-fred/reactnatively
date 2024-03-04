# reactnatively

reactnatively is a lightweight and minimal UI library designed for simplicity and flexibility. It provides essential components and styles to kickstart your React Native projects without unnecessary bloat.

## Installation

```sh
npm install reactnatively
```

## Usage

## Components

Avatars
Avatars can be used to display user profile pictures or text representations.

```js
import { Avatar, TextAvatar } from 'reactnatively';

// ...

const AvatarComponent = () => {
  return (
    <Avatar size={42} src="https://example.com/avatar.jpg" />
    <TextAvatar size={50} text="HF" bg="blue" />
  );
```

Heading
Heading components render text headings with customizable sizes.

```js
import { Heading } from 'reactnatively';

// ...

const HeaderComponent = () => {
  return (
     <Heading variant="h1">Main Heading</Heading>
    <Heading variant="h3">Subheading</Heading>
  );
```

Button
Buttons provide interactive elements for triggering actions.

```js
import { Button } from 'reactnatively';

// ...

const ButtonExample = () => {
  return (
    <Button size="lg" onPress={() => console.log('Button clicked')}>
      Click Me
    </Button>
  );
};
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
