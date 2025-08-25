/**
 * Development Constants
 *
 * This helper file centralizes constants related to the real estate developments,
 * such as names and model identifiers. Using these constants instead of "magic strings"
 * improves code maintainability, reduces the risk of typos, and makes the codebase
 * easier to refactor and update.
 */

// Development Names
export const DEVELOPMENT_NAMES = {
  TORRES_COLON: 'Torres Colón',
  LAS_CEIBAS: 'Las Ceibas Manzanillo',
  ECOTERRA: 'Ecoterra Paraíso',
} as const;

// Model Names for Torres Colón
export const TORRES_COLON_MODELS = {
  ANDALUCIA: 'Andalucía',
  TURIN: 'Turín',
  MILAN: 'Milán',
} as const;

// Model Names for Las Ceibas Manzanillo
export const LAS_CEIBAS_MODELS = {
  MILOS: 'Milos',
  KIOS: 'Kios',
  YAROS: 'Yaros',
} as const;

// Model Names for Ecoterra Paraíso
export const ECOTERRA_MODELS = {
  BONANZA: 'Bonanza',
} as const;

// A helper function to normalize strings for comparison (e.g., removing accents)
export const normalizeString = (str: string): string => {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

// A filter function to check if a model name includes a specific keyword, ignoring accents.
export const modelNameIncludes = (modelName: string, keyword: string): boolean => {
  return normalizeString(modelName).includes(normalizeString(keyword));
};