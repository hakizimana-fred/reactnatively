import { type TextStyle } from 'react-native';
import Wrapper from './components/Wrapper';
import Card from './components/Card/Card';
import CardFooter from './components/Card/CardFooter';
import CardTitle from './components/CardTitle';
import CardDescription from './components/CardDescription';
import { CardContent } from './components/Card/CardContent';
import CardImage from './components/Card/CardImg';
import Avatar from './components/Avatar/Avatar';
import { Button } from './components/Button/Button';
import TextAvatar from './components/Avatar/TextAvatar';
import Heading from './components/Header/Headers';
import TextTabs from './components/tabs/TextTabs';
export {
  Wrapper,
  Card,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardImage,
  Avatar,
  Button,
  TextAvatar,
  Heading,
  TextTabs,
};

export const colors = {
  primary: '#007aff',
  white: '#fff',
  black: '#000',
} as const;

export const fontSizes = {
  h1: 56,
  h2: 40,
  h3: 28,
  h4: 20,
} as const;

export const paragraph: TextStyle = {
  color: colors.black,
  fontWeight: '500',
  fontSize: 14,
  lineHeight: 20,
};
