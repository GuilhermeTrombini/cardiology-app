import {StyleSheet} from 'react-native';

export const getStyles = ({
  backgroundColor,
  isDisabled,
  fontColor,
  fontSize,
  fontWeight,
  borderColor,
}) =>
  StyleSheet.create({
    touchableContainer: {
      height: 52,
      paddingHorizontal: 24,
      borderRadius: 10,
      backgroundColor: backgroundColor || '#007AFF',
      opacity: isDisabled ? 0.2 : 1,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      borderWidth: borderColor ? 1 : 0,
      borderColor: borderColor,
    },
    textStyle: {
      color: fontColor && fontColor !== '' ? fontColor : '#FFF',
      fontSize: fontSize ? fontSize : 17,
      fontWeight: fontWeight ? fontWeight : '600',
      textTransform: 'capitalize',
      marginLeft: 6,
      fontFamily: 'Gilroy-SemiBold',
    },
  });
