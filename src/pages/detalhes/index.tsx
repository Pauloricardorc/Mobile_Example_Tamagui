import { Button, H3, ListItem, Stack, Theme, XStack, YStack } from "tamagui";
import { Header } from "../../components/header";
import { ArrowLeft } from "@tamagui/lucide-icons";
import { FormatPrice } from "../../hooks/convertMoney";
import { FormatterDate } from "../../hooks/formatterDate";

type IRegisterProps = {
  id: string;
  comprador: string;
  convidado: string;
  data: string;
  descricao: string;
  preco: string;
};

export default function Detalhes({route, navigation}: any) {
  const { descricao, comprador, convidado, preco, data } = route.params;
  
  return (
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
        <ListItem size='$5' p={0} title="Descrição" subTitle={descricao} />
        <ListItem size='$5' p={0} title="Convidado" subTitle={convidado} />
        <ListItem size='$5' p={0} title="Preço" subTitle={FormatPrice(preco)} />
        <ListItem size='$5' p={0} title="Data" subTitle={data} />
      </YStack>

      <YStack backgroundColor="$background">
        <Button backgroundColor="$green10" height='$6' fontSize={16}>Concluir</Button>
      </YStack>
    </YStack>
  );
}
