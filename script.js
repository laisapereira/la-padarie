// sobre o modal // 


// preciso abrir modal
// e depois adicionar a class "mostrar"

function iniciaModal(modalID) {
    const modal = document.getElementById(modalID);
    modal.classList.add('mostrar');
    modal.addEventListener('click', (e) => {
        if (e.target.id == modalID || e.target.id == 'btn-cancelar' || e.target.id == 'enviar') {
            modal.classList.remove('mostrar');
        } 
        
    }) 
    
    document.getElementById("nome").value =""
    document.getElementById("quantidade").value =""
}

const adicionar = document.querySelector('.adicionar');
adicionar.addEventListener('click', () => iniciaModal('modal-addpessoa'));





//sobre os cards//

// Preciso pegar o nome do cliente e colocar no card
// Preciso pegar o total de pães do cliente e colocar no card
// Valor que cada cliente vai pagar sendo que cada pão custa 0,50
// E nos cards: 1 card: somar o total de pessoas na fila
//              2 card: somar o total de pães da fila
//              3 card: somar o valor total a pagar da fila
// e, quando clicar na lixeirinha tudo isso se alterar


let cardzinhos = [
    {
        id: 0,
        nome: "Mariana",
        paes: 20,
    },

    {
        id: 1,
        nome: "Heitor dos Santos",
        paes: 40,
    },

    {
        id: 2,
        nome: "João Lacerda",
        paes: 200,

    },

]

//substituir os dados do html com os dados do JS

document.getElementById('enviar').addEventListener('click', () => {
    let nomepessoa = document.getElementById('nome')
    let quantidadepaes = document.getElementById('quantidade')

    if ( nomepessoa.value != "" && quantidadepaes.value != "") {
        cardzinhos.push({
            nome: nomepessoa.value,
            paes: quantidadepaes.value,
            id: cardzinhos.length  // pra posição da pessoa na fila mudar
                                    // junto com o *tamanho* da fila
        }
        )
    } else {
        iniciaModal()


    }
    renderfila ()


})



function renderfila() {
    let filatotal = 0, paestotal = 0

    let section = document.getElementById('caixinhas')
    section.innerHTML = ''  

    cardzinhos.forEach((value) => { // receber cada elemento de "cardzinhos(fila)" dentro de value pra fazer uma ação com ele
        filatotal = filatotal + 1   // sempre que uma pessoa for adicionada, o valor total de pães tbm se altera
        paestotal = paestotal + Number(value.paes)
        value.id = cardzinhos.indexOf(value) // procurar o id do elemento 
        
       

        section.innerHTML += ` 
            <div class="cardzinhos">
                <div class="infos">
                    <h2>${value.nome} </h2>
                    <div class="atributos">
                        <p><strong>Total de pães:</strong> ${value.paes}</p>
                        <p class="doisp"><strong>Total a pagar:</strong> ${(value.paes /2).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                    </div>
                    
                </div>
                <img onclick ="excluir(${value.id})" class="excluir" src="imagens/lixinho.png" alt="lixo">
            </div
            `

        

    })

            document.querySelector('#qntpessoas').innerHTML = filatotal
            document.querySelector('#qntpaes').innerHTML = paestotal
            document.querySelector('#dinheiro').innerHTML = (paestotal/2).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})       // não precisei criar outra variável

}
renderfila() //precisa chamar para que aconteça

function excluir(id) {
    cardzinhos.splice (id, 1)                               //  2 parâmetros: id (index) e o 1 pra poder excluir o próximo element
    renderfila()                                            // chamar função para atualizar a fila dnv
                                        
}

