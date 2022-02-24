import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";

import { Acessory } from "../../Components/Acessory";
import { BackButton } from "../../Components/BackButton";
import { ImageSlider } from "../../Components/ImageSlider";
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
  Accessories,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer,
} from "./styles";

import { Button } from "../../Components/Button";
import { useTheme } from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CarDTO } from "../../DTOs/CarDTO";
import { getAccesoryIcon } from "../../Utils/getAccessoryIcone";
import { getPlatformDate } from "../../Utils/getPlatformDate";
import { format } from "date-fns";
import api from "../../Services/api";
import { Alert } from "react-native";
interface Params {
  car: CarDTO;
  date: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const [loading, setLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );
  const theme = useTheme();
  const { navigate, goBack } = useNavigation<any>();
  const route = useRoute();
  const { car, date } = route.params as Params;

  const rentTotal = Number(date.length * car.rent.price);

  async function handleCompleteRent() {
    setLoading(true);
    const scheduleByCar = await api.get(`/schedules_bycars/${car.id}`);

    const CheckIfDateIsNotAvailable = String(
      scheduleByCar.data.unavailable_dates
    ).includes(String(date));

    if (CheckIfDateIsNotAvailable) {
      return Alert.alert(
        "Agendamento",
        "Esse veículo ja está agendado nesse período"
      );
    }

    const unavailable_dates = [
      ...scheduleByCar.data.unavailable_dates,
      ...date,
    ];

    await api.post("schedules_byuser", {
      user_id: 1,
      car,
      startDate: format(getPlatformDate(new Date(date[0])), "dd/MM/yyyy"),
      endDate: format(
        getPlatformDate(new Date(date[date.length - 1])),
        "dd/MM/yyyy"
      ),
    });

    api
      .put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
      })
      .then(() => navigate("SchedulingComplete"))
      .catch(() => {
        setLoading(false);
        Alert.alert(
          "Agendamento",
          "Não foi possível realizar seu agendamento!"
        );
      });
  }

  function handleBack() {
    goBack();
  }
  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(date[0])), "dd/MM/yyyy"),
      end: format(
        getPlatformDate(new Date(date[date.length - 1])),
        "dd/MM/yyyy"
      ),
    });
  }, []);
  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>
        <Accessories>
          {car.accessories.map((accesory) => (
            <Acessory
              key={accesory.name}
              name={accesory.name}
              icon={getAccesoryIcon(accesory.type)}
            />
          ))}
        </Accessories>
        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>
          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>
              {`R$ ${car.rent.price} x${date.length} diárias`}
            </RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleCompleteRent}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}
