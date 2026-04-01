import { useState, useEffect, useCallback, useMemo } from "react";

const questions = [
  // AMERICAN GOVERNMENT — Principles of American Democracy
  { id:1, q:"What is the supreme law of the land?", a:"The Constitution", cat:"Principles of American Democracy", ctx:"The Constitution was written in 1787 at the Constitutional Convention in Philadelphia. It replaced the Articles of Confederation, which had proven too weak to hold the young nation together. It remains the oldest written national constitution still in use today." },
  { id:2, q:"What does the Constitution do?", a:"Sets up the government / Defines the government / Protects basic rights of Americans", cat:"Principles of American Democracy", ctx:"The Constitution created a federal system dividing power between national and state governments. The Framers designed it after experiencing both the tyranny of British rule and the chaos under the Articles of Confederation, seeking a balance between strong government and individual liberty." },
  { id:3, q:"The idea of self-government is in the first three words of the Constitution. What are these words?", a:"We the People", cat:"Principles of American Democracy", ctx:"'We the People' was a revolutionary concept in 1787. Most governments at the time derived authority from kings or nobility. These words established that the government's power comes from the consent of the governed — an idea rooted in Enlightenment philosophy." },
  { id:4, q:"What is an amendment?", a:"A change (to the Constitution) / An addition (to the Constitution)", cat:"Principles of American Democracy", ctx:"The Framers intentionally made the amendment process difficult — requiring 2/3 of Congress and 3/4 of states to approve — so changes would reflect broad consensus. In over 230 years, only 27 amendments have been ratified out of thousands proposed." },
  { id:5, q:"What do we call the first ten amendments to the Constitution?", a:"The Bill of Rights", cat:"Principles of American Democracy", ctx:"The Bill of Rights was ratified in 1791. Many states refused to ratify the Constitution without guaranteed protections for individual freedoms. James Madison drafted the amendments, drawing from Virginia's Declaration of Rights and English common law traditions like the Magna Carta (1215)." },
  { id:6, q:"What is one right or freedom from the First Amendment?", a:"Speech / Religion / Assembly / Press / Petition the government", cat:"Principles of American Democracy", ctx:"The First Amendment reflects lessons from colonial experience. Many colonists had fled religious persecution in Europe. British authorities had censored colonial newspapers and punished dissent, so the Founders prioritized these freedoms above all others." },
  { id:7, q:"How many amendments does the Constitution have?", a:"Twenty-seven (27)", cat:"Principles of American Democracy", ctx:"The 27th Amendment (ratified 1992) was actually proposed in 1789 as part of the original Bill of Rights — it took 203 years to be ratified! It prevents Congress from giving itself immediate pay raises. The most impactful amendments abolished slavery (13th), guaranteed equal protection (14th), and gave women the vote (19th)." },
  { id:8, q:"What did the Declaration of Independence do?", a:"Announced our independence (from Great Britain) / Declared our independence (from Great Britain) / Said that the United States is free (from Great Britain)", cat:"Principles of American Democracy", ctx:"Adopted on July 4, 1776, the Declaration was primarily authored by Thomas Jefferson over 17 days. It was a bold and dangerous act — the 56 signers risked execution for treason against the British Crown. The document drew heavily from John Locke's philosophy of natural rights." },
  { id:9, q:"What are two rights in the Declaration of Independence?", a:"Life / Liberty / Pursuit of happiness", cat:"Principles of American Democracy", ctx:"Jefferson adapted John Locke's 'life, liberty, and property' into 'life, liberty, and the pursuit of happiness.' This subtle change broadened the vision beyond property ownership, suggesting that government's purpose is to enable human flourishing for all people." },
  { id:10, q:"What is freedom of religion?", a:"You can practice any religion, or not practice a religion", cat:"Principles of American Democracy", ctx:"Many early colonists — Pilgrims, Puritans, Quakers, Catholics — came to America fleeing religious persecution in Europe. Ironically, some colonies then imposed their own religious requirements. The First Amendment and Jefferson's 'wall of separation between church and state' sought to end this cycle." },
  { id:11, q:"What is the economic system in the United States?", a:"Capitalist economy / Market economy", cat:"Principles of American Democracy", ctx:"Adam Smith published 'The Wealth of Nations' in 1776, the same year as the Declaration of Independence. His ideas about free markets and limited government intervention deeply influenced the Founders. The U.S. economic system has evolved to include regulations and social programs, but remains fundamentally market-based." },
  { id:12, q:"What is the 'rule of law'?", a:"Everyone must follow the law / Leaders must obey the law / Government must obey the law / No one is above the law", cat:"Principles of American Democracy", ctx:"This concept traces back to the Magna Carta (1215), when English nobles forced King John to accept limits on royal power. The Founders enshrined this principle to prevent the kind of arbitrary rule they experienced under King George III, who they accused of being above the law." },

  // System of Government
  { id:13, q:"Name one branch or part of the government.", a:"Congress / Legislative / President / Executive / The courts / Judicial", cat:"System of Government", ctx:"The three-branch system was inspired by French philosopher Montesquieu's 'The Spirit of the Laws' (1748). The Framers studied ancient Roman republics and contemporary European governments to design a system where no single person or group could seize total power." },
  { id:14, q:"What stops one branch of government from becoming too powerful?", a:"Checks and balances / Separation of powers", cat:"System of Government", ctx:"James Madison, called the 'Father of the Constitution,' argued in Federalist No. 51 that 'ambition must be made to counteract ambition.' Examples include: the President can veto laws, Congress can override vetoes, and the Supreme Court can strike down unconstitutional laws." },
  { id:15, q:"Who is in charge of the executive branch?", a:"The President", cat:"System of Government", ctx:"The Founders debated extensively about executive power. Some wanted a weak executive; others, like Alexander Hamilton, wanted a strong one. They compromised by creating a powerful but term-limited presidency — a deliberate contrast to a monarchy." },
  { id:16, q:"Who makes federal laws?", a:"Congress / Senate and House (of Representatives) / (U.S. or national) legislature", cat:"System of Government" },
  { id:17, q:"What are the two parts of the U.S. Congress?", a:"The Senate and House (of Representatives)", cat:"System of Government", ctx:"The bicameral (two-chamber) Congress resulted from the 'Great Compromise' at the 1787 Convention. Large states wanted representation by population (the Virginia Plan), while small states wanted equal representation (the New Jersey Plan). The compromise gave them both." },
  { id:18, q:"How many U.S. Senators are there?", a:"One hundred (100)", cat:"System of Government", ctx:"Each state gets exactly 2 senators regardless of population. Wyoming (population ~580,000) has the same Senate representation as California (population ~39 million). Originally, senators were chosen by state legislatures; the 17th Amendment (1913) changed this to direct popular election." },
  { id:19, q:"We elect a U.S. Senator for how many years?", a:"Six (6)", cat:"System of Government", ctx:"The Founders gave senators longer terms than representatives (6 vs. 2 years) to insulate them from short-term public passions. Senate terms are staggered so only about 1/3 of seats are up for election every 2 years, providing continuity." },
  { id:20, q:"Who is one of your state's U.S. Senators now?", a:"Ted Cruz and John Cornyn", cat:"System of Government" },
  { id:21, q:"The House of Representatives has how many voting members?", a:"Four hundred thirty-five (435)", cat:"System of Government", ctx:"The number 435 was fixed by the Reapportionment Act of 1929. Before that, the House grew with each census. After every 10-year census, the 435 seats are redistributed among states based on population changes — a process called reapportionment." },
  { id:22, q:"We elect a U.S. Representative for how many years?", a:"Two (2)", cat:"System of Government", ctx:"The short 2-year term was designed to keep Representatives closely accountable to the people. As the 'People's House,' members must frequently face voters, making it the most directly democratic part of the federal government." },
  { id:23, q:"Name your U.S. Representative.", a:"Answers will vary. Visit the House of Representatives website.", cat:"System of Government" },
  { id:24, q:"Who does a U.S. Senator represent?", a:"All people of the state", cat:"System of Government" },
  { id:25, q:"Why do some states have more Representatives than other states?", a:"(Because of) the state's population / (Because) they have more people / (Because) some states have more people", cat:"System of Government", ctx:"This proportional representation was part of the Great Compromise. The U.S. Census, conducted every 10 years since 1790, determines how many Representatives each state receives. Currently, each Representative serves roughly 760,000 people." },
  { id:26, q:"We elect a President for how many years?", a:"Four (4)", cat:"System of Government", ctx:"George Washington set the precedent of serving only two terms. This was tradition until Franklin Roosevelt won four terms (1932-1944). After FDR's death in office, the 22nd Amendment (1951) formally limited presidents to two terms." },
  { id:27, q:"In what month do we vote for President?", a:"November", cat:"System of Government", ctx:"Congress set Election Day as the first Tuesday after the first Monday in November in 1845. The date was chosen because November was after harvest season (farmers could travel to vote) and Tuesday avoided conflicts with the Sabbath and Wednesday market days." },
  { id:28, q:"What is the name of the President of the United States now?", a:"Donald Trump", cat:"System of Government" },
  { id:29, q:"What is the name of the Vice President of the United States now?", a:"JD Vance", cat:"System of Government" },
  { id:30, q:"If the President can no longer serve, who becomes President?", a:"The Vice President", cat:"System of Government", ctx:"This succession has occurred nine times: eight due to presidential deaths (4 assassinations, 4 natural causes) and once due to resignation (Nixon, 1974). The 25th Amendment (1967) formalized the process after JFK's assassination highlighted gaps in the original rules." },
  { id:31, q:"If both the President and the Vice President can no longer serve, who becomes President?", a:"The Speaker of the House", cat:"System of Government", ctx:"The Presidential Succession Act of 1947 established the full line of succession: Speaker of the House, President Pro Tempore of the Senate, then Cabinet members starting with the Secretary of State. This line has never been invoked beyond the Vice President." },
  { id:32, q:"Who is the Commander in Chief of the military?", a:"The President", cat:"System of Government", ctx:"The Founders placed the military under civilian control to prevent military dictatorships common in Europe. While the President commands the armed forces, only Congress can declare war — a deliberate split of war powers. The last formal declaration of war was in 1942 (WWII)." },
  { id:33, q:"Who signs bills to become laws?", a:"The President", cat:"System of Government" },
  { id:34, q:"Who vetoes bills?", a:"The President", cat:"System of Government", ctx:"The veto power comes from Article I of the Constitution. Congress can override a veto with a 2/3 vote in both chambers, but this is rare — only about 7% of vetoes have been overridden in U.S. history. The first presidential veto was by George Washington in 1792." },
  { id:35, q:"What does the President's Cabinet do?", a:"Advises the President", cat:"System of Government", ctx:"The Cabinet is not mentioned in the Constitution — it evolved from George Washington's practice of meeting with his department heads (Jefferson, Hamilton, Knox, and Randolph). Today there are 15 executive departments, each headed by a Secretary confirmed by the Senate." },
  { id:36, q:"What are two Cabinet-level positions?", a:"Secretary of Agriculture / Secretary of Commerce / Secretary of Defense / Secretary of Education / Secretary of Energy / Secretary of Health and Human Services / Secretary of Homeland Security / Secretary of State / Secretary of the Treasury / Attorney General / Vice President", cat:"System of Government", ctx:"The oldest Cabinet positions are State, Treasury, and War (now Defense), created in 1789. The newest is Homeland Security, created after the September 11, 2001 attacks. The Attorney General heads the Department of Justice and is the nation's chief law enforcement officer." },
  { id:37, q:"What does the judicial branch do?", a:"Reviews laws / Explains laws / Resolves disputes / Decides if a law goes against the Constitution", cat:"System of Government", ctx:"The power of 'judicial review' — declaring laws unconstitutional — was established in Marbury v. Madison (1803) by Chief Justice John Marshall. This landmark case made the Supreme Court a co-equal branch and is considered one of the most important decisions in American legal history." },
  { id:38, q:"What is the highest court in the United States?", a:"The Supreme Court", cat:"System of Government", ctx:"The Supreme Court first met in 1790 in New York City. It has shaped American life through landmark decisions: Brown v. Board of Education (1954) ended school segregation, Miranda v. Arizona (1966) established the right to remain silent, and many others." },
  { id:39, q:"How many justices are on the Supreme Court?", a:"Nine (9)", cat:"System of Government", ctx:"The Constitution doesn't specify the number of justices — Congress sets it. The Court has had as few as 5 and as many as 10 justices. It's been set at 9 since 1869. FDR tried to expand it in 1937 ('court-packing plan') but Congress rejected the idea." },
  { id:40, q:"Who is the Chief Justice of the United States now?", a:"John Roberts.", cat:"System of Government" },
  { id:41, q:"Under our Constitution, some powers belong to the federal government. What is one power of the federal government?", a:"To print money / To declare war / To create an army / To make treaties", cat:"System of Government", ctx:"The Constitution's 'Enumerated Powers' (Article I, Section 8) list specific federal powers. Under the Articles of Confederation, the federal government couldn't even collect taxes or regulate trade — weaknesses that led to the Constitutional Convention." },
  { id:42, q:"Under our Constitution, some powers belong to the states. What is one power of the states?", a:"Provide schooling and education / Provide protection (police) / Provide safety (fire departments) / Give a driver's license / Approve zoning and land use", cat:"System of Government", ctx:"The 10th Amendment reserves all powers not specifically given to the federal government to the states or the people. This 'federalism' allows states to serve as 'laboratories of democracy,' testing different policies — a term coined by Justice Louis Brandeis in 1932." },
  { id:43, q:"Who is the Governor of your state now?", a:"Greg Abbott (R)", cat:"System of Government" },
  { id:44, q:"What is the capital of your state?", a:"Austin", cat:"System of Government" },
  { id:45, q:"What are the two major political parties in the United States?", a:"Democratic and Republican", cat:"System of Government", ctx:"The Democratic Party traces its roots to Thomas Jefferson's Democratic-Republicans (1790s), making it the world's oldest active political party. The Republican Party was founded in 1854 primarily to oppose the expansion of slavery. Abraham Lincoln was its first president (1861)." },
  { id:46, q:"What is the political party of the President now?", a:"Republican.", cat:"System of Government" },
  { id:47, q:"What is the name of the Speaker of the House of Representatives now?", a:"Mike Johnson", cat:"System of Government" },

  // Rights and Responsibilities
  { id:48, q:"There are four amendments to the Constitution about who can vote. Describe one of them.", a:"Citizens eighteen (18) and older can vote / You don't have to pay a poll tax to vote / Any citizen can vote (women and men) / A male citizen of any race can vote", cat:"Rights and Responsibilities", ctx:"Voting rights expanded over nearly 200 years: the 15th Amendment (1870) prohibited racial discrimination in voting, the 19th (1920) gave women the vote, the 24th (1964) banned poll taxes, and the 26th (1971) lowered the voting age to 18 — partly because 18-year-olds were being drafted to fight in Vietnam." },
  { id:49, q:"What is one responsibility that is only for United States citizens?", a:"Serve on a jury / Vote in a federal election", cat:"Rights and Responsibilities", ctx:"The right to a jury trial dates back to English common law and was so important to the Founders that it appears in both the Constitution and the Bill of Rights (6th and 7th Amendments). Jury service is considered a civic duty and a check on government power." },
  { id:50, q:"Name one right only for United States citizens.", a:"Vote in a federal election / Run for federal office", cat:"Rights and Responsibilities" },
  { id:51, q:"What are two rights of everyone living in the United States?", a:"Freedom of expression / Freedom of speech / Freedom of assembly / Freedom to petition the government / Freedom of religion / The right to bear arms", cat:"Rights and Responsibilities", ctx:"The Constitution protects these rights for all people in the U.S., not just citizens. The Supreme Court confirmed in Yick Wo v. Hopkins (1886) that the 14th Amendment's equal protection applies to all persons within U.S. jurisdiction, regardless of citizenship status." },
  { id:52, q:"What do we show loyalty to when we say the Pledge of Allegiance?", a:"The United States / The flag", cat:"Rights and Responsibilities", ctx:"The Pledge was written in 1892 by Francis Bellamy for a Columbus Day celebration. 'Under God' was added in 1954 during the Cold War to distinguish the U.S. from atheistic communism. The Supreme Court ruled in 1943 that students cannot be forced to recite the Pledge." },
  { id:53, q:"What is one promise you make when you become a United States citizen?", a:"Give up loyalty to other countries / Defend the Constitution and laws of the United States / Obey the laws of the United States / Serve in the U.S. military (if needed) / Serve (do important work for) the nation (if needed) / Be loyal to the United States", cat:"Rights and Responsibilities", ctx:"The Oath of Allegiance has roots going back to the American Revolution. The current form was established by the Immigration and Nationality Act of 1952. Each year, roughly 600,000-900,000 people take this oath in naturalization ceremonies across the country." },
  { id:54, q:"How old do citizens have to be to vote for President?", a:"Eighteen (18) and older", cat:"Rights and Responsibilities", ctx:"Before the 26th Amendment (1971), the voting age was 21 in most states. The Vietnam War drove the change — the slogan 'old enough to fight, old enough to vote' reflected outrage that 18-year-olds could be drafted but couldn't vote. It was ratified in just 107 days, the fastest ever." },
  { id:55, q:"What are two ways that Americans can participate in their democracy?", a:"Vote / Join a political party / Help with a campaign / Join a civic group / Join a community group / Give an elected official your opinion on an issue / Call Senators and Representatives / Publicly support or oppose an issue or policy / Run for office / Write to a newspaper", cat:"Rights and Responsibilities" },
  { id:56, q:"When is the last day you can send in federal income tax forms?", a:"April 15", cat:"Rights and Responsibilities", ctx:"The federal income tax was established by the 16th Amendment in 1913. Before that, the government was funded mainly by tariffs and excise taxes. The first income tax was actually a temporary measure during the Civil War (1861-1872) to fund the war effort." },
  { id:57, q:"When must all men register for the Selective Service?", a:"At age eighteen (18) / Between eighteen (18) and twenty-six (26)", cat:"Rights and Responsibilities", ctx:"The Selective Service System was established in 1917 for World War I. The military draft was used through the Vietnam War and ended in 1973. Registration continued after 1980 when President Carter reinstated it following the Soviet invasion of Afghanistan. No one has been drafted since 1973." },

  // Colonial Period and Independence
  { id:58, q:"What is one reason colonists came to America?", a:"Freedom / Political liberty / Religious freedom / Economic opportunity / Practice their religion / Escape persecution", cat:"Colonial Period and Independence", ctx:"The Pilgrims (1620) fled religious persecution in England. The Puritans followed in the 1630s. Maryland was founded as a haven for Catholics (1632), Pennsylvania for Quakers (1681). Others came seeking economic opportunity — Virginia's Jamestown (1607) was founded as a business venture." },
  { id:59, q:"Who lived in America before the Europeans arrived?", a:"American Indians / Native Americans", cat:"Colonial Period and Independence", ctx:"Native Americans had lived on the continent for at least 15,000 years before European contact. When Columbus arrived in 1492, an estimated 5-15 million indigenous people lived in North America, speaking hundreds of languages and living in diverse societies from the Iroquois Confederacy to Pueblo cliff dwellers." },
  { id:60, q:"What group of people was taken to America and sold as slaves?", a:"Africans / People from Africa", cat:"Colonial Period and Independence", ctx:"The first enslaved Africans arrived in Virginia in 1619. Over the next 250 years, approximately 12.5 million Africans were forcibly transported across the Atlantic in the slave trade. By 1860, nearly 4 million people were enslaved in the United States. Slavery wasn't abolished until the 13th Amendment in 1865." },
  { id:61, q:"Why did the colonists fight the British?", a:"Because of high taxes (taxation without representation) / Because the British army stayed in their houses / Because they didn't have self-government", cat:"Colonial Period and Independence", ctx:"After the costly French and Indian War (1754-1763), Britain imposed new taxes on the colonies — the Stamp Act (1765), Townshend Acts (1767), and Tea Act (1773). Colonists protested with 'no taxation without representation.' The Boston Tea Party (1773) and the 'Intolerable Acts' pushed the colonies toward revolution." },
  { id:62, q:"Who wrote the Declaration of Independence?", a:"Thomas Jefferson", cat:"Colonial Period and Independence", ctx:"Jefferson was just 33 years old when he drafted the Declaration in June 1776 at a boarding house in Philadelphia. A committee of five (including Benjamin Franklin and John Adams) reviewed it, and Congress made further edits, removing a passage condemning the slave trade." },
  { id:63, q:"When was the Declaration of Independence adopted?", a:"July 4, 1776", cat:"Colonial Period and Independence", ctx:"Congress actually voted for independence on July 2, 1776. July 4th is the date the final wording was approved. Most delegates signed it on August 2nd. John Adams predicted July 2nd would be celebrated with 'pomp and parade' — but July 4th became the holiday instead." },
  { id:64, q:"There were 13 original states. Name three.", a:"New Hampshire / Massachusetts / Rhode Island / Connecticut / New York / New Jersey / Pennsylvania / Delaware / Maryland / Virginia / North Carolina / South Carolina / Georgia", cat:"Colonial Period and Independence", ctx:"The 13 colonies were established between 1607 (Virginia) and 1733 (Georgia). They stretched along the Atlantic coast and were culturally diverse: New England colonies were centered on religion and trade, the Middle colonies were ethnically diverse, and Southern colonies relied heavily on plantation agriculture and enslaved labor." },
  { id:65, q:"What happened at the Constitutional Convention?", a:"The Constitution was written / The Founding Fathers wrote the Constitution", cat:"Colonial Period and Independence", ctx:"Held in Philadelphia from May to September 1787, the Convention was originally called just to revise the Articles of Confederation. Instead, 55 delegates decided to create an entirely new government. The debates were held in secret so delegates could speak freely. George Washington presided over the Convention." },
  { id:66, q:"When was the Constitution written?", a:"1787", cat:"Colonial Period and Independence", ctx:"The Constitution was drafted during the hot summer of 1787 in Philadelphia's Independence Hall — the same building where the Declaration of Independence was signed 11 years earlier. It was signed on September 17, 1787, now celebrated as Constitution Day." },
  { id:67, q:"The Federalist Papers supported the passage of the U.S. Constitution. Name one of the writers.", a:"James Madison / Alexander Hamilton / John Jay / Publius", cat:"Colonial Period and Independence", ctx:"The 85 Federalist Papers were published in New York newspapers in 1787-1788 under the pen name 'Publius.' Hamilton wrote about 51, Madison about 29, and Jay wrote 5. They argued for ratifying the Constitution against 'Anti-Federalists' who feared a too-powerful central government." },
  { id:68, q:"What is one thing Benjamin Franklin is famous for?", a:"U.S. diplomat / Oldest member of the Constitutional Convention / First Postmaster General of the United States / Writer of 'Poor Richard's Almanac' / Started the first free libraries", cat:"Colonial Period and Independence", ctx:"Franklin (1706-1790) was perhaps the most versatile Founding Father — inventor (lightning rod, bifocals), scientist, printer, diplomat, and statesman. At 81, he was the oldest delegate at the Constitutional Convention. His diplomatic skills in securing France's alliance during the Revolution were crucial to American independence." },
  { id:69, q:"Who is the 'Father of Our Country'?", a:"George Washington", cat:"Colonial Period and Independence", ctx:"Washington (1732-1799) led the Continental Army through 8 years of war, presided over the Constitutional Convention, and served as the first President (1789-1797). He voluntarily stepped down after two terms, establishing a precedent that lasted until FDR. King George III reportedly called him 'the greatest man in the world' for willingly giving up power." },
  { id:70, q:"Who was the first President?", a:"George Washington", cat:"Colonial Period and Independence", ctx:"Washington was unanimously elected by the Electoral College in both 1789 and 1792 — the only president to achieve this. He established many presidential traditions: the Cabinet system, the two-term limit, and the title 'Mr. President' (rejecting grander titles like 'His Highness')." },

  // The 1800s
  { id:71, q:"What territory did the United States buy from France in 1803?", a:"The Louisiana Territory / Louisiana", cat:"The 1800s", ctx:"The Louisiana Purchase doubled the size of the United States overnight — 828,000 square miles for about $15 million (roughly 4 cents per acre). Napoleon sold it to fund his European wars. President Jefferson authorized the deal despite personal doubts about whether the Constitution allowed it." },
  { id:72, q:"Name one war fought by the United States in the 1800s.", a:"War of 1812 / Mexican-American War / Civil War / Spanish-American War", cat:"The 1800s", ctx:"The War of 1812 against Britain solidified American independence and inspired the national anthem. The Mexican-American War (1846-48) added California and the Southwest. The Civil War (1861-65) was the deadliest in U.S. history. The Spanish-American War (1898) made the U.S. a world power." },
  { id:73, q:"Name the U.S. war between the North and the South.", a:"The Civil War / The War between the States", cat:"The 1800s", ctx:"The Civil War (1861-1865) remains the deadliest conflict in American history, with approximately 620,000-750,000 soldiers killed. It began when 11 Southern states seceded to form the Confederate States of America after Abraham Lincoln's election. The war ended with the Confederacy's surrender at Appomattox Court House, Virginia." },
  { id:74, q:"Name one problem that led to the Civil War.", a:"Slavery / Economic reasons / States' rights", cat:"The 1800s", ctx:"Tensions over slavery had been building for decades. Compromises like the Missouri Compromise (1820) and the Compromise of 1850 temporarily delayed conflict. The Dred Scott decision (1857), John Brown's raid (1859), and Lincoln's election (1860) finally made war inevitable. The South's economy depended on enslaved labor; the North was industrializing." },
  { id:75, q:"What was one important thing that Abraham Lincoln did?", a:"Freed the slaves (Emancipation Proclamation) / Saved (preserved) the Union / Led the United States during the Civil War", cat:"The 1800s", ctx:"Lincoln (1809-1865) is widely considered one of America's greatest presidents. Born in a log cabin in Kentucky, he was largely self-educated. He guided the nation through its greatest crisis, preserved the Union, and ended slavery. He was assassinated by John Wilkes Booth at Ford's Theatre just 5 days after the war ended." },
  { id:76, q:"What did the Emancipation Proclamation do?", a:"Freed the slaves / Freed slaves in the Confederacy / Freed slaves in the Confederate states / Freed slaves in most Southern states", cat:"The 1800s", ctx:"Issued on January 1, 1863, the Emancipation Proclamation was a strategic wartime measure that freed slaves only in Confederate states — not in border states loyal to the Union. It transformed the war into a fight for freedom and allowed African Americans to enlist. About 180,000 Black soldiers served in the Union Army." },
  { id:77, q:"What did Susan B. Anthony do?", a:"Fought for women's rights / Fought for civil rights", cat:"The 1800s", ctx:"Susan B. Anthony (1820-1906) was arrested in 1872 for voting illegally in a presidential election. She co-founded the National Woman Suffrage Association with Elizabeth Cady Stanton and spent 50 years campaigning for women's right to vote. She died 14 years before the 19th Amendment (1920) finally granted it." },

  // Recent American History
  { id:78, q:"Name one war fought by the United States in the 1900s.", a:"World War I / World War II / Korean War / Vietnam War / (Persian) Gulf War", cat:"Recent American History", ctx:"The 20th century transformed America into a global superpower. WWI (1917-18) ended U.S. isolationism. WWII (1941-45) established the U.S. as a world leader. The Korean War (1950-53) and Vietnam War (1955-75) were fought to contain communism. The Gulf War (1991) was fought to liberate Kuwait from Iraq." },
  { id:79, q:"Who was President during World War I?", a:"Woodrow Wilson", cat:"Recent American History", ctx:"Wilson (1856-1924) initially kept the U.S. neutral with the slogan 'He kept us out of war.' Germany's unrestricted submarine warfare and the Zimmermann Telegram (proposing a German-Mexican alliance against the U.S.) pushed America to enter in 1917. After the war, Wilson championed the League of Nations, but the U.S. Senate refused to join." },
  { id:80, q:"Who was President during the Great Depression and World War II?", a:"Franklin Roosevelt", cat:"Recent American History", ctx:"FDR (1882-1945) served an unprecedented 4 terms (1933-1945). He launched the New Deal to combat the Great Depression — creating Social Security, the SEC, and massive public works programs. After Pearl Harbor (1941), he led the nation through WWII. He died in April 1945, just months before victory." },
  { id:81, q:"Who did the United States fight in World War II?", a:"Japan, Germany, and Italy", cat:"Recent American History", ctx:"The U.S. entered WWII after Japan bombed Pearl Harbor on December 7, 1941. The 'Axis Powers' (Germany, Italy, Japan) fought against the 'Allied Powers' (U.S., Britain, Soviet Union, and others). The war ended with Germany's surrender in May 1945 and Japan's surrender in August 1945 after atomic bombs were dropped on Hiroshima and Nagasaki." },
  { id:82, q:"Before he was President, Eisenhower was a general. What war was he in?", a:"World War II", cat:"Recent American History", ctx:"Dwight D. Eisenhower (1890-1969) served as Supreme Commander of Allied Forces in Europe. He planned and led D-Day — the June 6, 1944 invasion of Normandy, France — the largest amphibious military operation in history. As President (1953-1961), he built the Interstate Highway System and warned about the 'military-industrial complex.'" },
  { id:83, q:"During the Cold War, what was the main concern of the United States?", a:"Communism", cat:"Recent American History", ctx:"The Cold War (1947-1991) was a geopolitical struggle between the U.S. and the Soviet Union. It included the Korean War, Vietnam War, Cuban Missile Crisis (1962), the Space Race, and a nuclear arms race. It ended with the fall of the Berlin Wall (1989) and the dissolution of the Soviet Union (1991)." },
  { id:84, q:"What movement tried to end racial discrimination?", a:"Civil rights (movement)", cat:"Recent American History", ctx:"The Civil Rights Movement (1950s-1960s) fought to end legalized racial segregation and discrimination. Key events include Brown v. Board of Education (1954), the Montgomery Bus Boycott (1955), sit-ins, Freedom Rides, the March on Washington (1963), and passage of the Civil Rights Act (1964) and Voting Rights Act (1965)." },
  { id:85, q:"What did Martin Luther King, Jr. do?", a:"Fought for civil rights / Worked for equality for all Americans", cat:"Recent American History", ctx:"Dr. King (1929-1968) led the Civil Rights Movement using nonviolent resistance, inspired by Mahatma Gandhi. His 'I Have a Dream' speech at the 1963 March on Washington is one of history's greatest orations. He won the Nobel Peace Prize in 1964. He was assassinated in Memphis, Tennessee on April 4, 1968." },
  { id:86, q:"What major event happened on September 11, 2001, in the United States?", a:"Terrorists attacked the United States / Terrorists took over two planes and crashed them into the World Trade Center in New York City", cat:"Recent American History", ctx:"On 9/11, 19 al-Qaeda terrorists hijacked four planes. Two hit the World Trade Center towers in New York (which collapsed), one hit the Pentagon, and one crashed in a Pennsylvania field after passengers fought back. Nearly 3,000 people were killed. The attacks led to the War on Terror, the invasion of Afghanistan, and creation of the Department of Homeland Security." },
  { id:87, q:"Name one American Indian tribe in the United States.", a:"Cherokee / Navajo / Sioux / Chippewa / Choctaw / Pueblo / Apache / Iroquois / Creek / Blackfeet / Seminole / Cheyenne / Arawak / Shawnee / Mohegan / Huron / Oneida / Lakota / Crow / Teton / Hopi / Inuit", cat:"Recent American History", ctx:"There are currently 574 federally recognized tribes in the U.S. The Navajo Nation is the largest reservation (27,000 sq. miles across Arizona, Utah, and New Mexico). The Cherokee Nation is the largest tribe by enrollment (~400,000 members). The Iroquois Confederacy's democratic structure may have influenced the U.S. Constitution." },

  // Geography
  { id:88, q:"Name one of the two longest rivers in the United States.", a:"Missouri (River) / Mississippi (River)", cat:"Geography", ctx:"The Missouri River (2,341 miles) is technically the longest, but the Mississippi (2,320 miles) is more famous. Together they form the world's 4th longest river system. The Mississippi was crucial to westward expansion and commerce — Mark Twain immortalized it in 'Adventures of Huckleberry Finn.'" },
  { id:89, q:"What ocean is on the West Coast of the United States?", a:"Pacific (Ocean)", cat:"Geography", ctx:"The Pacific Ocean is the world's largest and deepest ocean, covering more area than all land on Earth combined. Spanish explorer Vasco Núñez de Balboa was the first European to see it from the Americas in 1513. The U.S. West Coast spans about 7,600 miles from Washington to California." },
  { id:90, q:"What ocean is on the East Coast of the United States?", a:"Atlantic (Ocean)", cat:"Geography", ctx:"The Atlantic Ocean was the highway for European exploration and colonization of America. The first permanent English settlement (Jamestown, 1607) was on the Atlantic coast. The ocean protected America from European conflicts for much of its early history, contributing to the policy of isolationism." },
  { id:91, q:"Name one U.S. territory.", a:"Puerto Rico / U.S. Virgin Islands / American Samoa / Northern Mariana Islands / Guam", cat:"Geography", ctx:"Most U.S. territories were acquired after the Spanish-American War (1898) — Puerto Rico and Guam from Spain. The U.S. Virgin Islands were purchased from Denmark in 1917. Residents of territories are U.S. citizens (except American Samoa) but cannot vote in presidential elections and have non-voting delegates in Congress." },
  { id:92, q:"Name one state that borders Canada.", a:"Maine / New Hampshire / Vermont / New York / Pennsylvania / Ohio / Michigan / Minnesota / North Dakota / Montana / Idaho / Washington / Alaska", cat:"Geography", ctx:"The U.S.-Canada border is the longest international border in the world at 5,525 miles (including Alaska). It was largely established by the Treaty of 1818 along the 49th parallel. The border has been called 'the longest undefended border in the world,' symbolizing the peaceful relationship between the two nations." },
  { id:93, q:"Name one state that borders Mexico.", a:"California / Arizona / New Mexico / Texas", cat:"Geography", ctx:"The U.S.-Mexico border spans about 1,954 miles. Much of it was established after the Mexican-American War by the Treaty of Guadalupe Hidalgo (1848), when Mexico ceded present-day California, Arizona, New Mexico, and more to the U.S. The Gadsden Purchase (1853) finalized the southern borders of Arizona and New Mexico." },
  { id:94, q:"What is the capital of the United States?", a:"Washington, D.C.", cat:"Geography", ctx:"Washington, D.C. became the capital in 1800, purpose-built on land donated by Maryland and Virginia. It was designed by French architect Pierre Charles L'Enfant. 'D.C.' stands for District of Columbia, named after Christopher Columbus. The capital was placed between Northern and Southern states as part of a political compromise between Hamilton and Jefferson." },
  { id:95, q:"Where is the Statue of Liberty?", a:"New York (Harbor) / Liberty Island (in New York or New Jersey)", cat:"Geography", ctx:"The Statue of Liberty was a gift from France in 1886, celebrating the friendship between the two nations and the ideals of freedom and democracy. Designed by Frédéric Auguste Bartholdi with a steel framework by Gustave Eiffel, it stands 305 feet tall. For millions of immigrants arriving by ship, it was their first sight of America." },

  // Symbols
  { id:96, q:"Why does the flag have 13 stripes?", a:"Because there were 13 original colonies / Because the stripes represent the original colonies", cat:"Symbols", ctx:"The first official U.S. flag was adopted on June 14, 1777 (now celebrated as Flag Day). The 13 alternating red and white stripes have remained constant even as stars were added for new states. Legend says Betsy Ross sewed the first flag, though this is debated by historians." },
  { id:97, q:"Why does the flag have 50 stars?", a:"Because there is one star for each state / Because each star represents a state / Because there are 50 states", cat:"Symbols", ctx:"The flag has been updated 27 times as new states joined. The current 50-star design was created in 1958 by Robert Heft, a 17-year-old high school student from Ohio, as a class project — he received a B- grade. It became official on July 4, 1960, when Hawaii became the 50th state." },
  { id:98, q:"What is the name of the national anthem?", a:"The Star-Spangled Banner", cat:"Symbols", ctx:"Francis Scott Key wrote the lyrics in 1814 after watching the British bombardment of Fort McHenry in Baltimore during the War of 1812. Seeing the American flag still flying at dawn inspired the poem. It was set to the melody of a popular British song and became the official national anthem in 1931." },

  // Holidays
  { id:99, q:"When do we celebrate Independence Day?", a:"July 4", cat:"Holidays", ctx:"The first Independence Day celebration was on July 4, 1777, with fireworks, bonfires, and bell-ringing. John Adams and Thomas Jefferson both died on July 4, 1826 — exactly 50 years after the Declaration was adopted. Today, Americans celebrate with fireworks, barbecues, and parades." },
  { id:100, q:"Name two national U.S. holidays.", a:"New Year's Day / Martin Luther King, Jr. Day / Presidents' Day / Memorial Day / Independence Day / Labor Day / Columbus Day / Veterans Day / Thanksgiving / Christmas", cat:"Holidays", ctx:"Congress establishes federal holidays. MLK Day (3rd Monday of January) was signed into law in 1983 after a long campaign. Memorial Day originated after the Civil War to honor fallen soldiers. Thanksgiving was proclaimed a national holiday by Lincoln in 1863, during the Civil War, to unite the nation." },

  // Additional questions 101-128
  { id:101, q:"What is self-government?", a:"Powers come from the people / Government responds to the people", cat:"Principles of American Democracy", ctx:"Self-government was a radical idea in the 18th century when most of the world was ruled by monarchs. The concept draws from Enlightenment thinkers like John Locke and Jean-Jacques Rousseau, who argued that governments derive their legitimate authority from the consent of the governed." },
  { id:102, q:"What is the rule of law?", a:"Everyone must follow the law / Leaders must obey the law / Government must obey the law / No one is above the law", cat:"Principles of American Democracy" },
  { id:103, q:"What are some purposes of the Constitution?", a:"To form a more perfect union / To establish justice / To ensure domestic tranquility / To provide for the common defense / To promote the general welfare / To secure the blessings of liberty", cat:"Principles of American Democracy", ctx:"These purposes come from the Preamble — the Constitution's famous opening paragraph. The phrase 'a more perfect union' acknowledged that the Articles of Confederation had been imperfect. Each stated purpose addressed a specific failure the nation had experienced under the Articles." },
  { id:104, q:"What is freedom of religion?", a:"You can practice any religion, or not practice a religion", cat:"Principles of American Democracy" },
  { id:105, q:"What is one right from the First Amendment?", a:"Freedom of speech / Freedom of religion / Freedom of assembly / Freedom of the press / Right to petition the government", cat:"Principles of American Democracy" },
  { id:106, q:"What is one right from the Fifth Amendment?", a:"The right to a fair trial / The right not to testify against yourself / The right to a trial by jury in a civil case / The right to vote / The right to liberty", cat:"Principles of American Democracy", ctx:"The Fifth Amendment's protections against self-incrimination ('pleading the Fifth') stem from English history, where accused people were tortured into confessing. The 'due process' clause has become one of the most important constitutional protections, ensuring the government follows fair procedures." },
  { id:107, q:"What is freedom?", a:"Not having to live under an oppressive government", cat:"Principles of American Democracy" },
  { id:108, q:"What are the rights of everyone living in the United States?", a:"Freedom of expression / Freedom of assembly / Freedom to petition the government / Freedom of religion / The right to bear arms", cat:"Rights and Responsibilities" },
  { id:109, q:"What is the name of the Speaker of the House of Representatives now?", a:"Mike Johnson", cat:"System of Government" },
  { id:110, q:"What is a constitutional amendment?", a:"A change to the Constitution / An addition to the Constitution", cat:"Principles of American Democracy" },
  { id:111, q:"What are two rights from the Declaration of Independence?", a:"Life / Liberty / Pursuit of happiness", cat:"Principles of American Democracy" },
  { id:112, q:"What was the first capital of the United States?", a:"New York", cat:"Recent American History", ctx:"New York City served as the first U.S. capital from 1785 to 1790. George Washington was inaugurated there at Federal Hall on April 30, 1789. The capital then moved to Philadelphia (1790-1800) while Washington, D.C. was being built." },
  { id:113, q:"In what city was the Constitutional Convention held?", a:"Philadelphia", cat:"Colonial Period and Independence", ctx:"Philadelphia was the largest and most important city in the colonies. The Convention met in the Pennsylvania State House (now Independence Hall) — the same building where the Declaration of Independence had been signed in 1776. Philadelphia served as the de facto capital of the Revolution." },
  { id:114, q:"What happened to Japanese Americans during World War II?", a:"They were sent to internment camps", cat:"Recent American History", ctx:"After Pearl Harbor, Executive Order 9066 (1942) forced about 120,000 Japanese Americans — two-thirds of whom were U.S. citizens — into internment camps. They lost their homes, businesses, and freedom. In 1988, President Reagan signed the Civil Liberties Act, formally apologizing and providing $20,000 in reparations to each surviving internee." },
  { id:115, q:"Which amendment gives the right to vote to citizens eighteen and older?", a:"The 26th Amendment", cat:"Rights and Responsibilities" },
  { id:116, q:"At what age can citizens vote?", a:"Eighteen (18)", cat:"Rights and Responsibilities" },
  { id:117, q:"When is the last day to send in federal income taxes?", a:"April 15", cat:"Rights and Responsibilities" },
  { id:118, q:"When was the Constitution written?", a:"1787", cat:"Colonial Period and Independence" },
  { id:119, q:"What ocean is on the East Coast?", a:"Atlantic (Ocean)", cat:"Geography" },
  { id:120, q:"What ocean is on the West Coast?", a:"Pacific (Ocean)", cat:"Geography" },
  { id:121, q:"Why does the flag have 13 stripes?", a:"Because there were 13 original colonies", cat:"Symbols" },
  { id:122, q:"Why does the flag have 50 stars?", a:"Because there are 50 states", cat:"Symbols" },
  { id:123, q:"When do we celebrate Independence Day?", a:"July 4", cat:"Holidays" },
  { id:124, q:"Who was the first President?", a:"George Washington", cat:"Colonial Period and Independence" },
  { id:125, q:"Who is known as the 'Father of Our Country'?", a:"George Washington", cat:"Colonial Period and Independence" },
  { id:126, q:"Who wrote the Declaration of Independence?", a:"Thomas Jefferson", cat:"Colonial Period and Independence" },
  { id:127, q:"What are the two major political parties in the U.S.?", a:"Democratic and Republican", cat:"System of Government" },
  { id:128, q:"What is the name of the national anthem?", a:"The Star-Spangled Banner", cat:"Symbols" },
];

