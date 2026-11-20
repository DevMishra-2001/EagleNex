import { cacheLife } from "next/cache";
import { getYear } from "@/utils/date";

/** Current year, cached on the server and refreshed daily so the page stays prerendered */
export default async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return getYear();
}
