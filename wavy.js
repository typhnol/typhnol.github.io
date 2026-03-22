const wavyElements = document.querySelectorAll('.wavy');

wavyElements.forEach(element => {
  const originalHTML = element.innerHTML;
  let newHTML = '';

  for (let i = 0; i < originalHTML.length; i++) {
    newHTML += `<span style="--i: ${i}">${originalHTML[i]}</span>`;
  }

  element.innerHTML = newHTML;
});



