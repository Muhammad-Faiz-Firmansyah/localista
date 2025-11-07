const data = [
  {
    id: 1,
    name: 'KOPI KOLU',
    section: 'minuman',
    rating: 4.0,
    address: 'Alamat singkat, Kota, Provinsi',
    coverImage: '/images/umkm/kopi-kolu-cover.jpg',
    recommended: true,
    products: {
      Minuman: [
        { id: 1, name: 'Es Kopi Susu', price: 18000 },
        { id: 2, name: 'Americano', price: 16000 },
        { id: 3, name: 'Cappuccino', price: 20000 },
        { id: 4, name: 'Matcha Latte', price: 22000 }
      ],
      Makanan: [
        { id: 11, name: 'Roti Bakar', price: 15000 },
        { id: 12, name: 'Kentang Goreng', price: 14000 }
      ],
      Snack: [
        { id: 21, name: 'Cookies Choco', price: 10000 },
        { id: 22, name: 'Pisang Goreng', price: 12000 }
      ]
    }
  },
  {
    id: 2,
    name: 'WARUNG SARI',
    section: 'makanan',
    rating: 4.3,
    address: 'Jl. Melati No. 2, Kota',
    coverImage: '/images/umkm/warung-sari-cover.jpg',
    recommended: true,
    products: {
      Minuman: [
        { id: 31, name: 'Teh Manis', price: 6000 },
        { id: 32, name: 'Jeruk Hangat', price: 8000 }
      ],
      Makanan: [
        { id: 41, name: 'Nasi Goreng', price: 18000 },
        { id: 42, name: 'Ayam Geprek', price: 20000 },
        { id: 43, name: 'Mie Goreng', price: 15000 }
      ],
      Snack: [
        { id: 51, name: 'Kerupuk Udang', price: 5000 }
      ]
    }
  },
  {
    id: 3,
    name: 'JAHIT CEPAT',
    section: 'jasa',
    rating: 4.5,
    address: 'Jl. Kenanga No. 5, Kota',
    coverImage: '/images/umkm/jahit-cepat-cover.jpg',
    recommended: false,
    products: {
      Minuman: [],
      Makanan: [],
      Snack: []
    }
  },
  {
    id: 4,
    name: 'FASHION KITA',
    section: 'fashion',
    rating: 4.1,
    address: 'Pasar Baru Blok A, Kota',
    coverImage: '/images/umkm/fashion-kita-cover.jpg',
    recommended: false,
    products: {
      Minuman: [],
      Makanan: [],
      Snack: []
    }
  },
  {
    id: 5,
    name: 'TOKO SEMBAKO ABC',
    section: 'sembako',
    rating: 4.0,
    address: 'Jl. Mawar No. 7, Kota',
    coverImage: '/images/umkm/sembako-abc-cover.jpg',
    recommended: true,
    products: {
      Minuman: [ { id: 61, name: 'Air Mineral', price: 4000 } ],
      Makanan: [ { id: 71, name: 'Mi Instan', price: 3500 } ],
      Snack: [ { id: 81, name: 'Keripik Singkong', price: 8000 } ]
    }
  }
];

export default data;
