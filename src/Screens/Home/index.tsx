import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import Logo from "../../Assets/logo.svg";
import api from "../../Services/api";

import { Car } from "../../Components/Car";

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
  MyCarsButton,
} from "./styles";
import { CarDTO } from "../../DTOs/CarDTO";
import { Load } from "../../Components/Load";
import theme from "../../Styles/theme";

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("/cars");

        setCars(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  const { navigate } = useNavigation<any>();

  function handleCarDetails(car: CarDTO) {
    navigate("CarDetails", { car });
  }
  function handleMyCars() {
    navigate("MyCars");
  }

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
          <TotalCars>
            Total de {String(cars.length).padStart(2, "0")}{" "}
            {cars.length > 1 ? "carros" : "carro"}
          </TotalCars>
        </HeaderContent>
      </Header>

      {loading ? (
        <Load />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
      <MyCarsButton onPress={handleMyCars}>
        <Ionicons
          name="ios-car-sport"
          size={32}
          color={theme.colors.background_primary}
        />
      </MyCarsButton>
    </Container>
  );
}
