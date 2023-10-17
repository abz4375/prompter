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
