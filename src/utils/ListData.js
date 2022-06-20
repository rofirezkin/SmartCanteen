export const listData = [
  {
    id: 1,
    label: 'Fakultas Ilmu Terapan',
    value: 'Fakultas Ilmu Terapan',
  },
  {
    id: 2,
    label: 'Fakultas Teknik',
    value: 'Fakultas Teknik',
  },
  {
    id: 3,
    label: 'Fakultas Ekonomi dan Bisnis',
    value: 'Fakultas Ekonomi dan Bisnis',
  },
  {
    id: 4,
    label: 'Asrama Putra',
    value: 'Asrama Putra',
  },
  {
    id: 5,
    label: 'Asrama Putri',
    value: 'Asrama Putri',
  },
  {
    id: 6,
    label: 'Gedung Kuliah Umum',
    value: 'Gedung Kuliah Umum',
  },
];

export const method = [
  {
    id: 1,
    label: 'Dine In',
    value: 'Dine In',
  },
  // {
  //   id: 2,
  //   label: 'Delivery',
  //   value: 'Delivery',
  // },
  // {
  //   id: 3,
  //   label: 'Take Away',
  //   value: 'Take Away',
  // },
];

export const paymentMethod = [
  // {
  //   id: 1,
  //   label: 'Cash',
  //   value: 'Cash',
  // },
  {
    id: 2,
    label: 'QRIS Payment',
    value: 'QRIS Payment',
  },
];

export const noMeja = () => {
  const jumlah = 20;
  const dataMeja = [];
  for (let i = 1; i < jumlah + 1; i++) {
    const data = {
      id: i,
      label: `Table No. ${i}`,
      value: `${i}`,
    };
    dataMeja.push(data);
  }
  return dataMeja;
};
