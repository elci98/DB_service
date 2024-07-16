// import { BSONTypeError } from "bson";
// import * as DAL from "../DB/db.dal";
// import { DALError } from "../models/dalError.model";
// import { Balloon } from "../models/balloon.model";

// export const getAllBalloons = async () => {
//   try {
//     return await DAL.FindAll();
//   } catch (error) {
//     throw new DALError("CANT GET BALLOONS", 500);
//   }
// };
// // export const getBalloonByValue = async (key: string, value: string) => {

// //   try {
// //     return await DAL.FindOne({ key, value });
// //   } catch (error) {
// //     throw new DALError("CANT GET BALLOON", 500);
// //   }
// // };

// export const getBalloonById = async (id: string) => {
//   try {
//     return await DAL.FindOneById(id);
//   } catch (error) {
//     if (error instanceof BSONTypeError)
//       throw new DALError(`INVALID ID: ${id}, FAILED TO GET BALLOON`, 400);
//     throw new DALError(`CANT GET BALLOON ${id}`, 500);
//   }
// };
// export const createNewBalloon = async (balloon: Balloon) => {
//   try {
//     return await DAL.InsertOne(balloon);
//   } catch (error) {
//     throw new DALError(`FAILED TO CREATE NEW BALLOON`, 500);
//   }
// };
// export const UpdateBalloon = async (id: string, balloon: Balloon) => {
//   try {
//     return await DAL.UpdateOneById(id, balloon);
//   } catch (error) {
//     if (error instanceof BSONTypeError)
//       throw new DALError(`INVALID ID: ${id}, FAILED TO UPDATE BALLOON`, 400);
//     throw new DALError(`FAILED TO UPDATE BALLOON`, 500);
//   }
// };
// export const DeleteBalloon = async (id: string) => {
//   try {
//     return await DAL.DeleteOnebyId(id);
//   } catch (error) {
//     if (error instanceof BSONTypeError)
//       throw new DALError(`INVALID ID: ${id}, FAILED TO DELETE USER`, 400);

//     throw new DALError(`FAILED TO DELETE BALLOON: ${id}`, 500);
//   }
// };
