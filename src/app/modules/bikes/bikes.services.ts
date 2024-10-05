import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../users/users.model";
import { TBike } from "./bikes.interface";
import { Bike } from "./bikes.model";

const createBike = async (payload: TBike) => {

  const { name, image, description, pricePerHour, cc, year, model, brand } = payload;

  const payloadData = {
    name : name || "",
    image : image || "",
    description : description || "",
    pricePerHour : pricePerHour || "",
    isAvailable : true,
    cc : cc || "",
    year : year || "",
    model : model || "",
    brand : brand || "",
  }

  const isAdmin = await User.findOne({role: 'admin'});
  if(!isAdmin){
    throw new AppError(httpStatus.BAD_REQUEST, "Only admin can create bike!")
  };
  const result = await Bike.create(payloadData);
  return result;
};


const getAllBikes = async () => {
  const result = await Bike.find();
  return result;
};

const getSingleBikeById = async (bikeId: string) => {
  const result = await Bike.findById(bikeId);
  return result;
};

const updateBike = async (id : string, payload : Partial<TBike>) => {
  const result = await Bike.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteBike = async (id: string) => {
  const result = await Bike.findByIdAndDelete(id);
  return result;
};

export const BikeServices = {
  createBike,
  getAllBikes,
  updateBike,
  deleteBike,
  getSingleBikeById,
};