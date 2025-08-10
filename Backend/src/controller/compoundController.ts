import { Request, Response } from "express";
import { Compound } from "../models/compound";
import { compoundUpdateSchema } from "../valdiationSchema";
import z from "zod";
export const getAllCompounds = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Compound.findAndCountAll({
      offset,
      limit,
    });

    res.json({
      data: rows,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch compounds" });
  }
};

export const createCompound = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    console.log(req.body);
    console.log(data,"heree");
    if (!Array.isArray(data)) {
      return res.status(400).json({ error: "Expected an array of compounds" });
    }

    const isValid = data.every(
      (compound) =>
        compound.CompoundName &&
        compound.CompoundDescription &&
        compound.strImageSource &&
        compound.strImageAttribution !== undefined
    );

    if (!isValid) {
      return res
        .status(400)
        .json({ error: "One or more compounds are missing required fields" });
    }
    const compound = await Compound.bulkCreate(data);
    res.status(201).json(compound);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create compound" });
  }
};
export const getCompound = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const compound = await Compound.findOne({
      where: { id: id },
    });

    if (!compound) {
      return res.status(404).json({ message: "Compound not found" });
    }

    res.json(compound);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch compounds" });
  }
};
export const updateCompound = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const parsedData = compoundUpdateSchema.parse(req.body);
    const compound = await Compound.findOne({ where: { id: req.params.id } });
    if (!compound) {
      return res.status(404).json({ message: "Compound not found" });
    }

    await compound.update(parsedData);

    res
      .status(200)
      .json({ message: "Compound updated successfully", data: compound });
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log(err);
      return res.status(400).json({ errors: err.flatten() });
    }
    console.error(err);
    res.status(500).json({ error: "Failed to update compound" });
  }
  res.status(500).json({ error: "Failed to update compound" });
};
