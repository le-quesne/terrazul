export interface Product {
  id: string;
  name: string;
  price: string;
  priceNumber: number; // For calculations if needed
  img: string;
  isNew?: boolean;
  description: string;
  region?: string;
  roastLevel?: string;
  tastingNotes?: string[];
  acidity?: number;
  intensity?: number;
  bitterness?: number;
  grindOptions?: string[];
  artInfo?: {
    title: string;
    description: string;
    artistName: string;
    artistDescription: string;
    artistSocials?: {
      instagram?: string;
      web?: string;
    };
    illustration?: string;
  };
}

export const products: Product[] = [
  {
    id: 'kantutani-bolivia',
    name: 'Kantutani, Bolivia',
    price: '$14.000',
    priceNumber: 14000,
    img: '/Kantutani.webp',
    isNew: true,
    region: 'Bolivia',
    roastLevel: 'Medio',
    tastingNotes: ['Chocolate', 'Nuez', 'Caramelo'],
    acidity: 4,
    intensity: 3,
    bitterness: 2,
    grindOptions: ['Grano entero', 'Molido fino', 'Molido medio', 'Molido grueso'],
    description: 'Un café excepcional cultivado en las alturas de Bolivia. Kantutani ofrece un perfil de taza equilibrado con notas dulces y un cuerpo sedoso. Perfecto para quienes buscan un café de especialidad con carácter pero accesible.',
    artInfo: {
      title: 'Arte de Kantutani',
      description: `Esta ilustración fue creada para la edición Kantutani, Bolivia, un Bourbon Amarillo lavado con notas a caramelo, jazmín, jengibre y arándano. El arte retrata a una especie de científica-exploradora que estudia la planta del café como si fuera un organismo precioso y casi frágil.

La escena cruza dos mundos:

Lo ancestral: el café como algo con historia, origen y territorio.

Lo futurista: tecnología, observación científica y un ambiente de laboratorio espacial.

Los elementos clave del estilo:

Colores intensos y contrastados.

Composición ilustrada con textura manual.

Objetos cotidianos transformados en piezas de ficción científica.

Narrativa simple: alguien que protege, investiga y entiende el café desde la raíz.

El arte representa la idea de que cada café de origen es un micro-universo. Algo que vale la pena estudiar, preservar y mostrar como una pieza única.`,
      artistName: 'Catalina Cartagena',
      artistDescription: `Catalina Cartagena (catalinagena en Instagram) es una ilustradora y ceramista chilena con un estilo inmediatamente reconocible: figuras expresivas, humor sutil y una estética que mezcla lo íntimo con lo fantástico.

Su trabajo se caracteriza por:

Paleta cálida y narrativa.

Personajes con gestos claros y rasgos exagerados.

Interés por lo cotidiano, lo doméstico y lo imaginario.

Uso consistente de texturas y trazos que mantienen un aire artesanal.

Además de ilustración, trabaja en cerámica creando piezas figurativas con la misma personalidad que aparece en sus dibujos: humanas, imperfectas, expresivas y directas.`,
      artistSocials: {
        instagram: '@catalinagena',
        web: 'cl.fineartlatinoamerica.com/collections/catalina-cartagena'
      },
      illustration: '/Kantutani-Ilustracion.png'
    }
  },
  {
    id: 'pack-tres-origenes',
    name: 'Pack Tres Orígenes',
    price: '$32.000',
    priceNumber: 32000,
    img: '/Pack Tres Origenes.webp',
    isNew: true,
    grindOptions: ['Grano entero', 'Molido fino', 'Molido medio', 'Molido grueso'],
    description: 'Viaja por el mundo a través del café con nuestro pack de tres orígenes. Incluye selecciones de Guatemala, Colombia y Brasil. Ideal para regalar o para descubrir tu perfil de sabor favorito.'
  },
  {
    id: 'huehuetenango-guatemala',
    name: 'Huehuetenango, Guatemala',
    price: '$36.500',
    priceNumber: 36500,
    img: '/Huehuetenango.webp',
    region: 'Guatemala',
    roastLevel: 'Medio-Alto',
    tastingNotes: ['Frutos rojos', 'Cacao', 'Cítricos'],
    acidity: 5,
    intensity: 3,
    bitterness: 2,
    grindOptions: ['Grano entero', 'Molido fino', 'Molido medio', 'Molido grueso'],
    description: 'Proveniente de la famosa región de Huehuetenango, este café destaca por su acidez brillante y sus complejas notas frutales. Un favorito entre los conocedores.',
    artInfo: {
      title: 'Arte de Huehuetenango',
      description: `Este diseño fue creado especialmente para Terrazul y toma como punto central el origen del café en Huehuetenango, Guatemala. La ilustración mezcla estética retro-cósmica con humor gráfico: un auto flotando en el espacio, elementos psicodélicos, planetas y un haz que ilumina una planta de café.

La composición comunica tres ideas claves:

Viaje: el café como algo que recorre mundos, culturas y distancias.

Origen: la planta al centro, como recordatorio del terroir y la calidad del grano.

Energía: líneas dinámicas, colores vibrantes y un estilo casi pulp-comic que transmite intensidad y movimiento.

El arte no es decorativo; busca provocar curiosidad. Quiere que el consumidor pregunte de dónde viene el café, qué historia trae y por qué este origen es tan especial.`,
      artistName: 'Buen Muchacho',
      artistDescription: `Buen Muchacho (buen.muchacho_ en Instagram) es un artista gráfico conocido por combinar estética alternativa, elementos retro, ciencia ficción, cultura pop y narrativa visual espontánea. Su sello está en los colores saturados, las formas caricaturescas, el uso de texturas de puntillismo y un humor visual que mezcla ternura con rareza.

Se mueve entre ilustración, diseño y arte independiente. Su trabajo destaca por:

Identidad gráfica inmediata: lo ves y sabes que es de él.

Narrativa visual: cada pieza cuenta una micro-historia.

Influencias de cómics clásicos, carteles antiguos y psicodelia.

Estilo juguetón, irreverente y altamente reconocible.

Buen Muchacho tiene comisiones abiertas y un portafolio amplio que incluye posters, portadas, colaboraciones con marcas y proyectos personales.`,
      artistSocials: {
        instagram: '@buen.muchacho_',
        web: 'www.buenmuchacho.com'
      },
      illustration: '/Huehuetenango-Ilustracion.png'
    }
  },
  {
    id: 'huila-colombia',
    name: 'Huila, Colombia',
    price: '$40.000',
    priceNumber: 40000,
    img: '/Huila.webp',
    region: 'Colombia',
    roastLevel: 'Medio',
    tastingNotes: ['Caramelo', 'Manzana', 'Vainilla'],
    acidity: 4,
    intensity: 4,
    bitterness: 3,
    grindOptions: ['Grano entero', 'Molido fino', 'Molido medio', 'Molido grueso'],
    description: 'El clásico café colombiano elevado a su máxima expresión. Dulzura pronunciada, acidez media y un final limpio que invita a seguir bebiendo.',
    artInfo: {
      title: 'Arte de Huila',
      description: `La imagen muestra a un astronauta flotando frente a una fuente de luz que ilumina una cafetera de filtro suspendida en el vacío. Es una escena silenciosa, casi meditativa: un humano aislado observando un objeto cotidiano como si fuera un descubrimiento cósmico.

Los elementos claves del arte:

Soledad y contemplación: el cuerpo sin rostro enfatiza la idea de que el café es un ritual personal incluso en el espacio.

Minimalismo sci-fi: colores fríos, brumas y líneas eléctricas que sugieren energía y vacío.

Símbolo central: la cafetera aparece como un objeto sagrado, aislado en un halo de luz, representando el origen del sabor antes de que llegue a la taza.

Es un arte más abstracto que narrativo. No cuenta una historia lineal, sino una sensación: el café como un punto de conexión entre mundos, incluso cuando no hay nada alrededor.`,
      artistName: 'Lía Sandoval',
      artistDescription: `Lía Sandoval es una artista visual chilena especializada en arte digital atmosférico. Su trabajo mezcla ciencia ficción suave con símbolos cotidianos, siempre buscando contrastar lo tecnológico con lo íntimo.

Características de su obra:

Uso de luz difusa y paletas frías.

Figuras humanas sin rasgos para universalizar la experiencia.

Objetos simples —tazas, flores, herramientas, utensilios del hogar— elevados a íconos dentro de paisajes futuristas.

Composiciones silenciosas, más cercanas a un estado emocional que a una narrativa explícita.

Sandoval ha colaborado con proyectos de diseño conceptual, portadas de música electrónica y etiquetas de productos artesanales. Su enfoque es siempre el mismo: tomar un gesto cotidiano y ponerlo en un contexto imposible, para que se vea distinto.`,
      illustration: '/Huila-Ilustracion.png'
    }
  },
  {
    id: 'minas-gerais-brasil',
    name: 'Minas Gerais, Brasil',
    price: '$34.000',
    priceNumber: 34000,
    img: '/Minas Gerais.webp',
    region: 'Brasil',
    roastLevel: 'Medio-Oscuro',
    tastingNotes: ['Chocolate oscuro', 'Avellana', 'Melaza'],
    acidity: 2,
    intensity: 3,
    bitterness: 4,
    grindOptions: ['Grano entero', 'Molido fino', 'Molido medio', 'Molido grueso'],
    description: 'Cuerpo denso y baja acidez, típico de los mejores cafés brasileños. Ideal para espresso o para quienes prefieren sabores intensos y achocolatados.',
    artInfo: {
      title: 'Arte de Minas Gerais',
      description: `La ilustración muestra un paisaje espacial agresivo y geométrico: planetas erosionados, explosiones de luz y una figura central en forma de diamante mecánico que flota sobre la superficie de un mundo desconocido.

El estilo combina estética retro-sci-fi con trazos de grabado y texturas granuladas que recuerdan pósters antiguos o cómics de ciencia ficción. La paleta reducida —verde, blanco y negro— refuerza un tono frío y misterioso.

Elementos claves:

El diamante central: parece un artefacto de navegación o un satélite alienígena diseñado para observar, medir o comunicar.

El horizonte planetario: líneas ásperas que transmiten desgaste y tiempo, como si se tratara de un mundo ya explorado y abandonado.

El entorno cósmico: explosiones, polvo estelar y planetas fracturados sugieren movimiento constante y caos.

La pieza refleja la idea de que el café de origen también es un “artefacto cósmico”: un punto de energía proveniente de un territorio específico, cargado de historia y formas únicas.`,
      artistName: 'Ramiro Ossa',
      artistDescription: `Ramiro Ossa es un ilustrador chileno especializado en gráfica espacial, inspirado por la estética pulp de los años 70 y por el grabado tradicional. Su obra mezcla precisión geométrica con texturas manuales, generando imágenes que se sienten antiguas y futuristas al mismo tiempo.

Características de su trabajo:

Uso de blanco y negro con acentos mínimos de color.

Figuras geométricas que funcionan como símbolos o artefactos.

Influencia fuerte del cómic clásico de ciencia ficción.

Trazos granulosos, líneas duras y una composición que prioriza el impacto visual.

Ossa ha trabajado en portadas de discos, merch de bandas, pósters de eventos alternativos y colaboraciones con proyectos independientes. Su objetivo es siempre el mismo: construir mundos que se sienten vastos, duros y llenos de energía.`,
      illustration: '/Minas Gerais-Ilustracion.png'
    }
  },
];
