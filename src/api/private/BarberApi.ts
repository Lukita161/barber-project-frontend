

import { axiosPrivate } from "@/src/lib/axios";
import {
  AppointmentsForBarbersCount,
  AppointmentsOfTheDaySchema,
  BarberInfoAndAppointmentsSchema,
  ClientForMonthSchema,
  ClientsForMonthsSchema,
  ClientsInfoAndAppointmentsSchema,
  ClientsInfoSchema
} from "@/src/schemas";
import { CreateBarberType } from "@/src/types";
import { isAxiosError } from "axios";

export const createBarber = async (formData: CreateBarberType) => {
  try {
    
    const { data } = await axiosPrivate.post<string>("/barber", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.message) {
      throw new Error(error.message);
    }
  }
};

export const getClientsForMonth = async (month: number) => {
  try {
    const { data } = await axiosPrivate.post("/client/clients/months/count", {
      month,
    });
    const result = ClientForMonthSchema.safeParse(data);
    if (!result.success) {
      throw new Error("Error en el servidor, reinicia la pagina");
    }
    return result.data;
  } catch (error) {
    if (isAxiosError(error) && error.message) {
      throw new Error(error.message);
    }
  }
};
export const getAllStatsForMonth = async () => {
  try {
    const { data } = await axiosPrivate.get("/client/clients/months/count");
    const result = ClientsForMonthsSchema.safeParse(data);
    if (!result.success) {
      throw new Error("Error en el servidor, reinicia la pagina");
    }
    return result.data;
  } catch (error) {
    if (isAxiosError(error) && error.message) {
      throw new Error(error.message);
    }
  }
};
export const getAllBarbers = async () => {
  try {
    const { data } = await axiosPrivate.get("/barber");
    const result = ClientsInfoSchema.safeParse(data);
    if (!result.success) {
      throw new Error("Error en el servidor, reinicia la pagina");
    }
    return result.data;
  } catch (error) {
    if (isAxiosError(error) && error.message) {
      throw new Error(error.message);
    }
  }
};

export const getAllBarbersWithAppointments = async () => {
  try {

    const { data } = await axiosPrivate.get(`/barber/barbers/allBarbers/info`);
    if(!data) {
      throw new Error('No hay barberos')
    }
    const result = ClientsInfoAndAppointmentsSchema.safeParse(data);
    if (!result.success) {
      throw new Error("Error en el servidor, reinicia la pagina");
    }
    return result.data;
  } catch (error) {
    if (isAxiosError(error) && error.message) {
      throw new Error(error.message);
    }
  }
};
export const getBarberById = async (barberId: string) => {
  try {
    const { data } = await axiosPrivate.get(`/barber/barbers/${barberId}`);
    const result = BarberInfoAndAppointmentsSchema.safeParse(data);
    if (!result.success) {
      throw new Error("Error en el servidor, reinicia la pagina");
    }
    return result.data;
  } catch (error) {
    if (isAxiosError(error) && error.message) {
      throw new Error(error.message);
    }
  }
};

export const getBarberAppointmentsCount = async (barberId: string) => {
  try {
    const { data } = await axiosPrivate(
      `/barber/barbers/appointments/${barberId}/count`
    );
    const result = AppointmentsForBarbersCount.safeParse(data);
    if (!result.success) {
      throw new Error("Error en el servidor, reinicia la pagina");
    }
    return result.data;
  } catch (error) {
    if (isAxiosError(error) && error.message) {
      throw new Error(error.message);
    }
  }
};

export const getAppointmentsInfoByDate = async (barberId: string)=> {
  try {
    const { data } = await axiosPrivate.get(`/barber/barbers/appointments/${barberId}/day`)
    const result = AppointmentsOfTheDaySchema.safeParse(data)
    if (!result.success) {
      throw new Error("Error en el servidor, reinicia la pagina");
    }
    return result.data
  } catch (error) {
    if (isAxiosError(error) && error.message) {
      throw new Error(error.message);
    }
    
  }
}

export const deleteBarber = async(barberId: string) => {
  try {
    const { data } = await axiosPrivate.delete<string>(`/barber/delete/${barberId}`)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.message) {
      throw new Error(error.message);
    }
  }
}