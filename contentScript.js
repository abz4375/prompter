(async () => {

  // const fetchTabId = () => {
  //   return new Promise((resolve)=>{
  //     chrome.storage.sync.get(["prompter.abz4375.tabIdGlobalCS"], (obj) => {
  //       resolve(obj["prompter.abz4375"] ? JSON.parse(obj["prompter.abz4375"]): []);
  //     });
  //   });
  // };

  
  let tabIdGlobalCS ;
  let savedPrompts = [];
  
  const tabidKey = "tabIdGlobalCS";
  chrome.storage.sync.get(tabidKey, function(result) {
    
    // console.log("key is " + result.tabIdGlobalCS);
    tabIdGlobalCS = result.tabIdGlobalCS;
  });
  
  
  const fetchSavedPrompts = () => {
    return new Promise((resolve)=>{
      chrome.storage.sync.get(["prompter.abz4375"], (obj) => {
        resolve(obj["prompter.abz4375"] ? JSON.parse(obj["prompter.abz4375"]): []);
      });
    });
  };
  
  const saveThePrompt = async (newPrompt) => {
    savedPrompts = await fetchSavedPrompts();
    
    chrome.storage.sync.set({
      ["prompter.abz4375"]: JSON.stringify([...savedPrompts,newPrompt])
    });

  };
  
  
  
  const initializePrompter = async () => {

    const start = document.createElement("div");
    start.id = "prompter.abz4375.started";
    document.body.appendChild(start);
    
    savedPrompts = await fetchSavedPrompts();
    // chrome.storage.sync.clear();
    
    // create the dummy UI
    const prompterPanel = document.createElement("div");
    prompterPanel.className = "prompter.abz4375";
    
    // insert the elements
    
    // Title
    const title = document.createElement("h2");
    prompterPanel.appendChild(title);
    title.className = "text-lg font-bold text-descriptionTextColor mb-4 mt-4";
    title.id = "slide-over-title";
    title.innerText = "Your Templates";
    
    // Add Prompt Button
    const addPromptBtn = document.createElement("button");
    title.appendChild(addPromptBtn);
    addPromptBtn.className = "float-right text-primaryLight";
    addPromptBtn.title = "New Prompt"
    addPromptBtn.style = `height: 26px;width: 26px; background-color: rgb(104 124 153 / 49%); border-radius:4px ; transition: all 0.125s ease-out 0s;`;
    addPromptBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg>`;
    addPromptBtn.addEventListener('mouseover', function () {
      this.style.backgroundColor = 'rgb(104 124 153 / 85%)';
    })
    addPromptBtn.addEventListener('mouseleave', function () {
      this.style.backgroundColor = 'rgb(104 124 153 / 49%)';
    })
    
    // Prompr Stack
    const promptStack = document.createElement("div");
    prompterPanel.appendChild(promptStack);
    
    
    const pushPrompt = (prompt) => {
      const {pTitle, pContent} = prompt;
      
      // Prompt window
      const promptWindow = document.createElement("div");
      promptWindow.className = `bg-black rounded-xl p-4 mt-2`;
      // Prompt title 
      const promptTitle = document.createElement("input");
      promptTitle.placeholder = "Enter Title"
      promptTitle.style="border:none;background-color: black; resize:none; outline:none; width: 120px";
      promptTitle.className = `mt-4 text-sm font-semibold text-descriptionTextColor`;
      promptTitle.value = pTitle;
      
      // Prompt Content
      const promptContent = document.createElement("div")
      promptContent.className = `mt-4`;
      const textarea = document.createElement("div");
      textarea.style.height = '100px';
      textarea.style.resize = 'vertical';
      textarea.style.overflowY = 'scroll';
      textarea.className = `focus:text-gray-300 text-gray-500 block w-full rounded-md bg-gray-900 border border-gray-600 px-3 py-2 placeholder-gray-400 shadow-sm outline-primary focus:border-primary focus:outline-none focus:ring-primary ring-primary sm:text-sm`;
      textarea.innerText = pContent;
      let templateContent = pContent;
      textarea.contentEditable = true;
      promptContent.appendChild(textarea);
      
      // Add Copy Button
      const copyBtn = document.createElement("button");
      copyBtn.className = "float-right text-primaryLight";
      copyBtn.title = "Copy";
      copyBtn.style = `height: 26px;width: 26px; background-color: #111827; border-radius:4px ; transition: all 0.125s ease-out 0s; margin-top:13px; padding-left:3px`;
      copyBtn.innerHTML = `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#4db6ac"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7.5 3H14.6C16.8402 3 17.9603 3 18.816 3.43597C19.5686 3.81947 20.1805 4.43139 20.564 5.18404C21 6.03969 21 7.15979 21 9.4V16.5M6.2 21H14.3C15.4201 21 15.9802 21 16.408 20.782C16.7843 20.5903 17.0903 20.2843 17.282 19.908C17.5 19.4802 17.5 18.9201 17.5 17.8V9.7C17.5 8.57989 17.5 8.01984 17.282 7.59202C17.0903 7.21569 16.7843 6.90973 16.408 6.71799C15.9802 6.5 15.4201 6.5 14.3 6.5H6.2C5.0799 6.5 4.51984 6.5 4.09202 6.71799C3.71569 6.90973 3.40973 7.21569 3.21799 7.59202C3 8.01984 3 8.57989 3 9.7V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.0799 21 6.2 21Z" stroke="#4db6ac" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`
      copyBtn.firstElementChild.style.transition = 'all 0.125s ease-out 0s';
      copyBtn.addEventListener('mousedown', function () {
        this.firstElementChild.style.display = 'none';
      })
      copyBtn.addEventListener('mouseup', function () {
        this.firstElementChild.style.display = ``;
      })
      
      copyBtn.onclick = async() => {
        navigator.clipboard.writeText(promptContent.innerText);
        setTimeout(()=>{
          textarea.innerText = templateContent;
        },10000)
      }
      
      // Add Delete Button
      const delBtn = document.createElement("button");
      delBtn.className = "float-right text-primaryLight";
      delBtn.title = "Delete";
      delBtn.style = `height: 26px;width: 26px; background-color: #111827; border-radius:4px ; transition: all 0.125s ease-out 0s; margin-top:13px; margin-right: 4px; margin-left:4px; padding-left:3px`;
      delBtn.innerHTML = `<svg fill="#4db6ac" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#4db6ac"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"></path></g></svg>`
      delBtn.firstElementChild.style.transition = 'all 0.125s ease-out 0s';
      delBtn.addEventListener('mousedown', function () {
        this.firstElementChild.style.display = 'none';
      })
      delBtn.addEventListener('mouseup', function () {
        this.firstElementChild.style.display = ``;
      })
      delBtn.onclick = async() => {
        
        savedPrompts = savedPrompts.filter((b) => b !== prompt);
        chrome.storage.sync.set({
          ["prompter.abz4375"]: JSON.stringify(savedPrompts)
        });
        promptStack.removeChild(promptWindow);
      }
      
      // Add Save Button
      const saveBtn = document.createElement("button");
      saveBtn.className = "float-right text-primaryLight";
      saveBtn.title = "Save"
      saveBtn.style = `height: 26px;width: 26px; background-color: #111827; border-radius:4px ; transition: all 0.125s ease-out 0s; margin-top:13px; padding-left:5px`;
      saveBtn.innerHTML = `<svg fill="#4db6ac" height="16px" width="16px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" stroke="#4db6ac" stroke-width="11.264"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M507.109,71.673L440.327,4.891C437.196,1.76,432.951,0,428.522,0C425.038,0,53.485,0,50.087,0C22.469,0,0,22.469,0,50.087 v411.826C0,489.531,22.469,512,50.087,512c15.731,0,396.124,0,411.826,0C489.531,512,512,489.531,512,461.913V83.478 C512,79.049,510.24,74.804,507.109,71.673z M200.348,33.391h178.087v100.174H200.348V33.391z M133.565,33.391h33.391v100.174 h-33.391V33.391z M378.435,478.609h-244.87v-33.391h244.87V478.609z M378.435,411.826h-244.87v-33.391h244.87V411.826z M378.435,345.043h-244.87v-33.391h244.87V345.043z M478.609,461.913c0,9.206-7.49,16.696-16.696,16.696h-50.087V294.957 c0-9.22-7.475-16.696-16.696-16.696H116.87c-9.22,0-16.696,7.475-16.696,16.696v183.652H50.087 c-9.206,0-16.696-7.49-16.696-16.696V50.087c0-9.206,7.49-16.696,16.696-16.696h50.087v116.87c0,9.22,7.475,16.696,16.696,16.696 H395.13c9.22,0,16.696-7.475,16.696-16.696V33.391h9.78l57.002,57.002V461.913z"></path> </g> </g> </g></svg>`;
      saveBtn.firstElementChild.style.transition = 'all 0.125s ease-out 0s';
      saveBtn.addEventListener('mousedown', function () {
        this.firstElementChild.style.display = 'none';
      })
      saveBtn.addEventListener('mouseup', function () {
        this.firstElementChild.style.display = ``;
      })
      saveBtn.onclick = async() => {
        promptTitle.readOnly = true;
          templateContent = promptContent.innerText;
          saveThePrompt({pTitle:""+promptTitle.value,pContent:""+promptContent.innerText});
          promptWindow.removeChild(saveBtn);
        }
        
        // Add to the stack
        promptWindow.appendChild(promptTitle);
        promptWindow.appendChild(copyBtn);
        promptWindow.appendChild(delBtn);
        promptWindow.appendChild(saveBtn);
        promptWindow.appendChild(promptContent);
        if(pTitle!==undefined && pContent!==undefined)
        promptStack.appendChild(promptWindow);
      
      // if readonly content is added
      if(!(pTitle===``&&pContent===``)) {
        promptTitle.readOnly = true;
        promptWindow.removeChild(saveBtn);
      }
    }
    
    // Load the Content
    savedPrompts = await fetchSavedPrompts();
    savedPrompts.forEach(sPrompt => {
      pushPrompt(sPrompt);
    });
    
    // Funtionality to add a new Prompt
    addPromptBtn.onclick = async() => pushPrompt({pTitle:``,pContent:``});
    
    // grab the toggleButton
    const toggleButton =
    document.getElementsByClassName("nub svelte-dfnwyi")[0];
    
    const toggleButtonClick = () => {
      const sideMenuOpens = document.getElementsByClassName(
        "side-menu default svelte-dfnwyi active"
        )[0];
        const sideMenuContent = document.getElementsByClassName(
          "side-menu-content pt-4 p-10 svelte-dfnwyi"
          )[0];
          
                if (sideMenuOpens) {
                  !document.getElementsByClassName(prompterPanel.className)[0]
                  ? sideMenuContent.appendChild(prompterPanel)
                  : {};
                } else {
                  while (document.getElementsByClassName(prompterPanel.className)[0]) {
                    document.getElementsByClassName(prompterPanel.className)[0].remove();
                  }
                }
              }
              
              // JS injection logic for the button
              toggleButton.onclick = async() => toggleButtonClick();          
            };
            
            
            
            chrome.runtime.onMessage.addListener((obj, sender, response) => {
              const { message, tab } = obj;
              tabIdGlobalCS = tab;
              chrome.storage.sync.set({
                "tabIdGlobalCS": tabIdGlobalCS
              });
              
              if (message === "yes") {
                console.log("Extension Loading...");
                let setID = null;
                     chrome.storage.sync.get(tabidKey, function(result) {
    
                      setID = result.tabIdGlobalCS;
                      // console.log("Reloaded, key is " + setID);
                      // tabIdGlobalCS = result.tabIdGlobalCS;
                      tabIdGlobalCS = setID;
                      // alert("gonna send changed message to tabId "+ tabIdGlobalCS)
                      chrome.runtime.sendMessage(tabIdGlobalCS,{
                        message: "Reloaded",
                        tab:tabIdGlobalCS
                    });
                  });
                initializePrompter();
              }
              else{
                alert(message);
              }
            });
            
            const pageAccessedByReload = (
              (window.performance.navigation && window.performance.navigation.type === 1) ||
              window.performance
              .getEntriesByType('navigation')
              .map((nav) => nav.type)
              .includes('reload')
              );
              
              // const sendMessageExt = (message) => {
                //   chrome.tabs.sendMessage(tabIdGlobalCS, {
                  //     message: message,
                  //     tab:tabIdGlobalCS
                  //   });
                  // }
                  
                  if(pageAccessedByReload) {if(document.getElementById("prompter.abz4375.started")) {} else {window.open("https://bard.google.com/","_self")}};
              
            })();
