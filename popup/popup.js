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