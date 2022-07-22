declare module "*.sql" {
  export type SchemaObject = {
    kind: string;
    name?: string;
    statement: string;
  };

  const src: SchemaObject[];
  export default src;
}
