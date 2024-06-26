import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, SPACING} from '../theme/theme';
import CustomIcon from './CustomIcon';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface GradientBGIconProps {
  name: string;
  color: string;
  size: number;
}

const GradientBGIcon: React.FC<GradientBGIconProps> = ({name, color, size}) => {
  return (
    <View style={styles.Container}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[COLORS.primaryLightHex, COLORS.primaryLightHex]}
        style={styles.LinearGradientBG}>
        <Icon name={name} color={color} size={size} />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    borderWidth: 2,
    borderColor: COLORS.thirdGreen,
    borderRadius: SPACING.space_10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.thirdGreen,
    overflow: 'hidden',
  },
  LinearGradientBG: {
    height: SPACING.space_24,
    width: SPACING.space_24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GradientBGIcon;
