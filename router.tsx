import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/home";
import Detalhes from "./src/pages/detalhes";
import { TamaguiProvider } from "tamagui";
import config from "./tamagui.config";
import Criar from "./src/pages/CriarRegister";

const Stack = createNativeStackNavigator();

export default function Router() {
  return (
    <TamaguiProvider config={config}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Criar" component={Criar} />
          <Stack.Screen name="Detalhes" component={Detalhes} />
        </Stack.Navigator>
      </NavigationContainer>
    </TamaguiProvider>
  );
}