const categories = [...new Set(questions.map(q => q.cat))];

const catColors = {
  "Principles of American Democracy": { bg: "#1a2744", accent: "#4a90d9" },
  "System of Government": { bg: "#1e3a2f", accent: "#4caf7d" },
  "Rights and Responsibilities": { bg: "#3a1e3a", accent: "#b06ab3" },
  "Colonial Period and Independence": { bg: "#3a2a1a", accent: "#d4915e" },
  "The 1800s": { bg: "#2a1a1a", accent: "#d45e5e" },
  "Recent American History": { bg: "#1a2a3a", accent: "#5eb8d4" },
  "Geography": { bg: "#2a3a1a", accent: "#8bc34a" },
  "Symbols": { bg: "#3a3a1a", accent: "#d4c75e" },
  "Holidays": { bg: "#3a1a2a", accent: "#d45e8c" },
};

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function App() {
  const [mode, setMode] = useState("menu");
  const [selectedCat, setSelectedCat] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showContext, setShowContext] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizShowCtx, setQuizShowCtx] = useState({});
  const [knownSet, setKnownSet] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem("known") || "[]")); } catch { return new Set(); }
  });
  const [studyFilter, setStudyFilter] = useState("all");
  const [quizSize, setQuizSize] = useState(10);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    try { localStorage.setItem("known", JSON.stringify([...knownSet])); } catch {}
  }, [knownSet]);

  const filteredQuestions = useMemo(() => {
    let qs = selectedCat ? questions.filter(q => q.cat === selectedCat) : questions;
    if (studyFilter === "unknown") qs = qs.filter(q => !knownSet.has(q.id));
    if (studyFilter === "known") qs = qs.filter(q => knownSet.has(q.id));
    return qs;
  }, [selectedCat, studyFilter, knownSet]);

  const currentQ = filteredQuestions[currentIdx];

  const toggleKnown = (id) => {
    setKnownSet(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const startStudy = (cat) => {
    setSelectedCat(cat);
    setCurrentIdx(0);
    setShowAnswer(false);
    setShowContext(false);
    setMode("study");
    setAnimKey(k => k + 1);
  };

  const startQuiz = () => {
    const qs = shuffle(selectedCat ? questions.filter(q => q.cat === selectedCat) : questions).slice(0, quizSize);
    setQuizQuestions(qs);
    setQuizAnswers({});
    setQuizShowCtx({});
    setQuizSubmitted(false);
    setMode("quiz");
  };

  const nav = (dir) => {
    const next = currentIdx + dir;
    if (next >= 0 && next < filteredQuestions.length) {
      setCurrentIdx(next);
      setShowAnswer(false);
      setShowContext(false);
      setAnimKey(k => k + 1);
    }
  };

  const progress = questions.length > 0 ? Math.round((knownSet.size / questions.length) * 100) : 0;
  const ctxCount = questions.filter(q => q.ctx).length;

  // ─── MENU ───
  if (mode === "menu") {
    return (
      <div style={{ minHeight:"100vh", background:"linear-gradient(165deg, #0a0e1a 0%, #111827 50%, #0f172a 100%)", padding:"24px 16px", fontFamily:"'Segoe UI', system-ui, sans-serif" }}>
        <div style={{ maxWidth:720, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:40, paddingTop:20 }}>
            <div style={{ fontSize:48, marginBottom:8 }}>🇺🇸</div>
            <h1 style={{ color:"#f1f5f9", fontSize:28, fontWeight:800, margin:0, letterSpacing:"-0.5px" }}>U.S. Citizenship Exam</h1>
            <p style={{ color:"#94a3b8", fontSize:15, margin:"8px 0 0" }}>128 questions · {ctxCount} with historical context 📜</p>

            <div style={{ marginTop:24, background:"#1e293b", borderRadius:12, padding:16, border:"1px solid #334155" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                <span style={{ color:"#94a3b8", fontSize:13 }}>Overall Progress</span>
                <span style={{ color:"#4ade80", fontSize:15, fontWeight:700 }}>{knownSet.size}/{questions.length}</span>
              </div>
              <div style={{ background:"#0f172a", borderRadius:8, height:10, overflow:"hidden" }}>
                <div style={{ background:"linear-gradient(90deg, #4ade80, #22d3ee)", height:"100%", width:`${progress}%`, borderRadius:8, transition:"width 0.5s ease" }} />
              </div>
              {knownSet.size > 0 && (
                <button onClick={() => setKnownSet(new Set())} style={{ marginTop:8, background:"none", border:"none", color:"#64748b", fontSize:11, cursor:"pointer", textDecoration:"underline" }}>Reset progress</button>
              )}
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:32 }}>
            <button onClick={() => startStudy(null)} style={{ background:"linear-gradient(135deg, #3b82f6, #2563eb)", color:"#fff", border:"none", borderRadius:14, padding:"18px 16px", fontSize:15, fontWeight:700, cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:6, transition:"transform 0.15s", boxShadow:"0 4px 20px rgba(59,130,246,0.3)" }}
              onMouseEnter={e => e.currentTarget.style.transform="translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}>
              <span style={{ fontSize:24 }}>📖</span>Study All
            </button>
            <button onClick={() => { setSelectedCat(null); setMode("quiz_setup"); }} style={{ background:"linear-gradient(135deg, #8b5cf6, #7c3aed)", color:"#fff", border:"none", borderRadius:14, padding:"18px 16px", fontSize:15, fontWeight:700, cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:6, transition:"transform 0.15s", boxShadow:"0 4px 20px rgba(139,92,246,0.3)" }}
              onMouseEnter={e => e.currentTarget.style.transform="translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}>
              <span style={{ fontSize:24 }}>🧠</span>Practice Test
            </button>
          </div>

          <h2 style={{ color:"#e2e8f0", fontSize:16, fontWeight:700, marginBottom:12 }}>Categories</h2>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {categories.map(cat => {
              const cc = catColors[cat] || { accent:"#888", bg:"#222" };
              const total = questions.filter(q => q.cat === cat).length;
              const known = questions.filter(q => q.cat === cat && knownSet.has(q.id)).length;
              const ctxInCat = questions.filter(q => q.cat === cat && q.ctx).length;
              return (
                <button key={cat} onClick={() => startStudy(cat)} style={{ background:"#1e293b", border:`1px solid ${cc.accent}33`, borderRadius:12, padding:"14px 16px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", transition:"all 0.15s", borderLeft:`4px solid ${cc.accent}` }}
                  onMouseEnter={e => { e.currentTarget.style.background="#253348"; e.currentTarget.style.transform="translateX(4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background="#1e293b"; e.currentTarget.style.transform="translateX(0)"; }}>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-start", gap:2 }}>
                    <span style={{ color:"#e2e8f0", fontSize:14, fontWeight:600, textAlign:"left" }}>{cat}</span>
                    {ctxInCat > 0 && <span style={{ color:"#f59e0b", fontSize:11 }}>📜 {ctxInCat} with context</span>}
                  </div>
                  <span style={{ color:cc.accent, fontSize:13, fontWeight:700, whiteSpace:"nowrap", marginLeft:12 }}>{known}/{total}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ─── QUIZ SETUP ───
  if (mode === "quiz_setup") {
    return (
      <div style={{ minHeight:"100vh", background:"linear-gradient(165deg, #0a0e1a 0%, #111827 50%, #0f172a 100%)", padding:"24px 16px", fontFamily:"'Segoe UI', system-ui, sans-serif" }}>
        <div style={{ maxWidth:520, margin:"0 auto", paddingTop:40 }}>
          <button onClick={() => setMode("menu")} style={{ background:"none", border:"none", color:"#64748b", fontSize:14, cursor:"pointer", marginBottom:24, display:"flex", alignItems:"center", gap:6 }}>← Menu</button>
          <h2 style={{ color:"#f1f5f9", fontSize:24, fontWeight:800, marginBottom:24 }}>🧠 Set Up Your Test</h2>
          <div style={{ background:"#1e293b", borderRadius:14, padding:20, marginBottom:16, border:"1px solid #334155" }}>
            <label style={{ color:"#94a3b8", fontSize:13, display:"block", marginBottom:8 }}>Category</label>
            <select value={selectedCat || ""} onChange={e => setSelectedCat(e.target.value || null)} style={{ width:"100%", background:"#0f172a", color:"#e2e8f0", border:"1px solid #334155", borderRadius:8, padding:"10px 12px", fontSize:14 }}>
              <option value="">All categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ background:"#1e293b", borderRadius:14, padding:20, marginBottom:24, border:"1px solid #334155" }}>
            <label style={{ color:"#94a3b8", fontSize:13, display:"block", marginBottom:8 }}>Number of questions: <strong style={{ color:"#e2e8f0" }}>{quizSize}</strong></label>
            <input type="range" min={5} max={Math.min(50, selectedCat ? questions.filter(q=>q.cat===selectedCat).length : 128)} value={quizSize} onChange={e => setQuizSize(+e.target.value)} style={{ width:"100%", accentColor:"#8b5cf6" }} />
          </div>
          <button onClick={startQuiz} style={{ width:"100%", background:"linear-gradient(135deg, #8b5cf6, #7c3aed)", color:"#fff", border:"none", borderRadius:14, padding:16, fontSize:16, fontWeight:700, cursor:"pointer", boxShadow:"0 4px 20px rgba(139,92,246,0.3)" }}>Start Test →</button>
        </div>
      </div>
    );
  }

  // ─── QUIZ ───
  if (mode === "quiz") {
    const score = quizSubmitted ? quizQuestions.filter(q => quizAnswers[q.id] === "correct").length : 0;
    return (
      <div style={{ minHeight:"100vh", background:"linear-gradient(165deg, #0a0e1a 0%, #111827 50%, #0f172a 100%)", padding:"24px 16px", fontFamily:"'Segoe UI', system-ui, sans-serif" }}>
        <div style={{ maxWidth:620, margin:"0 auto" }}>
          <button onClick={() => setMode("menu")} style={{ background:"none", border:"none", color:"#64748b", fontSize:14, cursor:"pointer", marginBottom:16, display:"flex", alignItems:"center", gap:6 }}>← Menu</button>

          {quizSubmitted && (
            <div style={{ background: score/quizQuestions.length >= 0.6 ? "linear-gradient(135deg, #065f46, #064e3b)" : "linear-gradient(135deg, #7f1d1d, #6b2121)", borderRadius:16, padding:24, marginBottom:24, textAlign:"center", border: score/quizQuestions.length >= 0.6 ? "1px solid #10b981" : "1px solid #ef4444" }}>
              <div style={{ fontSize:48 }}>{score/quizQuestions.length >= 0.6 ? "🎉" : "💪"}</div>
              <div style={{ color:"#f1f5f9", fontSize:28, fontWeight:800 }}>{score}/{quizQuestions.length}</div>
              <div style={{ color:"#94a3b8", fontSize:14 }}>{score/quizQuestions.length >= 0.6 ? "You passed!" : "Keep studying!"} — You need 60% to pass</div>
              <button onClick={() => setMode("menu")} style={{ marginTop:16, background:"rgba(255,255,255,0.15)", color:"#fff", border:"none", borderRadius:10, padding:"10px 24px", fontSize:14, fontWeight:600, cursor:"pointer" }}>Back to Menu</button>
            </div>
          )}

          {quizQuestions.map((q, i) => (
            <div key={q.id} style={{ background:"#1e293b", borderRadius:14, padding:18, marginBottom:12, border: quizSubmitted ? (quizAnswers[q.id]==="correct" ? "1px solid #10b981" : "1px solid #ef4444") : "1px solid #334155" }}>
              <div style={{ display:"flex", gap:10, marginBottom:10 }}>
                <span style={{ color:"#64748b", fontSize:13, fontWeight:700, minWidth:28 }}>{i+1}.</span>
                <span style={{ color:"#e2e8f0", fontSize:14, fontWeight:600 }}>{q.q}</span>
              </div>
              {!quizSubmitted ? (
                <div style={{ marginLeft:38 }}>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:8 }}>
                    <button onClick={() => setShowAnswer(showAnswer === q.id ? null : q.id)} style={{ background:"#0f172a", color:"#94a3b8", border:"1px solid #334155", borderRadius:8, padding:"6px 14px", fontSize:12, cursor:"pointer" }}>
                      {showAnswer===q.id ? "Hide answer" : "Show answer"}
                    </button>
                    {q.ctx && (
                      <button onClick={() => setQuizShowCtx(p => ({...p, [q.id]: !p[q.id]}))} style={{ background:"#0f172a", color:"#f59e0b", border:"1px solid #92400e44", borderRadius:8, padding:"6px 14px", fontSize:12, cursor:"pointer", display:"flex", alignItems:"center", gap:4 }}>
                        📜 {quizShowCtx[q.id] ? "Hide context" : "Historical context"}
                      </button>
                    )}
                  </div>
                  {showAnswer===q.id && <div style={{ color:"#4ade80", fontSize:13, marginBottom:8, padding:"8px 12px", background:"#0a2618", borderRadius:8 }}>{q.a}</div>}
                  {quizShowCtx[q.id] && q.ctx && (
                    <div style={{ color:"#fbbf24", fontSize:12, lineHeight:1.6, marginBottom:8, padding:"10px 12px", background:"#1c1508", borderRadius:8, borderLeft:"3px solid #f59e0b" }}>{q.ctx}</div>
                  )}
                  <div style={{ display:"flex", gap:8 }}>
                    <button onClick={() => setQuizAnswers(p => ({...p, [q.id]:"correct"}))} style={{ flex:1, background: quizAnswers[q.id]==="correct" ? "#065f46" : "#0f172a", color: quizAnswers[q.id]==="correct" ? "#4ade80" : "#64748b", border: quizAnswers[q.id]==="correct" ? "2px solid #10b981" : "1px solid #334155", borderRadius:10, padding:"8px", fontSize:13, fontWeight:600, cursor:"pointer" }}>✓ I knew it</button>
                    <button onClick={() => setQuizAnswers(p => ({...p, [q.id]:"wrong"}))} style={{ flex:1, background: quizAnswers[q.id]==="wrong" ? "#7f1d1d" : "#0f172a", color: quizAnswers[q.id]==="wrong" ? "#fca5a5" : "#64748b", border: quizAnswers[q.id]==="wrong" ? "2px solid #ef4444" : "1px solid #334155", borderRadius:10, padding:"8px", fontSize:13, fontWeight:600, cursor:"pointer" }}>✗ Didn't know</button>
                  </div>
                </div>
              ) : (
                <div style={{ marginLeft:38 }}>
                  <div style={{ color:"#94a3b8", fontSize:13, padding:"8px 12px", background:"#0f172a", borderRadius:8 }}>
                    <strong style={{ color:"#e2e8f0" }}>A:</strong> {q.a}
                  </div>
                  {q.ctx && (
                    <div style={{ marginTop:8 }}>
                      <button onClick={() => setQuizShowCtx(p => ({...p, [q.id]: !p[q.id]}))} style={{ background:"none", border:"none", color:"#f59e0b", fontSize:12, cursor:"pointer", padding:0, display:"flex", alignItems:"center", gap:4 }}>
                        📜 {quizShowCtx[q.id] ? "Hide context" : "Show historical context"}
                      </button>
                      {quizShowCtx[q.id] && (
                        <div style={{ color:"#fbbf24", fontSize:12, lineHeight:1.6, marginTop:6, padding:"10px 12px", background:"#1c1508", borderRadius:8, borderLeft:"3px solid #f59e0b" }}>{q.ctx}</div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {!quizSubmitted && Object.keys(quizAnswers).length === quizQuestions.length && (
            <button onClick={() => setQuizSubmitted(true)} style={{ width:"100%", background:"linear-gradient(135deg, #8b5cf6, #7c3aed)", color:"#fff", border:"none", borderRadius:14, padding:16, fontSize:16, fontWeight:700, cursor:"pointer", marginTop:16, boxShadow:"0 4px 20px rgba(139,92,246,0.3)" }}>See Results →</button>
          )}
          {!quizSubmitted && Object.keys(quizAnswers).length < quizQuestions.length && (
            <div style={{ textAlign:"center", color:"#64748b", fontSize:13, marginTop:12 }}>Answered: {Object.keys(quizAnswers).length}/{quizQuestions.length}</div>
          )}
        </div>
      </div>
    );
  }

  // ─── STUDY MODE ───
  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(165deg, #0a0e1a 0%, #111827 50%, #0f172a 100%)", padding:"24px 16px", fontFamily:"'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ maxWidth:600, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <button onClick={() => { setMode("menu"); setStudyFilter("all"); }} style={{ background:"none", border:"none", color:"#64748b", fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", gap:6 }}>← Menu</button>
          <span style={{ color:"#64748b", fontSize:13 }}>{selectedCat || "All Questions"}</span>
        </div>

        <div style={{ display:"flex", gap:6, marginBottom:20, justifyContent:"center" }}>
          {[["all","All"],["unknown","To Learn"],["known","Learned"]].map(([val,label]) => (
            <button key={val} onClick={() => { setStudyFilter(val); setCurrentIdx(0); setShowAnswer(false); setShowContext(false); }} style={{ background: studyFilter===val ? "#334155" : "#1e293b", color: studyFilter===val ? "#e2e8f0" : "#64748b", border:"1px solid #334155", borderRadius:20, padding:"6px 14px", fontSize:12, fontWeight:600, cursor:"pointer" }}>{label}</button>
          ))}
        </div>

        {filteredQuestions.length === 0 ? (
          <div style={{ textAlign:"center", padding:40, color:"#64748b" }}>
            <div style={{ fontSize:40, marginBottom:12 }}>{studyFilter==="known" ? "📭" : "🎉"}</div>
            <p>{studyFilter==="known" ? "You haven't marked any as learned yet" : "You've learned all questions in this category!"}</p>
          </div>
        ) : currentQ && (
          <>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
              <div style={{ flex:1, background:"#1e293b", borderRadius:6, height:6, overflow:"hidden" }}>
                <div style={{ background:(catColors[currentQ.cat]||{accent:"#4a90d9"}).accent, height:"100%", width:`${((currentIdx+1)/filteredQuestions.length)*100}%`, borderRadius:6, transition:"width 0.3s" }} />
              </div>
              <span style={{ color:"#64748b", fontSize:12, fontWeight:700 }}>{currentIdx+1}/{filteredQuestions.length}</span>
            </div>

            <div key={animKey} style={{ background:"#1e293b", borderRadius:20, overflow:"hidden", border:"1px solid #334155", boxShadow:"0 8px 40px rgba(0,0,0,0.3)", animation:"fadeIn 0.3s ease" }}>
              <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }`}</style>
              <div style={{ background:(catColors[currentQ.cat]||{bg:"#1a2744"}).bg, padding:"16px 20px", borderBottom:"1px solid #334155", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ color:(catColors[currentQ.cat]||{accent:"#4a90d9"}).accent, fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.5px" }}>{currentQ.cat}</span>
                  {currentQ.ctx && <span style={{ fontSize:10, color:"#f59e0b" }}>📜</span>}
                </div>
                <span style={{ color:"#64748b", fontSize:12, fontWeight:700 }}>#{currentQ.id}</span>
              </div>

              <div style={{ padding:"28px 24px" }}>
                <p style={{ color:"#f1f5f9", fontSize:18, fontWeight:700, lineHeight:1.5, margin:0 }}>{currentQ.q}</p>
              </div>

              <div style={{ padding:"0 24px 24px" }}>
                {!showAnswer ? (
                  <button onClick={() => setShowAnswer(true)} style={{ width:"100%", background:"linear-gradient(135deg, #1e40af, #1d4ed8)", color:"#fff", border:"none", borderRadius:12, padding:14, fontSize:15, fontWeight:700, cursor:"pointer", boxShadow:"0 4px 16px rgba(30,64,175,0.3)" }}>Show Answer</button>
                ) : (
                  <div style={{ animation:"fadeIn 0.3s ease" }}>
                    <div style={{ background:"#0a2618", borderRadius:12, padding:16, marginBottom:12, borderLeft:"4px solid #10b981" }}>
                      <p style={{ color:"#4ade80", fontSize:16, fontWeight:600, margin:0, lineHeight:1.5 }}>{currentQ.a}</p>
                    </div>

                    {currentQ.ctx && (
                      <div style={{ marginBottom:12 }}>
                        <button onClick={() => setShowContext(!showContext)} style={{ width:"100%", background:"#1c1508", color:"#f59e0b", border:"1px solid #92400e44", borderRadius:10, padding:"10px 14px", fontSize:13, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6, transition:"all 0.15s" }}
                          onMouseEnter={e => e.currentTarget.style.background="#261e0a"}
                          onMouseLeave={e => e.currentTarget.style.background="#1c1508"}>
                          📜 {showContext ? "Hide Historical Context" : "Show Historical Context"}
                        </button>
                        {showContext && (
                          <div style={{ marginTop:8, padding:"14px 16px", background:"#1c1508", borderRadius:10, borderLeft:"3px solid #f59e0b", animation:"fadeIn 0.3s ease" }}>
                            <p style={{ color:"#fbbf24", fontSize:13, lineHeight:1.7, margin:0 }}>{currentQ.ctx}</p>
                          </div>
                        )}
                      </div>
                    )}

                    <div style={{ display:"flex", gap:10 }}>
                      <button onClick={() => { if(!knownSet.has(currentQ.id)) toggleKnown(currentQ.id); nav(1); }} style={{ flex:1, background:"#065f46", color:"#4ade80", border:"2px solid #10b981", borderRadius:12, padding:12, fontSize:14, fontWeight:700, cursor:"pointer" }}>✓ I know it</button>
                      <button onClick={() => { if(knownSet.has(currentQ.id)) toggleKnown(currentQ.id); nav(1); }} style={{ flex:1, background:"#7f1d1d", color:"#fca5a5", border:"2px solid #ef4444", borderRadius:12, padding:12, fontSize:14, fontWeight:700, cursor:"pointer" }}>✗ Review</button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div style={{ display:"flex", justifyContent:"space-between", marginTop:20 }}>
              <button onClick={() => nav(-1)} disabled={currentIdx===0} style={{ background:"#1e293b", color: currentIdx===0 ? "#334155" : "#94a3b8", border:"1px solid #334155", borderRadius:10, padding:"10px 20px", fontSize:14, fontWeight:600, cursor: currentIdx===0?"default":"pointer" }}>← Previous</button>
              <button onClick={() => nav(1)} disabled={currentIdx>=filteredQuestions.length-1} style={{ background:"#1e293b", color: currentIdx>=filteredQuestions.length-1 ? "#334155" : "#94a3b8", border:"1px solid #334155", borderRadius:10, padding:"10px 20px", fontSize:14, fontWeight:600, cursor: currentIdx>=filteredQuestions.length-1?"default":"pointer" }}>Next →</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
