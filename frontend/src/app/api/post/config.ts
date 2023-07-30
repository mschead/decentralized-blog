const VARIABLES = {
  WEB3_STORAGE_API_TOKEN: "",
};

type VariableKey = keyof typeof VARIABLES;

const buildEnvVariables = () => {
  Object.keys(VARIABLES).forEach((variable) => {
    const value = process.env[variable];
    if (value === undefined) {
      throw new Error(`Missing ${variable} env variable.`);
    }
    VARIABLES[variable as VariableKey] = value;
  });
  return VARIABLES;
};

export const ENV_VARIABLES = buildEnvVariables();
