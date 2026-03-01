const fs = require('fs');
const filepath = 'src/i18n/dictionaries.ts';
let content = fs.readFileSync(filepath, 'utf8');

const engTarget = `      { year: "2023", title: "Passenger Volume Prediction in Mexico", domain: "Time Series / Data Sci
ence", link: "https://github.com/dvillagrans/Passenger-Volume-Prediction-in-Mexico" }                           ]
  },
  contact: {
    title1: "Let's build something",
    title2: "intelligent and useful.",
    email: "diegovillasal@gmail.com",
    github: "https://github.com/dvillagrans",
    linkedin: "https://www.linkedin.com/in/diegovillagrans/",
    footerText: "— Diego Villagran"
  }
};`;

const engRepl = `      { year: "2023", title: "Passenger Volume Prediction in Mexico", domain: "Time Series / Data Science", link: "https://github.com/dvillagrans/Passenger-Volume-Prediction-in-Mexico" }
    ]
  },
  contact: {
    title1: "Let's build something",
    title2: "intelligent and useful.",
    email: "diegovillasal@gmail.com",
    bookSession: "Book a Session",
    bookDesc: "Schedule a 30-min discovery call.",
    formName: "Your Name",
    formEmail: "Your Email",
    formMessage: "What would you like to discuss?",
    formSubmit: "Send Request",
    formSuccess: "Message sent! I'll get back to you shortly.",
    formError: "Something went wrong. Please email directly.",
    github: "https://github.com/dvillagrans",
    linkedin: "https://www.linkedin.com/in/diegovillagrans/",
    footerText: "— Diego Villagran"
  }
};`;

const esTarget = `      { year: "2023", title: "Predicción de pasajeros para aerolíneas mexicanas", domain: "Series de tiemp
o / Data Science", link: "https://github.com/dvillagrans/Passenger-Volume-Prediction-in-Mexico" }               ]
  },
  contact: {
    title1: "Construyamos algo",
    title2: "inteligente y útil.",
    email: "diegovillasal@gmail.com",
    github: "https://github.com/dvillagrans",
    linkedin: "https://linkedin.com/in/dvillagrans",
    footerText: "— Diego Villagran"
  }
};`;

const esRepl = `      { year: "2023", title: "Predicción de pasajeros para aerolíneas mexicanas", domain: "Series de tiempo / Data Science", link: "https://github.com/dvillagrans/Passenger-Volume-Prediction-in-Mexico" }
    ]
  },
  contact: {
    title1: "Construyamos algo",
    title2: "inteligente y útil.",
    email: "diegovillasal@gmail.com",
    bookSession: "Agendar Sesión",
    bookDesc: "Programa una llamada breve de 30 mins conmigo.",
    formName: "Tu Nombre",
    formEmail: "Tu Correo",
    formMessage: "¿De qué te gustaría hablar?",
    formSubmit: "Enviar Solicitud",
    formSuccess: "¡Mensaje enviado! Te contactaré pronto.",
    formError: "Hubo un error. Por favor, envía un correo.",
    github: "https://github.com/dvillagrans",
    linkedin: "https://www.linkedin.com/in/diegovillagrans/",
    footerText: "— Diego Villagran"
  }
};`;

// Clean up actual file spacing before replacing just to be safe
content = content.replace(/      \{ year: "2023", title: "Passenger Volume Prediction in Mexico"(.*?)\}\n\s+\]\n\s+\},\n\s+contact: \{\n\s+title1: "Let's build something",\n\s+title2: "intelligent and useful.",\n\s+email: "diegovillasal@gmail.com",\n\s+github: "https:\/\/github.com\/dvillagrans",\n\s+linkedin: "https:\/\/www.linkedin.com\/in\/diegovillagrans\/",\n\s+footerText: "— Diego Villagran"\n\s+\}\n\s+\},/gs, engRepl + ',');

content = content.replace(/      \{ year: "2023", title: "Predicción de pasajeros para aerolíneas mexicanas"(.*?)\}\n\s+\]\n\s+\},\n\s+contact: \{\n\s+title1: "Construyamos algo",\n\s+title2: "inteligente y útil.",\n\s+email: "diegovillasal@gmail.com",\n\s+github: "https:\/\/github.com\/dvillagrans",\n\s+linkedin: "https:\/\/linkedin.com\/in\/dvillagrans",\n\s+footerText: "— Diego Villagran"\n\s+\}\n\};/gs, esRepl);

fs.writeFileSync(filepath, content, 'utf8');
console.log("Dictionary updated.");
