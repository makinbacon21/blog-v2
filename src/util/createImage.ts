import { promises as fsPromises } from 'node:fs';
import satori from "satori";
import sharp from "sharp";

export async function genSVG(component: JSX.Element) {
  return await satori(component, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Open Sans",
        data: await fsPromises.readFile(
          "./src/OpenGraph/OpenSans-Regular.ttf",
        ),
        weight: 400,
      },
      {
        name: "Open Sans",
        data: await fsPromises.readFile(
          "./src/OpenGraph/OpenSans-Bold.ttf",
        ),
        weight: 600,
      },
    ],
  });
}

export async function genPNG(component: JSX.Element) {
  return await sharp(Buffer.from(await genSVG(component)))
    .png()
    .toBuffer();
}
