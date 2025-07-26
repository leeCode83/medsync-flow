export interface District {
  id: string;
  name: string;
}

export interface City {
  id: string;
  name: string;
  districts: District[];
}

export interface Province {
  id: string;
  name: string;
  cities: City[];
}

export const provinces: Province[] = [
  {
    id: 'dki_jakarta',
    name: 'DKI Jakarta',
    cities: [
      {
        id: 'jakarta_pusat',
        name: 'Jakarta Pusat',
        districts: [
          { id: 'gambir', name: 'Gambir' },
          { id: 'sawah_besar', name: 'Sawah Besar' },
          { id: 'kemayoran', name: 'Kemayoran' },
        ],
      },
      {
        id: 'jakarta_barat',
        name: 'Jakarta Barat',
        districts: [
          { id: 'cengkareng', name: 'Cengkareng' },
          { id: 'grogol_petamburan', name: 'Grogol Petamburan' },
          { id: 'taman_sari', name: 'Taman Sari' },
        ],
      },
    ],
  },
  {
    id: 'jawa_barat',
    name: 'Jawa Barat',
    cities: [
      {
        id: 'bandung',
        name: 'Bandung',
        districts: [
          { id: 'sukajadi', name: 'Sukajadi' },
          { id: 'sumur_bandung', name: 'Sumur Bandung' },
          { id: 'coblong', name: 'Coblong' },
        ],
      },
      {
        id: 'bekasi',
        name: 'Bekasi',
        districts: [
          { id: 'bekasi_timur', name: 'Bekasi Timur' },
          { id: 'bekasi_barat', 'name': 'Bekasi Barat' },
        ],
      },
    ],
  },
];
