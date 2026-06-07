const styleEl = document.createElement('style');
styleEl.id = "wa-blur-separated-styles";
styleEl.innerHTML = `
  /* 1. BLUR FOTO PROFIL */
  body.blur-profile [data-testid="cell-frame-container"] img,
  body.blur-profile [data-testid="conversation-info-header"] img,
  body.blur-profile [data-testid="avatar"] {
    filter: blur(12px) !important; transition: 0.15s ease-in-out;
  }
  body.blur-profile [data-testid="cell-frame-container"] img:hover,
  body.blur-profile [data-testid="conversation-info-header"] img:hover,
  body.blur-profile [data-testid="avatar"]:hover { filter: none !important; }

  /* 2. BLUR NAMA KONTAK */
  body.blur-name [data-testid="cell-frame-title"],
  body.blur-name [data-testid="conversation-info-header-chat-title"] {
    filter: blur(8px) !important; transition: 0.15s ease-in-out;
  }
  body.blur-name [data-testid="cell-frame-title"]:hover,
  body.blur-name [data-testid="conversation-info-header-chat-title"]:hover { filter: none !important; }

  /* 3. BLUR TEKS DETAIL BAWAH / NOMOR */
  body.blur-phone [data-testid="cell-frame-secondary"],
  body.blur-phone [data-testid="chat-subtitle"] {
    filter: blur(8px) !important; transition: 0.15s ease-in-out;
  }
  body.blur-phone [data-testid="cell-frame-secondary"]:hover,
  body.blur-phone [data-testid="chat-subtitle"]:hover { filter: none !important; }

  /* 4. BLUR ISI PESAN */
  body.blur-message [data-testid="msg-container"] {
    filter: blur(12px) !important; transition: 0.15s ease-in-out;
  }
  body.blur-message [data-testid="msg-container"]:hover { filter: none !important; }

  /* AREA AMAN: Kolom ngetik pesan tidak boleh blur */
  [contenteditable="true"], [role="textbox"] {
    filter: none !important;
  }
`;
document.head.appendChild(styleEl);

// Menerapkan class ke tag <body>
function applySeparatedBlur(data) {
  if (data.blurProfile !== undefined) document.body.classList.toggle('blur-profile', !!data.blurProfile);
  if (data.blurName !== undefined) document.body.classList.toggle('blur-name', !!data.blurName);
  if (data.blurPhone !== undefined) document.body.classList.toggle('blur-phone', !!data.blurPhone);
  if (data.blurMessage !== undefined) document.body.classList.toggle('blur-message', !!data.blurMessage);
}

// Cek pertama kali saat WA dibuka
chrome.storage.local.get(['blurProfile', 'blurName', 'blurPhone', 'blurMessage'], applySeparatedBlur);

// Reaksi realtime saat switch digeser
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local') {
    const updatedData = {};
    if (changes.blurProfile) updatedData.blurProfile = changes.blurProfile.newValue;
    if (changes.blurName) updatedData.blurName = changes.blurName.newValue;
    if (changes.blurPhone) updatedData.blurPhone = changes.blurPhone.newValue;
    if (changes.blurMessage) updatedData.blurMessage = changes.blurMessage.newValue;
    
    applySeparatedBlur(updatedData);
  }
});