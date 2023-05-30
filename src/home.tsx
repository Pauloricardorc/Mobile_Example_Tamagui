import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Input,
  ListItem,
  ScrollView,
  SizeTokens,
  Spinner,
  Stack,
  Theme,
  XStack,
  YGroup,
  YStack,
} from "tamagui";

import { api } from "./api/axios";
import { Coins, Download, Plus, Search, Trash2 } from "@tamagui/lucide-icons";
import { Header } from "./../src/components/header";
import { TotalSomado } from "./../src/components/TotalSomado";
import { H3 } from "tamagui";
import { FormatPrice } from "./hooks/convertMoney";
import { LinearGradient } from "tamagui/linear-gradient";
import { FormatterDate } from "./hooks/formatterDate";

type IRegisterProps = {
  id: string;
  comprador: string;
  convidado: string;
  data: string;
  descricao: string;
  preco: string;
};

export default function Home({ navigation }: any) {
  const [register, setRegister] = useState<IRegisterProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [pesquisa, setPesquisa] = useState("");
  const nowDate = new Date().toISOString();

  const carregarNovosRegistros = async () => {
    const result = await api.get("listagem");
    setRegister(result.data);
  };

  const handleDeletarRegistro = async (id: string) => {
    setLoading(true);
    await api.delete(`delete/${id}`).then(() => {
      setRegister(register.filter((e) => e.id !== id));
      setLoading(false);
    });
  };

  useEffect(() => {
    carregarNovosRegistros();
  }, []);

  return (
    <YStack
      bg="$background"
      f={1}
      borderColor={"$blue9Dark"}
      p="$4"
      pt="$10"
      gap="$6"
    >
      <XStack jc="space-between" ai="center">
        <ListItem
          p="$0"
          w="$14"
          title="Hoje"
          subTitle={FormatterDate(nowDate)}
        />
        <Header />
      </XStack>
      <XStack space ai="center">
        <YStack space f={1} h="$6">
          <LinearGradient
            height="$6"
            borderRadius="$4"
            colors={["$blue8Dark", "$blue9Dark"]}
            start={[0, 1]}
            end={[1, 0]}
            ac="center"
            jc="center"
            pos="relative"
          />
          <XStack
            pos={"absolute"}
            w="$20"
            alignSelf="center"
            height="$6"
            px="$4"
            ai="center"
            jc="space-between"
          >
            <H3 fontWeight="bold" color="whitesmoke">
              {register.length !== 0 &&
                FormatPrice(
                  register
                    .map((e) => Number(e.preco))
                    .reduce((a: any, b: any) => a + b)
                )}
            </H3>
            <Coins size={42} color="#FFFFFF" />
          </XStack>
        </YStack>
        <Button
          h="$6"
          backgroundColor="$blue9"
          onPress={() => navigation.navigate("Criar")}
        >
          <Plus />
        </Button>
      </XStack>
      <InputDemo
        onChangeText={(value) => setPesquisa(value)}
        size="$4"
        placeholder="Pesquisar..."
      />
      <Button onPress={carregarNovosRegistros}>
        <Download />
      </Button>
      <ScrollView scrollEnabled>
        <YStack space="$3">
          {register.length !== 0 ? (
            register
              .filter((registe) =>
                registe.descricao.toLowerCase().includes(pesquisa.toLowerCase())
              )
              .map((item) => (
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
                      onPress={() =>
                        navigation.navigate("Detalhes", {
                          comprador: item.comprador,
                          convidado: item.convidado,
                          data: item.data,
                          descricao: item.descricao,
                          preco: item.preco,
                        })
                      }
                      title={item?.descricao}
                      subTitle={item?.data}
                      iconAfter={() => (
                        <Button
                          onPress={() => handleDeletarRegistro(item.id)}
                          backgroundColor={!loading ? "$red9" : "$gray7"}
                          size="$4"
                          circular
                        >
                          {loading ? (
                            <Spinner color="white" />
                          ) : (
                            <Trash2 color="#FFF" />
                          )}
                        </Button>
                      )}
                    />
                  </YGroup.Item>
                </YGroup>
              ))
          ) : (
            <YStack f={1} bg="$background">
              <Spinner color="$blue10" size="large" />
            </YStack>
          )}
        </YStack>
      </ScrollView>
    </YStack>
  );
}

function InputDemo(props: {
  size: SizeTokens;
  placeholder: string;
  onChangeText?: (value: string) => any;
}) {
  return (
    <XStack alignItems="center" space="$2">
      <Input
        flex={1}
        size={props.size}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
      />
      <Button size={props.size} backgroundColor="$blue8">
        <Search size={18} />
      </Button>
    </XStack>
  );
}
