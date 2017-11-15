
let grupos;

function setarGrupoGetJson(groupName){
    let list = document.querySelector(".amigos-grupos");
    let div = document.createElement("div");
    list.appendChild(div);
    let img = document.createElement("img");
    let span = document.createElement("span");
    div.appendChild(img);
    div.appendChild(span);
    div.classList.add("avatar");
    img.src = "img/contato.png";
    img.classList.add("foto-perfil");
    span.innerHTML = groupName;
}

function getGruposJson(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState== 4){
            grupos = JSON.parse(xhttp.responseText);
           for(let i=0; i < grupos.length; i++){
               setarGrupoGetJson(grupos[i].groupName);
           }
        chat();            
        }
    };
    xhttp.open('GET', 'http://rest.learncode.academy/api/julio/groups', true);
    xhttp.send();
}


function getJsonMensagens(groupID){
    let xhttp = new XMLHttpRequest();
    let mensagensRecebidas;
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState== 4){
           mensagensRecebidas = JSON.parse(xhttp.responseText);
           setarMensagens(mensagensRecebidas);
        }
    };
    xhttp.open('GET', 'http://rest.learncode.academy/api/julio/' + groupID, true);
    xhttp.send();
}

let conversas = document.querySelector(".messages"); 
let idGrupoClicado;


function chat(){
    
    let avatares = document.querySelectorAll(".avatar"); 
    let span = document.querySelector("#nome");

    
    for(let i = 0; i < avatares.length; i++){
        avatares[i].addEventListener('click',function(){
            while (conversas.firstChild) {
                conversas.removeChild(conversas.firstChild);
            }
            span.innerHTML = grupos[i].groupName;
            idGrupoClicado =  grupos[i].groupID;            
            getJsonMensagens(grupos[i].groupID);
        });
    }
}

function setarMensagens(mensagensConteudoUsuario){
    for(let i =0; i < mensagensConteudoUsuario.length; i++){
        let div = document.createElement("div");
        let span = document.createElement("span");
        let h5 = document.createElement("h5");
        let msg_text = document.createTextNode(mensagensConteudoUsuario[i].message);
        conversas.appendChild(div);    
        div.appendChild(span);
        h5.innerHTML = mensagensConteudoUsuario[i].userName;
        span.appendChild(h5);
        span.appendChild(msg_text);
        
        div.classList.add("mensagem-recebida");
    }
}
getGruposJson();


let buttonModal = document.querySelector(".btn-modal");
let botaoLogar = document.querySelector("#botao-logar");


verificarDados();

let buttonSubmit = document.querySelector("botao-submit-login");
let userIdInput = document.querySelector('input[name="userId"]');

function verificarDados(){
    if(typeof(Storage) !== "undefined"){
        if(localStorage.getItem("userid") != null){
            document.getElementById("botao-msg-enviar").disabled = false;                               
            botaoLogar.textContent = "logout";
            botaoLogar.addEventListener('click',function(){
               if(botaoLogar.textContent == "logout"){
                   alert("Deslogado! Botao de Enviar Msg Desativado!")
                   botaoLogar.textContent = "login";
                   document.getElementById("botao-msg-enviar").disabled = true;                   
                   localStorage.removeItem("userid");                   
               }
            });
        }
        else{
            botaoLogar.textContent = "login";
        }
    }
}


function loginlogout() {
    let userId = userIdInput.value;

    if(userId.length >= 3){
        if(typeof(Storage) !== "undefined"){
            localStorage.setItem("userid", userId);
            botaoLogar.textContent = "logout";
            
        }

        else{
            alert("Sorry! No Web Storage support");
        }
    }
}

let loginUser = localStorage.getItem("userid");
let campoMensagem = document.querySelector('input[name="campoMensagem"]');

function enviarMensagem(){
    

    let campoMensagemTexto = campoMensagem.value;
    let body = {userName:loginUser,message: campoMensagemTexto};
    //alert(campoMensagemTexto);
   

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState== 4){
            while (conversas.firstChild) {
                conversas.removeChild(conversas.firstChild);
            }

            getJsonMensagens(idGrupoClicado);
        }
    };
    
    xhttp.open('POST', 'http://rest.learncode.academy/api/julio/'+idGrupoClicado, true);
    xhttp.setRequestHeader('content-type','application/json');
    xhttp.send(JSON.stringify(body));
    campoMensagem.value = "";
}




let groupName = document.querySelector('input[name="groupName"]');
let groupID = document.querySelector('input[name="groupID"]');

function criarGrupo(){
    let groupNameTexto = groupName.value;
    let groupIDTexto = groupID.value;
    let body = {groupName: groupNameTexto,groupID:groupIDTexto};

    let xhttp = new XMLHttpRequest();
   
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState== 4){
            
            document.querySelector(".amigos-grupos").innerHTML = "";
            
            getGruposJson();

        }
    };
    xhttp.open('POST', 'http://rest.learncode.academy/api/julio/groups', true);
    
    xhttp.setRequestHeader('content-type','application/json');
    xhttp.send(JSON.stringify(body));
    alert(JSON.stringify(body));
}













