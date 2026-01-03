import { Text, View, ScrollView, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Activities: React.FC = () => {
  return (
    <ScrollView className="mb-14">
      <View>
        <Text className="text-5xl text-center m-3">EXPLORE</Text>
      </View>
      <View className="w-full h-full flex-1 justify-center items-center">
        <View className="w-full">
          <View>
            <Text className="text-3xl w-full">Age</Text>
          </View>
          <View className="rounded-xl bg-fuchsia-300 w-36 h-28 flex items-center justify-end">
            <View className="rounded-b-xl bg-slate-300 w-full flex items-center justify-end">
              <Text className="text-xl">0-6 Months</Text>
            </View>
          </View>
        </View>
        <View className="w-full">
          <View>
            <Text className="text-3xl w-full">Skill</Text>
          </View>
          <View className="rounded-xl bg-fuchsia-300 w-36 h-28 flex items-center justify-end">
            <View className="rounded-b-xl bg-slate-300 w-full flex items-center justify-end">
              <Text className="text-xl">Art</Text>
            </View>
          </View>
          <View className="w-full">
            <View>
              <Text className="text-3xl w-full">Materials</Text>
            </View>
            <View className="rounded-xl bg-fuchsia-300 w-36 h-28 flex items-center justify-end">
              <View className="rounded-b-xl bg-slate-300 w-full flex items-center justify-end">
                <Text className="text-xl">Books</Text>
              </View>
            </View>
          </View>
          <View className="w-full">
            <View>
              <Text className="text-3xl w-full">Location</Text>
            </View>
            <View className="rounded-xl bg-fuchsia-300 w-36 h-28 flex items-center justify-end">
              <View className="rounded-b-xl bg-slate-300 w-full flex items-center justify-end">
                <Text className="text-xl">Bath</Text>
              </View>
            </View>
          </View>
          <View className="w-full">
            <View>
              <Text className="text-3xl w-full">Seasonal</Text>
            </View>
            <View className="rounded-xl bg-fuchsia-300 w-36 h-28 flex items-center justify-end">
              <View className="rounded-b-xl bg-slate-300 w-full flex items-center justify-end">
                <Text className="text-xl">Christmas</Text>
              </View>
            </View>
          </View>
          <View className="w-full">
            <View>
              <Text className="text-3xl w-full">Fundamentals</Text>
            </View>
            <View className="rounded-xl mb-12 bg-fuchsia-300 w-36 h-28 flex items-center justify-end">
              <View className="rounded-b-xl bg-slate-300 w-full flex items-center justify-end">
                <Text className="text-xl">Balance</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
