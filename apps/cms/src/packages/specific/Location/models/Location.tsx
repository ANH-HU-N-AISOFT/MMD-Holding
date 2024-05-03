export interface City {
  name: string;
  slug: string;
  type: string;
  name_with_type: string;
  code: string;
  id: string;
}

export interface Country {
  name: string;
  capital: string;
  iso2: string;
  iso3: string;
  id: string;
}

export interface District {
  name: string;
  slug: string;
  type: string;
  name_with_type: string;
  code: string;
  id: string;
}

export interface School {
  provinceCode: string;
  districtCode: string;
  schoolCode: string;
  name: string;
  address: string;
  level: 3;
  id: string;
}
