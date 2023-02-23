declare module "*.sql" {
  export type SchemaObject = {
    kind: string;
    name?: string;
    statement: string;
  };

  const src: Array<SchemaObject>;
  export default src;
}
