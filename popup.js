document.addEventListener('DOMContentLoaded', () => {
  const options = ['blurProfile', 'blurName', 'blurPhone', 'blurMessage'];
  const statusMessage = document.getElementById('statusMessage');

  // Membaca status switch dari memori
  chrome.storage.local.get(options, (result) => {
    options.forEach(opt => {
      const element = document.getElementById(opt);
      if(element) {
        element.checked = !!result[opt];
      }
    });
  });

  // Menyimpan otomatis saat switch digeser
  options.forEach(opt => {
    const element = document.getElementById(opt);
    if(element) {
      element.addEventListener('change', () => {
        const dataToSave = {};
        options.forEach(o => {
          dataToSave[o] = document.getElementById(o).checked;
        });

        chrome.storage.local.set(dataToSave, () => {
          statusMessage.style.visibility = "visible";
          setTimeout(() => {
            statusMessage.style.visibility = "hidden";
          }, 1000);
        });
      });
    }
  });
});