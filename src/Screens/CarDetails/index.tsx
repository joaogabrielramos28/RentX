import { StatusBar } from "expo-status-bar";
import React from "react";
import { Acessory } from "../../Components/Acessory";
import { BackButton } from "../../Components/BackButton";
import { ImageSlider } from "../../Components/ImageSlider";

import speedSVG from "../../Assets/speed.svg";
import accelerationSvg from "../../Assets/acceleration.svg";
import forceSVG from "../../Assets/force.svg";
import gasolineSVG from "../../Assets/gasoline.svg";
import exchangeSVG from "../../Assets/exchange.svg";
import peopleSVG from "../../Assets/people.svg";

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Acessories,
  About,
  Footer,
} from "./styles";
import { Button } from "../../Components/Button";
import { useNavigation } from "@react-navigation/native";

export function CarDetails() {
  const { navigate } = useNavigation<any>();

  function handleConfirmRental() {
    navigate("Scheduling");
  }
  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}} />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrl={["https://www.pngmart.com/files/1/Audi-RS5-Red-PNG.png"]}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>
        <Acessories>
          <Acessory name="380Km/h" icon={speedSVG} />
          <Acessory name="3.2s" icon={accelerationSvg} />
          <Acessory name="800 HP" icon={forceSVG} />
          <Acessory name="Gasolina" icon={gasolineSVG} />
          <Acessory name="Auto" icon={exchangeSVG} />
          <Acessory name="2 pessoas" icon={peopleSVG} />
        </Acessories>

        <About>
          Este é automóvel desportivo. Surgiu do lendário touro de lide
          indultado na praça Real Maestranza de Sevilla. É um belíssimo carro
          para quem gosta de acelerar.
        </About>
      </Content>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}
