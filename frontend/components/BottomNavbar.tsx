import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Svg, { Path, SvgProps } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated from "react-native-reanimated";
import { navigationRef, navigate } from "utils/navigationRef";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Imports
import { TabIcon } from "@components/TabIcon";
import { useNavbarAnimation } from "@hooks/useNavbarAnimation";

// Icons
import HomeIcon from "@assets/home_thin.svg";
import ViewIcon from "@assets/view_cozy_thin.svg";
import SearchIcon from "@assets/search_thin.svg";
import FavoriteIcon from "@assets/favorite_thin.svg";
import BookIcon from "@assets/book_thin.svg";

import HomeBold from "@assets/home.svg";
import ViewBold from "@assets/view_cozy.svg";
import SearchBold from "@assets/search.svg";
import FavoriteBold from "@assets/favorite.svg";
import BookBold from "@assets/book.svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

type TabItem = {
  id: number;
  route: string;
  Icon: React.FC<SvgProps>;
  IconBold: React.FC<SvgProps>;
};

// Configuration Constants
const CONFIG = {
  VISUAL_HEIGHT: 70,
  REF_WIDTH: 393,
  ICON_SIZE: 26,
  REF_FIRST_ICON_CENTER: 39,
};

// Data
const TABS: TabItem[] = [
  { id: 0, route: "Home", Icon: HomeIcon, IconBold: HomeBold },
  { id: 1, route: "Activities", Icon: ViewIcon, IconBold: ViewBold },
  { id: 2, route: "Search", Icon: SearchIcon, IconBold: SearchBold },
  { id: 3, route: "Favorite", Icon: FavoriteIcon, IconBold: FavoriteBold },
  { id: 4, route: "Learn", Icon: BookIcon, IconBold: BookBold },
];

export default function BottomNavbar() {
  const insets = useSafeAreaInsets();
  // 2. Local state to track the route name (since we can't use the hook)
  const [currentRouteName, setCurrentRouteName] = useState<string>("Home");

  // 3. Listen for Navigation Changes
  useEffect(() => {
    // A. Set initial value
    if (navigationRef.isReady()) {
      const name = navigationRef.getCurrentRoute()?.name;
      if (name) setCurrentRouteName(name);
    }

    // B. Create listener
    const unsubscribe = navigationRef.addListener("state", () => {
      const name = navigationRef.getCurrentRoute()?.name;
      if (name) setCurrentRouteName(name);
    });

    return unsubscribe;
  }, []);

  // 4. Calculate Index based on our local 'currentRouteName' state
  const getIndex = () => {
    const index = TABS.findIndex((t) => t.route === currentRouteName);
    return index >= 0 ? index : 0;
  };

  const currentIndex = getIndex();

  const { width, animatedPathProps, moveCurve, dynamicPadding } =
    useNavbarAnimation(CONFIG, currentIndex);

  const [activeIndex, setActiveIndex] = useState(currentIndex);

  // Sync animation when route changes
  useEffect(() => {
    setActiveIndex(currentIndex);
    moveCurve(currentIndex);
  }, [currentIndex]);

  const handlePress = (index: number) => {
    const selectedTab = TABS[index];
    if (selectedTab?.route) {
      // 5. Use our custom navigate function
      navigate(selectedTab.route);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#e2e8f0", position: "relative" }}>
      <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
        {/* BACKGROUND */}
        <View
          style={{ position: "absolute", bottom: 0, width: "100%", zIndex: 1 }}
        >
          <Svg
            width={width}
            height={CONFIG.VISUAL_HEIGHT + insets.bottom}
            viewBox={`0 0 ${width} ${CONFIG.VISUAL_HEIGHT}`}
            preserveAspectRatio="none"
          >
            <AnimatedPath animatedProps={animatedPathProps} fill="#e9d5ff" />
          </Svg>
        </View>

        {/* ICONS */}
        <View
          style={{
            flexDirection: "row",
            height: CONFIG.VISUAL_HEIGHT + insets.bottom,
            paddingBottom: insets.bottom,
            paddingTop: 5,
            width: width,
            zIndex: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between",
              paddingHorizontal: dynamicPadding,
            }}
          >
            {TABS.map((tab, index) => (
              <TabIcon
                key={tab.id}
                Icon={tab.Icon}
                IconBold={tab.IconBold}
                size={CONFIG.ICON_SIZE}
                isSelected={activeIndex === index}
                onPress={() => handlePress(index)}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
