import { useFonts } from 'expo-font'
import { TamaguiProvider, Theme, XStack, YStack } from 'tamagui'

import config from './tamagui.config'
import { Header } from './src/components/header'
import { ChangeTheme } from './src/components/switch'
import React, { useState } from 'react'
import { TotalSomado } from './src/components/TotalSomado'

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true)
  
  const [loaded] =  useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  if(!loaded) {
    return null
  }

  return (
    <TamaguiProvider config={config}>
      <Theme name={isDarkTheme ? "dark" : 'light'}>
        <YStack bg='$background' f={1} borderColor={'$blue9Dark'} bw={4} br={46} p="$6" pt="$10">
          <XStack jc="space-between" ai="center">
            <Header />
            <ChangeTheme onCheckedChange={setIsDarkTheme} />
          </XStack>
          <TotalSomado />
        </YStack>
      </Theme>
    </TamaguiProvider>
  );
}
