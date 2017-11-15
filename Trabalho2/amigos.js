let jsonContatos = [
    {
        usuario: "joao03",
            mensagens: [
                {
                    usuario: "joao03",texto: "Tudo bem?"
                },
                {
                    usuario: "victor23", texto: "Tudo Tranqs"
                },
                {
                    usuario: "joao03", texto: "Que bom"
                }
            ]
    },
    {
        usuario: "maria2000",
            mensagens: [
                {
                    usuario: "maria2000", texto: "Na paz?"
                },
                {
                    usuario: "victor23", texto: "Show"
                },
                {
                    usuario: "maria2000", texto: "Que bom"
                }
            ]
    },
    {
        usuario: "robson_alves",
            mensagens: [
                {
                    usuario: "victor03", texto: "Bom?"
                },
                {
                    usuario: "robson_alves",texto: "Bom"
                },
                {
                    usuario: "victor03", texto: "Que bom"
                }
            ]
    }
];

function chat(){
    let nome = document.querySelector("#nome");
    let itens = document.querySelectorAll(".avatar"); 
    let msg = document.querySelector(".messages");

    for(let i = 0; i < itens.length; i++){
        itens[i].addEventListener('click',function(){
            while (msg.firstChild) {
                msg.removeChild(msg.firstChild);
            }
            nome.innerHTML = jsonContatos[i].usuario;
            for(let j = 0; j < jsonContatos[i].mensagens.length; j++){
                let divChat = document.createElement("div");
                let span = document.createElement("span");
                msg.appendChild(divChat);    
                divChat.appendChild(span);
                span.innerHTML = jsonContatos[i].mensagens[j].texto;
                
                if(jsonContatos[i].usuario != jsonContatos[i].mensagens[j].usuario){
                    divChat.classList.add("mensagem-enviada");
                }else{
                    divChat.classList.add("mensagem-recebida");
                }
            }
        });
    }
}

let conteudoConversa = document.querySelector(".amigos-grupos");

function amigos(){
    
    for(let i = 0; i < jsonContatos.length; i++){
        let div = document.createElement("div");
        conteudoConversa.appendChild(divChat);
        let span = document.createElement("span");
        let img = document.createElement("img");
        div.appendChild(img);
        div.appendChild(span);
        div.classList.add("avatar");
        img.classList.add("foto-perfil");
        img.src = "img/contato.png";
        span.innerHTML = jsonContatos[i].usuario;
    }   
}


amigos();
chat();

