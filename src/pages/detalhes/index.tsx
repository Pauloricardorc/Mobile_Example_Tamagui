import React, { useState } from "react";
import { Button, H3, ListItem, Stack, Theme, XStack, YStack } from "tamagui";
import { Header } from "../../components/header";
import { ChangeTheme } from "../../components/switch";
import { Platform } from "react-native";
import { ArrowLeft, ArrowLeftToLine } from "@tamagui/lucide-icons";

export default function Detalhes({navigation}: any) {
  const IOS = Platform.OS == "ios";

  return (
    <Theme name="dark">
      <YStack
        bg="$background"
        f={1}
        borderColor={"$blue9Dark"}
        p="$4"
        pt='$10'
        gap='$4'
      >
        <XStack jc="space-between" ai="center">
          <Button onPress={() => navigation.navigate('Home')} circular>
            <ArrowLeft />
          </Button>
          <Header />
        </XStack>
        
        <YStack space f={1} ai="center">
          <H3 py="$6">Descrição</H3>
          <ListItem size='$5' p={0} title="Descrição" subTitle="Marmitex de Churrasco" />
          <ListItem size='$5' p={0} title="Convidado" subTitle="Ricardo" />
          <ListItem size='$5' p={0} title="Preço" subTitle="R$ 14,00" />
          <ListItem size='$5' p={0} title="Data" subTitle="30 - Maio - 2023" />
        </YStack>

        <YStack backgroundColor="$background">
          <Button backgroundColor="$green10" height='$6' fontSize={16}>Concluir</Button>
        </YStack>
      </YStack>
    </Theme>
  );
}
