import { Image } from "expo-image";
import "./style.css";
import { Text, View } from "react-native";
import { Svg, Path } from "react-native-svg";

const filter =
  "invert(0%) sepia(98%) saturate(0%) hue-rotate(28deg) brightness(95%) contrast(105%);";

export default function App() {
  return (
    <View className="bg-green-400">
      <View className="h-full bg-white">
        <View className="flex justify-end mt-10 mb-10 h-9/10 bg-orange-500">
          <View className="bg-slate-200 h-8/10 rounded-t-xl">
            <View>
              <Text className="text-cyan-600 text-4xl text-center mt-16">
                wymyś
                <Text className="text-cyan-400">ludki</Text>
              </Text>
            </View>
            {/* main */}
            <View
              className="flex flex-row justify-between items-center align-middle bg-slate-50 h-3/25 mt-7 w-10/12 self-center rounded-lg border-sky-300 px-4"
              style={{ borderWidth: 0.5 }}
            >
              <View className="flex flex-col">
                <Image
                  source={require("./assets/activities_thin.svg")}
                  style={{
                    width: 40,
                    height: 40,
                    marginTop: 8,
                  }}
                />
                <Text className="text-xs text-gray-500">Activities</Text>
              </View>
              <View className="flex flex-col">
                <Image
                  source={require("./assets/flag_check_thin.svg")}
                  style={{
                    width: 40,
                    height: 40,
                    marginTop: 8,
                  }}
                />
                <Text className="text-xs text-gray-500">Milestones</Text>
              </View>
              <View className="flex flex-col">
                <Image
                  source={require("./assets/share_eta_thin.svg")}
                  style={{
                    width: 40,
                    height: 40,
                    marginTop: 8,
                  }}
                />
                <Text className="text-xs text-gray-500">Tracker</Text>
              </View>
              <View className="flex flex-col">
                <Image
                  source={require("./assets/calendar_thin.svg")}
                  style={{
                    width: 40,
                    height: 40,
                    marginTop: 8,
                  }}
                />
                <Text className="text-xs text-gray-500">Calendar</Text>
              </View>
            </View>
            {/* activity of the day */}
            <View className="flex mt-4 self-center w-11/12">
              <Text className="text-xl">Aktywność Dnia</Text>
              <View className="flex flex-row justify-between max-h-28 bg-slate-50 p-2 rounded shadow-md shadow-gray-600">
                <View className="bg-sky-700 w-2/6 h-full mr-2" />
                <View className="h-28 w-full">
                  <Text className="">Lorem Ipsum Title</Text>
                  <Text className="w-4/6 h-28 text-gray-500 text-xs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Earum distinctio nam dicta excepturi adipisci maiores, fuga
                    veritatis atque quo ex. Maxime nulla ut blanditiis
                    reiciendis
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* navbar */}
          <View
            className="w-screen"
            style={{ height: 88, aspectRatio: 393 / 80 }}
          >
            <Svg viewBox="0 0 393 80" width="100%" height={88}>
              <Path
                d="
                  M0 80L0 0H146.5
                  C156.5 0 166.5 15 176.5 25
                  C186.5 35 206.5 35 216.5 25
                  C226.5 15 236.5 0 246.5 0
                  H393
                  L393 80
                  L0 80Z"
                fill="#e9d5ff"
              />
            </Svg>
          </View>
          <View className="flex flex-row  justify-between px-4 h-1/10 bg-purple-200">
            <Image
              source={require("./assets/home.svg")}
              className="pt-4"
              style={{
                width: 36,
                height: 36,
                marginTop: -4,
              }}
            />
            <Image
              source={require("./assets/home_thin.svg")}
              className="pt-4"
              style={{
                width: 36,
                height: 36,
                marginTop: 8,
              }}
            />
            <Image
              source={require("./assets/view_cozy_thin.svg")}
              className="pt-4"
              style={{
                width: 36,
                height: 36,
                marginTop: 8,
              }}
            />
            <Image
              source={require("./assets/search_thin.svg")}
              className="pt-4"
              style={{
                width: 36,
                height: 36,
                marginTop: 8,
              }}
            />
            <Image
              source={require("./assets/favorite_thin.svg")}
              className="pt-4"
              style={{
                width: 36,
                height: 36,
                marginTop: 8,
              }}
            />
            <Image
              source={require("./assets/book_thin.svg")}
              className="pt-4"
              style={{
                width: 36,
                height: 36,
                marginTop: 8,
              }}
            />
            {/* </View> */}
          </View>
        </View>
      </View>
    </View>
  );
}
