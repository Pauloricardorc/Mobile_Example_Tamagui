import { Coins } from "@tamagui/lucide-icons";
import React from "react";
import { H2, Stack, XStack, YStack } from "tamagui";
import { LinearGradient } from 'tamagui/linear-gradient'

export function TotalSomado () {
  return (
    <YStack space mt="$6" h="$10">
      <LinearGradient
        height="$10"
        borderRadius="$8"
        colors={['$blue10', '$blue10Dark']}
        start={[0, 1]}
        end={[0, 0]}
        ac='center'
        jc="center"
        pos='relative'
      />
        <XStack pos={'absolute'} w='$20' height="$10" px='$4' ai='center' jc='space-between'>
          <H2 fontWeight='600' color="whitesmoke">
            R$ 85,25
          </H2>
          <Coins />  
        </XStack>
    </YStack>
  )
}