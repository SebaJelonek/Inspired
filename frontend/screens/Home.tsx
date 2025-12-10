import React from "react";
import { Text, View } from "react-native";

import ActivitiesIcon from "@assets/activities_thin.svg";
import FlagCheckIcon from "@assets/flag_check_thin.svg";
import ShareEtaIcon from "@assets/share_eta_thin.svg";
import CalendarIcon from "@assets/calendar_thin.svg";

export const Home: React.FC = () => {
  return (
    <View className="w-full flex-1 justify-center">
      <View className="w-full flex-1 justify-center items-center">
        <View>
          <Text className="text-cyan-600 text-4xl text-center mt-16">
            wymyś
            <Text className="text-cyan-400">ludki</Text>
          </Text>
        </View>
        {/* main */}
        <View
          className="flex flex-row justify-between items-center align-middle bg-slate-50 h-[20%] mt-7 w-10/12 self-center rounded-lg border-sky-300 px-4"
          style={{ borderWidth: 0.5 }}
        >
          <View className="flex flex-col">
            <ActivitiesIcon width={40} height={40} style={{ marginTop: 10 }} />
            <Text className="text-xs text-gray-500">Activities</Text>
          </View>
          <View className="flex flex-col">
            <FlagCheckIcon width={40} height={40} style={{ marginTop: 10 }} />
            <Text className="text-xs text-gray-500">Milestones</Text>
          </View>
          <View className="flex flex-col">
            <ShareEtaIcon width={40} height={40} style={{ marginTop: 10 }} />
            <Text className="text-xs text-gray-500">Tracker</Text>
          </View>
          <View className="flex flex-col">
            <CalendarIcon width={40} height={40} style={{ marginTop: 10 }} />
            <Text className="text-xs text-gray-500">Calendar</Text>
          </View>
        </View>
        {/* activity of the day */}
        <View className="flex my-4 self-center w-11/12">
          <Text className="text-xl">Aktywność Dnia</Text>
          <View className="flex flex-row justify-between max-h-28 bg-slate-50 p-2 rounded shadow-md shadow-gray-600">
            <View className="bg-sky-700 w-2/6 h-full mr-2" />
            <View className="h-28 w-full">
              <Text className="">Lorem Ipsum Title</Text>
              <Text className="w-4/6 h-28 text-gray-500 text-xs">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                distinctio nam dicta excepturi adipisci maiores, fuga veritatis
                atque quo ex. Maxime nulla ut blanditiis reiciendis
              </Text>
            </View>
          </View>
        </View>
        <View className="my-4"></View>
      </View>
    </View>
  );
};
