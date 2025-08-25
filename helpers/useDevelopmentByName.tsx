import { useMemo } from "react";
import { useDevelopments } from "./useDevelopments";

/**
 * A hook to fetch all developments and filter for one by its name.
 * This is a client-side filter.
 * @param name The name of the development to find.
 */
export const useDevelopmentByName = (name: string) => {
  const { data, ...rest } = useDevelopments();

  const development = useMemo(() => {
    if (!data) return undefined;
    return data.find((dev) => dev.name === name);
  }, [data, name]);

  return { data: development, ...rest };
};