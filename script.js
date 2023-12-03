const fileInput = document.getElementById('fileInput');
const output = document.getElementById('output');
const alphabetBar = document.getElementById('alphabet-bar');

const colorMapping = {
   'A': '255,0,0', 'Á': '55,55,225',
  'B': '0,0,255',
  '6': '0,255,150',
  'C': '0,255,0',
  'D': '0,255,255',
  '2': '255,255,0',
  'E': '255,0,255', 'É': '242,168,7', 
  'F': '0,128,255',
  'G': '255,255,255',
  '8': '255,255,255',
  'H': '140,140,140',
  'I': '255,255,0', 'Í': '220,209,50',
  'J': '255,146,146',
  'K': '255,75,75',
  'L': '255,144,255',
  '1': '0,0,255',
  'M': '175,135,255',
  '3': '0,255,0',
  'N': '21,148,141',
  '4': '255,0,255',
  'Ñ': '21,148,141', // con un punto en medio
  'O': '255,100,0', 'Ó': '240,120,0',
  '0': '140,140,140',
  'P': '253,238,165',
  'Q': '255,170,0',
  '9': '255,0,0',
  'R': '0,128,0',
  'S': '255,0,108',
  '5': '0,255,255',
  'T': '172,128,77',
  '7': '150,0,2555',
  'U': '0,255,111', 'Ú': '0,170,80',
  'V': '175,255,255',
  'W': '150,0,255',
  'X': '180,15,15',
  'Y': '220,255,123',
  'Z': '116,61,37',
  ' ': '0,0,0'  // Espacio
};

const getShape = (char) => {

  const specialChars = ['¿', '?', '!', '¡', ',', '.', ':', ';', '_', '-', '«', '»', '"', "'", "(", ")","…", " "];   
  if (specialChars.includes(char)) return 'special';

  if (char.match(/[A-Z]/)) return 'block';
  if (char.match(/[a-z]/)) return 'circle';
  if (char.match(/[0-9]/)) return 'triangle';
  if (char.match(/[ÑÁÉÍÓÚ]/)) return 'parallelogram';
  if (char.match(/[ñáéíóú]/)) return 'oval';
  return 'block';
};

// Primero, rellenar la barra con las letras del abecedario
const vocalesConTilde = new Set(['Á', 'É', 'Í', 'Ó', 'Ú']);

for (let character in colorMapping) {
    if (isNaN(parseInt(character)) && !vocalesConTilde.has(character)) { 
        // Solo para las letras del abecedario que no están en el conjunto de vocales con tilde
        const letterDiv = `<span style="font-weight: bold; font-family: Tahoma, sans-serif; font-size: 28px; color: rgb(${colorMapping[character]});">${character}</span>`;
        alphabetBar.innerHTML += letterDiv;
    }
}

// Luego, rellenar la barra con los números
for (let character in colorMapping) {
    if (!isNaN(parseInt(character))) { // Solo para los números
        const numberDiv = `<span style="font-weight: bold; font-family: Tahoma, sans-serif; font-size: 28px; color: rgb(${colorMapping[character]});">${character}</span>`; 
        alphabetBar.innerHTML += numberDiv;
    }
}

fileInput.addEventListener('change', event => {
  const file = event.target.files[0];
  const reader = new FileReader();
  
  reader.addEventListener('load', event => {
    output.innerHTML = ''; // Limpar o output
    const text = event.target.result;
    
    for (const char of text) {
      const upperChar = char.toUpperCase();
      const color = colorMapping[upperChar] || 'rgba(0)';
      const shape = getShape(char);
      
      if (shape === 'special') {
        const span = document.createElement('span');
        span.style.color = 'white';  // Configura o color do texto para branco
        span.style.fontSize = '2em';  // Aumenta o tamanho da fonte
        span.appendChild(document.createTextNode(char));
        output.appendChild(span);
        continue;  // Passa para a próxima iteração do loop
      }

      const div = document.createElement('div');
      div.className = shape;
      div.style.position = 'relative';

      if (shape === 'triangle') {
        div.style.borderBottomColor = `rgb(${color})`;
      } else {
        div.style.backgroundColor = `rgb(${color})`;
      }

     const letterSpan = document.createElement('span');
letterSpan.style.color = `rgba(${color}, 0.0)`; 
letterSpan.style.fontSize = '1px';
letterSpan.appendChild(document.createTextNode(char));
output.appendChild(letterSpan);
      
      div.setAttribute('data-text', char);
      
      output.appendChild(div);
    }
  });
  
  reader.readAsText(file);
});
