import { Videogame } from './videogame';

describe('Videogame', () => {
  it('should create an instance', () => {
    expect(new Videogame()).toBeTruthy();
  });

  it('should have all the properties', () => {
    const videogame = new Videogame();
    expect(videogame.nom).toEqual('');
    expect(videogame.any).toEqual(0);
    expect(videogame.plataforma).toEqual('');
    expect(videogame.desenvolupadora).toEqual('');
    expect(videogame.unitats).toEqual(0);
  });

  it('should accept values in the constructor', () => {
    const videogame = new Videogame({
      nom: 'Super Mario Bros.',
      any: 1985,
      plataforma: 'NES',
      desenvolupadora: 'Nintendo',
      unitats: 1,
    });
    expect(videogame.nom).toEqual('Super Mario Bros.');
    expect(videogame.any).toEqual(1985);
    expect(videogame.plataforma).toEqual('NES');
    expect(videogame.desenvolupadora).toEqual('Nintendo');
    expect(videogame.unitats).toEqual(1);
  });
});
