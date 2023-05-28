import { Coins } from "@tamagui/lucide-icons";
import React from "react";
import { H3, XStack, YStack, useTheme } from "tamagui";
import { LinearGradient } from 'tamagui/linear-gradient'

export function TotalSomado () {
  return (
    <YStack space f={1} h="$6">
      <LinearGradient
        height="$6"
        borderRadius="$4"
        colors={['$blue8Dark', '$blue9Dark']}
        start={[0, 1]}
        end={[1, 0]}
        ac='center'
        jc="center"
        pos='relative'
      />
        <XStack pos={'absolute'} w='$20' alignSelf="center" height="$6" px='$4' ai='center' jc='space-between'>
          <H3 fontWeight='bold' color="whitesmoke">
            R$ 85,25
          </H3>
          <Coins size={42} color="#FFFFFF" />  
        </XStack>
    </YStack>
  )
}