export const validateFrontmatter = (
  frontmatter: Record<string, string | Array<string>>
) => {
  const frontMatterKeys = ["title", "thumb", "date", "tags"];
  Object.keys(frontmatter).forEach((key) => {
    if (!frontMatterKeys.includes(key) || !frontmatter[key]) {
      throw new Error(`Invalid attribute (${key}) in the frontmatter!`);
    }
  });
};
