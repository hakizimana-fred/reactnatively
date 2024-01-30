import React from 'react';
import { TouchableOpacity, type TextStyle, Image } from 'react-native';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView, View } from 'react-native';

interface IChildren {
  children: React.ReactNode | React.ReactNode[];
  bg?: string;
}

const fontSizes = {
  h1: 56,
  h2: 40,
  h3: 28,
  h4: 20,
} as const;

export const colors = {
  primary: '#007aff',
  white: '#fff',
  black: '#000',
} as const;

export const paragraph: TextStyle = {
  color: colors.black,
  fontWeight: '500',
  fontSize: 14,
  lineHeight: 20,
};

interface HeadingProps extends IChildren, TextAlignProps {
  variant?: keyof typeof fontSizes;
  size?: number;
  color?: string;
}

interface TextAlignProps {
  align?: 'left' | 'right' | 'center';
}

interface CardTypographyProps {
  text: string;
  align?: TextAlignProps['align'];
}

interface ButtonProps extends IChildren {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  onPress?: () => void;
}

export const Wrapper: React.FC<IChildren> = ({ children, bg }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

export const Heading: React.FC<HeadingProps> = ({
  children,
  variant = 'h1',
  size,
  color,
  align,
}) => {
  return (
    <Text
      style={{
        color: color && color,
        fontSize: size ? size : fontSizes[variant],
        textAlign: align && align,
        ...styles.heading,
      }}
    >
      {children}
    </Text>
  );
};

export const Button: React.FC<ButtonProps> = ({
  children,
  bg,
  size,
  ...props
}) => {
  if (size === 'lg') {
    return (
      <TouchableOpacity onPress={props.onPress}>
        <View
          style={{
            ...styles.btnLarge,
            ...styles.btn,
            backgroundColor: bg ? bg : styles.btnLarge.backgroundColor,
          }}
        >
          <Text style={styles.btnLgText}>{children}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity>
      <View
        style={{
          backgroundColor: bg ? bg : colors.primary,
        }}
      >
        <Text>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const Card: React.FC<IChildren> = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

export const CardImage: React.FC = () => {
  return (
    <View style={styles.cardTop}>
      <Image
        alt=""
        style={styles.cardImg}
        resizeMode="cover"
        source={{
          uri: 'https://images.unsplash.com/photo-1623659248894-1a0272243054?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2405&q=80',
        }}
      />
    </View>
  );
};

export const CardTitle: React.FC<CardTypographyProps> = ({
  text,
  align = 'left',
}) => {
  return <Text style={{ textAlign: align, ...styles.cardTitle }}>{text}</Text>;
};

export const CardContent: React.FC<{ children: any }> = ({ children }) => {
  return <View style={styles.cardContent}>{children}</View>;
};

export const CardDescription: React.FC<CardTypographyProps> = ({
  align = 'left',
  text,
}) => {
  return (
    <Text style={{ textAlign: align, ...styles.cardDescription }}>{text}</Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  heading: {
    fontWeight: 'bold',
  },

  btnLarge: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: colors.primary,
    borderColor: '#efefef',
  },
  btnLgText: {
    fontSize: 22,
  },

  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardTop: {
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  cardImg: {
    width: '100%',
    height: 200,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
  },
  cardContent: {
    paddingVertical: 18,
    paddingHorizontal: 13,
  },
  cardDescription: {
    paddingHorizontal: 3,
    lineHeight: 22,
    fontSize: 16,
  },
});
