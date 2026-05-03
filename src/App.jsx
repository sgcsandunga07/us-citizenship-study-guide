import { useState, useEffect, useMemo } from "react";
const questions = [
// ── AMERICAN GOVERNMENT: A. Principles of American Government ──
{id:1,q:"What is the form of government of the United States?",a:"Republic / Constitution-based federal republic / Representative democracy",cat:"Principles of American Government",star:false,ctx:"The U.S. is a republic where citizens elect representatives to govern on their behalf. The Constitution establishes a federal system where power is shared between national and state governments. Unlike a direct democracy, citizens vote for leaders who make laws.",ctxEs:"EE.UU. es una república donde los ciudadanos eligen representantes. La Constitución establece un sistema federal donde el poder se comparte entre el gobierno nacional y los estatales."},
{id:2,q:"What is the supreme law of the land?",a:"(U.S.) Constitution",cat:"Principles of American Government",star:true,ctx:"Written in 1787 at the Constitutional Convention in Philadelphia, the Constitution replaced the weak Articles of Confederation. It is the oldest written national constitution still in use today and all laws must comply with it.",ctxEs:"Escrita en 1787 en la Convención Constitucional en Filadelfia, reemplazó los débiles Artículos de la Confederación. Es la constitución escrita más antigua aún vigente."},
{id:3,q:"Name one thing the U.S. Constitution does.",a:"Forms the government / Defines powers of government / Defines the parts of government / Protects the rights of the people",cat:"Principles of American Government",star:false,ctx:"The Constitution created three branches of government (legislative, executive, judicial) with checks and balances. The Bill of Rights (first 10 amendments) specifically protects individual freedoms.",ctxEs:"La Constitución creó tres ramas de gobierno con pesos y contrapesos. La Carta de Derechos (primeras 10 enmiendas) protege las libertades individuales."},
{id:4,q:'The U.S. Constitution starts with the words "We the People." What does "We the People" mean?',a:"Self-government / Popular sovereignty / Consent of the governed / People should govern themselves / (Example of) social contract",cat:"Principles of American Government",star:false,ctx:"'We the People' was revolutionary in 1787 — most governments derived power from kings. These words established that government authority comes from the consent of the governed, an Enlightenment idea from philosophers like John Locke and Rousseau.",ctxEs:"'Nosotros el Pueblo' fue revolucionario en 1787 — la mayoría de gobiernos derivaban poder de reyes. Estas palabras establecieron que la autoridad viene del consentimiento de los gobernados."},
{id:5,q:"How are changes made to the U.S. Constitution?",a:"Amendments / The amendment process",cat:"Principles of American Government",star:false,ctx:"The Framers made amendments intentionally difficult: 2/3 of Congress must propose and 3/4 of states must ratify. In 230+ years, only 27 amendments have been ratified out of thousands proposed.",ctxEs:"Los redactores hicieron las enmiendas difíciles: 2/3 del Congreso propone y 3/4 de estados ratifica. En 230+ años, solo 27 han sido ratificadas de miles propuestas."},
{id:6,q:"What does the Bill of Rights protect?",a:"(The basic) rights of Americans / (The basic) rights of people living in the United States",cat:"Principles of American Government",star:false,ctx:"Ratified in 1791, many states refused to approve the Constitution without these guaranteed freedoms. James Madison drafted them drawing from Virginia's Declaration of Rights and the Magna Carta (1215).",ctxEs:"Ratificada en 1791, muchos estados rehusaron aprobar la Constitución sin estas garantías. Madison las redactó basándose en la Declaración de Virginia y la Carta Magna (1215)."},
{id:7,q:"How many amendments does the U.S. Constitution have?",a:"Twenty-seven (27)",cat:"Principles of American Government",star:true,ctx:"The 27th Amendment (ratified 1992) was proposed in 1789 — taking 203 years! The most impactful amendments abolished slavery (13th), guaranteed equal protection (14th), and gave women the vote (19th).",ctxEs:"La Enmienda 27 (ratificada 1992) fue propuesta en 1789 — ¡tardó 203 años! Las más impactantes: abolición de esclavitud (13a), protección igualitaria (14a) y voto femenino (19a)."},
{id:8,q:"Why is the Declaration of Independence important?",a:"It says America is free from British control / It says all people are created equal / It identifies inherent rights / It identifies individual freedoms",cat:"Principles of American Government",star:false,ctx:"Adopted July 4, 1776, written primarily by Thomas Jefferson. The 56 signers risked execution for treason. It drew from John Locke's philosophy of natural rights and became a model for independence movements worldwide.",ctxEs:"Adoptada el 4 de julio de 1776, escrita por Thomas Jefferson. Los 56 firmantes arriesgaban ejecución por traición. Se inspiró en la filosofía de derechos naturales de John Locke."},
{id:9,q:"What founding document said the American colonies were free from Britain?",a:"Declaration of Independence",cat:"Principles of American Government",star:false,ctx:"The Continental Congress voted for independence on July 2, 1776. The Declaration's final text was approved on July 4. It formally severed ties with Britain and listed grievances against King George III.",ctxEs:"El Congreso Continental votó la independencia el 2 de julio de 1776. El texto final se aprobó el 4 de julio. Formalmente rompió lazos con Gran Bretaña."},
{id:10,q:"Name two important ideas from the Declaration of Independence and the U.S. Constitution.",a:"Equality / Liberty / Social contract / Natural rights / Limited government / Self-government",cat:"Principles of American Government",star:false,ctx:"These ideas came from Enlightenment thinkers: Locke (natural rights, social contract), Montesquieu (separation of powers), and Rousseau (popular sovereignty). They were radical concepts that challenged the divine right of kings.",ctxEs:"Estas ideas vinieron de pensadores de la Ilustración: Locke (derechos naturales), Montesquieu (separación de poderes) y Rousseau (soberanía popular). Desafiaron el derecho divino de los reyes."},
{id:11,q:'The words "Life, Liberty, and the pursuit of Happiness" are in what founding document?',a:"Declaration of Independence",cat:"Principles of American Government",star:false,ctx:"Jefferson adapted Locke's 'life, liberty, and property' to 'life, liberty, and the pursuit of happiness,' broadening the vision beyond property ownership to human flourishing.",ctxEs:"Jefferson adaptó 'vida, libertad y propiedad' de Locke a 'vida, libertad y búsqueda de la felicidad', ampliando la visión más allá de la propiedad."},
{id:12,q:"What is the economic system of the United States?",a:"Capitalism / Free market economy",cat:"Principles of American Government",star:true,ctx:"Adam Smith published 'The Wealth of Nations' in 1776 — the same year as the Declaration. His free market ideas deeply influenced the Founders. The system has evolved to include regulations but remains fundamentally market-based.",ctxEs:"Adam Smith publicó 'La Riqueza de las Naciones' en 1776. Sus ideas de mercado libre influyeron en los Fundadores. El sistema ha evolucionado pero sigue siendo de mercado."},
{id:13,q:"What is the rule of law?",a:"Everyone must follow the law / Leaders must obey the law / Government must obey the law / No one is above the law",cat:"Principles of American Government",star:false,ctx:"This concept traces to the Magna Carta (1215) when English nobles forced King John to accept limits on royal power. The Founders enshrined it to prevent the arbitrary rule they experienced under King George III.",ctxEs:"Se remonta a la Carta Magna (1215) cuando nobles obligaron al Rey Juan a aceptar límites. Los Fundadores lo consagraron para evitar el gobierno arbitrario de Jorge III."},
{id:14,q:"Many documents influenced the U.S. Constitution. Name one.",a:"Declaration of Independence / Articles of Confederation / Federalist Papers / Anti-Federalist Papers / Virginia Declaration of Rights / Fundamental Orders of Connecticut / Mayflower Compact / Iroquois Great Law of Peace",cat:"Principles of American Government",star:false,ctx:"The Iroquois Great Law of Peace, a centuries-old Native American constitution, may have influenced the Framers. The Mayflower Compact (1620) was America's first self-governing document. The Federalist Papers argued for ratification.",ctxEs:"La Gran Ley de Paz Iroquesa, una constitución nativa de siglos, pudo influir en los redactores. El Pacto del Mayflower (1620) fue el primer documento de autogobierno. Los Ensayos Federalistas argumentaron la ratificación."},
{id:15,q:"There are three branches of government. Why?",a:"So one part does not become too powerful / Checks and balances / Separation of powers",cat:"Principles of American Government",star:false,ctx:"Inspired by Montesquieu's 'The Spirit of the Laws' (1748). Madison argued in Federalist No. 51 that 'ambition must counteract ambition.' The President vetoes laws, Congress overrides vetoes, the Supreme Court strikes down unconstitutional laws.",ctxEs:"Inspirado en Montesquieu (1748). Madison argumentó que 'la ambición debe contrarrestar la ambición'. El Presidente veta leyes, el Congreso anula vetos, la Corte invalida leyes inconstitucionales."},

// ── AMERICAN GOVERNMENT: B. System of Government ──
{id:16,q:"Name the three branches of government.",a:"Legislative, executive, and judicial / Congress, president, and the courts",cat:"System of Government",star:false},
{id:17,q:"The President of the United States is in charge of which branch of government?",a:"Executive branch",cat:"System of Government",star:false},
{id:18,q:"What part of the federal government writes laws?",a:"(U.S.) Congress / (U.S. or national) legislature / Legislative branch",cat:"System of Government",star:false},
{id:19,q:"What are the two parts of the U.S. Congress?",a:"Senate and House (of Representatives)",cat:"System of Government",star:false,ctx:"The bicameral Congress resulted from the Great Compromise at the 1787 Convention. Large states wanted representation by population; small states wanted equal representation. The compromise gave both.",ctxEs:"El Congreso bicameral resultó del Gran Compromiso de 1787. Estados grandes querían representación por población; pequeños, igualitaria. El compromiso les dio ambas."},
{id:20,q:"Name one power of the U.S. Congress.",a:"Writes laws / Declares war / Makes the federal budget",cat:"System of Government",star:true},
{id:21,q:"How many U.S. senators are there?",a:"One hundred (100)",cat:"System of Government",star:false,ctx:"Each state gets exactly 2 senators regardless of population. Originally chosen by state legislatures; the 17th Amendment (1913) changed this to direct popular election.",ctxEs:"Cada estado tiene 2 senadores sin importar población. La Enmienda 17 (1913) cambió la elección a voto popular directo."},
{id:22,q:"How long is a term for a U.S. senator?",a:"Six (6) years",cat:"System of Government",star:false},
{id:23,q:"Who is one of your state's U.S. senators now?",a:"Ted Cruz (R) / John Cornyn (R)",cat:"System of Government",star:false},
{id:24,q:"How many voting members are in the House of Representatives?",a:"Four hundred thirty-five (435)",cat:"System of Government",star:false,ctx:"Fixed at 435 by the Reapportionment Act of 1929. After every 10-year census, seats are redistributed among states based on population.",ctxEs:"Fijado en 435 por la Ley de 1929. Cada 10 años, los escaños se redistribuyen según el censo."},
{id:25,q:"How long is a term for a member of the House of Representatives?",a:"Two (2) years",cat:"System of Government",star:false},
{id:26,q:"Why do U.S. representatives serve shorter terms than U.S. senators?",a:"To more closely follow public opinion",cat:"System of Government",star:false,ctx:"The Founders designed the House as the 'People's House' — closely accountable to voters with 2-year terms. Senators get 6 years to insulate them from short-term passions.",ctxEs:"Los Fundadores diseñaron la Cámara como la 'Cámara del Pueblo' — con mandatos de 2 años para rendir cuentas. Los senadores tienen 6 años para aislarse de pasiones a corto plazo."},
{id:27,q:"How many senators does each state have?",a:"Two (2)",cat:"System of Government",star:false},
{id:28,q:"Why does each state have two senators?",a:"Equal representation (for small states) / The Great Compromise (Connecticut Compromise)",cat:"System of Government",star:false,ctx:"The Great Compromise (Connecticut Compromise) of 1787 resolved the deadlock between large and small states. The Senate gives equal voice to every state; the House gives proportional representation.",ctxEs:"El Gran Compromiso de 1787 resolvió el conflicto entre estados grandes y pequeños. El Senado da voz igual a cada estado; la Cámara da representación proporcional."},
{id:29,q:"Name your U.S. representative.",a:"Depends on your congressional district — Texas has 38. Visit house.gov to find yours.",cat:"System of Government",star:false},
{id:30,q:"What is the name of the Speaker of the House of Representatives now?",a:"Mike Johnson",cat:"System of Government",star:true},
{id:31,q:"Who does a U.S. senator represent?",a:"Citizens of their state / People of their state",cat:"System of Government",star:false},
{id:32,q:"Who elects U.S. senators?",a:"Citizens from their state",cat:"System of Government",star:false},
{id:33,q:"Who does a member of the House of Representatives represent?",a:"Citizens in their (congressional) district / People in their district",cat:"System of Government",star:false},
{id:34,q:"Who elects members of the House of Representatives?",a:"Citizens from their (congressional) district",cat:"System of Government",star:false},
{id:35,q:"Some states have more representatives than other states. Why?",a:"(Because of) the state's population / (Because) they have more people",cat:"System of Government",star:false},
{id:36,q:"The President of the United States is elected for how many years?",a:"Four (4) years",cat:"System of Government",star:true,ctx:"Washington set the two-term precedent. FDR broke it by winning four terms (1932-1944). The 22nd Amendment (1951) formally limited presidents to two terms.",ctxEs:"Washington estableció el precedente de dos mandatos. FDR lo rompió ganando cuatro. La Enmienda 22 (1951) los limitó formalmente a dos."},
{id:37,q:"The President of the United States can serve only two terms. Why?",a:"(Because of) the 22nd Amendment / To keep the president from becoming too powerful",cat:"System of Government",star:false},
{id:38,q:"What is the name of the President of the United States now?",a:"Donald Trump",cat:"System of Government",star:true},
{id:39,q:"What is the name of the Vice President of the United States now?",a:"JD Vance",cat:"System of Government",star:true},
{id:40,q:"If the president can no longer serve, who becomes president?",a:"The Vice President (of the United States)",cat:"System of Government",star:false,ctx:"This has happened 9 times: 8 presidential deaths and Nixon's resignation (1974). The 25th Amendment (1967) formalized the process after JFK's assassination.",ctxEs:"Ha ocurrido 9 veces: 8 muertes presidenciales y la renuncia de Nixon (1974). La Enmienda 25 (1967) formalizó el proceso tras el asesinato de JFK."},
{id:41,q:"Name one power of the president.",a:"Signs bills into law / Vetoes bills / Enforces laws / Commander in Chief (of the military) / Chief diplomat / Appoints federal judges",cat:"System of Government",star:false},
{id:42,q:"Who is Commander in Chief of the U.S. military?",a:"The President (of the United States)",cat:"System of Government",star:false,ctx:"The Founders placed the military under civilian control to prevent dictatorships. Only Congress can declare war — a deliberate split. The last formal declaration of war was in 1942 (WWII).",ctxEs:"Los Fundadores pusieron los militares bajo control civil para prevenir dictaduras. Solo el Congreso declara guerra. La última declaración formal fue en 1942."},
{id:43,q:"Who signs bills to become laws?",a:"The President (of the United States)",cat:"System of Government",star:false},
{id:44,q:"Who vetoes bills?",a:"The President (of the United States)",cat:"System of Government",star:true,ctx:"Congress can override a veto with 2/3 vote in both chambers — only about 7% have been overridden. The first veto was by George Washington in 1792.",ctxEs:"El Congreso puede anular un veto con 2/3 de votos. Solo ~7% han sido anulados. El primer veto fue de Washington en 1792."},
{id:45,q:"Who appoints federal judges?",a:"The President (of the United States)",cat:"System of Government",star:false},
{id:46,q:"The executive branch has many parts. Name one.",a:"President (of the United States) / Cabinet / Federal departments and agencies",cat:"System of Government",star:false},
{id:47,q:"What does the President's Cabinet do?",a:"Advises the President (of the United States)",cat:"System of Government",star:false,ctx:"Not mentioned in the Constitution — it evolved from Washington's practice of meeting department heads. Today there are 15 executive departments, each headed by a Secretary confirmed by the Senate.",ctxEs:"No aparece en la Constitución — evolucionó de la práctica de Washington. Hoy hay 15 departamentos ejecutivos con Secretarios confirmados por el Senado."},
{id:48,q:"What are two Cabinet-level positions?",a:"Attorney General / Secretary of Agriculture / Secretary of Commerce / Secretary of Education / Secretary of Energy / Secretary of Health and Human Services / Secretary of Homeland Security / Secretary of Housing and Urban Development / Secretary of the Interior / Secretary of Labor / Secretary of State / Secretary of Transportation / Secretary of the Treasury / Secretary of Veterans Affairs / Secretary of War (Defense) / Vice President",cat:"System of Government",star:false},
{id:49,q:"Why is the Electoral College important?",a:"It decides who is elected president / It provides a compromise between the popular election of the president and congressional selection",cat:"System of Government",star:false,ctx:"Created as a compromise at the 1787 Convention between those who wanted Congress to choose the president and those who wanted direct popular vote. Each state gets electors equal to its total congressional delegation.",ctxEs:"Creado como compromiso en 1787 entre quienes querían que el Congreso eligiera al presidente y quienes querían voto popular directo. Cada estado tiene electores iguales a su delegación congressional."},
{id:50,q:"What is one part of the judicial branch?",a:"Supreme Court / Federal Courts",cat:"System of Government",star:false},
{id:51,q:"What does the judicial branch do?",a:"Reviews laws / Explains laws / Resolves disputes (disagreements) about the law / Decides if a law goes against the (U.S.) Constitution",cat:"System of Government",star:false,ctx:"Judicial review was established in Marbury v. Madison (1803) by Chief Justice John Marshall — making the Court a co-equal branch. One of the most important decisions in American legal history.",ctxEs:"La revisión judicial fue establecida en Marbury vs. Madison (1803) por el Juez Marshall — haciendo de la Corte una rama co-igual."},
{id:52,q:"What is the highest court in the United States?",a:"Supreme Court",cat:"System of Government",star:true},
{id:53,q:"How many seats are on the Supreme Court?",a:"Nine (9)",cat:"System of Government",star:false,ctx:"The Constitution doesn't specify the number — Congress sets it. It's been 9 since 1869. FDR tried to expand it in 1937 ('court-packing plan') but Congress rejected it.",ctxEs:"La Constitución no especifica el número. Ha sido 9 desde 1869. FDR intentó expandirla en 1937 pero el Congreso lo rechazó."},
{id:54,q:"How many Supreme Court justices are usually needed to decide a case?",a:"Five (5)",cat:"System of Government",star:false},
{id:55,q:"How long do Supreme Court justices serve?",a:"(For) life / Lifetime appointment / (Until) retirement",cat:"System of Government",star:false},
{id:56,q:"Supreme Court justices serve for life. Why?",a:"To be independent (of politics) / To limit outside (political) influence",cat:"System of Government",star:false},
{id:57,q:"Who is the Chief Justice of the United States now?",a:"John Roberts",cat:"System of Government",star:false},
{id:58,q:"Name one power that is only for the federal government.",a:"Print paper money / Mint coins / Declare war / Create an army / Make treaties / Set foreign policy",cat:"System of Government",star:false},
{id:59,q:"Name one power that is only for the states.",a:"Provide schooling and education / Provide protection (police) / Provide safety (fire departments) / Give a driver's license / Approve zoning and land use",cat:"System of Government",star:false,ctx:"The 10th Amendment reserves powers not given to the federal government to the states or the people. This 'federalism' lets states be 'laboratories of democracy' (Justice Brandeis, 1932).",ctxEs:"La Enmienda 10 reserva poderes no otorgados al federal a los estados. Este 'federalismo' permite a los estados ser 'laboratorios de democracia' (Juez Brandeis, 1932)."},
{id:60,q:"What is the purpose of the 10th Amendment?",a:"(It states that the) powers not given to the federal government belong to the states or to the people",cat:"System of Government",star:false},
{id:61,q:"Who is the governor of your state now?",a:"Greg Abbott (R)",cat:"System of Government",star:true},
{id:62,q:"What is the capital of your state?",a:"Austin",cat:"System of Government",star:false},

// ── AMERICAN GOVERNMENT: C. Rights and Responsibilities ──
{id:63,q:"There are four amendments to the U.S. Constitution about who can vote. Describe one of them.",a:"Citizens eighteen (18) and older (can vote) / You don't have to pay (a poll tax) to vote / Any citizen can vote (Women and men can vote) / A male citizen of any race (can vote)",cat:"Rights and Responsibilities",star:false,ctx:"Voting expanded over 200 years: 15th Amendment (1870, race), 19th (1920, women), 24th (1964, poll taxes), 26th (1971, age 18 — driven by Vietnam War: 'old enough to fight, old enough to vote').",ctxEs:"El voto se expandió en 200 años: Enmienda 15 (1870, raza), 19 (1920, mujeres), 24 (1964, impuestos electorales), 26 (1971, edad 18 — por Vietnam)."},
{id:64,q:"Who can vote in federal elections, run for federal office, and serve on a jury in the United States?",a:"Citizens / Citizens of the United States / U.S. citizens",cat:"Rights and Responsibilities",star:false},
{id:65,q:"What are three rights of everyone living in the United States?",a:"Freedom of expression / Freedom of speech / Freedom of assembly / Freedom to petition the government / Freedom of religion / The right to bear arms",cat:"Rights and Responsibilities",star:false,ctx:"These rights protect ALL people in the U.S., not just citizens. The Supreme Court confirmed in Yick Wo v. Hopkins (1886) that equal protection applies regardless of citizenship status.",ctxEs:"Estos derechos protegen a TODAS las personas en EE.UU., no solo ciudadanos. La Corte Suprema confirmó en Yick Wo vs. Hopkins (1886) que la protección aplica sin importar estatus."},
{id:66,q:"What do we show loyalty to when we say the Pledge of Allegiance?",a:"The United States / The flag",cat:"Rights and Responsibilities",star:true,ctx:"Written in 1892 by Francis Bellamy. 'Under God' was added in 1954 during the Cold War. The Supreme Court ruled in 1943 that students cannot be forced to recite it.",ctxEs:"Escrito en 1892 por Bellamy. 'Bajo Dios' se agregó en 1954 (Guerra Fría). La Corte dictaminó en 1943 que nadie puede ser obligado a recitarlo."},
{id:67,q:"Name two promises that new citizens make in the Oath of Allegiance.",a:"Give up loyalty to other countries / Defend the (U.S.) Constitution / Obey the laws of the United States / Serve in the military (if needed) / Serve (help, do important work for) the nation (if needed) / Be loyal to the United States",cat:"Rights and Responsibilities",star:false},
{id:68,q:"How can people become United States citizens?",a:"Be born in the United States, under the conditions set by the 14th Amendment / Naturalize / Derive citizenship (under conditions set by Congress)",cat:"Rights and Responsibilities",star:false,ctx:"The 14th Amendment (1868) established birthright citizenship after the Civil War. Naturalization requires residency, English/civics tests, and the Oath. About 600,000-900,000 people naturalize each year.",ctxEs:"La Enmienda 14 (1868) estableció la ciudadanía por nacimiento tras la Guerra Civil. La naturalización requiere residencia, exámenes de inglés/cívica y el Juramento. ~600,000-900,000 se naturalizan cada año."},
{id:69,q:"What are two examples of civic participation in the United States?",a:"Vote / Run for office / Join a political party / Help with a campaign / Join a civic group / Join a community group / Give an elected official your opinion (on an issue) / Contact elected officials / Support or oppose an issue or policy / Write to a newspaper",cat:"Rights and Responsibilities",star:false},
{id:70,q:"What is one way Americans can serve their country?",a:"Vote / Pay taxes / Obey the law / Serve in the military / Run for office / Work for local, state, or federal government",cat:"Rights and Responsibilities",star:false},
{id:71,q:"Why is it important to pay federal taxes?",a:"Required by law / All people pay to fund the federal government / Required by the (U.S.) Constitution (16th Amendment) / Civic duty",cat:"Rights and Responsibilities",star:false,ctx:"The federal income tax was established by the 16th Amendment in 1913. Before that, the government was funded mainly by tariffs. The first income tax was temporary during the Civil War (1861-1872).",ctxEs:"El impuesto sobre la renta fue establecido por la Enmienda 16 (1913). Antes, el gobierno se financiaba con aranceles. El primero fue temporal durante la Guerra Civil (1861-1872)."},
{id:72,q:"It is important for all men age 18 through 25 to register for the Selective Service. Name one reason why.",a:"Required by law / Civic duty / Makes the draft fair, if needed",cat:"Rights and Responsibilities",star:false,ctx:"Established in 1917 for WWI. The draft ended in 1973 after Vietnam. Carter reinstated registration in 1980 after the Soviet invasion of Afghanistan. No one has been drafted since 1973.",ctxEs:"Establecido en 1917 para la WWI. El reclutamiento terminó en 1973. Carter lo restableció en 1980 tras la invasión soviética de Afganistán."},

// ── AMERICAN HISTORY: A. Colonial Period and Independence ──
{id:73,q:"The colonists came to America for many reasons. Name one.",a:"Freedom / Political liberty / Religious freedom / Economic opportunity / Escape persecution",cat:"Colonial Period and Independence",star:false,ctx:"Pilgrims (1620) fled religious persecution. Maryland was a Catholic haven (1632), Pennsylvania for Quakers (1681). Jamestown, Virginia (1607) was founded as a business venture.",ctxEs:"Los Peregrinos (1620) huyeron de persecución religiosa. Maryland para católicos (1632), Pensilvania para cuáqueros (1681). Jamestown (1607) fue empresa comercial."},
{id:74,q:"Who lived in America before the Europeans arrived?",a:"American Indians / Native Americans",cat:"Colonial Period and Independence",star:true,ctx:"Native Americans lived on the continent for at least 15,000 years. When Columbus arrived in 1492, an estimated 5-15 million indigenous people lived in North America, speaking hundreds of languages.",ctxEs:"Los nativos americanos vivieron al menos 15,000 años. Cuando Colón llegó en 1492, ~5-15 millones vivían en América del Norte, hablando cientos de idiomas."},
{id:75,q:"What group of people was taken and sold as slaves?",a:"Africans / People from Africa",cat:"Colonial Period and Independence",star:false,ctx:"The first enslaved Africans arrived in Virginia in 1619. Over 250 years, ~12.5 million were forcibly transported. By 1860, nearly 4 million were enslaved. Abolished by the 13th Amendment (1865).",ctxEs:"Los primeros esclavizados llegaron a Virginia en 1619. En 250 años, ~12.5 millones fueron transportados. Para 1860, casi 4 millones estaban esclavizados. Abolida con la Enmienda 13 (1865)."},
{id:76,q:"What war did the Americans fight to win independence from Britain?",a:"American Revolution / The (American) Revolutionary War / War for (American) Independence",cat:"Colonial Period and Independence",star:false,ctx:"Fought from 1775-1783. France's alliance (secured by Benjamin Franklin) was crucial to victory. The war ended with the Treaty of Paris (1783) when Britain recognized American independence.",ctxEs:"Peleada de 1775-1783. La alianza con Francia (asegurada por Franklin) fue crucial. Terminó con el Tratado de París (1783) cuando Gran Bretaña reconoció la independencia."},
{id:77,q:"Name one reason why the Americans declared independence from Britain.",a:"High taxes / Taxation without representation / British soldiers stayed in Americans' houses / They did not have self-government / Boston Massacre / Boston Tea Party / Stamp Act / Sugar Act / Townshend Acts / Intolerable (Coercive) Acts",cat:"Colonial Period and Independence",star:false,ctx:"After the French and Indian War (1754-1763), Britain imposed taxes — Stamp Act (1765), Townshend Acts (1767), Tea Act (1773). 'No taxation without representation' became the rallying cry.",ctxEs:"Tras la Guerra Franco-Indígena (1754-1763), Gran Bretaña impuso impuestos. 'No hay impuestos sin representación' se convirtió en el grito de guerra."},
{id:78,q:"Who wrote the Declaration of Independence?",a:"(Thomas) Jefferson",cat:"Colonial Period and Independence",star:true,ctx:"Jefferson was only 33 when he drafted it in June 1776. A committee of five (including Franklin and Adams) reviewed it. Congress removed a passage condemning the slave trade.",ctxEs:"Jefferson tenía solo 33 años cuando la redactó en junio de 1776. Un comité de cinco la revisó. El Congreso eliminó un pasaje contra la trata de esclavos."},
{id:79,q:"When was the Declaration of Independence adopted?",a:"July 4, 1776",cat:"Colonial Period and Independence",star:false},
{id:80,q:"The American Revolution had many important events. Name one.",a:"(Battle of) Bunker Hill / Declaration of Independence / Washington Crossing the Delaware (Battle of Trenton) / (Battle of) Saratoga / Valley Forge (Encampment) / (Battle of) Yorktown (British surrender at Yorktown)",cat:"Colonial Period and Independence",star:false,ctx:"Saratoga (1777) was the turning point — it convinced France to ally with America. Valley Forge (winter 1777-78) tested the army's resolve. Yorktown (1781) was the final major battle.",ctxEs:"Saratoga (1777) fue el punto de inflexión — convenció a Francia de aliarse. Valley Forge (invierno 1777-78) probó la resistencia del ejército. Yorktown (1781) fue la última gran batalla."},
{id:81,q:"There were 13 original states. Name five.",a:"New Hampshire / Massachusetts / Rhode Island / Connecticut / New York / New Jersey / Pennsylvania / Delaware / Maryland / Virginia / North Carolina / South Carolina / Georgia",cat:"Colonial Period and Independence",star:false},
{id:82,q:"What founding document was written in 1787?",a:"(U.S.) Constitution",cat:"Colonial Period and Independence",star:false,ctx:"Drafted during the hot summer of 1787 in Philadelphia's Independence Hall — the same building where the Declaration was signed 11 years earlier. Signed September 17, now Constitution Day.",ctxEs:"Redactada en el verano de 1787 en Independence Hall — el mismo edificio donde se firmó la Declaración. Firmada el 17 de septiembre, ahora Día de la Constitución."},
{id:83,q:"The Federalist Papers supported the passage of the U.S. Constitution. Name one of the writers.",a:"(James) Madison / (Alexander) Hamilton / (John) Jay / Publius",cat:"Colonial Period and Independence",star:false,ctx:"85 essays published in New York newspapers (1787-1788) under 'Publius.' Hamilton wrote ~51, Madison ~29, Jay 5. They argued against Anti-Federalists who feared a too-powerful central government.",ctxEs:"85 ensayos publicados en periódicos de Nueva York (1787-1788) bajo 'Publius'. Hamilton ~51, Madison ~29, Jay 5. Argumentaron contra los Anti-Federalistas."},
{id:84,q:"Why were the Federalist Papers important?",a:"They helped people understand the (U.S.) Constitution / They supported passing the (U.S.) Constitution",cat:"Colonial Period and Independence",star:false},
{id:85,q:"Benjamin Franklin is famous for many things. Name one.",a:"Founded the first free public libraries / First Postmaster General of the United States / Helped write the Declaration of Independence / Inventor / U.S. diplomat",cat:"Colonial Period and Independence",star:false,ctx:"Franklin (1706-1790): inventor (lightning rod, bifocals), scientist, printer, diplomat, statesman. At 81, the oldest delegate at the Convention. His diplomacy securing France's alliance was crucial.",ctxEs:"Franklin (1706-1790): inventor, científico, impresor, diplomático. A los 81, el delegado más viejo. Su diplomacia con Francia fue crucial para la independencia."},
{id:86,q:"George Washington is famous for many things. Name one.",a:"'Father of Our Country' / First president of the United States / General of the Continental Army / President of the Constitutional Convention",cat:"Colonial Period and Independence",star:true,ctx:"Washington (1732-1799) led the army 8 years, presided over the Convention, and served as first President. He voluntarily stepped down after two terms. King George III called him 'the greatest man in the world.'",ctxEs:"Washington dirigió el ejército 8 años, presidió la Convención y fue primer Presidente. Renunció tras dos mandatos. Jorge III lo llamó 'el hombre más grande del mundo'."},
{id:87,q:"Thomas Jefferson is famous for many things. Name one.",a:"Writer of the Declaration of Independence / Third president of the United States / Doubled the size of the United States (Louisiana Purchase) / First Secretary of State / Founded the University of Virginia / Writer of the Virginia Statute on Religious Freedom",cat:"Colonial Period and Independence",star:false},
{id:88,q:"James Madison is famous for many things. Name one.",a:"'Father of the Constitution' / Fourth president of the United States / President during the War of 1812 / One of the writers of the Federalist Papers",cat:"Colonial Period and Independence",star:false},
{id:89,q:"Alexander Hamilton is famous for many things. Name one.",a:"First Secretary of the Treasury / One of the writers of the Federalist Papers / Helped establish the First Bank of the United States / Aide to General George Washington / Member of the Continental Congress",cat:"Colonial Period and Independence",star:false},

// ── AMERICAN HISTORY: B. 1800s ──
{id:90,q:"What territory did the United States buy from France in 1803?",a:"Louisiana Territory / Louisiana",cat:"The 1800s",star:false,ctx:"The Louisiana Purchase doubled the U.S. — 828,000 square miles for ~$15 million (~4 cents/acre). Napoleon sold it to fund European wars. Jefferson had doubts about constitutionality but proceeded.",ctxEs:"La Compra de Luisiana duplicó EE.UU. — 828,000 mi² por ~$15M (~4¢/acre). Napoleón la vendió para financiar guerras. Jefferson tenía dudas constitucionales."},
{id:91,q:"Name one war fought by the United States in the 1800s.",a:"War of 1812 / Mexican-American War / Civil War / Spanish-American War",cat:"The 1800s",star:false},
{id:92,q:"Name the U.S. war between the North and the South.",a:"The Civil War",cat:"The 1800s",star:false,ctx:"The Civil War (1861-1865) was the deadliest U.S. conflict: ~620,000-750,000 killed. Eleven Southern states seceded after Lincoln's election. Ended with Confederate surrender at Appomattox.",ctxEs:"La Guerra Civil (1861-1865) fue el conflicto más mortífero: ~620,000-750,000 muertos. Once estados se separaron tras la elección de Lincoln. Terminó en Appomattox."},
{id:93,q:"The Civil War had many important events. Name one.",a:"(Battle of) Fort Sumter / Emancipation Proclamation / (Battle of) Vicksburg / (Battle of) Gettysburg / Sherman's March / (Surrender at) Appomattox / (Battle of) Antietam/Sharpsburg / Lincoln was assassinated",cat:"The 1800s",star:false},
{id:94,q:"Abraham Lincoln is famous for many things. Name one.",a:"Freed the slaves (Emancipation Proclamation) / Saved (or preserved) the Union / Led the United States during the Civil War / 16th president of the United States / Delivered the Gettysburg Address",cat:"The 1800s",star:true,ctx:"Lincoln (1809-1865): self-educated, born in a log cabin. Guided the nation through its greatest crisis. Assassinated by John Wilkes Booth 5 days after the war ended.",ctxEs:"Lincoln (1809-1865): autodidacta, nacido en cabaña de troncos. Guió la nación en su mayor crisis. Asesinado por Booth 5 días después del fin de la guerra."},
{id:95,q:"What did the Emancipation Proclamation do?",a:"Freed the slaves / Freed slaves in the Confederacy / Freed slaves in the Confederate states / Freed slaves in most Southern states",cat:"The 1800s",star:false,ctx:"Issued January 1, 1863. A strategic wartime measure freeing slaves only in Confederate states. It transformed the war into a fight for freedom and let African Americans enlist — ~180,000 Black soldiers served.",ctxEs:"Emitida el 1 de enero de 1863. Liberó esclavos solo en estados Confederados. Transformó la guerra en lucha por la libertad. ~180,000 soldados negros sirvieron."},
{id:96,q:"What U.S. war ended slavery?",a:"The Civil War",cat:"The 1800s",star:false},
{id:97,q:"What amendment says all persons born or naturalized in the United States, and subject to the jurisdiction thereof, are U.S. citizens?",a:"14th Amendment",cat:"The 1800s",star:false,ctx:"Ratified in 1868, this post-Civil War amendment established birthright citizenship and equal protection. It has become one of the most frequently cited amendments in constitutional law.",ctxEs:"Ratificada en 1868, esta enmienda post-Guerra Civil estableció ciudadanía por nacimiento y protección igualitaria. Es una de las más citadas en derecho constitucional."},
{id:98,q:"When did all men get the right to vote?",a:"After the Civil War / During Reconstruction / (With the) 15th Amendment / 1870",cat:"The 1800s",star:false},
{id:99,q:"Name one leader of the women's rights movement in the 1800s.",a:"Susan B. Anthony / Elizabeth Cady Stanton / Sojourner Truth / Harriet Tubman / Lucretia Mott / Lucy Stone",cat:"The 1800s",star:false,ctx:"Anthony was arrested in 1872 for voting. She and Stanton fought 50 years for suffrage. Anthony died 14 years before the 19th Amendment (1920) granted women the vote.",ctxEs:"Anthony fue arrestada en 1872 por votar. Ella y Stanton lucharon 50 años por el sufragio. Anthony murió 14 años antes de que la Enmienda 19 (1920) lo concediera."},

// ── AMERICAN HISTORY: C. Recent American History ──
{id:100,q:"Name one war fought by the United States in the 1900s.",a:"World War I / World War II / Korean War / Vietnam War / (Persian) Gulf War",cat:"Recent American History",star:false},
{id:101,q:"Why did the United States enter World War I?",a:"Because Germany attacked U.S. (civilian) ships / To support the Allied Powers / To oppose the Central Powers",cat:"Recent American History",star:false,ctx:"Wilson kept the U.S. neutral until Germany's unrestricted submarine warfare and the Zimmermann Telegram (proposing a German-Mexican alliance) pushed America to enter in 1917.",ctxEs:"Wilson mantuvo neutralidad hasta que la guerra submarina alemana y el Telegrama Zimmermann empujaron a EE.UU. a entrar en 1917."},
{id:102,q:"When did all women get the right to vote?",a:"1920 / After World War I / (With the) 19th Amendment",cat:"Recent American History",star:false},
{id:103,q:"What was the Great Depression?",a:"Longest economic recession in modern history",cat:"Recent American History",star:false},
{id:104,q:"When did the Great Depression start?",a:"The Great Crash (1929) / Stock market crash of 1929",cat:"Recent American History",star:false},
{id:105,q:"Who was president during the Great Depression and World War II?",a:"(Franklin) Roosevelt",cat:"Recent American History",star:false,ctx:"FDR served 4 terms (1933-1945). He launched the New Deal (Social Security, SEC, public works) to combat the Depression. After Pearl Harbor (1941), he led the nation through WWII. Died April 1945.",ctxEs:"FDR sirvió 4 mandatos (1933-1945). Lanzó el New Deal (Seguro Social, obras públicas). Tras Pearl Harbor lideró la WWII. Murió en abril 1945."},
{id:106,q:"Why did the United States enter World War II?",a:"(Bombing of) Pearl Harbor / Japanese attacked Pearl Harbor / To support the Allied Powers / To oppose the Axis Powers",cat:"Recent American History",star:false,ctx:"Japan bombed Pearl Harbor on December 7, 1941. The Axis (Germany, Italy, Japan) fought the Allies (U.S., Britain, Soviet Union). Germany surrendered May 1945; Japan after Hiroshima and Nagasaki, August 1945.",ctxEs:"Japón bombardeó Pearl Harbor el 7 de diciembre de 1941. El Eje vs. Aliados. Alemania se rindió mayo 1945; Japón tras Hiroshima y Nagasaki, agosto 1945."},
{id:107,q:"Dwight Eisenhower is famous for many things. Name one.",a:"General during World War II / President at the end of (during) the Korean War / 34th president of the United States / Signed the Federal-Aid Highway Act of 1956 (Created the Interstate System)",cat:"Recent American History",star:false,ctx:"Eisenhower led D-Day (June 6, 1944, Normandy) — the largest amphibious operation in history. As President he built the Interstate Highway System and warned about the 'military-industrial complex.'",ctxEs:"Eisenhower dirigió el Día D (6 junio 1944, Normandía). Como Presidente construyó las Autopistas Interestatales y advirtió sobre el 'complejo militar-industrial'."},
{id:108,q:"Who was the United States' main rival during the Cold War?",a:"Soviet Union / USSR / Russia",cat:"Recent American History",star:false},
{id:109,q:"During the Cold War, what was one main concern of the United States?",a:"Communism / Nuclear war",cat:"Recent American History",star:false,ctx:"The Cold War (1947-1991): Korean War, Vietnam War, Cuban Missile Crisis (1962), Space Race, nuclear arms race. Ended with the fall of the Berlin Wall (1989) and the dissolution of the USSR (1991).",ctxEs:"Guerra Fría (1947-1991): Corea, Vietnam, Crisis de Misiles (1962), Carrera Espacial. Terminó con la caída del Muro de Berlín (1989) y la disolución de la URSS (1991)."},
{id:110,q:"Why did the United States enter the Korean War?",a:"To stop the spread of communism",cat:"Recent American History",star:false},
{id:111,q:"Why did the United States enter the Vietnam War?",a:"To stop the spread of communism",cat:"Recent American History",star:false},
{id:112,q:"What did the civil rights movement do?",a:"Fought to end racial discrimination",cat:"Recent American History",star:false,ctx:"The movement (1950s-1960s) fought legalized segregation. Key events: Brown v. Board of Education (1954), Montgomery Bus Boycott (1955), March on Washington (1963), Civil Rights Act (1964), Voting Rights Act (1965).",ctxEs:"El movimiento (1950s-60s) luchó contra la segregación. Eventos clave: Brown vs. Board (1954), Boicot de Montgomery (1955), Marcha sobre Washington (1963), Ley de Derechos Civiles (1964)."},
{id:113,q:"Martin Luther King, Jr. is famous for many things. Name one.",a:"Fought for civil rights / Worked for equality for all Americans / Worked to ensure that people would 'not be judged by the color of their skin, but by the content of their character'",cat:"Recent American History",star:true,ctx:"Dr. King (1929-1968) used nonviolent resistance inspired by Gandhi. His 'I Have a Dream' speech (1963) is one of history's greatest. Nobel Peace Prize 1964. Assassinated in Memphis, April 4, 1968.",ctxEs:"King (1929-1968) usó resistencia no violenta inspirada en Gandhi. 'Tengo un Sueño' (1963) es una de las grandes oraciones. Nobel de la Paz 1964. Asesinado en Memphis, 4 abril 1968."},
{id:114,q:"Why did the United States enter the Persian Gulf War?",a:"To force the Iraqi military from Kuwait",cat:"Recent American History",star:false},
{id:115,q:"What major event happened on September 11, 2001 in the United States?",a:"Terrorists attacked the United States / Terrorists took over two planes and crashed them into the World Trade Center in New York City / Terrorists took over a plane and crashed into the Pentagon in Arlington, Virginia / Terrorists took over a plane originally aimed at Washington, D.C., and crashed in a field in Pennsylvania",cat:"Recent American History",star:true,ctx:"19 al-Qaeda terrorists hijacked 4 planes. Two hit the World Trade Center (collapsed), one hit the Pentagon, one crashed in Pennsylvania after passengers fought back. Nearly 3,000 killed. Led to War on Terror and creation of Homeland Security.",ctxEs:"19 terroristas secuestraron 4 aviones. Dos impactaron las Torres Gemelas, uno el Pentágono, uno se estrelló en Pensilvania. ~3,000 muertos. Llevó a la Guerra contra el Terrorismo."},
{id:116,q:"Name one U.S. military conflict after the September 11, 2001 attacks.",a:"(Global) War on Terror / War in Afghanistan / War in Iraq",cat:"Recent American History",star:false},
{id:117,q:"Name one American Indian tribe in the United States.",a:"Apache / Blackfeet / Cayuga / Cherokee / Cheyenne / Chippewa / Choctaw / Creek / Crow / Hopi / Huron / Inupiat / Lakota / Mohawk / Mohegan / Navajo / Oneida / Onondaga / Pueblo / Seminole / Seneca / Shawnee / Sioux / Teton / Tuscarora",cat:"Recent American History",star:false,ctx:"There are 574 federally recognized tribes. The Navajo Nation is the largest reservation (27,000 sq mi). The Cherokee Nation is the largest tribe by enrollment (~400,000). The Iroquois Confederacy may have influenced the Constitution.",ctxEs:"Hay 574 tribus reconocidas. La Nación Navajo es la reserva más grande (27,000 mi²). La Cherokee la tribu más grande (~400,000). La Confederación Iroquesa pudo influir en la Constitución."},
{id:118,q:"Name one example of an American innovation.",a:"Light bulb / Automobile (cars, internal combustion engine) / Skyscrapers / Airplane / Assembly line / Landing on the moon / Integrated circuit (IC)",cat:"Recent American History",star:false},

// ── SYMBOLS AND HOLIDAYS: A. Symbols ──
{id:119,q:"What is the capital of the United States?",a:"Washington, D.C.",cat:"Symbols",star:false,ctx:"Became the capital in 1800, purpose-built on land from Maryland and Virginia. Designed by French architect L'Enfant. Located between Northern and Southern states as a Hamilton-Jefferson compromise.",ctxEs:"Capital desde 1800, construida en terreno de Maryland y Virginia. Diseñada por el arquitecto francés L'Enfant. Ubicada entre Norte y Sur como compromiso Hamilton-Jefferson."},
{id:120,q:"Where is the Statue of Liberty?",a:"New York (Harbor) / Liberty Island",cat:"Symbols",star:false,ctx:"A gift from France in 1886. Designed by Bartholdi with a steel framework by Gustave Eiffel. Stands 305 feet tall. For millions of immigrants arriving by ship, it was their first sight of America.",ctxEs:"Regalo de Francia en 1886. Diseñada por Bartholdi con estructura de Eiffel. 305 pies. Para millones de inmigrantes, fue su primera imagen de América."},
{id:121,q:"Why does the flag have 13 stripes?",a:"(Because there were) 13 original colonies / (Because the stripes) represent the original colonies",cat:"Symbols",star:true,ctx:"The first flag was adopted June 14, 1777 (Flag Day). The 13 stripes have remained constant even as stars were added. Legend credits Betsy Ross with sewing the first flag, though historians debate this.",ctxEs:"La primera bandera fue adoptada el 14 de junio de 1777 (Día de la Bandera). Las 13 franjas se mantienen constantes. La leyenda de Betsy Ross es debatida."},
{id:122,q:"Why does the flag have 50 stars?",a:"(Because there is) one star for each state / (Because) each star represents a state / (Because there are) 50 states",cat:"Symbols",star:false,ctx:"Updated 27 times as states joined. The 50-star design was created in 1958 by Robert Heft, a 17-year-old student, as a school project — he got a B-. It became official July 4, 1960 when Hawaii joined.",ctxEs:"Actualizada 27 veces. El diseño de 50 estrellas fue creado en 1958 por Robert Heft, estudiante de 17 años — sacó B-. Oficial desde el 4 de julio de 1960 con Hawái."},
{id:123,q:"What is the name of the national anthem?",a:"The Star-Spangled Banner",cat:"Symbols",star:false,ctx:"Francis Scott Key wrote the lyrics in 1814 watching the British bombardment of Fort McHenry in Baltimore (War of 1812). Seeing the flag still flying at dawn inspired the poem. Official anthem since 1931.",ctxEs:"Key escribió la letra en 1814 viendo el bombardeo de Fort McHenry (Guerra de 1812). Ver la bandera al amanecer inspiró el poema. Himno oficial desde 1931."},
{id:124,q:'The Nation\'s first motto was "E Pluribus Unum." What does that mean?',a:"Out of many, one / We all become one",cat:"Symbols",star:false,ctx:"Latin for 'Out of many, one' — reflecting the union of 13 colonies into one nation. It appeared on the Great Seal of the United States adopted in 1782 and remains on U.S. currency today.",ctxEs:"Latín para 'De muchos, uno' — reflejando la unión de 13 colonias en una nación. Apareció en el Gran Sello de EE.UU. (1782) y sigue en la moneda actual."},

// ── SYMBOLS AND HOLIDAYS: B. Holidays ──
{id:125,q:"What is Independence Day?",a:"A holiday to celebrate U.S. independence (from Britain) / The country's birthday",cat:"Holidays",star:false,ctx:"First celebrated July 4, 1777. John Adams and Thomas Jefferson both died on July 4, 1826 — exactly 50 years after the Declaration was adopted.",ctxEs:"Primera celebración: 4 julio 1777. Adams y Jefferson murieron el 4 julio 1826 — exactamente 50 años después de la Declaración."},
{id:126,q:"Name three national U.S. holidays.",a:"New Year's Day / Martin Luther King, Jr. Day / Presidents Day (Washington's Birthday) / Memorial Day / Juneteenth / Independence Day / Labor Day / Columbus Day / Veterans Day / Thanksgiving Day / Christmas Day",cat:"Holidays",star:true,ctx:"Juneteenth (June 19) became a federal holiday in 2021, commemorating the end of slavery in 1865. MLK Day was signed into law in 1983. Memorial Day originated after the Civil War.",ctxEs:"Juneteenth (19 de junio) se convirtió en festivo federal en 2021, conmemorando el fin de la esclavitud. El Día de MLK fue ley en 1983. Memorial Day se originó tras la Guerra Civil."},
{id:127,q:"What is Memorial Day?",a:"A holiday to honor soldiers who died in military service",cat:"Holidays",star:false},
{id:128,q:"What is Veterans Day?",a:"A holiday to honor people in the (U.S.) military / A holiday to honor people who have served (in the U.S. military)",cat:"Holidays",star:false},
];
const categories = [...new Set(questions.map(q => q.cat))];
const catIcons = {"Principles of American Government":"⚖️","System of Government":"🏛️","Rights and Responsibilities":"🗳️","Colonial Period and Independence":"🔔","The 1800s":"📜","Recent American History":"🌍","Symbols":"🇺🇸","Holidays":"🎆"};
const catAccent = {"Principles of American Government":"#2563eb","System of Government":"#059669","Rights and Responsibilities":"#7c3aed","Colonial Period and Independence":"#d97706","The 1800s":"#dc2626","Recent American History":"#0891b2","Symbols":"#ca8a04","Holidays":"#e11d48"};

