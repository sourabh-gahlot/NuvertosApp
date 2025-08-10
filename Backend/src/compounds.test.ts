// import request from "supertest";
// import express from "express";
// import bodyParser from "body-parser";
// import { Compound } from "./models/compound";
// import {
//   getAllCompounds,
//   createCompound,
//   getCompound,
//   updateCompound,
// } from "./controller/compoundController";

// jest.mock("./models/compound", () => ({
//   Compound: {
//     findAndCountAll: jest.fn(),
//     bulkCreate: jest.fn(),
//     findOne: jest.fn(),
//   },
// }));

// // // Create express app directly
// const app = express();
// app.use(bodyParser.json());
// app.get("/compounds", getAllCompounds);
// app.post("/compounds", createCompound);
// app.get("/compounds/:id", getCompound);
// app.put("/compounds/:id", updateCompound);

// describe("COMPOUNDS API", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test("GET /compounds → returns paginated list", async () => {
//     (Compound.findAndCountAll as jest.Mock).mockResolvedValue({
//       count: 30,
//       rows: [{ id: 1, CompoundName: "Water" }],
//     });

//     const res = await request(app).get("/compounds?page=1&limit=10");

//     expect(res.status).toBe(200);
//     expect(res.body.total).toBe(30);
//     expect(res.body.data[0].CompoundName).toBe("Water");
//   });

//   test("POST /compounds → creates compounds", async () => {
//     const payload = {
//       data: [
//         {
//           CompoundName: "Salt",
//           CompoundDescription: "NaCl",
//           strImageSource: "http://image.com",
//           strImageAttribution: "Author",
//         },
//       ],
//     };

//     (Compound.bulkCreate as jest.Mock).mockResolvedValue(payload.data);

//     const res = await request(app).post("/compounds").send(payload);

//     expect(res.status).toBe(201);
//     expect(res.body[0].CompoundName).toBe("Salt");
//   });

//   test("GET /compounds/:id → returns one compound", async () => {
//     (Compound.findOne as jest.Mock).mockResolvedValue({
//       id: 1,
//       CompoundName: "Water",
//     });

//     const res = await request(app).get("/compounds/1");

//     expect(res.status).toBe(200);
//     expect(res.body.CompoundName).toBe("Water");
//   });

//   test("PUT /compounds/:id → updates a compound", async () => {
//     const fakeCompound = { update: jest.fn() };
//     (Compound.findOne as jest.Mock).mockResolvedValue(fakeCompound);

//     const res = await request(app).put("/compounds/1").send({
//       CompoundName: "Salt",
//       CompoundDescription: "NaCl is here is the sodimunmas dadnuaishdlka",
//       strImageSource: "http://image.com",
//     });

//     expect(res.status).toBe(200);
//     expect(fakeCompound.update).toHaveBeenCalledWith({
//       CompoundName: "Salt",
//       CompoundDescription: "NaCl is here is the sodimunmas dadnuaishdlka",
//       strImageSource: "http://image.com",
//     });
//   });
// });
