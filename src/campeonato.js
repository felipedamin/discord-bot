class Campeonato {
  constructor() {
    this.participantes = []
  }

  addParticipante = (nome) => {
    this.participantes.push(nome);
  }
  
  sorteiaChaves = () => {
    this.participantes.sort((a,b) => {  
      return 0.5 - Math.random();
    })
    return this.participantes;
  }
}

module.exports = Campeonato;
