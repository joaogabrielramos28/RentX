import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { BackButton } from "../../Components/BackButton";
import { Car } from "../../Components/Car";
import { CarDTO } from "../../DTOs/CarDTO";
import api from "../../Services/api";
import { AntDesign } from "@expo/vector-icons";
import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from "./styles";
import { LoadAnimation } from "../../Components/LoadAnimation";

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const { goBack } = useNavigation<any>();
  const route = useRoute();
  function handleBack() {
    goBack();
  }

  useEffect(() => {
    async function fetchMyCars() {
      try {
        const user_id = 1;
        const response = await api.get(`/schedules_byuser?user_id=1`);
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchMyCars();
  }, []);
  return (
    <Container>
      <Header>
        <StatusBar
          barStyle={"light-content"}
          translucent
          backgroundColor="transparent"
        />
        <BackButton onPress={handleBack} color={theme.colors.shape} />

        <Title>
          Escolha uma {"\n"}
          data de início e{"\n"}
          fim do aluguel
        </Title>

        <SubTitle>Conforto, segurança e praticidade</SubTitle>
      </Header>
      {loading ? (
        <LoadAnimation />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos Feitos</AppointmentsTitle>
            <AppointmentsQuantity>
              {String(cars.length).padStart(2, "0")}
            </AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />

                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
}
