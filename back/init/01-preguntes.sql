CREATE DATABASE IF NOT EXISTS quiz;
USE quiz;

CREATE TABLE IF NOT EXISTS preguntes (
    id_pregunta INT PRIMARY KEY,
    text_pregunta VARCHAR(255) NOT NULL,
    resposta1 VARCHAR(255) NOT NULL,
    resposta2 VARCHAR(255) NOT NULL,
    resposta3 VARCHAR(255) NOT NULL,
    resposta4 VARCHAR(255) NOT NULL,
    resposta_correcta INT NOT NULL,
    imatge VARCHAR(500)
);

INSERT INTO preguntes
(
    id_pregunta,
    text_pregunta,
    resposta1,
    resposta2,
    resposta3,
    resposta4,
    resposta_correcta,
    imatge
)
VALUES

(
    41,
    'A quin país pertany aquesta bandera?',
    'Corea del Sud',
    'Japó',
    'Vietnam',
    'Xina',
    2,
    'https://flagcdn.com/w640/jp.png'
),

(
    62,
    'A quin país pertany aquesta bandera?',
    'Noruega',
    'Dinamarca',
    'Suècia',
    'Finlàndia',
    3,
    'https://flagcdn.com/w640/se.png'
),

(
    133,
    'A quin país pertany aquesta bandera?',
    'Canadà',
    'Perú',
    'Estats Units',
    'Àustria',
    1,
    'https://flagcdn.com/w640/ca.png'
),

(
    554,
    'A quin país pertany aquesta bandera?',
    'Argentina',
    'Mèxic',
    'Colòmbia',
    'Brasil',
    4,
    'https://flagcdn.com/w640/br.png'
),

(
    75,
    'A quin país pertany aquesta bandera?',
    'Irlanda',
    'Itàlia',
    'Hongria',
    'França',
    2,
    'https://flagcdn.com/w640/it.png'
),

(
    86,
    'A quin país pertany aquesta bandera?',
    'Bèlgica',
    'Romania',
    'Alemanya',
    'Països Baixos',
    3,
    'https://flagcdn.com/w640/de.png'
),

(
    77,
    'A quin país pertany aquesta bandera?',
    'Austràlia',
    'Fiji',
    'Regne Unit',
    'Nova Zelanda',
    1,
    'https://flagcdn.com/w640/au.png'
),

(
    98,
    'A quin país pertany aquesta bandera?',
    'Bangladesh',
    'Sri Lanka',
    'Pakistan',
    'Índia',
    4,
    'https://flagcdn.com/w640/in.png'
),

(
    39,
    'A quin país pertany aquesta bandera?',
    'Israel',
    'Grècia',
    'Xipre',
    'Finlàndia',
    2,
    'https://flagcdn.com/w640/gr.png'
),

(
    13,
    'A quin país pertany aquesta bandera?',
    'Kenya',
    'Etiòpia',
    'Sud-àfrica',
    'Ghana',
    3,
    'https://flagcdn.com/w640/za.png'
),

(
    61,
    'A quin país pertany aquesta bandera?',
    'Argentina',
    'Guatemala',
    'Hondures',
    'Uruguai',
    1,
    'https://flagcdn.com/w640/ar.png'
),

(
    18,
    'A quin país pertany aquesta bandera?',
    'Marroc',
    'Turquia',
    'Algèria',
    'Tunísia',
    2,
    'https://flagcdn.com/w640/tr.png'
),

(
    63,
    'A quin país pertany aquesta bandera?',
    'Polònia',
    'Dinamarca',
    'Àustria',
    'Suïssa',
    4,
    'https://flagcdn.com/w640/ch.png'
),

(
    24,
    'A quin país pertany aquesta bandera?',
    'Japó',
    'Corea del Sud',
    'Mongòlia',
    'Corea del Nord',
    2,
    'https://flagcdn.com/w640/kr.png'
),

(
    55,
    'A quin país pertany aquesta bandera?',
    'Portugal',
    'Itàlia',
    'Mèxic',
    'Espanya',
    3,
    'https://flagcdn.com/w640/mx.png'
);