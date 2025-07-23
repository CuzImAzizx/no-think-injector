function injectNoThinkButton() {
  const existing = document.querySelector('#no-think-btn');
  const codeBtn = document.querySelector('button[aria-label="Enable Code Interpreter"]');

  if (!codeBtn || existing) return;

  const newBtn = codeBtn.cloneNode(true);
  newBtn.id = 'no-think-btn';
  newBtn.setAttribute('aria-label', 'Insert /no_think');
  newBtn.querySelector('span').textContent = '🧠 No Think';

  const svg = newBtn.querySelector('svg');
  if (svg) svg.remove();

  newBtn.addEventListener('click', () => {
    const editor = document.querySelector('#chat-input');
    if (!editor) return;

    const firstParagraph = editor.querySelector('p');
    if (firstParagraph && !firstParagraph.innerText.startsWith('/no_think')) {
      firstParagraph.innerHTML = `/no_think<br>` + firstParagraph.innerHTML;
    }
  });

  codeBtn.parentElement.appendChild(newBtn);
}

const observer = new MutationObserver(() => {
  injectNoThinkButton();
});

// Start observing the page for changes in the body subtree
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Also try once at load just in case
window.addEventListener('load', () => {
  setTimeout(injectNoThinkButton, 1000); // slight delay for slow UI render
});
