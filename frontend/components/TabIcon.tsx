import React, { useEffect } from "react";
import { TouchableOpacity, View } from "react-native"; // Add View
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import { SvgProps } from "react-native-svg";

interface Props {
  Icon: React.FC<SvgProps>;
  IconBold: React.FC<SvgProps>;
  isSelected: boolean;
  onPress: () => void;
  size: number;
}

export const TabIcon: React.FC<Props> = ({
  Icon,
  IconBold,
  isSelected,
  onPress,
  size,
}) => {
  const animValue = useSharedValue(0);

  useEffect(() => {
    animValue.value = withTiming(isSelected ? 1 : 0, { duration: 300 });
  }, [isSelected]);

  // 1. CONTAINER STYLE (Handles Moving Up/Down)
  const containerStyle = useAnimatedStyle(() => {
    return {
      width: size + 20,
      height: size + 20,
      alignItems: "center",
      justifyContent: "center",
      // Move the whole group up
      transform: [
        { translateY: interpolate(animValue.value, [0, 1], [0, -35]) },
      ],
      // No background or shadow here! We do that in the child.
    };
  });

  // 2. BACKGROUND STYLE (Handles the White Circle Growing)
  const bgCircleStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      width: "100%",
      height: "100%",
      borderRadius: 999, // ALWAYS CIRCLE
      backgroundColor: "#ffffff", // ALWAYS WHITE
      zIndex: -10, // Sit behind the icon

      // Scale from 0 (invisible) to 1 (full size)
      transform: [{ scale: interpolate(animValue.value, [0, 1], [0, 1]) }],

      // Shadows live here now
      shadowColor: "#9333ea",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: interpolate(animValue.value, [0, 1], [0, 0.15]),
      shadowRadius: 8,
      elevation: interpolate(animValue.value, [0, 1], [0, 6]),
    };
  });

  const CurrentIcon = isSelected ? IconBold : Icon;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1}>
      <Animated.View style={containerStyle}>
        {/* ✅ THE BACKGROUND CIRCLE (Scales Up) */}
        <Animated.View style={bgCircleStyle} />
        <CurrentIcon
          width={size}
          height={size}
          fill={isSelected ? "#8b5cf6" : "#64748b"}
          style={{ zIndex: 10, elevation: 10 }}
        />

        {/* ✅ THE ICON (Sits on top) */}
      </Animated.View>
    </TouchableOpacity>
  );
};
