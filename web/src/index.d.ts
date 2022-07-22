declare module "*.sql" {
  export type SchemaObject = {
    name: string;
    createStmt: string;
  };

  const src: SchemaObject[];
  export default src;
}
