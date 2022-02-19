import React from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import Logo from "../../Assets/logo.svg";
import { Car } from "../../Components/Car";

import { Container, Header, HeaderContent, TotalCars } from "./styles";

export function Home() {
  const carDataOne = {
    brand: "Audi",
    name: "RS 5 Coupé",
    rent: {
      period: "Ao dia",
      price: 120,
    },
    thumbnail: "https://www.pngmart.com/files/1/Audi-RS5-Red-PNG.png",
  };
  const carDataTwo = {
    brand: "Porsche",
    name: "Cayman",
    rent: {
      period: "Ao dia",
      price: 250,
    },
    thumbnail:
      "https://i.pinimg.com/originals/ee/70/89/ee7089da02ee1fecfd744670564d3cd7.png",
  };
  return (
    <Container>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(118)} height={RFValue(12)} />
          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>

      <Car data={carDataOne} />
      <Car data={carDataTwo} />
    </Container>
  );
}
