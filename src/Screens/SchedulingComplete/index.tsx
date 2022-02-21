import React from "react";
import { StatusBar, StatusBarIOS, useWindowDimensions } from "react-native";
import LogoSvg from "../../Assets/logo_background_gray.svg";
import DoneSvg from "../../Assets/done.svg";

import { Container, Content, Title, Message, Footer } from "./styles";
import { ConfirmButton } from "../../Components/ConfirmButton";
import { useNavigation } from "@react-navigation/native";

export function SchedulingComplete() {
  const { width } = useWindowDimensions();
  const { navigate } = useNavigation<any>();

  function handleBackToHome() {
    navigate("Home");
  }
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />

        <Title>Carro alugado!</Title>
        <Message>
          Agora você só precisa ir {"\n"}até a concessionária da RENTX {"\n"}
          pegar o seu automóvel
        </Message>
      </Content>

      <Footer>
        <ConfirmButton title="OK" onPress={handleBackToHome} />
      </Footer>
    </Container>
  );
}
