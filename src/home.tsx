
import {
  Button,
  Input,
  ListItem,
  ScrollView,
  SizeTokens,
  Spinner,
  Theme,
  XStack,
  YGroup,
  YStack,
} from "tamagui";

import { Header } from "./../src/components/header";
import { TotalSomado } from "./../src/components/TotalSomado";
import { Plus, Search, Trash2 } from "@tamagui/lucide-icons";
import { api } from "./api/axios";
import { useEffect, useState } from "react";

type IRegisterProps = {
  "id": string;
  "comprador": string;
  "convidado": string;
  "data": string;
  "descricao": string;
  "preco": string;
}

export default function Home({ navigation }: any) {
  const [register, setRegister] = useState<IRegisterProps[]>([])
  const [pesquisa, setPesquisa] = useState('')

  useEffect(() => {
    async function getAllRegister() {
      const result = await api.get('/listagem').then(e => e.data)
      setRegister(result)
    }
    getAllRegister()
  }, [])

  return (
    <Theme name="dark">
      <YStack
        bg="$background"
        f={1}
        borderColor={"$blue9Dark"}
        p="$4"
        pt='$10'
        gap='$6'
      >
        <XStack jc="space-between" ai="center">
          <ListItem p='$0' w='$14' title="Hoje" subTitle="28 - Maio - 2023" />
          <Header />
        </XStack>
        <XStack space ai="center">
          <TotalSomado />
          <Button h="$6" backgroundColor="$blue9" onPress={() => navigation.navigate('Criar')}>
            <Plus />
          </Button>
        </XStack>
        <InputDemo onChangeText={(value) => setPesquisa(value)} size="$4" placeholder="Pesquisar..." />
        <ScrollView scrollEnabled>
          <YStack space="$3">
            {register ? register.filter((registe) => registe.descricao.includes(pesquisa)).map((item, index) => (
              <YGroup
                key={item.id}
                alignSelf="center"
                bordered
                width={"100%"}
                size="$4"
              >
                <YGroup.Item>
                  <ListItem
                    hoverTheme
                    pressTheme
                    h="$7"
                    onPress={() => navigation.navigate("Detalhes")}
                    title={item?.descricao}
                    subTitle={item?.data}
                    iconAfter={() => (
                      <Button backgroundColor="$red9" size="$4" circular>
                        <Trash2 color="#FFF" />
                      </Button>
                    )}
                  />
                </YGroup.Item>
              </YGroup>
            )) : <Spinner color="$blue10" size="large" />}
          </YStack>
        </ScrollView>
      </YStack>
    </Theme>
  );
}

function InputDemo(props: { size: SizeTokens, placeholder: string, onChangeText?: (value: string) =>  any }) {
  return (
    <XStack alignItems="center" space="$2">
      <Input flex={1} size={props.size} placeholder={props.placeholder} onChangeText={props.onChangeText} />
      <Button size={props.size} backgroundColor="$blue8">
        <Search size={18} />
      </Button>
    </XStack>
  )
}
