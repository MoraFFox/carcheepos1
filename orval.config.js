/** @format */

import { defineConfig } from 'orval';

export default defineConfig({
  petstore: {
    input: "D:/My projects/cars resalles/swagger.yaml",
    output: {
      mode: "tags-split",
      target: "./src/api/index.ts",
      schemas: "./src/api/model",
      client: "axios",
      prettier: true
    }
  }
});
