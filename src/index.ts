import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

app.get("/locations", async (req, res) => {
  const locations = await prisma.location.findMany({
    orderBy: { createdAt: "desc" },
  });

  res.json(locations);
});

app.post("/locations", async (req, res) => {
  const location = await prisma.location.create({
    data: {
      name: req.body.name,
      address: req.body.address,
      lat: req.body.lat,
      lng: req.body.lng,
      tags: req.body.tags,
      createdAt: new Date(),
    },
  });

  return res.json(location);
});

app.listen(Number(port), "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
