// import { ObjectId, WithId } from "mongodb";
// import { collections } from "./db.connect.service";

// // interface balloonDoc extends WithId<Document> {
// //   name: string;
// //   password: string;
// // }

// export const FindAll = async (collectionName:string) => {
//   const data = await collections[collectionName]?.find({}).toArray();
//   return data;
// };

// export const FindOneById = async (collectionName:string, id: string) => {
//   const query = { _id: new ObjectId(id) };

//   const data = await collections[collectionName]?.findOne(query);
//   return data;
// };

// export const FindOne = async (collectionName:string, query: { key: string; value: string }) => {
//   const mappedObj = { [query.key]: query.value }; // construct object with dynamic key name

//   const data = await collections[collectionName]?.findOne(mappedObj);
//   return data;
// };

// export const createOrUpdate = async <T>(collectionName:string, data: T) => {

//   const result = await collections[collectionName]?.findOneAndUpdate(data);
//   return result;
// };

// // export const UpdateOneById = async <T>(collectionName:string, id: string, updated: T) => {
// //   const query = { _id: new ObjectId(id) };

// //   const result = await collections[collectionName]?.updateOne(query, {
// //     $set: updatedBalloon,
// //   });
// //   return result;
// // };
// export const DeleteOnebyId = async (id: string) => {
//   const query = { _id: new ObjectId(id) };

//   const result = await collections.balloons?.deleteOne(query);
//   return result;
// };
