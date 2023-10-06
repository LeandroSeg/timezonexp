function Iniciar(areasRelogios) {
  for( let element of areasRelogios) {         
    
    let timeZone=element.getAttribute('timeZone')
    let pais=element.getAttribute('pais')    
    let iconsol  =element.querySelector(".iconsol")    
    let iconlua  =element.querySelector(".iconlua")    
    let bandeirapais=element.querySelector(".nomepais")

    let spanHora = element.querySelector(".hora")
    let spanMinuto = element.querySelector(".minuto")
    let spanSegundo= element.querySelector(".segundo")
    let spanHoraDif= element.querySelector(".gmtHorasDif")

    setInterval( ()=> {

      let horatempoAtual = new Date()
      let horatempo = horatempoAtual.toLocaleTimeString("pt-BR", 
        { timeZone: timeZone,
          hour: 'numeric', 
          minute: 'numeric', 
          second: 'numeric',
          day: 'numeric',
          month: 'numeric',
          year: 'numeric'

        } )
      
      let { exHora, exAno, exMes, exDia, exMinuto, exSegundo } = extrairComponentesDeData(horatempo)      
      atualizarIndicadoresVisuaisDiaNoite(exHora, iconsol, iconlua)

      let horaTempoTimeZone = new Date(
        parseInt(exAno), parseInt(exMes)-1, parseInt(exDia), parseInt(exHora), parseInt(exMinuto),parseInt(exSegundo));      

      atualizarCamposHMS(spanHora, exHora, spanMinuto, exMinuto, spanSegundo, exSegundo)

      atualizarIndicadorHoras(
        calcularDiferencaFusoHorario(horaTempoTimeZone, horatempoAtual)
        , spanHoraDif)

    }  
    ,1000)
  }
  
}

function atualizarCamposHMS(spanHora, exHora, spanMinuto, exMinuto, spanSegundo, exSegundo) {
  spanHora.innerHTML = exHora
  spanMinuto.innerHTML = exMinuto
  spanSegundo.innerHTML = exSegundo
}

function calcularDiferencaFusoHorario(horaTempoTimeZone, horatempoAtual) {
  return Math.round((horaTempoTimeZone - horatempoAtual) / 1000 / 60 / 60)
}

function extrairComponentesDeData(horatempo) {
  let exHora = horatempo.substring(12, 14)
  let exMinuto = horatempo.substring(15, 17)
  let exSegundo = horatempo.substring(18, 20)
  let exDia = horatempo.substring(0, 2)
  let exMes = horatempo.substring(3, 5)
  let exAno = horatempo.substring(6, 10)
  return { exHora, exAno, exMes, exDia, exMinuto, exSegundo }
}

function atualizarIndicadorHoras(horaDif, spanHoraDif) {
  if (horaDif == 0) {
    spanHoraDif.innerHTML = ""
  }

  else {
    spanHoraDif.innerHTML = (horaDif > 0 ? "+" : "") + horaDif
  }
}

function atualizarIndicadoresVisuaisDiaNoite(exHora, iconsol, iconlua) {
  if ((exHora >= 0 && exHora <= 7) || (exHora >= 18 && exHora <= 23)) {
    iconsol.style.display = "none"
    iconlua.style.display = "block"

  }

  else {
    iconsol.style.display = "block"
    iconlua.style.display = "none"
  }
}
