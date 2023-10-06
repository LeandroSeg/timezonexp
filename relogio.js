
function Start(areasRelogios) {
  for( let element of areasRelogios) {         
    
    let timeZone=element.getAttribute('timeZone')
    let pais=element.getAttribute('pais')
    
    let iconsol  =element.querySelector(".iconsol")
    console.log(iconsol)
    let iconlua  =element.querySelector(".iconlua")
    
    let bandeirapais=element.querySelector(".nomepais")
    bandeirapais.innerHTML=pais
    
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
      
      let hour    =horatempo.substring(12,14)
      let minute  =horatempo.substring(15,17)
      let second  =horatempo.substring(18,20)
      let day     =horatempo.substring(0,2)
      let month   =horatempo.substring(3,5)
      let year    =horatempo.substring(6,10)

      
      if ((hour>=0 && hour<=7) || (hour>=18 && hour<=23))
      {        
        iconsol.style.display="none";
        iconlua.style.display="block";
        
        
      }
      else
      {        
        iconsol.style.display="block";
        iconlua.style.display="none";
      }

      let horaTempoTimeZone = new Date(
        parseInt(year), parseInt(month)-1, parseInt(day), parseInt(hour), parseInt(minute),parseInt(second));

      let horaDif =  Math.round( (horaTempoTimeZone  - horatempoAtual)/1000/60/60 )

      spanHora.innerHTML    = hour
      spanMinuto.innerHTML  = minute
      spanSegundo.innerHTML = second

      if (horaDif==0)
      {
        spanHoraDif.innerHTML = ""
      }
      else  
      {
        spanHoraDif.innerHTML = (horaDif>0 ? "+":"")+horaDif
      }

    }  
    ,1000)
  }
  
}



function fmtZerosEsquerdaText(num, totalLength) {
  return String(num).padStart(totalLength, '0');
}