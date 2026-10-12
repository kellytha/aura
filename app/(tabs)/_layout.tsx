import { useAuth } from "@clerk/expo";
import { Redirect, Tabs } from "expo-router";
import { SymbolView } from "expo-symbols";

import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { LessonLanguageProvider } from "@/lib/lesson-language";

export default function TabLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const colorScheme = useColorScheme();
  if (!isLoaded) return null;
  if (!isSignedIn) return <Redirect href="/sign-in" />;

  return (
    <LessonLanguageProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#175B45",
          tabBarInactiveTintColor: Colors[colorScheme].tabIconDefault,
          tabBarActiveBackgroundColor: "#EDF4EE",
          tabBarStyle: {
            backgroundColor: "#FCFCF9",
            borderTopColor: "#E1E7E1",
          },
          tabBarItemStyle: {
            marginHorizontal: 4,
            marginVertical: 5,
            borderRadius: 12,
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <SymbolView name={{ ios: "house.fill", android: "home", web: "home" }} tintColor={color} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="cash-in"
          options={{
            title: "Cash in",
            tabBarIcon: ({ color }) => (
              <SymbolView
                name={{ ios: "wallet.bifold", android: "account_balance_wallet", web: "account_balance_wallet" }}
                tintColor={color}
                size={24}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="stokvels"
          options={{
            title: "Stokvels",
            tabBarIcon: ({ color }) => (
              <SymbolView name={{ ios: "person.2.fill", android: "people", web: "people" }} tintColor={color} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="footprint"
          options={{
            title: "Footprint",
            tabBarIcon: ({ color }) => (
              <SymbolView name={{ ios: "leaf.fill", android: "eco", web: "eco" }} tintColor={color} size={24} />
            ),
          }}
        />
        <Tabs.Screen name="lessons" options={{ href: null }} />
        <Tabs.Screen name="lesson" options={{ href: null }} />
        <Tabs.Screen name="credit-score" options={{ href: null }} />
        <Tabs.Screen name="profile" options={{ href: null }} />
      </Tabs>
    </LessonLanguageProvider>
  );
}
