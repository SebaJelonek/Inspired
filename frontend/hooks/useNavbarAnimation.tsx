import { useWindowDimensions } from "react-native";
import {
  useSharedValue,
  useAnimatedProps,
  withSpring,
} from "react-native-reanimated";
import { PathProps } from "react-native-svg";

type Config = {
  VISUAL_HEIGHT: number;
  REF_WIDTH: number;
  ICON_SIZE: number;
  REF_FIRST_ICON_CENTER: number;
};

export const useNavbarAnimation = (
  config: Config,
  initialIndex: number = 0
) => {
  const { width } = useWindowDimensions();
  const { REF_WIDTH, REF_FIRST_ICON_CENTER, ICON_SIZE } = config;

  // --- LAYOUT MATH ---
  const scaleFactor = width / REF_WIDTH;
  const startX = REF_FIRST_ICON_CENTER * scaleFactor;
  const stepSize = (width - startX * 2) / 4;
  const initialCurvePos = startX + initialIndex * stepSize;
  const curveX = useSharedValue(initialCurvePos);

  // --- ANIMATED PATH ---
  const animatedPathProps = useAnimatedProps<PathProps>(() => {
    const currentScale = width / REF_WIDTH;
    const p = (c: number) => c * currentScale;
    const currentCenter = curveX.value;

    const d = `
      M 0 0
      H ${currentCenter - p(65)}
      C ${currentCenter - p(35)} 0, ${currentCenter - p(20)} 15, ${currentCenter} 15
      C ${currentCenter + p(20)} 15, ${currentCenter + p(35)} 0, ${currentCenter + p(65)} 0
      H ${width}
      V 300
      H 0
      Z
    `;
    return { d };
  });

  const moveCurve = (index: number) => {
    const newX = startX + index * stepSize;

    curveX.value = withSpring(newX, {
      damping: 18,
      stiffness: 120,
      mass: 0.8,
    });
  };

  const dynamicPadding = startX - (ICON_SIZE + 20) / 2;

  return {
    width,
    animatedPathProps,
    moveCurve,
    dynamicPadding,
  };
};
