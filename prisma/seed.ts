import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function idiomas() {
  const lenguajes = [
    { nombre: 'Español' },
    { nombre: 'Inglés' },
    { nombre: 'Portugués' },
    { nombre: 'Italiano' },
    { nombre: 'Francés' },
    { nombre: 'Alemán' },
    { nombre: 'Ruso' },
    { nombre: 'Chino' },
    { nombre: 'Japonés' },
  ];

  for (let idioma of lenguajes) {
    await prisma.idioma.create({
      data: idioma,
    });
  }
}

async function generos() {
  const sexos = [
    { nombre: 'Femenino' },
    { nombre: 'Masculino' },
  ];

  for (let genero of sexos) {
    await prisma.sexo.create({
      data: genero,
    });
  }
}

async function estadosCompra() {
  const estados = [
    { nombre: 'En Preparacion' },
    { nombre: 'Enviado' },
    { nombre: 'Entregado' },
  ];

  for (let estado of estados) {
    await prisma.estadoCompra.create({
      data: estado,
    });
  }
}

async function estadosLibros() {
  const estados = [
    { nombre: 'Nuevo' },
    { nombre: 'Usado' },
  ];

  for (let estado of estados) {
    await prisma.estado.create({
      data: estado,
    });
  }
}

async function razonesDevolucion() {
  const razones = [
    { nombre: 'Producto en mal estado.' },
    { nombre: 'No llenó las expectativas.' },
    { nombre: 'El pedido llegó en un tiempo superior al estipulado.' },
  ];

  for (let razon of razones) {
    await prisma.razonDevolucion.create({
      data: razon,
    });
  }
}

async function tiposTarjeta() {
  const tipos = [
    { nombre: 'Crédito' },
    { nombre: 'Débito' },
  ];

  for (let tipo of tipos) {
    await prisma.tipoTarjeta.create({
      data: tipo,
    });
  }
}

async function bancos() {
  const banks = [
    {
      nombre: 'Visa',
      codes: '4',
    },
    {
      nombre: 'Mastercard',
      codes: '5',
    },
    {
      nombre: 'American Express',
      codes: '34|37',
    },
    {
      nombre: 'Diner\'s Club',
      codes: '30|36|38',
    },
    {
      nombre: 'Discover',
      codes: '6',
    },
  ];

  for (let tipo of banks) {
    await prisma.banco.create({
      data: tipo,
    });
  }
}

generos();
estadosCompra();
estadosLibros();
razonesDevolucion();
tiposTarjeta();
bancos();
idiomas()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });