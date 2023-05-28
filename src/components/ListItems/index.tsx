import { ConciergeBell, Edit2, Star, Trash2 } from "@tamagui/lucide-icons";
import { Button, ListItem, Separator, XStack, YGroup, useTheme } from "tamagui";
import { FormatterDate } from "../../hooks/formatterDate";
import React from "react";

type IItems = {
  title: string;
  subTitle: string;
  navigation: any;
};

export function ListItemCustom({ title, subTitle, navigation }: IItems) {
  const theme = useTheme();
  return (
    <YGroup alignSelf="center" bordered width={"100%"} size="$4">
      <YGroup.Item>
        <ListItem
          hoverTheme
          pressTheme
          onPress={() => navigation.navigate('detalhes')}
          icon={() => <ConciergeBell size="$2" color={theme.gray10.val} />}
          size="$5"
          height="$7"
          scaleIcon={1.2}
          title={title}
          subTitle={FormatterDate(subTitle)}
          iconAfter={() => (
            <XStack space="$2">
              <Button
                backgroundColor="$gray4"
                icon={() => <Edit2 size={18} color={theme.yellow10.val} />}
                size="$4"
                circular
              />
              <Button
                backgroundColor="$gray4"
                icon={() => <Trash2 size={18} color={theme.red10.val} />}
                size="$4"
                circular
              />
            </XStack>
          )}
        />
      </YGroup.Item>
    </YGroup>
  );
}
