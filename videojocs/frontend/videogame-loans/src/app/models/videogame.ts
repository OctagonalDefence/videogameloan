export class Videogame {
    
    nom: string = '';
    any: number = 0;
    plataforma: string = '';
    desenvolupadora: string = '';
    unitats: number = 0;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
