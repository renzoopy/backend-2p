const axios = require('axios');

describe('Test de Endpoints de Mesas', () => {
  let restauranteId;
  let mesaId;
  beforeAll(async () => {
    const response = await axios.post('http://localhost:8000/restaurantes', {
      nombre: 'Restaurant',
      direccion: 'Dir 123',
    });
    console.log(response.data);
    restauranteId = response.data.id;
  });
  it('Obtiene lista de mesas correctamente', async () => {
    const response = await axios.get(`http://localhost:8000/mesas`);
    expect(response.status).toBe(200);
  });
  it('Crea mesa correctamente', async () => {
    const response = await axios.post(`http://localhost:8000/mesas`, {
      nombreMesa: 'Nombre de la Mesa',
      posicion: { x: 1, y: 2 },
      nroPiso: 2,
      capacidad: 4,
      restauranteId: restauranteId,
    });
    console.log(response.data);
    expect(response.status).toBe(200);
    expect(response.data.id).toBeDefined();
    expect(response.data.nroPiso).toBe(2);
    expect(response.data.capacidad).toBe(4);
    expect(response.data.nombre).toBe('Nombre de la Mesa');
    mesaId = response.data.id;
  });
  it('Crea mesa con planta igual a 1 por defecto correctamente', async () => {
    const response = await axios.post(`http://localhost:8000/mesas`, {
      nombre: 'Nombre de la Mesa2',
      posicion: { x: 1, y: 2 },
      capacidad: 4,
      restauranteId: restauranteId,
    });
    expect(response.status).toBe(200);
    expect(response.data.nroPiso).toBe(1);
  });
  it('Obtiene una mesa correctamente por Id', async () => {
    const response = await axios.get(`http://localhost:8000/mesas/${mesaId}`);
    expect(response.status).toBe(200);
    expect(response.data.id).toBe(mesaId);
    expect(response.data.nroPiso).toBe(2);
    expect(response.data.capacidad).toBe(4);
    expect(response.data.nombre).toBe('Nombre de la Mesa');
    mesaId = response.data.id;
  });
  it('Edita una mesa correctamente', async () => {
    const response = await axios.post(`http://localhost:8000/mesas/${mesaId}`, {
      nombre: 'Nombre de la Mesa 2',
      posicion: { x: 3, y: 3 },
      capacidad: 5,
      nroPiso: 2,
    });
    console.log(response.status);
    expect(response.status).toBe(200);
    expect(response.data.nroPiso).toBe(2);
    expect(response.data.capacidad).toBe(5);
    expect(response.data.nombre).toBe('Nombre de la Mesa 2');
  });
});
