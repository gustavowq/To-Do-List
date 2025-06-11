document.addEventListener("DOMContentLoaded", function() {

    let input = document.querySelector('#inputx');
    let botao = document.querySelector('#Adicionar');
    let lista = document.querySelector('#lista-de-tarefas');
    let tarefas = [];

    let select = document.querySelector('#filtro');
    let tarefasFiltradas = [];

    let dados = localStorage.getItem('tarefas');


    if (dados){
        tarefas = JSON.parse(dados);
        renderizarTarefas();
    }
    
    botao.addEventListener('click' , function(){

        let tarefa = input.value.trim()
        
        if(tarefa !== ""){
           
            adicionarTarefa(tarefa);
            input.value = "";

        }
        else{

            alert('Nenhuma tarefa foi adicionada');

        }

    });



    lista.addEventListener('click' , function(event) {
        let button = event.target.closest('button');
        if (button) {
            let item = button.parentElement;
            if(button.classList.contains('btn-deletar')){
                removerTarefa(item);
            }
            else if (button.classList.contains('btn-concluido')) {
                marcarConcluido(item);
            }    
        }
            
    });

    


    function adicionarTarefa(texto){
        tarefas.push({
            id: Date.now(),
            texto: texto,
            concluido: false
        });

        salvar();
        renderizarTarefas();
            
    };


    function renderizarTarefas(array =  tarefas){

        lista.innerHTML = '';
        array.forEach((tarefas) => {

            let item = document.createElement('li');
            item.dataset.id = tarefas.id
            item.textContent = tarefas.texto;

            if(tarefas.concluido){
                 item.classList.add('conclusaox');
            }

            let deletar = document.createElement('button');
            deletar.textContent = 'Deletar';
           

            let concluido = document.createElement('button');
            concluido.textContent = 'Concluido';



            deletar.classList.add('btn-deletar');
            concluido.classList.add('btn-concluido');
            deletar.innerHTML = '<i class="fa-solid fa-trash"></i>'
            concluido.innerHTML = '<i class="fa-solid fa-check"></i>'
        
        
            item.appendChild(deletar);
            item.appendChild(concluido);
            lista.appendChild(item);

           


        });
    }

    function removerTarefa(item){
        
        let id = Number(item.dataset.id)

        tarefas = tarefas.filter(function(tarefas){
            return tarefas.id !==  id 
                 
        });
       // const itens = lista.querySelectorAll('li')

      //  itens.forEach(i =>{if (i == item) lista.removeChild(i)})
        
       // renderizarTarefas();
        salvar()
        renderizarTarefas(tarefas);
    };

    function marcarConcluido(item){
        const id = Number(item.dataset.id)
        tarefas = tarefas.map( function (tarefa){

           if (tarefa.id === id){

                return{
                    id : tarefa.id,
                    texto: tarefa.texto,
                    concluido:  !tarefa.concluido
                };
           }
           else{
            return tarefa;
           }
        });

        salvar()
        renderizarTarefas(tarefas);
        
        
    }

    select.addEventListener('change', function(){
       if(select.value === 'pendentes'){
            tarefasFiltradas  = tarefas.filter(function(tarefa){
                return !tarefa.concluido
            });
            renderizarTarefas(tarefasFiltradas);
            
       }

       else if (select.value === 'concluido'){
            tarefasFiltradas = tarefas.filter(function (tarefa){
                return tarefa.concluido

            });
            renderizarTarefas(tarefasFiltradas);
            
        }
        else if(select.value  === 'todas'){
             renderizarTarefas(tarefas);
             
        }     
         
    });
    
    renderizarTarefas(tarefas);
   

    function salvar(){
      localStorage.setItem('tarefas' , JSON.stringify(tarefas));
    }

});