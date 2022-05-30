const axios = require('axios');

describe('Tests de EndPoints de Usuario', () => {
  let timestamp;
  let usuarioId;
  beforeAll(() => {
    timestamp = new Date().getMilliseconds();
  });
  it('Obtener lista de usuarios', async () => {
    const result = await axios.get('http://localhost:8000/usuarios');
    expect(result.status).toBe(200);
  });
  it('Crear usuario exitosamente', async () => {
    const result = await axios.post('http://localhost:8000/usuarios', {
      nombre: 'Marcelo',
      apellido: 'Perez',
      cedula: `${timestamp}`,
    });
    expect(result.status).toBe(200);
    expect(result.data.id).toBeDefined();
    usuarioId = result.data.id;
  });
  it('Crear usuario con misma cedula', async () => {
    const result = await axios.post('http://localhost:8000/usuarios', {
      nombre: 'Nicolas',
      apellido: 'Perez',
      cedula: `${timestamp}`,
    });
    const parsedData = JSON.parse(result.data);
    expect(result.status).toBe(500);
    expect(parsedData.error).toBeDefined();
  });
  it('Buscar usuario por ID', async () => {
    const result = await axios.get(
      `http://localhost:8000/usuarios/${usuarioId || 1}`
    );
    expect(result.status).toBe(200);
    expect(result.data.id).toBeDefined();
    expect(result.data.nombre).toBeDefined();
    expect(result.data.apellido).toBeDefined();
  });
  it('Buscar usuario inexistente por ID', async () => {
    const result = await axios.get(`http://localhost:8000/usuarios/${10001}`);
    expect(result.status).toBe(200);
    expect(result.data.id).not.toBeDefined();
    expect(result.data.nombre).not.toBeDefined();
    expect(result.data.apellido).not.toBeDefined();
  });
});
