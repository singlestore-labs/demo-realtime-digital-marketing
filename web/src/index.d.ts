declare module "*.sql" {
  const src: { name: string; createStmt: string }[];
  export default src;
}
