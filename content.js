document.getElementById("run").addEventListener("click", async () => {

    let valorInput = document.getElementById("startIndex").value;

    let indiceInicial = valorInput === "" ? 0 : parseInt(valorInput);

    let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        args: [indiceInicial],
        func: (indiceInicial) => {

            // Referencia cada resposta em alguma públicação (alterar o primeiro elemento para 0 ou 1)
            element = document.querySelectorAll("[aria-label='Corpo da coluna']")[0].children[0].children[3].children[0].children

            i = indiceInicial;

            numberBox()

            function numberBox(){
                if(i < element.length){
                    start()
                    console.log("0.0")
                }else{
                    console.log("0.1")
                    setTimeout(() => {
                        element[element.length-2].scrollIntoView()
                        numberBox();
                    }, 3000);
                }
            }

            function start(){

                highlight();

                element2 = element[i].children[0].children[0].children[1] || element[i];
            
                // Button contador de curtidas
                likeButton = element2.querySelectorAll("[role='button']")[1]

                // Button contador de repost 
                repostButton = element2.querySelectorAll("[role='button']")[3]

                // Button contador de compartilhamentos
                shareButton = element2.querySelectorAll("[role='button']")[4]

                if(likeButton.innerText == "" && repostButton.innerText == "" && shareButton.innerText == ""){
                    console.log("id: "+i+" Like: "+likeButton.innerText+" Repost: "+repostButton.innerText+" Share: "+shareButton.innerText)

                    deleteCommit(element2);
                }else{
                    console.log("*id: "+i+" Like: "+likeButton.innerText+" Repost: "+repostButton.innerText+" Share: "+shareButton.innerText)
                    if(i < element.length-3){
                        console.log("1.0")
                        setTimeout(() => {
                            i++
                            start()
                        }, 500);
                    }else{
                        console.log("1.1")
                        setTimeout(() => {
                            i++
                            start()
                        }, 3000);
                    }   
                }
            }

            function deleteCommit(element2){
                setTimeout(() => {
                    console.log("2.0")
                    // Botão três pontinhos
                    configButton = element2.querySelectorAll("[aria-label='Mais']")[0].parentElement;

                    configButton.click()
                    setTimeout(() => {
                        console.log("2.1")
                        // Botão de Excluir 
                        const menu = document.querySelector("[role='menu']");

                        if (!menu) {
                            console.log("menu não encontrado");

                            setTimeout(() => {
                                i++;
                                start();
                            }, 3000);

                            return;
                        }

                        const excludeOption =
                        [...menu.querySelectorAll("span")]
                        .find(el => el.innerText.includes("Excluir"));
                        
                        if(excludeOption){
                            console.log("3.0")
                            excludeOption.click()
                        }else{
                            console.log("3.1")
                            setTimeout(() => {
                                i++
                                start();
                            }, 3000);
                        }
                        setTimeout(() => {
                            // Botão de confirmar a exclusão
                            confirmAlert = document.querySelectorAll("h2")[0].parentNode.parentNode.children[2].children[0]
                            
                            // Botão de cancelar a exclusão
                            // confirmAlert = document.querySelectorAll("h2")[0].parentNode.parentNode.children[2].children[1]

                            confirmAlert.click()


                            setTimeout(() => {
                                i++
                                start();
                            }, 3000);
                        }, 3000);
                    }, 3000);
                }, 3000);
            }

            function highlight(){

                // remove highlight anterior
                document.querySelectorAll(".__highlight_debug__").forEach(el=>{
                    el.style.outline = ""
                    el.style.background = ""
                    el.classList.remove("__highlight_debug__")
                })

                // insere highlight atual
                element[i].classList.add("__highlight_debug__")
                element[i].style.outline = "2px solid #1a73e8"
                element[i].style.background = "rgba(26,115,232,0.15)"

                element[i].scrollIntoView({behavior:"smooth", block:"center"})
            }

        }
    });

});