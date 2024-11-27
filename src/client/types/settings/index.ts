type Primitive = number | string | boolean;
type ArrayOfPrimitives = Primitive[];
type ObjectOfPrimitives = {
  [key: string]: Primitive | Primitive[] | ObjectOfPrimitives;
}; // Allows nested structures

type DataSettings = Primitive | ArrayOfPrimitives | ObjectOfPrimitives;

// Export the type if needed
export type { DataSettings };
