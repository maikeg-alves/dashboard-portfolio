export const sortByCreatedAt = (
  a: { createdAt: string },
  b: { createdAt: string },
) => Date.parse(b.createdAt) - Date.parse(a.createdAt);