const AnswerList = ({text}) => {
  const items = text.split("/").map(s => s.trim()).filter(Boolean);
  if (items.length <= 1) return <span>{text}</span>;
  return <ul style={{margin:0,padding:"4px 0 0 0",listStyle:"none"}}>{items.map((it,i) => <li key={i} style={{fontSize:14,lineHeight:1.8,paddingLeft:16,position:"relative"}}><span style={{position:"absolute",left:0,color:"#2563eb",fontWeight:700}}>•</span>{it}</li>)}</ul>;
};

const speakAnswer = a => a.replace(/\s*\/\s*/g, ". Or: ").replace(/[()]/g, "");
const shuffle = a => {const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;};

const speak = (text, onEnd) => {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US"; u.rate = 0.85; u.pitch = 1;
  const voices = window.speechSynthesis.getVoices();
  const v = voices.find(v => v.lang==="en-US"&&v.name.includes("Google")) || voices.find(v => v.lang==="en-US") || voices[0];
  if (v) u.voice = v;
  if (onEnd) u.onend = onEnd;
  window.speechSynthesis.speak(u);
};

const AudioBtn = ({text, size="sm"}) => {
  const [on, setOn] = useState(false);
  const play = e => { e.stopPropagation(); setOn(true); speak(text, ()=>setOn(false)); };
  const stop = e => { e.stopPropagation(); window.speechSynthesis.cancel(); setOn(false); };
  return <button onClick={on?stop:play} style={{padding:size==="sm"?"4px 8px":"6px 12px",fontSize:size==="sm"?12:14,background:on?"#2563eb":"#f1f5f9",color:on?"#fff":"#64748b",border:"1px solid #e2e8f0",borderRadius:8,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:3,flexShrink:0,transition:"all 0.15s"}}>{on?"⏹":"🔊"}</button>;
};

