export class Videogame {
    
    UID: string = '';
    nom: string = '';
    any: number = 0;
    anyCreacio: number = 0;
    plataforma: string = '';
    desenvolupadora: string = '';
    unitats: number = 0;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
