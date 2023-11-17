var sidebar = document.querySelector("#sidebar");
var tabs = Array.from(sidebar.children);

function switchTab(tabName) {
    const tabs = document.getElementsByClassName("tab");
    const selected_tab = document.getElementById('tab-' + tabName);

    for(i = 0; i < tabs.length; i++) {
        tabs[i].style.display = "none";
    }

    selected_tab.style.display = "";

    const buttons = document.querySelectorAll('#sidebar button');
    const button = document.querySelector(`button[tab="${tabName}"]`)

    for(i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("active");
    }

    button.classList.add("active");

}

switchTab("general")

tabs.forEach((button) => {
    var tab_name = button.getAttribute("tab");

    if(tab_name != null) {
        button.addEventListener("click", function () {
            switchTab(tab_name);
        });
    }
});
  

const features = document.querySelectorAll('#features input[type="checkbox"]');

chrome.storage.local.get(null, (data) => {
    features.forEach((checkbox) => {
        let name = checkbox.getAttribute('name');
        
        checkbox.checked = data[name + '-enabled'] === true;
    
        checkbox.addEventListener('change', () => {
            chrome.storage.local.set({ [name + '-enabled']: checkbox.checked })
        });
    });
})