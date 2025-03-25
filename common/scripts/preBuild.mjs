import { promises } from "fs";
import path from "path";

const directoryPath = "./src";
const indexFile = path.join(directoryPath, "index.ts");
const dtoPath = path.join(directoryPath, "dtos");
const dtoIndexFile = path.join(dtoPath, "index.ts");

async function readRootFilesIntoMemory(directory) {
  try {
    const files = await promises.readdir(directory);
    let fileNames = [];

    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = await promises.stat(filePath);
      if (stat.isFile()) {
        fileNames.push(file);
      }
    }

    return fileNames;
  } catch (err) {
    console.error("Error reading directory:", err);
    return [];
  }
}

console.log("****************** Pre Build Job Starting ******************");

const rootFiles = await readRootFilesIntoMemory(directoryPath);

const rootExports = rootFiles
  .filter((file) => file !== "index.ts")
  .map(
    (file) =>
      `export * from "./${file.replaceAll("\\", "/").replace(".ts", "")}";`
  )
  .join("\n");

console.log(
  "****************** Writing imports to root index.ts ******************"
);

await promises.writeFile(indexFile, rootExports);

const dtoFiles = await readRootFilesIntoMemory(dtoPath);

const dtoExports = dtoFiles
  .filter((file) => file !== "index.ts")
  .map(
    (file) =>
      `export * from "./${file.replaceAll("\\", "/").replace(".ts", "")}";`
  )
  .join("\n");

console.log(
  "****************** Writing imports to dto index.ts ******************"
);

await promises.writeFile(dtoIndexFile, dtoExports);
