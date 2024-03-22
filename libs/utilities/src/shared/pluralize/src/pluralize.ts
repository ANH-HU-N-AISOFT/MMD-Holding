interface Pluralize {
  singular: string;
  plural: string;
  count: number;
}

export const pluralize = ({ count, plural, singular }: Pluralize): string => {
  if (count >= 2) {
    return plural;
  }
  return singular;
};
