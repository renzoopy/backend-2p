const axios = require('axios');

describe('Tests de Endpoints de Restaurantes', () => {
  let restauranteId;

  it('Obtener lista de restaurants', async () => {
    const result = await axios.get('http://localhost:8000/restaurantes');
    expect(result.status).toBe(200);
  });
  it('Crear restaurant exitosamente', async () => {
    const result = await axios.post('http://localhost:8000/restaurantes', {
      nombre: 'Marcelo',
      direccion: 'Perez',
    });
    expect(result.status).toBe(200);
    expect(result.data.id).toBeDefined();
    restauranteId = result.data.id;
  });
  it('Buscar Restaurante por ID', async () => {
    const result = await axios.get(
      `http://localhost:8000/restaurantes/${restauranteId || 1}`
    );
    expect(result.status).toBe(200);
    expect(result.data.id).toBeDefined();
    expect(result.data.nombre).toBeDefined();
    expect(result.data.direccion).toBeDefined();
  });
  it('Edita correctamente restaurante', async () => {
    const result = await axios.put(
      `http://localhost:8000/restaurantes/${restauranteId || 1}`,
      { nombre: 'nombreEditado', direccion: 'direccionEditada' }
    );
    console.log(result.data);
    expect(result.status).toBe(200);
    expect(result.data.id).toBeDefined();
    expect(result.data.nombre).toBe('nombreEditado');
    expect(result.data.direccion).toBe('direccionEditada');
  });
  it('Elimina correctamente restaurante', async () => {
    const result = await axios.delete(
      `http://localhost:8000/restaurantes/${restauranteId || 1}`
    );
    expect(result.status).toBe(200);
  });
});
