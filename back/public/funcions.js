//--------------------------------------VARIABLES GLOBALS
const NPREG=5
const TEMPSLIMIT=5
let pregActual=0
let temps=0;
let idTimer;
//Creo una variable global per a guardar les preguntes rebudes
let arrayPreguntas=[];

let estatDeLaPartida = { 
  contadorPreguntes: 0, 
  respostesUsuari: [] // Aquí anirem guardant les respostes 
}; 

estatDeLaPartida.respostesUsuari= new Array(NPREG).fill(null);


//--------------------------------FUNCIONS
  function iniciarPartida(preguntes) {
    let htmlStr=""
                      
    for (i=0;i<NPREG; i++){

                 
    htmlStr += `<div class="pregunta" data-id-preg="${i}"><p class="text-center"><img width="200px" src="${preguntes[i].imatge}">
                      <p>${preguntes[i].pregunta}</p></p>
                      <div class="row">
                        <div class="col-md-3"> <button data-id-preg="${i}" data-id-resp="0"  class="btnRespuesta btn btn-primary">${preguntes[i].respostes[0].resposta}</button></div>
                        <div class="col-md-3"> <button data-id-preg="${i}" data-id-resp="1"  class="btnRespuesta btn btn-primary">${preguntes[i].respostes[1].resposta}</button></div>
                        <div class="col-md-3"> <button data-id-preg="${i}" data-id-resp="2"  class="btnRespuesta btn btn-primary">${preguntes[i].respostes[2].resposta}</button></div>
                        <div class="col-md-3"> <button data-id-preg="${i}" data-id-resp="3"  class="btnRespuesta btn btn-primary">${preguntes[i].respostes[3].resposta}</button></div>
                      </div>
                    </div>
                  `
    
                }
   
    htmlStr+=`<button id="btnEnviar" onclick="enviarRespostes()" class="hidden btn btn-danger">Enviar respostes</button>`
  
    document.getElementById("partida").innerHTML=htmlStr;

    document.getElementById("partida").addEventListener("click", function(e){
      console.log(e.target)
      if (e.target.classList.contains("btnRespuesta")){
        marcar(e.target.dataset.idPreg, e.target.dataset.idResp)
      }
    })

    //INICIALITZACIO DE LA PART DE CAMBIAR PREGUNTES
    //POSAR TOTES OCULTES
            let divPreguntes=document.getElementsByClassName("pregunta")
            //console.log(divPreguntes)
            for( i=0; i<divPreguntes.length; i++){
             // console.log(divPreguntes[i])
              divPreguntes[i].classList.add("d-none")
            }
    //Mostro la primera
    //console.log(document.querySelector(`.pregunta[data-id-preg="${pregActual}"]`))
    document.querySelector(`.pregunta[data-id-preg="0"]`).classList.remove("d-none")
        
    //REACCIONAR AL BOTO ANTERIOR
      document.getElementById("btnAnterior").addEventListener("click",function(){
      //eliminem l'actual
        document.querySelector(`.pregunta[data-id-preg="${pregActual}"]`).classList.add("d-none")
      //reduim un l'actual
        pregActual--
      //mostrem 
          document.querySelector(`.pregunta[data-id-preg="${pregActual}"]`).classList.remove("d-none")
    
      })
    //REACCIONAR AL BOTO POSTERIOR
    document.getElementById("btnSeguent").addEventListener("click",function(){
         //eliminem l'actual
        document.querySelector(`.pregunta[data-id-preg="${pregActual}"]`).classList.add("d-none")
      //reduim un l'actual
        pregActual++
      //mostrem 
          document.querySelector(`.pregunta[data-id-preg="${pregActual}"]`).classList.remove("d-none")
    
      })
  }

