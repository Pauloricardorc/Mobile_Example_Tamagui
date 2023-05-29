import { useFonts } from "expo-font";
import Router from "./router";
import { TamaguiProvider, Theme } from "tamagui";
import config from "./tamagui.config";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={config}>
      <Theme name="dark">
        <StatusBar style="light" />
        <Router />
      </Theme>
    </TamaguiProvider>
  );
}