export default function App() {
  const saved = useMemo(() => { try { return JSON.parse(localStorage.getItem("s3")||"{}"); } catch { return {}; } }, []);
  const [mode, setMode] = useState(saved.mode||"menu");
  const [selectedCat, setSelectedCat] = useState(saved.selectedCat||null);
  const [currentIdx, setCurrentIdx] = useState(saved.currentIdx||0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showContext, setShowContext] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState(()=>{ try { return JSON.parse(localStorage.getItem("qQ3")||"[]"); } catch { return []; } });
  const [quizAnswers, setQuizAnswers] = useState(()=>{ try { return JSON.parse(localStorage.getItem("qA3")||"{}"); } catch { return {}; } });
  const [quizShowCtx, setQuizShowCtx] = useState({});
  const [knownSet, setKnownSet] = useState(()=>{ try { return new Set(JSON.parse(localStorage.getItem("k3")||"[]")); } catch { return new Set(); } });
  const [studyFilter, setStudyFilter] = useState(saved.studyFilter||"all");
  const [quizSize, setQuizSize] = useState(saved.quizSize||10);
  const [quizSubmitted, setQuizSubmitted] = useState(saved.quizSubmitted||false);
  const [animKey, setAnimKey] = useState(0);
  const [ctxLang, setCtxLang] = useState(()=>{ try { return localStorage.getItem("c3")||"en"; } catch { return "en"; } });
  const [starOnly, setStarOnly] = useState(false);
  const getCtx = q => ctxLang==="es"&&q.ctxEs ? q.ctxEs : q.ctx;

  useEffect(()=>{ try{localStorage.setItem("s3",JSON.stringify({mode,selectedCat,currentIdx,studyFilter,quizSize,quizSubmitted}));}catch{} },[mode,selectedCat,currentIdx,studyFilter,quizSize,quizSubmitted]);
  useEffect(()=>{ try{localStorage.setItem("k3",JSON.stringify([...knownSet]));}catch{} },[knownSet]);
  useEffect(()=>{ try{localStorage.setItem("c3",ctxLang);}catch{} },[ctxLang]);
  useEffect(()=>{ try{localStorage.setItem("qQ3",JSON.stringify(quizQuestions));}catch{} },[quizQuestions]);
  useEffect(()=>{ try{localStorage.setItem("qA3",JSON.stringify(quizAnswers));}catch{} },[quizAnswers]);
  useEffect(()=>{ window.speechSynthesis?.getVoices(); const h=()=>window.speechSynthesis?.getVoices(); window.speechSynthesis?.addEventListener?.("voiceschanged",h); return ()=>window.speechSynthesis?.removeEventListener?.("voiceschanged",h); },[]);

  const filteredQuestions = useMemo(()=>{
    let qs = selectedCat ? questions.filter(q=>q.cat===selectedCat) : questions;
    if(starOnly) qs=qs.filter(q=>q.star);
    if(studyFilter==="unknown") qs=qs.filter(q=>!knownSet.has(q.id));
    if(studyFilter==="known") qs=qs.filter(q=>knownSet.has(q.id));
    return qs;
  },[selectedCat,studyFilter,knownSet,starOnly]);

  const currentQ = filteredQuestions[currentIdx];
  const toggleKnown = id => setKnownSet(p=>{const n=new Set(p);n.has(id)?n.delete(id):n.add(id);return n;});
  const startStudy = cat => { setSelectedCat(cat); try{const p=JSON.parse(localStorage.getItem("cp3")||"{}");setCurrentIdx(p[cat||"__a"]||0);}catch{setCurrentIdx(0);} setShowAnswer(false);setShowContext(false);setMode("study");setAnimKey(k=>k+1); };
  const startQuiz = () => { let pool=selectedCat?questions.filter(q=>q.cat===selectedCat):questions; if(starOnly)pool=pool.filter(q=>q.star); setQuizQuestions(shuffle(pool).slice(0,quizSize)); setQuizAnswers({});setQuizShowCtx({});setQuizSubmitted(false);setMode("quiz"); };
  const nav = dir => { const next=currentIdx+dir; if(next>=0&&next<filteredQuestions.length){setCurrentIdx(next);setShowAnswer(false);setShowContext(false);setAnimKey(k=>k+1);try{const p=JSON.parse(localStorage.getItem("cp3")||"{}");p[selectedCat||"__a"]=next;localStorage.setItem("cp3",JSON.stringify(p));}catch{}} };
  const progress = questions.length>0?Math.round((knownSet.size/questions.length)*100):0;

  const W = {bg:"#f8fafc",card:"#ffffff",cardBorder:"#e2e8f0",sub:"#64748b",text:"#0f172a",muted:"#94a3b8",pill:"#f1f5f9",pillActive:"#e2e8f0"};
  const font = "'Segoe UI',system-ui,-apple-system,sans-serif";

  // ─── MENU ───
  if(mode==="menu") return (
    <div style={{minHeight:"100vh",background:W.bg,padding:"24px 16px",fontFamily:font}}>
      <div style={{maxWidth:720,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:28,paddingTop:12}}>
          <div style={{fontSize:44,marginBottom:4}}>🇺🇸</div>
          <h1 style={{color:W.text,fontSize:26,fontWeight:800,margin:0}}>U.S. Citizenship Exam</h1>
          <p style={{color:W.sub,fontSize:14,margin:"6px 0 0"}}>128 Official USCIS 2025 Questions</p>
          <p style={{color:W.sub,fontSize:12,margin:"6px 0 0"}}>Created by <span style={{color:"#1e293b",fontSize:16,fontWeight:700}}>Sandra Chávez</span></p>
          <p style={{color:"#2563eb",fontSize:12,fontWeight:500,margin:"2px 0 0"}}>Only for personal study purposes, for Texas</p>
          <div style={{display:"flex",gap:8,justifyContent:"center",marginTop:12,flexWrap:"wrap"}}>
            <button onClick={()=>setCtxLang(l=>l==="en"?"es":"en")} style={{background:W.pill,color:"#d97706",border:"1px solid #fcd34d",borderRadius:20,padding:"5px 14px",fontSize:12,fontWeight:600,cursor:"pointer"}}>🌐 {ctxLang==="en"?"Context: EN → ES":"Contexto: ES → EN"}</button>
            <button onClick={()=>setStarOnly(s=>!s)} style={{background:starOnly?"#7c3aed":W.pill,color:starOnly?"#fff":"#7c3aed",border:"1px solid #c4b5fd",borderRadius:20,padding:"5px 14px",fontSize:12,fontWeight:600,cursor:"pointer"}}>⭐ 65/20 {starOnly?"ON":"OFF"}</button>
          </div>
          <div style={{marginTop:20,background:W.card,borderRadius:12,padding:14,border:`1px solid ${W.cardBorder}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <span style={{color:W.sub,fontSize:12}}>Progress</span>
              <span style={{color:"#059669",fontSize:14,fontWeight:700}}>{knownSet.size}/{questions.length}</span>
            </div>
            <div style={{background:W.pill,borderRadius:8,height:8,overflow:"hidden"}}>
              <div style={{background:"linear-gradient(90deg,#2563eb,#7c3aed)",height:"100%",width:`${progress}%`,borderRadius:8,transition:"width 0.5s"}}/>
            </div>
            {knownSet.size>0&&<button onClick={()=>{setKnownSet(new Set());try{["cp3","s3","qQ3","qA3"].forEach(k=>localStorage.removeItem(k));}catch{}}} style={{marginTop:6,background:"none",border:"none",color:W.muted,fontSize:10,cursor:"pointer",textDecoration:"underline"}}>Reset</button>}
          </div>
        </div>

        {(()=>{try{const s=JSON.parse(localStorage.getItem("s3")||"{}");const p=JSON.parse(localStorage.getItem("cp3")||"{}");if(s.mode==="study"){const pos=p[s.selectedCat||"__a"]||0;if(pos>0)return<button onClick={()=>startStudy(s.selectedCat)} style={{width:"100%",background:"linear-gradient(135deg,#059669,#047857)",color:"#fff",border:"none",borderRadius:14,padding:12,fontSize:14,fontWeight:700,cursor:"pointer",marginBottom:12,display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxShadow:"0 2px 8px rgba(5,150,105,0.2)"}}>▶ Continue: {s.selectedCat||"All"} — Q{pos+1}</button>;}return null;}catch{return null;}})()}

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:24}}>
          <button onClick={()=>startStudy(null)} style={{background:"linear-gradient(135deg,#2563eb,#1d4ed8)",color:"#fff",border:"none",borderRadius:14,padding:16,fontSize:14,fontWeight:700,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4,boxShadow:"0 4px 16px rgba(37,99,235,0.2)"}}><span style={{fontSize:22}}>📖</span>Study All</button>
          <button onClick={()=>{setSelectedCat(null);setMode("quiz_setup");}} style={{background:"linear-gradient(135deg,#7c3aed,#6d28d9)",color:"#fff",border:"none",borderRadius:14,padding:16,fontSize:14,fontWeight:700,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4,boxShadow:"0 4px 16px rgba(124,58,237,0.2)"}}><span style={{fontSize:22}}>🧠</span>Practice Test</button>
        </div>

        <h2 style={{color:W.text,fontSize:15,fontWeight:700,marginBottom:10}}>Categories</h2>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {categories.map(cat=>{
            const accent=catAccent[cat]||"#2563eb";const icon=catIcons[cat]||"📁";
            const total=questions.filter(q=>q.cat===cat).length;
            const known=questions.filter(q=>q.cat===cat&&knownSet.has(q.id)).length;
            const stars=questions.filter(q=>q.cat===cat&&q.star).length;
            let sp=0;try{sp=(JSON.parse(localStorage.getItem("cp3")||"{}"))[cat]||0;}catch{}
            return <button key={cat} onClick={()=>startStudy(cat)} style={{background:W.card,border:`1px solid ${W.cardBorder}`,borderLeft:`4px solid ${accent}`,borderRadius:12,padding:"12px 14px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",transition:"all 0.15s",boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}
              onMouseEnter={e=>{e.currentTarget.style.background=W.pill;e.currentTarget.style.transform="translateX(3px)";}}
              onMouseLeave={e=>{e.currentTarget.style.background=W.card;e.currentTarget.style.transform="translateX(0)";}}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start",gap:2}}>
                <span style={{color:W.text,fontSize:13,fontWeight:600,textAlign:"left"}}>{icon} {cat}</span>
                <div style={{display:"flex",gap:6}}>{stars>0&&<span style={{color:"#7c3aed",fontSize:10}}>⭐{stars}</span>}{sp>0&&<span style={{color:"#0891b2",fontSize:10}}>▶ Q{sp+1}</span>}</div>
              </div>
              <span style={{color:accent,fontSize:12,fontWeight:700}}>{known}/{total}</span>
            </button>;
          })}
        </div>
        <p style={{color:W.muted,fontSize:9,textAlign:"center",marginTop:20}}>Based on USCIS M-1778 (09/25) · 2025 Civics Test</p>
      </div>
    </div>
  );

  // ─── QUIZ SETUP ───
  if(mode==="quiz_setup") return (
    <div style={{minHeight:"100vh",background:W.bg,padding:"24px 16px",fontFamily:font}}>
      <div style={{maxWidth:520,margin:"0 auto",paddingTop:32}}>
        <button onClick={()=>setMode("menu")} style={{background:"none",border:"none",color:W.sub,fontSize:13,cursor:"pointer",marginBottom:20}}>← Menu</button>
        <h2 style={{color:W.text,fontSize:22,fontWeight:800,marginBottom:20}}>🧠 Test Setup</h2>
        <div style={{background:W.card,borderRadius:14,padding:18,marginBottom:14,border:`1px solid ${W.cardBorder}`}}>
          <label style={{color:W.sub,fontSize:12,display:"block",marginBottom:6}}>Category</label>
          <select value={selectedCat||""} onChange={e=>setSelectedCat(e.target.value||null)} style={{width:"100%",background:W.pill,color:W.text,border:`1px solid ${W.cardBorder}`,borderRadius:8,padding:"8px 10px",fontSize:13}}>
            <option value="">All categories</option>
            {categories.map(c=><option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div style={{background:W.card,borderRadius:14,padding:18,marginBottom:14,border:`1px solid ${W.cardBorder}`}}>
          <label style={{color:W.sub,fontSize:12,display:"block",marginBottom:6}}>Questions: <strong style={{color:W.text}}>{quizSize}</strong></label>
          <input type="range" min={5} max={Math.min(50,(selectedCat?questions.filter(q=>q.cat===selectedCat):questions).length)} value={quizSize} onChange={e=>setQuizSize(+e.target.value)} style={{width:"100%",accentColor:"#7c3aed"}}/>
        </div>
        <div style={{background:W.card,borderRadius:14,padding:18,marginBottom:20,border:`1px solid ${W.cardBorder}`}}>
          <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",color:W.sub,fontSize:12}}>
            <input type="checkbox" checked={starOnly} onChange={()=>setStarOnly(s=>!s)} style={{accentColor:"#7c3aed"}}/>⭐ 65/20 Special Consideration only
          </label>
        </div>
        <button onClick={startQuiz} style={{width:"100%",background:"linear-gradient(135deg,#7c3aed,#6d28d9)",color:"#fff",border:"none",borderRadius:14,padding:14,fontSize:15,fontWeight:700,cursor:"pointer"}}>Start Test →</button>
      </div>
    </div>
  );

  // ─── QUIZ ───
  if(mode==="quiz"){
    const score=quizSubmitted?quizQuestions.filter(q=>quizAnswers[q.id]==="correct").length:0;
    const pass=quizQuestions.length>0&&score/quizQuestions.length>=0.6;
    return(
      <div style={{minHeight:"100vh",background:W.bg,padding:"24px 16px",fontFamily:font}}>
        <div style={{maxWidth:620,margin:"0 auto"}}>
          <button onClick={()=>setMode("menu")} style={{background:"none",border:"none",color:W.sub,fontSize:13,cursor:"pointer",marginBottom:14}}>← Menu</button>
          {quizSubmitted&&(
            <div style={{background:pass?"linear-gradient(135deg,#059669,#047857)":"linear-gradient(135deg,#dc2626,#b91c1c)",borderRadius:16,padding:20,marginBottom:20,textAlign:"center",color:"#fff"}}>
              <div style={{fontSize:40}}>{pass?"🎉":"💪"}</div>
              <div style={{fontSize:26,fontWeight:800}}>{score}/{quizQuestions.length}</div>
              <div style={{fontSize:13,opacity:0.9}}>{pass?"You passed!":"Keep studying!"} — Need 60%</div>
              <button onClick={()=>setMode("menu")} style={{marginTop:12,background:"rgba(255,255,255,0.2)",color:"#fff",border:"none",borderRadius:10,padding:"8px 20px",fontSize:13,fontWeight:600,cursor:"pointer"}}>Back to Menu</button>
            </div>
          )}
          {quizQuestions.map((q,i)=>(
            <div key={q.id} style={{background:W.card,borderRadius:14,padding:16,marginBottom:10,border:quizSubmitted?(quizAnswers[q.id]==="correct"?"2px solid #059669":"2px solid #dc2626"):`1px solid ${W.cardBorder}`,boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
              <div style={{display:"flex",gap:8,marginBottom:8,alignItems:"flex-start"}}>
                <span style={{color:W.muted,fontSize:12,fontWeight:700,minWidth:24}}>{i+1}.</span>
                <span style={{color:W.text,fontSize:13,fontWeight:600,flex:1}}><span style={{color:catAccent[q.cat]||"#2563eb",fontWeight:700}}>Q{q.id}.</span> {q.q}</span>
                <AudioBtn text={q.q}/>
              </div>
              {!quizSubmitted?(
                <div style={{marginLeft:32}}>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:6}}>
                    <button onClick={()=>setShowAnswer(showAnswer===q.id?null:q.id)} style={{background:W.pill,color:W.sub,border:`1px solid ${W.cardBorder}`,borderRadius:8,padding:"5px 12px",fontSize:11,cursor:"pointer"}}>{showAnswer===q.id?"Hide":"Answer"}</button>
                    {q.ctx&&<button onClick={()=>setQuizShowCtx(p=>({...p,[q.id]:!p[q.id]}))} style={{background:"#fffbeb",color:"#d97706",border:"1px solid #fcd34d",borderRadius:8,padding:"5px 12px",fontSize:11,cursor:"pointer"}}>📜 {quizShowCtx[q.id]?"Hide":"Context"}</button>}
                  </div>
                  {showAnswer===q.id&&<div style={{display:"flex",alignItems:"flex-start",gap:6,marginBottom:6}}><div style={{color:"#047857",fontSize:13,padding:"8px 12px",background:"#ecfdf5",borderRadius:8,borderLeft:"3px solid #059669",flex:1}}><AnswerList text={q.a}/></div><AudioBtn text={speakAnswer(q.a)}/></div>}
                  {quizShowCtx[q.id]&&q.ctx&&<div style={{color:"#92400e",fontSize:11,lineHeight:1.5,marginBottom:6,padding:"8px 10px",background:"#fffbeb",borderRadius:8,borderLeft:"3px solid #f59e0b"}}>{getCtx(q)}</div>}
                  <div style={{display:"flex",gap:6}}>
                    <button onClick={()=>setQuizAnswers(p=>({...p,[q.id]:"correct"}))} style={{flex:1,background:quizAnswers[q.id]==="correct"?"#d1fae5":W.pill,color:quizAnswers[q.id]==="correct"?"#047857":W.sub,border:quizAnswers[q.id]==="correct"?"2px solid #059669":`1px solid ${W.cardBorder}`,borderRadius:10,padding:7,fontSize:12,fontWeight:600,cursor:"pointer"}}>✓ Knew it</button>
                    <button onClick={()=>setQuizAnswers(p=>({...p,[q.id]:"wrong"}))} style={{flex:1,background:quizAnswers[q.id]==="wrong"?"#fee2e2":W.pill,color:quizAnswers[q.id]==="wrong"?"#dc2626":W.sub,border:quizAnswers[q.id]==="wrong"?"2px solid #dc2626":`1px solid ${W.cardBorder}`,borderRadius:10,padding:7,fontSize:12,fontWeight:600,cursor:"pointer"}}>✗ Didn't</button>
                  </div>
                </div>
              ):(
                <div style={{marginLeft:32}}>
                  <div style={{display:"flex",alignItems:"flex-start",gap:6}}><div style={{color:W.text,fontSize:13,padding:"8px 12px",background:W.pill,borderRadius:8,flex:1}}><AnswerList text={q.a}/></div><AudioBtn text={speakAnswer(q.a)}/></div>
                  {q.ctx&&<button onClick={()=>setQuizShowCtx(p=>({...p,[q.id]:!p[q.id]}))} style={{background:"none",border:"none",color:"#d97706",fontSize:11,cursor:"pointer",marginTop:6}}>📜 {quizShowCtx[q.id]?"Hide":"Context"}</button>}
                  {quizShowCtx[q.id]&&q.ctx&&<div style={{color:"#92400e",fontSize:11,lineHeight:1.5,marginTop:4,padding:"8px 10px",background:"#fffbeb",borderRadius:8,borderLeft:"3px solid #f59e0b"}}>{getCtx(q)}</div>}
                </div>
              )}
            </div>
          ))}
          {!quizSubmitted&&Object.keys(quizAnswers).length===quizQuestions.length&&<button onClick={()=>setQuizSubmitted(true)} style={{width:"100%",background:"linear-gradient(135deg,#7c3aed,#6d28d9)",color:"#fff",border:"none",borderRadius:14,padding:14,fontSize:15,fontWeight:700,cursor:"pointer",marginTop:14}}>See Results →</button>}
          {!quizSubmitted&&Object.keys(quizAnswers).length<quizQuestions.length&&<div style={{textAlign:"center",color:W.sub,fontSize:12,marginTop:10}}>Answered: {Object.keys(quizAnswers).length}/{quizQuestions.length}</div>}
        </div>
      </div>
    );
  }

  // ─── STUDY ───
  return(
    <div style={{minHeight:"100vh",background:W.bg,padding:"24px 16px",fontFamily:font}}>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={{maxWidth:600,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <button onClick={()=>{setMode("menu");setStudyFilter("all");setStarOnly(false);window.speechSynthesis?.cancel();}} style={{background:"none",border:"none",color:W.sub,fontSize:13,cursor:"pointer"}}>← Menu</button>
          <span style={{color:W.muted,fontSize:12}}>{selectedCat||"All Questions"}</span>
        </div>
        <div style={{display:"flex",gap:5,marginBottom:16,justifyContent:"center",flexWrap:"wrap"}}>
          {[["all","All"],["unknown","To Learn"],["known","Learned"]].map(([v,l])=>
            <button key={v} onClick={()=>{setStudyFilter(v);setCurrentIdx(0);setShowAnswer(false);setShowContext(false);}} style={{background:studyFilter===v?W.pillActive:W.pill,color:studyFilter===v?W.text:W.muted,border:`1px solid ${W.cardBorder}`,borderRadius:20,padding:"5px 12px",fontSize:11,fontWeight:600,cursor:"pointer"}}>{l}</button>
          )}
          <button onClick={()=>{setStarOnly(s=>!s);setCurrentIdx(0);}} style={{background:starOnly?"#7c3aed":W.pill,color:starOnly?"#fff":"#7c3aed",border:"1px solid #c4b5fd",borderRadius:20,padding:"5px 12px",fontSize:11,fontWeight:600,cursor:"pointer"}}>⭐ 65/20</button>
        </div>

        {filteredQuestions.length===0?(
          <div style={{textAlign:"center",padding:32,color:W.sub}}>
            <div style={{fontSize:36,marginBottom:8}}>{studyFilter==="known"?"📭":"🎉"}</div>
            <p style={{fontSize:14}}>{studyFilter==="known"?"No learned questions yet":"All done in this set!"}</p>
          </div>
        ):currentQ&&(
          <>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
              <div style={{flex:1,background:W.pill,borderRadius:6,height:5,overflow:"hidden"}}>
                <div style={{background:catAccent[currentQ.cat]||"#2563eb",height:"100%",width:`${((currentIdx+1)/filteredQuestions.length)*100}%`,borderRadius:6,transition:"width 0.3s"}}/>
              </div>
              <span style={{color:W.muted,fontSize:11,fontWeight:700}}>{currentIdx+1}/{filteredQuestions.length}</span>
            </div>

            <div key={animKey} style={{background:W.card,borderRadius:18,overflow:"hidden",border:`1px solid ${W.cardBorder}`,boxShadow:"0 4px 20px rgba(0,0,0,0.06)",animation:"fadeIn 0.3s ease"}}>
              <div style={{background:W.pill,padding:"12px 18px",borderBottom:`1px solid ${W.cardBorder}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <span style={{color:catAccent[currentQ.cat]||"#2563eb",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.5px"}}>{catIcons[currentQ.cat]||""} {currentQ.cat}</span>
                  {currentQ.star&&<span style={{fontSize:10}}>⭐</span>}
                </div>
                <span style={{color:W.muted,fontSize:11,fontWeight:700}}>#{currentQ.id}</span>
              </div>

              <div style={{padding:"24px 20px"}}>
                <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
                  <p style={{color:W.text,fontSize:17,fontWeight:700,lineHeight:1.5,margin:0,flex:1}}><span style={{color:catAccent[currentQ.cat]||"#2563eb",marginRight:6}}>Q{currentQ.id}.</span>{currentQ.q}</p>
                  <AudioBtn text={currentQ.q} size="md"/>
                </div>
              </div>

              <div style={{padding:"0 20px 20px"}}>
                {!showAnswer?(
                  <button onClick={()=>setShowAnswer(true)} style={{width:"100%",background:"linear-gradient(135deg,#2563eb,#1d4ed8)",color:"#fff",border:"none",borderRadius:12,padding:13,fontSize:14,fontWeight:700,cursor:"pointer"}}>Show Answer</button>
                ):(
                  <div style={{animation:"fadeIn 0.3s ease"}}>
                    <div style={{background:"#ecfdf5",borderRadius:12,padding:14,marginBottom:10,borderLeft:"4px solid #059669",display:"flex",alignItems:"flex-start",gap:8}}>
                      <div style={{color:"#047857",fontSize:15,fontWeight:600,lineHeight:1.5,flex:1}}><AnswerList text={currentQ.a}/></div>
                      <AudioBtn text={speakAnswer(currentQ.a)} size="md"/>
                    </div>

                    {currentQ.ctx&&(
                      <div style={{marginBottom:10}}>
                        <div style={{display:"flex",gap:6}}>
                          <button onClick={()=>setShowContext(!showContext)} style={{flex:1,background:"#fffbeb",color:"#d97706",border:"1px solid #fcd34d",borderRadius:10,padding:"8px 12px",fontSize:12,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:4}}>📜 {showContext?"Hide Context":"Historical Context"}</button>
                          {showContext&&currentQ.ctxEs&&<button onClick={()=>setCtxLang(l=>l==="en"?"es":"en")} style={{background:"#fffbeb",color:"#d97706",border:"1px solid #fcd34d",borderRadius:10,padding:"8px 12px",fontSize:12,fontWeight:600,cursor:"pointer"}}>🌐 {ctxLang==="en"?"ES":"EN"}</button>}
                        </div>
                        {showContext&&<div style={{marginTop:6,padding:"12px 14px",background:"#fffbeb",borderRadius:10,borderLeft:"3px solid #f59e0b",animation:"fadeIn 0.3s ease"}}><p style={{color:"#92400e",fontSize:12,lineHeight:1.6,margin:0}}>{getCtx(currentQ)}</p></div>}
                      </div>
                    )}

                    <div style={{display:"flex",gap:8}}>
                      <button onClick={()=>{if(!knownSet.has(currentQ.id))toggleKnown(currentQ.id);window.speechSynthesis?.cancel();nav(1);}} style={{flex:1,background:"#d1fae5",color:"#047857",border:"2px solid #059669",borderRadius:12,padding:11,fontSize:13,fontWeight:700,cursor:"pointer"}}>✓ I know it</button>
                      <button onClick={()=>{if(knownSet.has(currentQ.id))toggleKnown(currentQ.id);window.speechSynthesis?.cancel();nav(1);}} style={{flex:1,background:"#fee2e2",color:"#dc2626",border:"2px solid #dc2626",borderRadius:12,padding:11,fontSize:13,fontWeight:700,cursor:"pointer"}}>✗ Review</button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div style={{display:"flex",justifyContent:"space-between",marginTop:16}}>
              <button onClick={()=>{window.speechSynthesis?.cancel();nav(-1);}} disabled={currentIdx===0} style={{background:W.card,color:currentIdx===0?W.muted:W.text,border:`1px solid ${W.cardBorder}`,borderRadius:10,padding:"8px 18px",fontSize:13,fontWeight:600,cursor:currentIdx===0?"default":"pointer"}}>← Prev</button>
              <button onClick={()=>{window.speechSynthesis?.cancel();nav(1);}} disabled={currentIdx>=filteredQuestions.length-1} style={{background:W.card,color:currentIdx>=filteredQuestions.length-1?W.muted:W.text,border:`1px solid ${W.cardBorder}`,borderRadius:10,padding:"8px 18px",fontSize:13,fontWeight:600,cursor:currentIdx>=filteredQuestions.length-1?"default":"pointer"}}>Next →</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
