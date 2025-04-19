import { SearchParams } from "next/dist/server/request/search-params";

export async function getSearchParam<T>(args: {
  params: SearchParams | undefined;
  key: string;
  default: T;
  validate: (v: unknown) => v is T;
}): Promise<T> {
  if (!args.params) return args.default;
  const p = await args.params;
  const val = p[args.key];
  return args.validate(val) ? val : args.default;
}
