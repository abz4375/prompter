(() => {
  let savedPrompts = [];

  const fetchSavedPrompts = () => {
    return new Promise((resolve) => {
      chrome.storage.sync.get(["prompter.abz4375"], (obj) => {
        resolve(
          obj["prompter.abz4375"] ? JSON.parse(obj["prompter.abz4375"]) : []
        );
      });
    });
  };

  const saveThePrompt = async (newPrompt) => {
    savedPrompts = await fetchSavedPrompts();
    chrome.storage.sync.set({
      ["prompter.abz4375"]: JSON.stringify([...savedPrompts, newPrompt]),
    });
  };

  const Prompter = async () => {
    console.log('hello its Prompter ;)');

    savedPrompts = await fetchSavedPrompts();

    // Create prompterPanel
    const prompterPanel = document.createElement("div");
    prompterPanel.className = "prompter.abz4375";
    prompterPanel.style.transition = "all 0.25s ease-out 0s";
    prompterPanel.style.opacity = "0";

    // Add title
    const title = document.createElement("h2");
    title.className = "text-lg font-bold text-descriptionTextColor mb-4 mt-4";
    title.id = "slide-over-title";
    title.innerText = "Your Templates";
    prompterPanel.appendChild(title);

    // Add Prompt Button
    const addPromptBtn = document.createElement("button");
    addPromptBtn.className = "float-right text-primaryLight";
    addPromptBtn.title = "New Prompt";
    addPromptBtn.style.cssText = `
      height: 26px;
      width: 26px;
      background-color: rgb(104 124 153 / 49%);
      border-radius: 4px;
      transition: all 0.125s ease-out 0s;
    `;
    addPromptBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
    </svg>`;
    addPromptBtn.addEventListener("mouseover", function () {
      this.style.backgroundColor = "rgb(104 124 153 / 85%)";
    });
    addPromptBtn.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "rgb(104 124 153 / 49%)";
    });
    title.appendChild(addPromptBtn);

    // Add prompt stack
    const promptStack = document.createElement("div");
    prompterPanel.appendChild(promptStack);

    // Load saved prompts
    savedPrompts.forEach((sPrompt, index) => {
      pushPrompt(sPrompt, promptStack, index);
    });

    // Functionality to add a new Prompt
  addPromptBtn.onclick = () => {
    const newIndex = savedPrompts.length;
    pushPrompt({ pTitle: "", pContent: "" }, promptStack, newIndex);
  };

    // Attach the panel to the side menu
    const attachPrompterPanel = () => {
      const sideMenuContent = document.querySelector(".side-menu-content.pt-4.p-10.svelte-dfnwyi");
      if (sideMenuContent) {
        sideMenuContent.appendChild(prompterPanel);
        setTimeout(() => {
          prompterPanel.style.opacity = "1";
        }, 125);
      }
    };

    // Watch for the side menu to open
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const sideMenu = document.querySelector(".side-menu.default.svelte-dfnwyi");
          if (sideMenu && sideMenu.classList.contains('active')) {
            attachPrompterPanel();
          } else {
            prompterPanel.style.opacity = "0";
            setTimeout(() => {
              if (prompterPanel.parentNode) {
                prompterPanel.parentNode.removeChild(prompterPanel);
              }
            }, 125);
          }
        }
      });
    });

    const sideMenu = document.querySelector(".side-menu.default.svelte-dfnwyi");
    if (sideMenu) {
      observer.observe(sideMenu, { attributes: true });
    }
  };

  const pushPrompt = (prompt, promptStack, index) => {
    const { pTitle, pContent } = prompt;

    // Create prompt window
    const promptWindow = document.createElement("div");
    promptWindow.className = `bg-black rounded-xl p-4 mt-2`;
    promptWindow.style.transition = 'all 0.125s ease-out 0s';
    promptWindow.style.opacity = '0';

    // Create title input
    const promptTitle = document.createElement("input");
    promptTitle.className = "w-full bg-transparent text-white border-none outline-none text-sm font-medium mb-2";
    promptTitle.value = pTitle;
    promptTitle.placeholder = "Enter Title";
    promptWindow.appendChild(promptTitle);

    // Create content textarea
    const textarea = document.createElement("div");
    textarea.className = "w-full bg-transparent text-white border-none outline-none text-sm resize-none";
    textarea.style.height = "100px";
    textarea.style.overflowY = "scroll";
    textarea.contentEditable = true;
    textarea.innerText = pContent;
    promptWindow.appendChild(textarea);

    // Create button container
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "flex justify-end mt-2";
    promptWindow.appendChild(buttonContainer);

    // Create copy button
    const copyBtn = createButton("Copy", `
      <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#4db6ac">
        <path d="M7.5 3H14.6C16.8402 3 17.9603 3 18.816 3.43597C19.5686 3.81947 20.1805 4.43139 20.564 5.18404C21 6.03969 21 7.15979 21 9.4V16.5M6.2 21H14.3C15.4201 21 15.9802 21 16.408 20.782C16.7843 20.5903 17.0903 20.2843 17.282 19.908C17.5 19.4802 17.5 18.9201 17.5 17.8V9.7C17.5 8.57989 17.5 8.01984 17.282 7.59202C17.0903 7.21569 16.7843 6.90973 16.408 6.71799C15.9802 6.5 15.4201 6.5 14.3 6.5H6.2C5.0799 6.5 4.51984 6.5 4.09202 6.71799C3.71569 6.90973 3.40973 7.21569 3.21799 7.59202C3 8.01984 3 8.57989 3 9.7V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.0799 21 6.2 21Z" stroke="#4db6ac" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
    `);
    copyBtn.onclick = () => {
      const originalContent = textarea.innerText;
      navigator.clipboard.writeText(textarea.innerText);
      textarea.innerText = "Copied!";
      setTimeout(() => {
        textarea.innerText = pContent;
      }, 3000);
    };
    
    buttonContainer.appendChild(copyBtn);

    // Create delete button
    const delBtn = createButton("Delete", `
      <svg fill="#4db6ac" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#4db6ac">
        <path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"></path>
      </svg>
    `);
    delBtn.onclick = async () => {
      savedPrompts.splice(index, 1);
      chrome.storage.sync.set({
        ["prompter.abz4375"]: JSON.stringify(savedPrompts),
      });
      promptStack.removeChild(promptWindow);
    };
    buttonContainer.appendChild(delBtn);

    // Create save button
    const saveBtn = createButton("Save", `
      <svg fill="#4db6ac" height="16px" width="16px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" stroke="#4db6ac" stroke-width="11.264">
        <path d="M507.109,71.673L440.327,4.891C437.196,1.76,432.951,0,428.522,0C425.038,0,53.485,0,50.087,0C22.469,0,0,22.469,0,50.087 v411.826C0,489.531,22.469,512,50.087,512c15.731,0,396.124,0,411.826,0C489.531,512,512,489.531,512,461.913V83.478 C512,79.049,510.24,74.804,507.109,71.673z M200.348,33.391h178.087v100.174H200.348V33.391z M133.565,33.391h33.391v100.174 h-33.391V33.391z M378.435,478.609h-244.87v-33.391h244.87V478.609z M378.435,411.826h-244.87v-33.391h244.87V411.826z M378.435,345.043h-244.87v-33.391h244.87V345.043z M478.609,461.913c0,9.206-7.49,16.696-16.696,16.696h-50.087V294.957 c0-9.22-7.475-16.696-16.696-16.696H116.87c-9.22,0-16.696,7.475-16.696,16.696v183.652H50.087 c-9.206,0-16.696-7.49-16.696-16.696V50.087c0-9.206,7.49-16.696,16.696-16.696h50.087v116.87c0,9.22,7.475,16.696,16.696,16.696 H395.13c9.22,0,16.696-7.475,16.696-16.696V33.391h9.78l57.002,57.002V461.913z"></path>
      </svg>
    `);
    saveBtn.onclick = async () => {
      if (promptTitle.value !== "" && textarea.innerText !== "") {
        promptTitle.readOnly = true;
        saveThePrompt({
          pTitle: promptTitle.value,
          pContent: textarea.innerText,
        });
        buttonContainer.removeChild(saveBtn);
      }
    };
    buttonContainer.appendChild(saveBtn);

    // Append prompt window to stack
    promptStack.appendChild(promptWindow);
  
    // Fade in the prompt window
    setTimeout(() => {
      promptWindow.style.opacity = '1';
    }, 125);

    // If it's a pre-existing prompt, make it read-only
    if (pTitle !== "" && pContent !== "") {
      promptTitle.readOnly = true;
      buttonContainer.removeChild(saveBtn);
    }
  };

  const createButton = (title, svgContent) => {
    const button = document.createElement("button");
    button.className = "float-right text-primaryLight";
    button.title = title;
    button.style.cssText = `
      height: 26px;
      width: 26px;
      background-color: #111827;
      border-radius: 4px;
      transition: all 0.125s ease-out 0s;
      margin-left: 4px;
      padding-left: 3px;
    `;
    button.innerHTML = svgContent;
    button.addEventListener("mousedown", function () {
      this.style.opacity = "0";
    });
    button.addEventListener("mouseup", function () {
      this.style.opacity = "1";
    });
    return button;
  };

  const initializePrompter = (ON) => {
    if(ON) {
      Prompter();
    } else {
      console.log('prompter is OFF');
      const prompterPanel = document.querySelector('.prompter\\.abz4375');
      if (prompterPanel) {
        prompterPanel.remove();
      }
    }
  };

  // Initialize the prompter in the ON state
  initializePrompter(true);

  chrome.runtime.onMessage.addListener((obj, sender, sendResponse) => {
    const { message } = obj;

    if (message === "turnOn") {
      console.log('turning ON prompter...');
      initializePrompter(true);
      sendResponse({status: "Prompter turned on"});
    } 
    else if (message === "turnOff") {
      console.log('turning OFF prompter...');
      initializePrompter(false);
      sendResponse({status: "Prompter turned off"});
    }
    return true; // Keeps the message channel open for asynchronous responses
  });

})();
