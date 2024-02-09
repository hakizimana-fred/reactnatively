import { StyleSheet } from 'react-native';

export const colors = {
  red: '#DB2828',
  orange: '#F2711C',
  yellow: '#FBBD08',
  olive: '#B5CC18',
  green: '#59B755',
  teal: '#00B5AD',
  primary: '#2185D0',
  violet: '#6435C9',
  purple: '#A333C8',
  pink: '#E03997',
  brown: '#A5673F',
  black: '#1B1C1D',
  grey: '#767676',
  //primary: '#007aff',
  white: '#fff',
} as const;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  heading: {
    fontWeight: 'bold',
  },
  btnXS: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderWidth: 1,
    backgroundColor: colors.primary,
    borderColor: '#efefef',
  },
  btnSM: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: colors.primary,
    borderColor: '#efefef',
  },
  btnMD: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: colors.primary,
    borderColor: '#efefef',
  },
  btnLarge: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: colors.primary,
    borderColor: '#efefef',
  },

  btnXL: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1,
    backgroundColor: colors.primary,
    borderColor: '#efefef',
  },

  btnText: {
    fontWeight: '600',
    color: '#fff',
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
    fontWeight: 'bold',
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
    marginBottom: 3,
  },
  cardFooter: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: '#e9e9e9',
  },
  textTabs: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 24,
  },
  textTabItem: {
    borderBottomColor: '#e5e7eb',
    borderBottomWidth: 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  textTabItemText: {
    fontSize: 15,
    fontWeight: '600',
    color: 'black',
  },
});
