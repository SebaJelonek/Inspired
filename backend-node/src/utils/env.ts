export function createEnvReader(envs: NodeJS.ProcessEnv) {
  //
  function toInt(variable: string, value: string): number {
    const int = parseInt(value, 10);
    if (!Number.isFinite(int)) {
      throw new Error(
        `Expected variable ${variable} to be integer but got ${value}`,
      );
    }
    return int;
  }

  function toBool(variable: string, value: string): boolean {
    let bool;
    switch (value.trim().toLowerCase()) {
      case "true":
        bool = true;
        break;
      case "yes":
        bool = true;
        break;
      case "y":
        bool = true;
        break;
      case "1":
        bool = true;
        break;
      case "false":
        bool = false;
        break;
      case "no":
        bool = false;
        break;
      case "0":
        bool = false;
        break;
      case "n":
        bool = false;
        break;
      default:
        throw new Error(
          `Expected variable ${variable} to be boolean but got ${value}`,
        );
    }

    return bool;
  }

  return Object.freeze({
    readRequiredString(variable: string): string {
      const value = envs[variable];
      if (value === undefined) {
        throw new Error(
          `The variable ${variable} you are looking for does not exist.`,
        );
      }
      return value;
    },
    readOptionalString<T>(variable: string, fallback: T): string | T {
      const value = envs[variable];
      if (value !== undefined) {
        return value;
      }
      return fallback;
    },
    readRequiredInt(variable: string): number {
      const value = envs[variable];
      if (value === undefined) {
        throw new Error(
          `The variable ${variable} you are looking for does not exist.`,
        );
      }
      return toInt(variable, value);
    },
    readOptionalInt<T>(variable: string, fallback: T): number | T {
      const value = envs[variable];
      if (value !== undefined) {
        return toInt(variable, value);
      }
      return fallback;
    },
    readRequiredBool(variable: string): boolean {
      const value = envs[variable];
      if (value === undefined) {
        throw new Error(
          `The variable ${variable} you are looking for does not exist.`,
        );
      }
      return toBool(variable, value);
    },
    readOptionalBool<T>(variable: string, fallback: T): boolean | T {
      const value = envs[variable];
      if (value !== undefined) {
        return toBool(variable, value);
      }
      return fallback;
    },

    parseConnectionString(
      connectionString: string,
      partToFind: string,
    ): string {
      const parts = connectionString.split(";");
      const prefix = `${partToFind}=`;

      // 1. Find the exact matching key segment
      const match = parts.find((part) => part.startsWith(prefix));

      if (!match) {
        throw new Error(
          `${partToFind} has not been found in connection string`,
        );
      }

      // 2. Extract everything after "KeyName="
      return match.slice(prefix.length);
    },
  });
}
