/**
 * Convert development name to URL slug for routing
 */
export const developmentNameToSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/á/g, 'a')
    .replace(/é/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
    .trim();
};

/**
 * Generate the full development page URL
 */
export const getDevelopmentUrl = (developmentName: string): string => {
  const slug = developmentNameToSlug(developmentName);
  return `/desarrollos/${slug}`;
};