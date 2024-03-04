# reactnatively

reactnatively is a lightweight and minimal UI library designed for simplicity and flexibility. It provides essential components and styles to kickstart your React Native projects without unnecessary bloat.

## Installation

```sh
npm install reactnatively
```

## Usage

## Components

### Avatars

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

## Avatar types

| Prop       | Type     | Description                                       |
|------------|----------|---------------------------------------------------|
| size       | number   | Size of the avatar                                |
| src        | string   | Source of the avatar image                        |
| text       | string   | Text to display if no image source is provided    |
| bg         | string   | Optional background color for the avatar           |

only use text in TextAvatar.

### Heading

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

| Prop     | Type    | Description                                     |
|----------|---------|-------------------------------------------------|
| variant  | string  | Variant of the heading (e.g., "h1", "h2", etc.)|

### Button

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

| Prop     | Type      | Description                                        |
|----------|-----------|----------------------------------------------------|
| size     | string    | Size of the button (e.g., "lg", "md", "sm")       |
| onPress  | function  | Callback function to execute on button press      |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
