(() => {
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { message } = obj;

    if (message === "yes") {
      console.log("Extension Loading...");
      initializePrompter();
    }
  });

  const initializePrompter = () => {
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
        const promptTitle = document.createElement("textarea");
        promptTitle.placeholder = "Enter Title"
        promptTitle.style="border:none;background-color: black; resize:none; outline:none;";
        promptTitle.innerText = pTitle;
        promptTitle.className = `mt-4 text-sm font-semibold text-descriptionTextColor`;
        promptWindow.appendChild(promptTitle);

        // Add Save Button
        const addSaveBtn = document.createElement("button");
        promptWindow.appendChild(addSaveBtn);
        addSaveBtn.className = "float-right text-primaryLight";
        addSaveBtn.title = "Save"
        addSaveBtn.style = `height: 26px;width: 26px; background-color: transparent; border-radius:4px ; transition: all 0.125s ease-out 0s; margin-top:13px;`;
        addSaveBtn.innerHTML = `<svg width="26px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#00000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447ZM5.46058 11.0833C5.83333 7.79988 8.62406 5.25 12.0096 5.25C13.9916 5.25 15.7702 6.12471 16.9775 7.50653C17.25 7.81846 17.2181 8.29226 16.9061 8.56479C16.5942 8.83733 16.1204 8.80539 15.8479 8.49347C14.9136 7.42409 13.541 6.75 12.0096 6.75C9.45215 6.75 7.33642 8.63219 6.97332 11.0833H7.33654C7.63998 11.0833 7.91353 11.2662 8.02955 11.5466C8.14558 11.8269 8.08122 12.1496 7.86651 12.364L6.69825 13.5307C6.40544 13.8231 5.93113 13.8231 5.63832 13.5307L4.47005 12.364C4.25534 12.1496 4.19099 11.8269 4.30701 11.5466C4.42304 11.2662 4.69658 11.0833 5.00002 11.0833H5.46058ZM17.3018 10.4693C17.5947 10.1769 18.069 10.1769 18.3618 10.4693L19.53 11.636C19.7448 11.8504 19.8091 12.1731 19.6931 12.4534C19.5771 12.7338 19.3035 12.9167 19.0001 12.9167H18.5395C18.1668 16.2001 15.376 18.75 11.9905 18.75C10.0085 18.75 8.22995 17.8753 7.02263 16.4935C6.7501 16.1815 6.78203 15.7077 7.09396 15.4352C7.40589 15.1627 7.87968 15.1946 8.15222 15.5065C9.08654 16.5759 10.4591 17.25 11.9905 17.25C14.548 17.25 16.6637 15.3678 17.0268 12.9167H16.6636C16.3601 12.9167 16.0866 12.7338 15.9705 12.4534C15.8545 12.1731 15.9189 11.8504 16.1336 11.636L17.3018 10.4693Z" fill="#4db6ac"></path> </g></svg>`;
        addPromptBtn.addEventListener('mouseover', function () {
          // this.style.backgroundColor = 'rgb(104 124 153 / 85%)';
        })
        addPromptBtn.addEventListener('mouseleave', function () {
          // this.style.backgroundColor = 'rgb(104 124 153 / 49%)';
        })

        // Prompt Content
        const promptContent = document.createElement("div")
        promptContent.className = `mt-4`;
        const textarea = document.createElement("textarea");
        textarea.rows = 4;
        textarea.name = "prompt_textarea";
        textarea.placeholder = `Details`
        textarea.className = `focus:text-gray-300 text-gray-500 block w-full rounded-md bg-gray-900 border border-gray-600 px-3 py-2 placeholder-gray-400 shadow-sm outline-primary focus:border-primary focus:outline-none focus:ring-primary ring-primary sm:text-sm`;
        textarea.innerText = pContent;
        promptContent.appendChild(textarea);
        promptWindow.appendChild(promptContent);
        
        // Add to the stack
        promptStack.appendChild(promptWindow);

        // Handle New Prompts
        if(!(pTitle===`` && pContent===``)) promptTitle.readOnly = true;
      }
      
      // Funtionality to add a new Prompt
      addPromptBtn.onclick = async() => pushPrompt({pTitle:``,pContent:``});

    // grab the toggleButton
    const toggleButton =
      document.getElementsByClassName("nub svelte-dfnwyi")[0];

    // JS injection logic for the button
    toggleButton.onclick = () => {
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
    };
  };
})();
