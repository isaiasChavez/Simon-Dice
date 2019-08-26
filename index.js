
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const centrador = document.getElementById("centrador") 
const marron = 1000

const ULTIMO_NIVEL = 10

class Juego {
  constructor() {
    this.inicializar= this.inicializar.bind(this)
    this.inicializar()
    this.generarSecuencia()
    //
    setTimeout(this.siguienteNivel, 500);
    
  }

  inicializar() {
    this.elegirColor = this.elegirColor.bind(this)
    this.siguienteNivel = this.siguienteNivel.bind(this)
    this.toggleBtnEmpezar()
    this.nivel = 1
    this.colores = {
        celeste,
        violeta,
        naranja,
        verde,
        marron
    }

  }
  toggleBtnEmpezar(){
   if(btnEmpezar.classList.contains('removeButton')){
    centrador.classList.remove('hide')
    btnEmpezar.classList.remove('hide')
       btnEmpezar.classList.remove('removeButton')
       centrador.classList.remove('removeButton')
      
      }else{
        centrador.classList.add('hide')
        btnEmpezar.classList.add('hide')

          setTimeout(() => {
            centrador.classList.add('removeButton')
            btnEmpezar.classList.add('removeButton')
          }, 1000);
   }
  }
  generarSecuencia(){
      this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map( n => Math.floor((Math.random()*4)))
  }
  //
  siguienteNivel(){
      this.subnivel = 0
      this.iluminarSecuencia()
      this.agregarEventosClick()
  }
  transformarNumeroAColor(num){
      switch (num) {
          case 0:
              return 'celeste'
          case 1:
              return 'violeta'
          case 2:
              return 'naranja'
          case 3:
              return 'verde'
          default:
              break;
      }
  }
  transformarColorANumero(color){
      switch (color) {
          case 'celeste':
              return 0
          case 'violeta':
              return 1
          case 'naranja':
              return 2
          case 'verde':
              return 3
          default:
              break;
      }
  }

  iluminarSecuencia( time = 1000){
      for(let i = 0; i< this.nivel; i++){
          let color = this.transformarNumeroAColor(this.secuencia[i])
          setTimeout(() => {
              this.iluminarColor(color)
          }, time * i)   
      }
  }
   iluminarColor(color){
      this.colores[color].classList.add('light')
      setTimeout(() => {
          this.apagarColor(color)
      }, 350);
  }
  apagarColor(color){
      this.colores[color].classList.remove('light')
  }
  agregarEventosClick()
  {
      
      this.colores.celeste.addEventListener('click',this.elegirColor)
      this.colores.verde.addEventListener('click',this.elegirColor)
      this.colores.violeta.addEventListener('click',this.elegirColor)
      this.colores.naranja.addEventListener('click',this.elegirColor)
  }
  eliminarEventosClick(){
      this.colores.celeste.removeEventListener('click',this.elegirColor)
      this.colores.verde.removeEventListener('click',this.elegirColor)
      this.colores.violeta.removeEventListener('click',this.elegirColor)
      this.colores.naranja.removeEventListener('click',this.elegirColor)
  }
   elegirColor(ev){
      const nombreColor = ev.target.dataset.color
      const numeroColor = this.transformarColorANumero(nombreColor)

      this.iluminarColor(nombreColor)  
      
      if(numeroColor === this.secuencia[this.subnivel]){
          this.subnivel++
          if(this.subnivel === this.nivel){
                  setTimeout(() => {
                        const responseModal =  swal('¡Correcto!',"La secuencia es la indicada",'success')
                        responseModal
                        .then(() =>{
                            this.nivel ++
                            this.eliminarEventosClick()
                            
                            if(this.nivel === (ULTIMO_NIVEL + 1)){
                                this.ganarJuego()
                            }else{
                                setTimeout(this.siguienteNivel, 1000)
                                
                            }
                        })     
                  }, 500);
                            
                 
          }
      }else{
          this.perderJuego()
          console.log("No es el botón correcto")
      }
  }
  ganarJuego(){
      swal('¡Felicidades!',"Ganaste",'success')
      .then(this.inicializar)
  }
  perderJuego(){
      swal('¡Lo lamento!',"perdiste",'error')
      .then(() => {
          this.eliminarEventosClick()
          this.inicializar()
      })
  }
}

function empezarJuego() {
  window.juego = new Juego()
}
