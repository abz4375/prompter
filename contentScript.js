// // (() => {
// chrome.runtime.onMessage.addListener((obj, sender, response) => {
//   const { message} = obj;
//   if (message === "yes") {
//     console.log("success")
//   }
// });

// //   })();
// const debounce = (fn, delay) => {
//     let timer;
//     return (...args) => {
//       if (timer) {
//         clearTimeout(timer);
//       }
//       timer = setTimeout(() => {
//         fn(...args);
//       }, delay);
//     };
//   };

// const logSuccess = debounce(() => {
//     console.log("target website found! updated");
//   }, 1000);

// chrome.runtime.onMessage.addListener((obj, sender, response) => {
//     const { message } = obj;
//     if (message === "yes") {
//       logSuccess();
//       initializePrompter();
//     }
//   });

// //   const loggedIntoPromptStorm = () => {
// //     return new Promise ((resolve,reject)=>{

// //     })
// //   }

// const initializePrompter = () => {
//     // const SideMenuOpened = document.getElementsByClassName("side-menu default svelte-dfnwyi active")[0];
//     // const loggedIntoPromptStorm = document.getElementsByClassName("ml-2 text-slate-300")[0]
//     // if (loggedIntoPromptStorm && SideMenuOpened) {
//     //     console.log("Good to Go👍");
//     // }

//     if(!document.getElementsByClassName("abz4375.prompter")[0]){
//         const prompterAddOn = document.createElement("div");
//         prompterAddOn.className="abz4375.prompter";
//         document.getElementsByClassName("side-menu-content pt-4 p-10 svelte-dfnwyi")[0].appendChild(prompterAddOn);
//     }

//     let displayAddOn = false;

//     if(!document.getElementsByClassName("side-menu default svelte-dfnwyi active")[0]) displayAddOn = false;

//     const toggleButton = document.getElementsByClassName("nub svelte-dfnwyi")[0]
//     toggleButton.onclick = () => {
//         if(document.getElementsByClassName("side-menu default svelte-dfnwyi active")[0]) {
//             console.log("Menu Opened");
//             displayAddOn = true;
//         }
//     };

//     if (displayAddOn) {
//         const panel = document.getElementsByClassName("abz4375.prompter")[0];
//         const heading = document.createElement("h2");
//         heading.
//         heading.className = "text-lg font-bold text-descriptionTextColor mb-4 mt-4"
//         heading.id= "slide-over-title"
//         heading.innerText = "Your Templates"
//     }
// }

(() => {
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { message } = obj;

    if (message === "yes") {
        console.log("Extension Loading...")
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
        title.className = "text-lg font-bold text-descriptionTextColor mb-4 mt-4"
        title.id = "slide-over-title"
        title.innerText = "Your Templates"


    // grab the toggleButton
    const toggleButton = document.getElementsByClassName("nub svelte-dfnwyi")[0];

    // JS injection logic for the button
    toggleButton.onclick = () => {
        const sideMenuOpens = document.getElementsByClassName("side-menu default svelte-dfnwyi active")[0];
        const sideMenuContent = document.getElementsByClassName("side-menu-content pt-4 p-10 svelte-dfnwyi")[0];
        
        if (sideMenuOpens) {
            (!document.getElementsByClassName(prompterPanel.className)[0]) ? sideMenuContent.appendChild(prompterPanel) :{};
        } else {
            while(document.getElementsByClassName(prompterPanel.className)[0]) {
                document.getElementsByClassName(prompterPanel.className)[0].remove();
            }
        }
    }

  }
})();
