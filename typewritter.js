let txt = "Work in Progress!";
const speed = 150;
let i = 0;
const type = document.getElementById('type')

function typeWriter() {
  
  if (i < txt.length) {
    type.innerHTML += txt.charAt(i);
    i++;
    setTimeout(() => {
      typeWriter()
    }, speed);
  }
}
typeWriter()


