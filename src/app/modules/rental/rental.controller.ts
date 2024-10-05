import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { RentalServices } from './rental.service';

const createRental = catchAsync(async (req: Request, res: Response) => {
  const { bikeId, startTime } = req.body;
  const userId = req.user.userId;

  const rental = await RentalServices.createRental(userId, bikeId, startTime);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rental created successfully',
    data: rental,
  });
});

const returnBike = catchAsync(async (req: Request, res: Response) => {
  const { id: rentalId } = req.params;

  console.log(rentalId);

  // const userId = req?.user?.userId;

  const updatedRental = await RentalServices.returnBike(rentalId);    //userId

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike returned successfully',
    data: updatedRental,
  });
});

const getAllRentals = catchAsync(async (req: Request, res: Response) => {
  const result = await RentalServices.getAllRentals();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike rental data fetched successfully',
    data: result,
  });
});

const getAllRentalsForUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const rentals = await RentalServices.getAllRentalsForUser(userId);
  if(rentals.length === 0){
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: false,
      message: "You don't have any rentals",
      data: rentals,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rentals retrieved successfully',
    data: rentals,
  });
});

export const RentalControllers = {
  createRental,
  returnBike,
  getAllRentalsForUser,
  getAllRentals,
};