function marcar(preg, resp){
    console.log("En la pregunta "+preg +" has marcado "+resp)
    //TODO: refactoritzar el codi següent_
    //Borro el que tenia marcat abans com a actiu i ho deixo com a normal (Es una guarrada tal com està) 
    
    document.querySelector(`[data-id-preg="${preg}"][data-id-resp="0"]`).classList.remove("btn-warning")
    document.querySelector(`[data-id-preg="${preg}"][data-id-resp="0"]`).classList.add("btn-primary")
    document.querySelector(`[data-id-preg="${preg}"][data-id-resp="1"]`).classList.remove("btn-warning")
    document.querySelector(`[data-id-preg="${preg}"][data-id-resp="1"]`).classList.add("btn-primary")    
    document.querySelector(`[data-id-preg="${preg}"][data-id-resp="2"]`).classList.remove("btn-warning")
    document.querySelector(`[data-id-preg="${preg}"][data-id-resp="2"]`).classList.add("btn-primary")    
    document.querySelector(`[data-id-preg="${preg}"][data-id-resp="3"]`).classList.remove("btn-warning")    
    document.querySelector(`[data-id-preg="${preg}"][data-id-resp="3"]`).classList.add("btn-primary")
    //Poso com a actual la pregunta marcada
    document.querySelector(`[data-id-preg="${preg}"][data-id-resp="${resp}"]`).classList.remove("btn-primary")    
    document.querySelector(`[data-id-preg="${preg}"][data-id-resp="${resp}"]`).classList.add("btn-warning")
    
    
    //Miro si la pregunta ja ha estat contestada abans, si es aixi, no incremento
    if (estatDeLaPartida.respostesUsuari[preg]==null){
        estatDeLaPartida.contadorPreguntes++;
    }

    //en qualsevol cas, guardo la nova resposta al array de respostes. 
    estatDeLaPartida.respostesUsuari[preg]={
            id: arrayPreguntas[preg].id, //com puc tenir l'id de la pregunta?
            resp: resp
        }

    if (estatDeLaPartida.contadorPreguntes==NPREG){
        document.getElementById("btnEnviar").classList.remove("hidden");
    }
    //Actualitzem el marcador
    renderMarcador();
}

  function renderMarcador(){
   pctActual=(estatDeLaPartida.contadorPreguntes/NPREG)*100
   document.getElementById("marcador").innerHTML=`
   <div class="progress">
        <div class="progress-bar" role="progressbar" 
            style="width: ${pctActual}%" 
              aria-valuenow="${pctActual}" 
              aria-valuemin="1" 
              aria-valuemax="${NPREG}">
        </div>
    </div>
   `
  }

  function enviarRespostes(){

      fetch("http://localhost:3000/respostes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(estatDeLaPartida)
    })
      .then(response => response.json())
      .then(resultat => {
        Swal.fire({
          title: "Partida terminada!",
          text: `Correctes: ${resultat.correctes} Incorrectes: ${resultat.incorrectes}`,
          icon: "success"
        });
      //  alert(`Correctes: ${resultat.correctes} Incorrectes: ${resultat.incorrectes}`)
        console.log("Correctes:", resultat.correctes);
        console.log("Incorrectes:", resultat.incorrectes);
      })
      .catch(error => {
        console.error("Error:", error);
      });
      
  }

//------------------------------MAIN------------------------

  // Add Event Listener to window
window.addEventListener("load", function () {


    idTimer=setInterval(function() {
      temps=temps+1;
      document.getElementById("cronometre").innerHTML=temps;
      if (temps==TEMPSLIMIT){
        alert("s'ha acabat el temps");
        //cancelare el timer      
        clearInterval(idTimer);  
      }
      
    }, 1000);



  //Miro LS a veure si hi ha alguna cosa
  let nomLS = localStorage.getItem("nom");
           
    // si hi ha informacion al localstorage, posa el missathe de benvinguda i oculta la capsa de text
    if (nomLS!=null){
     
      document.getElementById("divBenvinguda").innerHTML="Hola "+ nomLS + " benvingut"
      document.getElementById("inputNom").style.display="none"
      document.getElementById("btnGuardar").style.display="none"
    }
    // Si no hi ha informacio al local storage, oculta el boto de "esborrar"
    if (nomLS==null){
    
      document.getElementById("btnEsborrar").style.display="none"
    }
    //posem un listener al boto guardar per guardar la informacio al localstorage i mostrar el missatge
    document.getElementById("btnGuardar").addEventListener("click", function(){
          let contingutCapsaText = document.getElementById("inputNom").value
          //alert("has posat"  + contingutCapsaText)
          localStorage.setItem("nom",contingutCapsaText)
          document.getElementById("divBenvinguda").innerHTML="Hola "+ contingutCapsaText + " benvingut"
          document.getElementById("inputNom").style.display="none"
          document.getElementById("btnGuardar").style.display="none"
          document.getElementById("btnEsborrar").style.display="block"
    })
    

    //posem un listener al boto esborrar per borra la infor al local storage, mostrar la capsa de text...
   document.getElementById("btnEsborrar").addEventListener("click", function(){          
          localStorage.removeItem("nom")
          document.getElementById("divBenvinguda").innerHTML=""
          document.getElementById("inputNom").style.display="block"
          document.getElementById("btnGuardar").style.display="block"
          document.getElementById("btnEsborrar").style.display="none"
    })




      fetch('http://localhost:3333/dades') // 1. Demanem el fitxer al servidor
        .then(dades => dades.json()) // 2. Quan arriba, el convertim a format JSON
        .then(data => { // 3. Un cop convertit, ja el podem fer servir!
          console.log("Dades carregades!", data);
          // Guardo les dades rebudes
          arrayPreguntas=data.preguntes;
          //crido a la funció per pintar la partida
          iniciarPartida(data.preguntes);
        });


});