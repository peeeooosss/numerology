/**
 * MASTER'S INTERPRETATION LIBRARY
 * Complete content for all Life Path numbers (1-9 + Master 11, 22, 33)
 * Personal Year numbers (1-9), and Personal Day guidance.
 *
 * This is the "highly personalised" core — the Master's wisdom
 * encoded for every possible numerological profile.
 */

export interface Interpretation {
  key: string;
  title: string;
  summary: string;
  fullText: string;
  strengths: string[];
  challenges: string[];
  careerGuide: string;
  loveGuide: string;
  healthNotes: string;
  luckyNumbers: number[];
  colors: string[];
  gemstones: string[];
  affirmations: string[];
  vedicNotes: string;
  dos?: string[];
  donts?: string[];
}

// ─── LIFE PATH INTERPRETATIONS ────────────────────────────────────────────────

export const LIFE_PATH_INTERPRETATIONS: Record<number, Interpretation> = {

  1: {
    key: "life_path_1",
    title: "The Pioneer",
    summary: "You are here to lead, create and forge paths where none existed before. Independence and originality are your birthright.",
    fullText: `You carry the vibration of pure creation and leadership. As a Life Path 1, you came into this world with a mission to initiate — to stand at the front when others hesitate. Your soul has walked the path of the follower in past incarnations; this lifetime, the universe has placed the baton firmly in your hands.

You possess a rare combination of courage and creativity. When a vision enters your mind, you do not merely dream about it — you pursue it with a determination that can appear almost single-minded to those around you. This is not stubbornness; it is cosmic purpose. You are literally wired to begin things that others will one day call impossible.

In the Vedic tradition, your number 1 is governed by the Sun — Surya. This gives you a natural radiance, a presence that fills a room before you speak a word. The Sun does not ask permission to shine, and neither should you. Your life will ask you, again and again, to step forward despite fear.

Your greatest learning is learning to lead without dominating, to be independent without being isolated. The Pioneer's shadow is self-absorption — the risk of achieving so much alone that you forget the richness of shared creation. Your most profound victories will come not when you win alone, but when you inspire others to win alongside you.

Career years aligned with 1, 10, 19, and 28 of your age carry inflection points — be ready for opportunity when these arrive. Your peak power cycles occur in Personal Year 1 and Personal Year 8, when your natural authority is amplified by cosmic timing.`,
    strengths: [
      "Natural-born leader with magnetic authority",
      "Exceptional originality and creative vision",
      "Unstoppable determination and self-reliance",
      "Courage to venture into uncharted territory",
      "Ability to inspire action in others",
    ],
    challenges: [
      "Tendency toward stubbornness and rigidity of opinion",
      "Self-absorption when under pressure",
      "Difficulty delegating — the need to do everything alone",
      "Impatience with slower-moving people and processes",
    ],
    careerGuide: "You are built for entrepreneurship, leadership roles, executive positions, and any field that rewards originality — tech founders, creative directors, surgeons, military officers, or heads of state. You need autonomy to thrive. A role where someone else controls your methods will suffocate your potential. If you are employed rather than self-employed, ensure your position carries genuine decision-making power.",
    loveGuide: "In love, you are passionate and devoted, but your independence can be misread as emotional unavailability. Your ideal partner understands your need for personal space and holds their own identity strongly — a partner who depends entirely on you will eventually resent you, and you will feel trapped. You are deeply loyal once committed, but the relationship must feel like a partnership of equals, not a responsibility.",
    healthNotes: "Your constitution is generally strong, fuelled by your relentless drive. The key health risk for Life Path 1 is burnout — you push through fatigue that would stop others, which is admirable until it becomes dangerous. Protect your heart (Sun rules the heart in Vedic astrology). Regular sun exposure, vigorous exercise, and genuine rest — not just sleep, but true stillness — are your medicine. Avoid excess caffeine and stimulants that amplify your already-active system.",
    luckyNumbers: [1, 10, 19, 28],
    colors: ["Gold", "Royal Orange", "Deep Red"],
    gemstones: ["Ruby", "Garnet", "Sunstone"],
    affirmations: [
      "I lead with vision and I inspire with integrity.",
      "My independence is a gift I offer the world, not a wall I hide behind.",
      "I am worthy of the path I was born to walk.",
      "I ask for help not from weakness, but from wisdom.",
    ],
    vedicNotes: "Governed by Surya (Sun), your number resonates with Aditya energy — the light that dispels darkness. The Vedic recommendation for Life Path 1 is to face East during morning meditation or prayer, offer water to the rising sun, and wear gold on Sundays. Avoid major new ventures on Saturdays (Saturn opposes your solar energy). Your karmic lesson is to master the ego — to wield power without arrogance.",
    dos: [
      "Take initiative — your instinct to lead is never wrong",
      "Trust your original ideas before seeking outside validation",
      "Carve out solo time daily to recharge and think clearly",
      "Assert your needs clearly and directly",
    ],
    donts: [
      "Don't let pride prevent you from accepting valuable help",
      "Avoid starting too many projects simultaneously",
      "Don't ignore the emotional needs of people who depend on you",
      "Resist the urge to control outcomes that belong to others",
    ],
  },

  2: {
    key: "life_path_2",
    title: "The Diplomat",
    summary: "You are a master of balance, partnership and subtle intuition. You feel the energy of a room before anyone speaks.",
    fullText: `Life Path 2 is one of the most sensitive and quietly powerful vibrations in all of numerology. Where the 1 blazes trails alone, you illuminate them through deep human connection. You are the diplomat, the peacemaker, the one who can enter a room of conflict and — without raising your voice — find the thread that unites everyone.

Your gift is receptivity. You absorb the emotional landscape around you with extraordinary precision, which makes you an exceptional listener, counsellor, partner, and collaborator. You likely know what someone is feeling before they have articulated it themselves. This is not imagination — it is a refined spiritual sense that is one of the most underestimated powers in the numerological spectrum.

In Vedic numerology, 2 is governed by Chandra — the Moon. The Moon teaches that strength does not always roar; sometimes it glows. Your power comes in cycles, like the Moon itself, waxing and waning. Honour your fluctuating energy rather than fighting it. There will be days when you are magnetic and days when you need to withdraw — both are equally valid and necessary.

The shadow of Life Path 2 is co-dependence — the risk of losing your own identity in the needs of others, of saying yes when every fibre of you wants to say no, of seeking approval so urgently that you become invisible. Your deepest work in this lifetime is learning to nurture yourself with the same tenderness you extend to everyone else.

You work best in partnerships and collaborative environments. You are the power behind the throne — and there is no shame in that. Many of the world's most transformative movements were shaped by 2s who quietly organised, persuaded, and held the vision together while a more visible leader took the stage.`,
    strengths: [
      "Extraordinary emotional intelligence and empathy",
      "Natural mediator — finds compromise where others see only conflict",
      "Deeply intuitive, often psychically sensitive",
      "Loyal, devoted partner in love and in work",
      "Ability to build genuine, lasting alliances",
    ],
    challenges: [
      "Over-sensitivity — absorbs others' pain and carries it as your own",
      "Indecisiveness born from seeing every perspective equally",
      "People-pleasing that erodes personal boundaries",
      "Tendency to give too much and ask for too little",
    ],
    careerGuide: "You are exceptional in roles that require human understanding — counselling, psychology, diplomacy, nursing, mediation, human resources, teaching, and healing arts. You excel in partnerships and are often the indispensable support structure behind a visible figurehead. Music and the arts are also strongly aligned with your 2 vibration. You require a harmonious work environment; chaos and hostility are physically depleting for you, not merely unpleasant.",
    loveGuide: "You are one of the most naturally loving and devoted partners in numerology. Relationships are not just important to you — they are your spiritual laboratory. You give everything in love, which is beautiful and also your greatest vulnerability. Guard against choosing partners who are emotionally unavailable or who take your giving nature for granted. You deserve the same depth of devotion you offer. Your ideal relationship is gentle, communicative, and grounded in mutual emotional safety.",
    healthNotes: "The Moon governs your system, which means emotional health directly impacts physical health. When your emotional world is out of balance — when you have been suppressing feelings or absorbing others' stress — your body will signal it, often through digestive issues, fluid retention, or hormonal fluctuations. Regular time near water (ocean, river, bathing) is genuinely healing for you. Protect your sleep — you are the number that needs the most rest. Yoga and dance are therapeutic, not just physical.",
    luckyNumbers: [2, 11, 20, 29],
    colors: ["Silver", "Pearl White", "Soft Blue"],
    gemstones: ["Moonstone", "Pearl", "Aquamarine"],
    affirmations: [
      "My sensitivity is my superpower, not my weakness.",
      "I give generously and receive gracefully.",
      "I honour my own needs as deeply as I honour others'.",
      "I attract partnerships that reflect my worth.",
    ],
    vedicNotes: "Chandra (Moon) governs your path. The Vedic tradition recommends that Life Path 2 individuals wear white or silver on Mondays, maintain a pearl or moonstone near their sleeping space, and avoid harsh conflicts or confrontations during new moon periods when your energy naturally contracts. Your north node — your karmic growth direction — is toward self-confidence and solo achievement. You came here having mastered dependence on others; this life teaches you to stand in your own authority while maintaining your beautiful relational gifts.",
    dos: [
      "Trust your intuition — it is more accurate than you believe",
      "Say no when your body says no, even if your mind says yes",
      "Schedule regular solitude to process what you absorb",
      "Celebrate your behind-the-scenes contributions",
    ],
    donts: [
      "Don't suppress your feelings to keep the peace",
      "Avoid relationships where your giving goes unacknowledged",
      "Don't mistake your sensitivity for weakness",
      "Resist making major decisions in moments of emotional turbulence",
    ],
  },

  3: {
    key: "life_path_3",
    title: "The Creative",
    summary: "You are here to express, inspire and bring joy. Your words, art and presence are medicine for the world.",
    fullText: `If Life Path 1 is the spark and 2 is the tide, then Life Path 3 is the flame — radiant, warm, ever-changing. You carry one of the most joyful vibrations in the entire numerological spectrum. You are the communicator, the artist, the storyteller — the one whose voice, presence, or creative work touches hearts long after you have left the room.

Your gift to the world is expression. In its highest form, this is the writer who changes how people see themselves, the comedian who releases grief through laughter, the teacher whose words students carry for decades, the entrepreneur whose pitch is so compelling that investors say yes before the numbers are even reviewed. You are built to communicate — and not just adequately, but brilliantly.

In Vedic numerology, 3 is governed by Brihaspati — Jupiter, the great teacher and expander. Jupiter is the largest planet in the solar system, and its influence on you is generosity, optimism, and expansiveness. You naturally attract abundance when you are aligned, because Jupiter's vibration is inherently receptive to good fortune.

The shadow of Life Path 3 is scattered energy. You have so many ideas, so many interests, so many half-finished creative projects and brilliant beginnings that your talent can remain perpetually unrealised. The 3's greatest challenge is choosing depth over breadth — giving one vision the sustained attention it deserves rather than leaping to the next exciting thing.

You also carry a deep sensitivity to criticism. Your work is intensely personal, and when it is dismissed, the wound goes deep. Part of your growth is developing the skin of the artist — releasing your creations into the world knowing some will be misunderstood, and creating anyway.`,
    strengths: [
      "Extraordinary creative ability across multiple mediums",
      "Natural communicator — writing, speaking, performing",
      "Infectious optimism and joie de vivre",
      "Ability to inspire others through self-expression",
      "Magnetic social presence and genuine warmth",
    ],
    challenges: [
      "Scattered focus — too many ideas, not enough follow-through",
      "Emotional sensitivity, especially to criticism",
      "Tendency toward superficiality when depth is needed",
      "Using humour to avoid genuine vulnerability",
    ],
    careerGuide: "Writing, journalism, content creation, speaking, acting, music, design, fashion, advertising, coaching, teaching, counselling, and any role where communication is the primary currency. You also excel in sales and client-facing roles where your charm and story-telling ability convert sceptics. You need creative freedom in your work — being over-managed or micro-directed is your professional death. Self-employment or a role with significant creative autonomy suits you best.",
    loveGuide: "You are romantic, playful, and deeply affectionate. Love is one of your great inspirations — some of the finest creative work emerges from your heart, either in joy or in longing. You need a partner who celebrates your expressiveness rather than finding it excessive. Your vulnerability is that you can charm people into connection but then struggle with the quieter, more demanding aspects of sustained partnership. A relationship built on shared creative life or intellectual adventure will hold your attention long-term.",
    healthNotes: "Jupiter governs your energy, which means your constitution leans toward abundance — and occasionally toward excess. You are drawn to pleasures of the body (good food, wine, sensory experience) and must be mindful of overindulgence, particularly with food, alcohol, and stimulants. Your throat, thyroid, and nervous system are your primary areas to protect. Singing, even casually, is genuinely therapeutic for Life Path 3. Movement that includes expression — dance, expressive yoga, theatre sports — is better for you than repetitive gym routines.",
    luckyNumbers: [3, 12, 21, 30],
    colors: ["Purple", "Violet", "Yellow Gold"],
    gemstones: ["Yellow Sapphire", "Citrine", "Amethyst"],
    affirmations: [
      "My creative voice is unique and the world needs to hear it.",
      "I choose depth — I water one seed until it blooms.",
      "Joy is my natural state; I allow myself to return to it.",
      "My self-expression heals me and serves others.",
    ],
    vedicNotes: "Brihaspati (Jupiter) governs your path, conferring natural wisdom and a teaching energy that others are drawn to. The Vedic tradition recommends that Life Path 3 individuals donate or serve on Thursdays, wear yellow on Jupiter's day, and keep a yellow sapphire or citrine in their workspace. Your karmic gift is creative abundance — it flows freely when you use it in service of others rather than ego-gratification. The Vedic phrase for your path is 'Guru Kripa' — the grace of the teacher.",
    dos: [
      "Commit to finishing one creative project before starting the next",
      "Journal or create something expressive daily, even briefly",
      "Speak your truth — your words have more power than you know",
      "Share your gifts generously; they multiply when given away",
    ],
    donts: [
      "Don't dilute your gifts by pursuing every shiny idea simultaneously",
      "Avoid using humour or lightness to sidestep real emotional work",
      "Don't suppress your creativity for the sake of practicality",
      "Resist seeking constant external validation for your work",
    ],
  },

  4: {
    key: "life_path_4",
    title: "The Builder",
    summary: "You are the architect of reality — steady, disciplined, and capable of creating things that last centuries.",
    fullText: `Life Path 4 is the number of foundation, of structure, of the builder who pours the concrete that allows everything else to stand. In a numerological landscape full of creative dreamers and bold initiators, you are the one who makes things real. You are the engineer behind the vision, the farmer who knows every crop must be tended before it yields.

Your gift is reliability. When you make a commitment, it is granite. When you build something — whether a business, a family, a skill set, or a reputation — you build it to last. You are not interested in shortcuts. You understand at a cellular level that anything worth having requires sustained, disciplined effort, and you are one of the few numbers with the constitution to actually do that work.

In Vedic numerology, 4 is associated with Rahu — the North Node of the Moon, a karmic point of intense focus, ambition, and transformation. Rahu's influence gives the 4 a shadow: a tendency toward obsession with work, a difficulty resting, a feeling that if you are not productive, you are not valuable. This is the 4's deepest wound — the belief that love must be earned through labour.

Your most important growth edge is learning to value being as much as doing. You are so capable of carrying weight that the people around you may unconsciously pile more onto your shoulders than is fair or healthy. You must learn to say, "This is not mine to carry," — and mean it.

The 4 is also the number most connected to the physical plane — to the body, the earth, the practical reality of daily life. This is your domain of mastery. Where others lose themselves in abstraction, you know how to translate inspiration into action. This is an extraordinary gift.`,
    strengths: [
      "Unmatched reliability and integrity",
      "Exceptional organisational and planning ability",
      "The discipline to complete what others abandon",
      "Practical genius — bridging vision with reality",
      "Deep loyalty in all relationships",
    ],
    challenges: [
      "Rigidity — difficulty adapting when plans change",
      "Workaholism and the inability to rest without guilt",
      "Resistance to innovation, new approaches or 'wasted' effort",
      "Tendency to become trapped in routine",
    ],
    careerGuide: "Engineering, architecture, project management, finance, law, medicine, real estate, construction, military, government service, agriculture — any field where precision, structure, and long-term thinking are rewarded. You are the person organisations rely on when things must actually get done. You may not always receive the spotlight, but you are indispensable. Consider entrepreneurship in traditional sectors — the 4 builds generational businesses, not flash-in-the-pan ventures.",
    loveGuide: "You love through consistency, not grand gestures. Your version of romance is remembering every detail your partner mentioned three months ago and then acting on it. You are extraordinarily dependable and deeply devoted — but you may struggle with emotional expressiveness. Your partner needs to understand that your quality time and acts of service are your love language, and you need a partner who can receive these gifts and offer emotional warmth in return. You thrive with grounded, secure partners who do not require constant verbal reassurance.",
    healthNotes: "Your body is strong and resilient, conditioned by your disciplined lifestyle. The primary health risks for Life Path 4 are skeletal and structural — joints, spine, teeth, and bones are your vulnerable areas (Rahu and Saturn both govern these in Vedic tradition). Regular bodywork, yoga, and flexibility practices counteract the rigidity you hold in your body as well as your mind. Be vigilant about mental health: the 4's tendency to suppress emotion and push through difficulty can manifest as chronic stress, anxiety, and depression when unaddressed.",
    luckyNumbers: [4, 13, 22, 31],
    colors: ["Earthy Green", "Dark Brown", "Deep Blue"],
    gemstones: ["Hessonite Garnet", "Emerald", "Malachite"],
    affirmations: [
      "My value is not determined by my productivity.",
      "I build with love, and what I build endures.",
      "I trust the process, even when I cannot see the whole plan.",
      "Rest is not weakness — it is part of the foundation.",
    ],
    vedicNotes: "Rahu's influence on your path gives you an almost obsessive focus that, when directed toward the right goal, makes you unstoppable. The Vedic tradition recommends regular connection with the earth — gardening, barefoot walking on natural ground, or working with natural materials. Saturday is your power day. Avoid major new ventures during Rahu kalam (the period of Rahu each day). Your karmic path is to master the material world so completely that you may eventually release your attachment to it — the truest sign of mastery.",
    dos: [
      "Create systems and routines — they are your superpower",
      "Complete things; your energy thrives on finishing cycles",
      "Schedule genuine rest as rigorously as you schedule work",
      "Trust your methodical pace — slow and sure always wins for you",
    ],
    donts: [
      "Don't let perfectionism become paralysis",
      "Avoid taking on others' responsibilities out of misplaced duty",
      "Don't dismiss innovative ideas before properly evaluating them",
      "Resist the belief that you must earn love through sacrifice",
    ],
  },

  5: {
    key: "life_path_5",
    title: "The Freedom Seeker",
    summary: "You are a catalyst for change — magnetic, versatile, and alive only when you are free to experience everything life offers.",
    fullText: `Life Path 5 is the number of freedom, experience, and transformation. You did not come here to settle — you came here to taste life in its full spectrum. Adventure, variety, sensory experience, intellectual exploration, travel, and the thrill of the unexpected are not luxuries for you; they are oxygen.

You possess a versatility that others envy and occasionally find exhausting. Where the 4 builds deep and narrow, you build wide. You have been called a Renaissance person, a jack of all trades — and while others say this as a mild criticism, for you it is the literal truth: you are meant to master multiple areas of life, accumulate diverse experience, and synthesise it into something the specialist cannot see.

In Vedic numerology, 5 is governed by Budha — Mercury, the planet of communication, trade, and intelligence. Mercury is quicksilver, moving through the zodiac faster than any other planet, and your mind operates at a similar velocity. You process information quickly, adapt instantly to new environments, and can hold multiple seemingly contradictory truths simultaneously.

The shadow of Life Path 5 is restlessness. The freedom you crave can become an addiction to escape — escaping commitment, escaping routine, escaping yourself. When you feel trapped (and you will feel this acutely), the impulse to abandon everything and start fresh is powerful and not always wisdom. Your deepest growth is learning that real freedom exists not just in movement but in conscious choice — choosing to stay as freely as you choose to go.

Your life will be rich with experience. You will accumulate stories that could fill volumes. The question is not whether you will have adventures — you will. The question is whether you will learn from them, or repeat them.`,
    strengths: [
      "Extraordinary adaptability — you thrive under change",
      "Magnetic personality with natural persuasive power",
      "Multi-talented; quick to learn new skills",
      "Fearless explorer of new ideas and experiences",
      "Freedom-promoting — inspires others to live more fully",
    ],
    challenges: [
      "Chronic restlessness and difficulty with long-term commitment",
      "Susceptibility to excess and addictive patterns",
      "Starting many things without seeing them through",
      "Running from depth by staying constantly in motion",
    ],
    careerGuide: "Sales, marketing, travel, journalism, media, politics, law, import/export, entrepreneurship, entertainment, personal training, life coaching — any role that offers variety, human contact, and the freedom to move. You suffocate in rigid, repetitive environments. You need a career that challenges you regularly with new problems. Many Life Path 5 individuals build successful careers by combining several specialties uniquely — the writer who also consults, the trainer who also podcasts, the entrepreneur who also speaks.",
    loveGuide: "You are exciting, passionate, and genuinely stimulating to be with — there is rarely a dull moment in your orbit. The challenge is that you require a partner who is secure enough not to compete with your freedom. Jealous, controlling, or overly dependent partners bring out your worst impulse: to run. Your ideal relationship is one of two whole, independent individuals who choose each other daily. When you have found that person — someone who enriches your freedom rather than limiting it — you are capable of extraordinary fidelity.",
    healthNotes: "Mercury governs your nervous system, and your constitution reflects this — quick, wired, and occasionally frazzled. Your primary health vulnerabilities are the nervous system, respiratory system, and addictive tendencies. You metabolise substances — alcohol, caffeine, sugar, stimulants — quickly, but also become dependent on them quickly. Your health thrives on variety (even in exercise and diet), on outdoor movement, and on breathing practices. Avoid prolonged sedentary periods; your body and mind both require physical variety.",
    luckyNumbers: [5, 14, 23, 32],
    colors: ["Turquoise", "Bright Green", "Silver"],
    gemstones: ["Emerald", "Green Tourmaline", "Peridot"],
    affirmations: [
      "True freedom is choosing my life, not escaping it.",
      "I am a conduit of change — I transform wherever I go.",
      "I commit to experiences fully, knowing I can always choose again.",
      "My versatility is a gift that serves the world.",
    ],
    vedicNotes: "Budha (Mercury) governs your path, conferring swiftness of mind and gift of communication. The Vedic tradition recommends wearing an emerald (or green tourmaline as substitute) on the little finger of the right hand for Life Path 5 individuals to enhance Mercury's positive influence. Wednesday is your power day. Recite Mercury mantras or simply spend Wednesdays in intentional learning or communication. Your karmic lesson is mastery of the senses — not avoidance of experience, but the wisdom to engage it without being enslaved by it.",
    dos: [
      "Embrace change consciously rather than chaotically",
      "Allow yourself multi-hyphenate careers and paths",
      "Build in variety, travel and new experiences as non-negotiables",
      "Use your persuasive gifts to champion causes you believe in",
    ],
    donts: [
      "Don't confuse restlessness with intuition when making big decisions",
      "Avoid commitment to situations or people out of temporary excitement",
      "Don't let the fear of boredom drive you to destroy what is good",
      "Resist the pull of excess — your system amplifies everything",
    ],
  },

  6: {
    key: "life_path_6",
    title: "The Nurturer",
    summary: "You are the heart of every space you enter — a natural healer, protector, and creator of beauty and harmony.",
    fullText: `Life Path 6 carries the vibration of love made tangible. You are the nurturer, the healer, the person who walks into a room and instinctively begins making it better — adjusting the temperature, checking if people are fed, noticing who is left out, creating the conditions in which others can flourish. This is not performance; it is your fundamental nature.

Your gift is love in action. Where others feel love as an emotion, you express it as a craft. You build beautiful homes, raise extraordinary children, create workplaces where people feel genuinely valued, mentor with patience and precision, and carry an aesthetic sense that elevates everything you touch. Venus governs your path in Vedic numerology, and her mark is unmistakable in your life: beauty, harmony, and love are not merely preferences — they are your operating system.

The 6 is often called the 'perfect number' in Western mathematics, and there is a reason this resonates — you carry within you a deep internal standard for how things should be. When reality does not meet that standard, in yourself or in others, the discomfort is acute.

Your shadow is perfectionism and the saviour archetype. The risk is that your nurturing becomes controlling — that love becomes conditional on others meeting your vision of what is right. The 6 who has not done their inner work often sacrifices everything for others and then feels invisible, unappreciated, and quietly resentful. Your growth is learning that you are not responsible for everyone's wellbeing — and that the most loving thing you can sometimes do is allow others to face the consequences of their own choices.

You are also deeply creative, though you may not identify primarily as an artist. The 6 has one of the strongest aesthetic sensibilities in the numerological spectrum.`,
    strengths: [
      "Exceptional nurturing capacity — instinctively protective and caring",
      "Natural healer in whatever domain you inhabit",
      "Strong aesthetic sense — beautifies every environment",
      "Deeply responsible and reliable",
      "Ability to hold loving space for others' growth",
    ],
    challenges: [
      "Perfectionism that becomes controlling",
      "Martyrdom — sacrificing self and feeling unseen",
      "Taking on others' problems as personal failures",
      "Difficulty setting boundaries with those you love",
    ],
    careerGuide: "Healthcare, counselling, therapy, education, interior design, hospitality, social work, parenting and childcare, coaching, culinary arts, veterinary medicine, the wellness industry, community building. You are extraordinary in any role that allows you to care for, create for, or guide others. You have a gift for running family businesses and community enterprises. You need your work to feel meaningful — you cannot sustain effort in a context that feels harmful or indifferent to human wellbeing.",
    loveGuide: "Love is your spiritual path. Romantic partnership, family life, and deep friendship are where you do your most important work in this lifetime. You are devoted, generous, and capable of an extraordinary quality of love — but you must be careful that this devotion does not become martyrdom. Choose partners who actively reciprocate rather than simply receiving. You deserve to be cherished with the same depth you give. A partner who takes your nurturing for granted will gradually extinguish your light.",
    healthNotes: "Venus governs your constitution, giving you a natural appreciation for physical pleasure and comfort. Your health vulnerabilities include the heart, kidneys, and reproductive system. You tend to hold emotional stress in the body — particularly in the back and throat (Venus rules the throat chakra in some traditions). Creative expression — art, music, dance, cooking — is your most natural and effective form of healing. Avoid the 6's tendency to neglect your own physical needs while attending to everyone else's.",
    luckyNumbers: [6, 15, 24, 33],
    colors: ["Rose Pink", "Soft Green", "Cream White"],
    gemstones: ["Rose Quartz", "Diamond", "Pink Tourmaline"],
    affirmations: [
      "I am worthy of the love I so freely give.",
      "I serve from fullness, not from depletion.",
      "My boundaries are an act of love for both of us.",
      "Beauty flows through me and enriches every space I enter.",
    ],
    vedicNotes: "Shukra (Venus) governs your path, making you naturally aligned with the principle of Lakshmi — prosperity, beauty, and abundance. The Vedic tradition recommends that Life Path 6 individuals wear white or pink on Fridays, keep fresh flowers in the home, and recite Shukra mantras to harmonise Venus's energy. Your karmic work is balancing giving and receiving — you came here having mastered self-sufficiency; this lifetime teaches the profound art of intimacy, of allowing others to truly know and care for you.",
    dos: [
      "Practice receiving as graciously as you give",
      "Create beauty in your home — your environment directly affects your wellbeing",
      "Set loving but firm limits with those who drain your energy",
      "Let yourself be cared for without guilt",
    ],
    donts: [
      "Don't sacrifice your own needs to fix others' problems",
      "Avoid making love conditional on others meeting your standards",
      "Don't take on responsibility for outcomes that belong to others",
      "Resist the urge to control out of love — trust others' journeys",
    ],
  },

  7: {
    key: "life_path_7",
    title: "The Seeker of Truth",
    summary: "You are the most spiritually inclined of all Life Paths — an analyst of the invisible, a student of the deeper reality beneath surface appearances.",
    fullText: `Life Path 7 is perhaps the most uniquely positioned of all the primary numbers — you are the bridge between the material and spiritual worlds, the one who asks the questions that make others uncomfortable, the analyst who will not accept a convenient answer when the true one is harder but more real.

You carry within you a relentless drive toward understanding. Not the surface understanding of facts and figures, but the deeper understanding of why — why things happen, what lies beneath appearances, what the universe is actually made of at its most fundamental level. This drive can express as scientific inquiry, philosophical exploration, spiritual seeking, or psychological depth work — but the engine underneath is always the same: you must know the truth.

In Vedic numerology, 7 is governed by Ketu — the South Node of the Moon, the significator of spiritual liberation, mysticism, and moksha. This is perhaps the most spiritually significant of all planetary influences in Vedic astrology. Ketu's energy is otherworldly, introspective, and oriented toward the dissolution of ego — which is why 7 individuals often feel like they do not quite belong to the ordinary world. They don't. They are tuned to a different frequency.

Your primary challenge is isolation. You prefer the company of your own thoughts and a handful of profound relationships over the noise of superficial social life — this is wisdom, not pathology. But at its shadow extreme, this preference becomes hermetic withdrawal, emotional unavailability, and the misuse of spiritual practice to avoid genuine human intimacy.

You are at your most powerful when you bridge your inner world with the outer one — when you take the insights from your depths and offer them to those who need them. The 7 who keeps their wisdom private is like a lighthouse that faces only inward.`,
    strengths: [
      "Extraordinary analytical and investigative mind",
      "Natural intuition that borders on precognition",
      "Deep capacity for spiritual understanding",
      "Ability to perceive patterns invisible to others",
      "Intellectual depth and love of mastery",
    ],
    challenges: [
      "Tendency toward emotional withdrawal and isolation",
      "Difficulty trusting others and being vulnerable",
      "Cynicism or scepticism used as defensive armour",
      "Perfectionism in thought that leads to inaction",
    ],
    careerGuide: "Research, science, academia, philosophy, psychology, technology, investigation, law, medicine, spirituality, writing, data analysis, cryptography, archaeology. You need intellectual depth in your work — you are allergic to shallow, repetitive tasks. You work best independently or in small, highly competent teams. You are the expert others come to when the problem is genuinely difficult. Many 7s find extraordinary fulfilment in combining a conventional career with a private spiritual or philosophical practice.",
    loveGuide: "You love deeply but rarely easily. You require a partner who can meet you in the realm of ideas as well as the realm of feeling — intellectual compatibility is not negotiable for you. You are private, and you need a partner who respects that privacy and does not interpret your need for solitude as rejection. Your greatest growth in love is learning to be emotionally present — not just mentally engaged. Once you trust someone completely, you are extraordinarily loyal and capable of a rare depth of partnership.",
    healthNotes: "Ketu governs your constitution, and its influence can manifest as mysterious or elusive health conditions that do not respond easily to conventional diagnosis. Your mind-body connection is exceptionally strong — your physical health is intimately tied to your mental and spiritual state. When you are intellectually over-stimulated or spiritually disconnected, the body will signal it. Meditation is not just helpful for you — it is essential maintenance. Regular time in nature, away from screens and noise, recharges your system profoundly. Protect your nervous system.",
    luckyNumbers: [7, 16, 25, 34],
    colors: ["Deep Purple", "Navy Blue", "Forest Green"],
    gemstones: ["Amethyst", "Lapis Lazuli", "Selenite"],
    affirmations: [
      "I trust my intuition completely — it is my most reliable compass.",
      "I share my insights; the world needs what I have discovered.",
      "Vulnerability is not weakness — it is the doorway to real connection.",
      "I am of this world and beyond it; both are sacred.",
    ],
    vedicNotes: "Ketu's influence on your path is a profound spiritual inheritance. In the Vedic tradition, Ketu represents the accumulated spiritual wisdom of past lives — which is why 7 individuals often feel inexplicably wise about certain subjects from an early age, as if they already know. The Vedic recommendation for Life Path 7 is to maintain a consistent meditation or pranayama practice, to avoid alcohol (which clouds the intuitive channel), and to spend time near bodies of water or in natural settings regularly. Your karmic work is to serve as a light for others — to bring your hard-won understanding into the world rather than keeping it behind closed doors.",
    dos: [
      "Prioritise daily solitude and reflection — it is not indulgence, it is maintenance",
      "Study what genuinely fascinates you; your mastery will serve others",
      "Trust your instincts even when you cannot logically explain them",
      "Share what you know — your insights are too valuable to keep to yourself",
    ],
    donts: [
      "Don't let intellectual pride prevent you from accepting emotional truth",
      "Avoid isolating so deeply that real connection becomes impossible",
      "Don't use cynicism as a shield against disappointment",
      "Resist the habit of endlessly analysing before acting",
    ],
  },

  8: {
    key: "life_path_8",
    title: "The Powerhouse",
    summary: "You are here to achieve, to build wealth, to wield authority — and to learn that true power serves something greater than itself.",
    fullText: `Life Path 8 is the number of authority, material mastery, and executive power. If numerology had a corporate hierarchy, the 8 would be at the top — not because they were born there, but because they built their way there through will, intelligence, and a vision of what was possible that others dismissed as impossible.

You think in systems and scale. Where others see a small business, you see a conglomerate. Where others see a problem, you see a market opportunity. You have an almost preternatural understanding of how the material world works — of money, power, strategy, and the invisible levers that control visible outcomes. This is not just ambition; it is a kind of architectural intelligence applied to the world of form.

In Vedic numerology, 8 is governed by Shani — Saturn, the great teacher of karma, discipline, and delayed but inevitable reward. Saturn is not a planet of quick wins — it is the planet of lasting achievement. What 8s build stands the test of time precisely because it was built under Saturn's demanding standards. But Saturn also teaches through loss, through setback, through the humbling of the ego when it overreaches. The 8's life will contain both extraordinary elevation and profound reversal — often cyclically, as Saturn strips away what is not authentic and reveals what is truly solid.

The shadow of Life Path 8 is the addiction to power and material success. The 8 who has not done their inner work uses money and authority as substitutes for love, connection, and meaning. They achieve and achieve and achieve, and at some point sit in their beautiful office, surrounded by trophies, and feel profoundly empty. This is the 8's invitation to the deeper question: What is all this power for?

Your highest expression is the philanthropist, the visionary leader who builds not for personal aggrandisement but for the genuine elevation of others.`,
    strengths: [
      "Strategic, visionary mind built for large-scale achievement",
      "Natural authority and executive presence",
      "Exceptional financial intelligence and business acumen",
      "Resilience — ability to rebuild after significant setbacks",
      "Ability to inspire confidence and lead organisations",
    ],
    challenges: [
      "Workaholism that destroys personal relationships",
      "Ruthlessness when personal values are compromised by ambition",
      "Difficulty accepting failure or vulnerability",
      "Using money and power as emotional substitutes",
    ],
    careerGuide: "Business leadership, finance, banking, investment, real estate, law, surgery, politics, military command, corporate management, entrepreneurship. You are exceptional at building organisations and managing large-scale resources. You need a career in which your authority is real, not symbolic. Working under micro-managers or in bureaucracies that reward mediocrity will be genuinely painful for you. Many 8s do their best work when they own their enterprise or hold genuine executive authority. Saturn rewards long-game thinking — build for decades, not quarters.",
    loveGuide: "You are capable of fierce loyalty and extraordinary generosity with those you love — but love is not your first language. It often takes life's reversals — the humbling that Saturn inevitably delivers — to open the 8 to emotional depth. Your partner needs to be secure enough to stand in the shadow of your ambition without disappearing, and strong enough to tell you when you are putting work before people. You are attracted to accomplished, authoritative partners who hold their own power. At your highest, you are the partner who builds something great alongside someone you genuinely love.",
    healthNotes: "Saturn governs your physical constitution, and its rulership of bones, teeth, joints, and the immune system makes these your primary health vulnerabilities. You push your body as hard as you push everything else — regular chiropractic care, dental maintenance, and immune support are important. Stress management is critical: the 8's workload creates a cortisol burden that accumulates invisibly until it becomes unavoidable. Power lifting and strength training are naturally aligned with your energy. Make rest a performance target — measure your sleep quality the way you measure business metrics.",
    luckyNumbers: [8, 17, 26, 35],
    colors: ["Black", "Dark Navy", "Charcoal"],
    gemstones: ["Blue Sapphire", "Onyx", "Black Pearl"],
    affirmations: [
      "True power is used in service of something greater than myself.",
      "I build wealth with integrity and it returns to me amplified.",
      "Success and inner peace are not opposites — I claim both.",
      "I am strong enough to be vulnerable.",
    ],
    vedicNotes: "Shani (Saturn) governs your path, and understanding Saturn is essential for the 8 to navigate their life with wisdom rather than struggle. In Vedic tradition, Saturn is not merely punitive — it is the great purifier, the one who removes what is false so that what is real can endure. The Vedic recommendation for Life Path 8 is to be deeply ethical in all business dealings (Saturn rewards integrity and punishes deceit with extraordinary precision), to practice generosity especially with those less fortunate, and to observe a Saturday spiritual practice — meditation, fasting, or charity. Wearing blue sapphire (only with astrological guidance) can significantly amplify positive Saturn energy.",
    dos: [
      "Think in decades, not quarters — your timeline is long",
      "Use your wealth and authority to genuinely elevate others",
      "Build systems that work without you — true power is residual",
      "Allow vulnerability in your closest relationships",
    ],
    donts: [
      "Don't sacrifice relationships on the altar of ambition",
      "Avoid using financial control as an emotional weapon",
      "Don't assume that more is always the answer",
      "Resist the impulse to recover from setbacks by working harder rather than reflecting deeper",
    ],
  },

  9: {
    key: "life_path_9",
    title: "The Humanitarian",
    summary: "You carry the wisdom of all previous Life Paths within you. Your mission is to serve humanity and complete the cycles that others have left unfinished.",
    fullText: `Life Path 9 is the final single digit, and it carries within it the accumulated wisdom of all numbers from 1 to 8. You are the old soul in the room — even at a young age, you possessed a depth of empathy, a breadth of understanding, and a natural orientation toward the universal that set you apart. You do not think in terms of personal gain so much as collective good, which makes you rare and sometimes difficult for others to fully understand.

Your gift is compassion at scale. Where the 6 loves their immediate family and community, the 9 extends that love to the stranger, to the disenfranchised, to the whole of humanity and beyond. This is the vibration of the teacher, the artist, the healer, and the servant — in the most exalted sense of each of those words.

In Vedic numerology, 9 is governed by Mangal — Mars. At first, this seems paradoxical — how does the planet of war and force govern the humanitarian? But look deeper: Mars is the planet of courage and decisive action. The 9 who changes the world does so not through passive wishing but through the courage to act on what they know, to speak what they see, to serve at personal cost. This is the warrior's heart in service of humanity.

The shadow of Life Path 9 is the inability to complete and release. Because you carry everyone's pain, you can become a vessel of accumulated sorrow — carrying losses that were not yours to carry, unable to let go of what has already ended. The 9's deepest work is the practice of release: allowing cycles to complete, permitting what must end to end, making peace with impermanence.

You are also at risk of giving so broadly that you give nothing fully — a dispersed, generalised compassion that touches everything but transforms nothing. The 9 at their highest chooses specific paths of service and goes deep.`,
    strengths: [
      "Extraordinary compassion and universal love",
      "Wisdom that seems to transcend personal experience",
      "Powerful creative ability infused with meaning",
      "Natural teacher, healer, and leader of movements",
      "Ability to inspire others through sacrifice and example",
    ],
    challenges: [
      "Difficulty releasing past hurts, relationships and cycles",
      "Carrying the weight of others' pain as personal responsibility",
      "Scattered generosity that lacks focus and impact",
      "Impracticality — idealism that loses touch with the possible",
    ],
    careerGuide: "The arts (especially those with social purpose), medicine, law, social work, international development, education, philosophy, religion, journalism, activism, counselling, and leadership of humanitarian organisations. Your work must feel meaningful — you cannot sustain effort in a context that feels harmful or indifferent to human wellbeing. You often work best when you combine a primary vocation with creative expression, as the 9's wellbeing depends on having an artistic or expressive outlet.",
    loveGuide: "You love universally and specifically — you have both vast compassion and the capacity for profound individual devotion. Your challenge in love is the same as in all other areas: release. Holding on to relationships that have completed their cycle, carrying grief from past loves into new ones, making yourself responsible for your partner's emotional world — these are the patterns the 9 must outgrow. Your most profound partnerships will be with someone who shares your values and whose life's purpose aligns with yours. Love as spiritual practice is your path.",
    healthNotes: "Mars governs your constitution, giving you a physical energy that burns hot and fast. Your immune system and vitality are strong, but you can exhaust yourself through the sheer volume of what you take on. Your primary health vulnerabilities are inflammatory conditions and adrenal fatigue — the body's response to a psyche that is always at war with what needs to be released. Regular emotional detox practices — journaling, therapy, breathwork, ritual release — are as essential as physical health maintenance. Mars also governs the head; headaches are a common signal of emotional congestion for the 9.",
    luckyNumbers: [9, 18, 27, 36],
    colors: ["Crimson", "Gold", "Rose"],
    gemstones: ["Red Coral", "Garnet", "Rose Quartz"],
    affirmations: [
      "I release what is complete with love and without guilt.",
      "My service is focused and therefore powerful.",
      "I am wise enough to know what is mine to carry and what is not.",
      "By healing myself, I heal the world.",
    ],
    vedicNotes: "Mangal (Mars) governs your path, giving you the warrior's courage in service of compassionate action. The Vedic tradition associates the 9 with Dharma — right action, righteous living. Your life's recurring question will be 'what is right?' and you will be called to answer it with action, not just contemplation. The Vedic recommendation for Life Path 9 is to wear red coral (after proper astrological assessment), to practice vigorous physical exercise that channels Mars's fire constructively, and to engage in service on Tuesdays (Mars's day). Your karmic work is to master the art of release — to hold life lightly and serve fully.",
    dos: [
      "Choose one or two specific causes and go deep rather than wide",
      "Practice completion — finish what you begin, release what has ended",
      "Use your creative gifts in service of your deepest values",
      "Allow yourself to grieve properly — completion requires mourning",
    ],
    donts: [
      "Don't take on others' karmic burdens as your own",
      "Avoid giving from a depleted place — fill yourself first",
      "Don't cling to relationships, situations or roles that have served their purpose",
      "Resist the temptation to serve everyone and commit to no one",
    ],
  },

  // ─── MASTER NUMBERS ───────────────────────────────────────────────────────────

  11: {
    key: "life_path_11",
    title: "The Illuminator",
    summary: "You carry the highest intuitive frequency in numerology — a channel between the human and the divine, built to inspire, awaken and illuminate.",
    fullText: `Life Path 11 is a Master Number, and with it comes both extraordinary gift and extraordinary challenge. You are not simply a 2 (which is 11 reduced) — you are a 2 operating at a voltage that the ordinary 2 cannot sustain. You are the Illuminator: the one whose presence, insights, and creative expression carry a quality of light that others can feel, even when they cannot name it.

Your intuition is not merely acute — it operates on a different frequency entirely. You receive impressions, knowing, and guidance from sources that logic cannot account for, and your life's work is learning to trust these impressions enough to act on them. Many 11s spend the first half of their lives disbelieving their own gifts — explaining away their intuitive experiences as coincidence, their visionary ideas as fantasy, their sensitivity as weakness. The turning point for the 11 is the moment they stop apologising for how they are wired and start using it.

You are built to inspire. Not in the motivational-poster sense, but in the literal sense — to breathe spirit into others, to remind people of what is possible, to carry a flame that does not go out even when it is battered by doubt. This is your mission.

The shadow of the 11 is the inverse of the gift: when the voltage of your sensitivity is not channelled productively, it becomes anxiety, nervous disorders, paranoia, and a profound inability to function in ordinary life. The 11 who has not found their channel can spiral deeply into fear and self-doubt. Your growth edge is always toward expression: when you are creating, teaching, guiding, or sharing, your nervous system stabilises. When you are hiding, your system revolts.`,
    strengths: [
      "The most powerful intuition of all Life Paths",
      "Natural spiritual teacher and inspired messenger",
      "Ability to channel creativity from transcendent sources",
      "Magnetic presence that aligns others with their higher purpose",
      "Visionary insight into people, systems, and possibilities",
    ],
    challenges: [
      "Extreme sensitivity and nervous system vulnerability",
      "Self-doubt that contradicts extraordinary natural ability",
      "Difficulty handling the mundane requirements of ordinary life",
      "Tendency toward anxiety when the creative channel is blocked",
    ],
    careerGuide: "Spiritual teaching, metaphysics, healing arts, writing, music, art, counselling, psychology, film-making, motivational speaking, and any vocation that uses your gift as a channel between the seen and unseen. You carry an unusual combination of extraordinary sensitivity and unexpected practical ability (the 2 foundation) — this makes you effective as both a visionary and an implementer when properly supported. You need work that feels like a calling, not just an income.",
    loveGuide: "Relationships with an 11 are deeply meaningful and occasionally overwhelming for both parties. You see into people with uncommon depth, which can be both bonding and destabilising. You are exquisitely sensitive to your partner's energy — picking up their unexpressed emotions, unspoken needs, and even unconscious resistances. This is beautiful and exhausting in equal measure. You need a partner who is doing their own inner work — someone emotionally available, spiritually curious, and able to give you genuine space without abandoning you.",
    healthNotes: "Your primary health imperative is nervous system regulation. The 11's high-frequency sensitivity means your nervous system can easily become overloaded — by noise, conflict, crowds, other people's emotional discharges, and your own unexpressed creativity. Daily meditation, breathwork, and regular time in genuine silence are not optional maintenance — they are survival tools. Creative expression is your most powerful medicine: when the channel is open and flowing, your health stabilises dramatically.",
    luckyNumbers: [11, 2, 20, 29],
    colors: ["Silver", "White", "Pale Violet"],
    gemstones: ["Moonstone", "Clear Quartz", "Labradorite"],
    affirmations: [
      "I trust the guidance I receive — it comes from a trustworthy source.",
      "My sensitivity is my ministry.",
      "I channel the divine into the human and both are blessed.",
      "I am here to illuminate, not to hide.",
    ],
    vedicNotes: "As an 11, your Vedic influence combines Chandra (Moon — governing the base 2) with a higher spiritual octave connected to the concept of 'Atma Jnana' — knowledge of the self. The Vedic tradition recognises certain souls as Jyoti bearers — carriers of light. The 11 is foremost among these. Your spiritual practices should focus on surrendering personal will to divine will — not passivity, but the profound active humility of the teacher who knows their knowledge comes through them, not from them.",
    dos: [
      "Trust the first impression — your intuition is your most accurate faculty",
      "Create, teach or share daily — it stabilises your nervous system",
      "Surround yourself with people who celebrate your gifts rather than explaining them away",
      "Practise grounding — the 11 can get unmoored from ordinary reality",
    ],
    donts: [
      "Don't dismiss your intuitive knowing as 'just imagination'",
      "Avoid chaotic, harsh environments that overwhelm your sensitivity",
      "Don't let the scale of your gift paralyse you — start small",
      "Resist absorbing others' emotional states as your own",
    ],
  },

  22: {
    key: "life_path_22",
    title: "The Master Builder",
    summary: "You carry the rarest vibration in numerology — the power to turn the grandest vision into permanent, transformative reality.",
    fullText: `Life Path 22 is the most powerful number in all of numerology. Called the Master Builder, you carry the potential to achieve things that not only change individual lives but reshape civilisations. This is not hyperbole — the 22 is the number through which the grandest ideas become the most durable structures.

At the base of 22 is the 4 — the builder, the foundation-layer, the methodical craftsperson. But the 22 does not build a house; it builds institutions. It does not create a business; it creates industries. It does not write a book; it writes movements. The scale of the 22's potential is genuinely awe-inspiring, which is precisely why many 22s spend much of their early lives paralysed by the size of what they feel called to do.

The 22 has access to both the visionary intuition of the 11 and the practical genius of the 4 — a combination that is extraordinarily rare and extraordinarily powerful. You can see the possibility that others cannot, and you have the ground-level engineering intelligence to actually build it. This is the combination of the prophet and the architect within a single consciousness.

Your shadow is twofold. The first is the vastness of the vision: when what you can see is so much larger than what anyone around you can see, the gap between your interior world and your external reality can be crushing — leading to frustration, rigidity, or despair. The second is the weight of the responsibility: you know, on some level, that you could do something extraordinary. Not doing it carries its own psychological cost.

Your path is not about being grandiose. It is about building — steadily, methodically, with the humility of the master craftsperson — toward something that will outlast you.`,
    strengths: [
      "The ability to architect systems, institutions and movements that endure",
      "Access to both visionary insight and ground-level practical genius",
      "Extraordinary willpower and the endurance to complete monumental projects",
      "Natural authority that inspires genuine trust in others",
      "The capacity to lead at scale without losing personal integrity",
    ],
    challenges: [
      "Paralysis in the face of the scale of your own potential",
      "Extreme impatience with the pace of ordinary reality",
      "Tendency toward authoritarian control when under pressure",
      "Isolation born from the gap between your vision and others' comprehension",
    ],
    careerGuide: "Architecture (literal and metaphorical), global NGOs, large-scale engineering, national governance, educational system reform, international business, spiritual institutions, philosophy with practical application. You need to build things that matter at genuine scale. Starting in positions of appropriate foundational learning — even if this feels humble relative to your potential — is the 22's right practice. Saturn rewards the long game, and the 22 is one of Saturn's masterwork pupils.",
    loveGuide: "You love with the same depth and intensity that you bring to everything else. Relationships are not casual for you — they are either profoundly meaningful or not worth the investment. Your partner needs to be someone who understands the scale of your mission and supports it, rather than feeling in competition with it. You are extraordinarily devoted and protective in love. Your challenge is allowing your partner to be your sanctuary — to step off the stage of world-building and be simply, humanly present.",
    healthNotes: "The 22 carries the combined health considerations of both the 11 (nervous system) and the 4 (skeletal and structural). You are pushing a very large engine and must maintain it accordingly. Sleep, structured recovery, and mental decompression are critical. The body under 22 pressure is particularly vulnerable to systemic burnout — the kind that does not announce itself until it has become a crisis. Build maintenance into your schedule with the same precision you build everything else.",
    luckyNumbers: [22, 4, 13, 31],
    colors: ["Deep Indigo", "Charcoal", "Gold"],
    gemstones: ["Sapphire", "Onyx", "Clear Quartz"],
    affirmations: [
      "I build what the world needs, one stone at a time.",
      "My vision is large; my practice is steady; my results are lasting.",
      "I am enough for this mission, and this mission is enough for me.",
      "I serve the dream without being consumed by it.",
    ],
    vedicNotes: "The 22 carries the combined Vedic influence of Rahu (North Node, via the 4 base) and the elevated spiritual octave of the master numbers. Rahu's ambition is given cosmic purpose in the 22 — you are called to channel your desire for achievement toward genuinely collective ends. The Vedic tradition recognises 22 as an auspicious number in its own right, associated with the 22 letters of the ancient Hebrew alphabet (the building blocks of creation) and the 22 major arcana of the Tarot (the map of human experience). Your karmic work is immense: to demonstrate that material mastery and spiritual integrity are not opposites.",
    dos: [
      "Begin. The first stone is the hardest; after that, the wall builds itself",
      "Find collaborators who can handle the execution while you steward the vision",
      "Honour the process — the 22 is built by Saturn, and Saturn does not rush",
      "Allow yourself to dream at full scale, then break it down ruthlessly",
    ],
    donts: [
      "Don't let the magnitude of the vision prevent you from starting",
      "Avoid becoming so absorbed in the mission that your humanity suffers",
      "Don't dismiss smaller projects — they build the capability for larger ones",
      "Resist the temptation to control every detail; delegate with trust",
    ],
  },

  33: {
    key: "life_path_33",
    title: "The Master Teacher",
    summary: "You carry the rarest and most sacred vibration — the Master Teacher, whose love and wisdom serve as medicine for the collective.",
    fullText: `Life Path 33 is the highest Master Number and among the rarest vibrations a soul can carry. Called the Master Teacher, the 33 represents the ultimate expression of love and service — not as sentiment, but as a force of transformation that operates at the level of collective consciousness.

At its base is the 6 — the nurturer, the healer, the creator of beauty and harmony. But the 33 does not merely nurture individuals; it nurtures humanity. Its love is not personal love (though it includes that) — it is universal love, operating at a frequency that is simultaneously intimate and cosmic. Where other numbers teach through example or expertise, the 33 teaches through being — through the quality of their presence, which carries an instruction that goes beyond words.

This is perhaps the most demanding of all Life Path vibrations. The Master Teacher does not simply acquire wisdom — they are refined by suffering until they have become wisdom. The 33's path will include extraordinary trials that a lesser number might not survive — losses, betrayals, profound disappointments — precisely because these crucibles produce the compassion and depth that make genuine teaching possible. You cannot teach what you have not lived.

Your gift is unconditional love expressed with clarity and precision. You do not enable; you illuminate. You hold the mirror with love and do not look away when the person in front of you would rather not see themselves clearly. This takes a strength that has nothing to do with hardness.

Your shadow is martyrdom — carrying the weight of the world's pain as personal responsibility, sacrificing yourself until nothing remains to give. The 33 must learn the hardest lesson of all: that you cannot pour from an empty vessel, and that the most loving thing you can sometimes do is rest.`,
    strengths: [
      "The capacity to love unconditionally and without conditions",
      "Extraordinary wisdom earned through depth of experience",
      "Natural healer whose mere presence catalyses change",
      "The ability to speak truth with such love that it cannot be refused",
      "Rare combination of vision, compassion, and practical service",
    ],
    challenges: [
      "Carrying the world's pain as personal responsibility",
      "Self-sacrifice to the point of destruction",
      "Difficulty accepting that you cannot save everyone",
      "The burden of knowing more than you can always act on",
    ],
    careerGuide: "Spiritual teaching, medicine, education at the highest levels, philanthropy, arts as social healing, counselling and therapy, shamanic or spiritual practice, humanitarian leadership. You cannot work in fields that feel meaningless to you — the 33 requires their work to be a vocation in the truest sense, or they cannot sustain it. You are most effective when your work directly alleviates suffering or elevates human consciousness.",
    loveGuide: "Your capacity for love is so vast that ordinary relationship structures sometimes struggle to contain it. You love deeply and universally, and this can create jealousy and misunderstanding in partners who mistake your universal love for infidelity. You need a partner who understands that you were born with a larger heart than most, and whose own love is mature enough not to require you to diminish it. At your best, you are the most nurturing and transformative partner in the numerological spectrum.",
    healthNotes: "The 33 carries the health vulnerabilities of both the 6 (heart, Venus) and the elevated master number stress on the nervous system. The greatest health risk for the 33 is depletion from over-giving — the immune system eventually reflects the state of the soul's reserves. Radical self-care is not a luxury for the 33 — it is a spiritual obligation. Your healing practices should be as non-negotiable and regular as breathing. The world needs you whole, not heroically depleted.",
    luckyNumbers: [33, 6, 15, 24],
    colors: ["Violet", "Gold", "Deep Rose"],
    gemstones: ["Amethyst", "Rose Quartz", "Diamond"],
    affirmations: [
      "I am worthy of the love I teach.",
      "My healing of myself is my service to the world.",
      "I hold the light without burning myself.",
      "I teach what I have lived and lived what I teach.",
    ],
    vedicNotes: "The 33 in Vedic tradition is associated with the 33 Devas — the divine intelligences that govern the cosmic order. You carry a rare soul contract: to embody, in this single lifetime, a quality of love that is genuinely unconditional. The Vedic practice most aligned with the 33 is Seva — selfless service, performed without attachment to results or recognition. This is the 33's most direct path to both spiritual liberation and personal fulfilment. Your karmic work is perhaps the most profound of all numbers: to demonstrate that love, when it is truly without conditions, changes the world.",
    dos: [
      "Set limits on how much of others' pain you carry",
      "Teach from what you have lived, not what you have only studied",
      "Make your own wellbeing non-negotiable — you are a resource the world needs",
      "Allow yourself to be taught — wisdom is always in exchange",
    ],
    donts: [
      "Don't sacrifice your health and relationships to serve at scale",
      "Avoid taking on the karmic burdens of others without their invitation",
      "Don't mistake suffering for spiritual qualification",
      "Resist the belief that your worth is determined by how much you give",
    ],
  },
};

// ─── PERSONAL YEAR INTERPRETATIONS ───────────────────────────────────────────

export const PERSONAL_YEAR_INTERPRETATIONS: Record<number, Interpretation> = {
  1: {
    key: "personal_year_1",
    title: "A Year of New Beginnings",
    summary: "This is your cosmic fresh start — the universe is clearing the old slate and handing you a blank canvas.",
    fullText: `Personal Year 1 is the opening of a brand new nine-year cycle. Whatever you plant this year — the seeds of intention, the first steps of new ventures, the brave decisions you make to break with the old — will shape the next nine years of your life. This is a year of initiation, and the universe is leaning forward in anticipation.

The energy of this year is urgent and generative. You may feel a restless desire for change, a pulling away from what has felt comfortable but stale, an almost physical impatience with delay. Trust this. This is not anxiety — this is cosmic momentum. You are being pushed toward your next chapter.

Your invitation this year: begin. Begin the project you have been designing in your head. Make the call you have been avoiding. Move toward the relationship, city, career, or version of yourself you have been circling but not entering. The number 1 rewards courage and punishes hesitation.

This is also a year for asserting your independence — for making decisions based on your own inner compass rather than the expectations of others. If you have been living a life shaped by other people's visions for you, this is the year the pressure to live your own becomes undeniable.`,
    strengths: ["Exceptional manifesting power", "Heightened courage and initiative", "Clarity about personal direction", "Fresh energy after previous cycle's completion"],
    challenges: ["Impulsiveness — acting before proper preparation", "Isolation from moving too fast to include others", "Starting too many things simultaneously"],
    careerGuide: "Launch ventures, make bold career moves, seek promotion, start businesses. This is the best year to initiate major professional changes that you have been contemplating.",
    loveGuide: "New relationships begun in a Personal Year 1 carry strong potential. If single, you may meet someone who represents a genuinely new chapter. If partnered, initiate the conversations and changes that will refresh the relationship.",
    healthNotes: "Energy is generally elevated and physical vitality strong. Use this year's momentum to establish health practices that will sustain you through the full nine-year cycle.",
    luckyNumbers: [1, 10, 19, 28],
    colors: ["Gold", "Bright Red", "Orange"],
    gemstones: ["Ruby", "Carnelian", "Sunstone"],
    affirmations: ["I begin with courage and continue with commitment.", "This is my year of bold, beautiful new starts."],
    vedicNotes: "Vedically, Year 1 aligns with Surya (Sun) energy — a time of solar initiative and self-assertion. Begin new ventures on Sundays for amplified success.",
    dos: ["Start the thing you've been postponing", "Assert your independence and individuality", "Make bold decisions from your own inner knowing"],
    donts: ["Don't let hesitation steal your window", "Avoid consulting too many opinions before acting", "Don't take on others' agendas at the expense of your own"],
  },

  2: {
    key: "personal_year_2",
    title: "A Year of Patience & Partnership",
    summary: "The universe asks you to slow down, collaborate, and develop what was planted in Year 1.",
    fullText: `Personal Year 2 is a year of cultivation, not action. The seeds of Year 1 need water, patience, and careful tending before they are ready to emerge — and Year 2 is precisely that process. This can feel frustratingly slow if you are used to aggressive forward motion. It is not slow; it is root-development. Everything that will flourish in the years ahead is consolidating its foundation now.

This is also the year of relationship. Partnerships — romantic, professional, creative — take centre stage. Year 2 energy rewards cooperation, diplomacy, and the patient building of alliances. Conversely, it makes solo aggressive action feel inexplicably difficult. The universe is teaching you the lesson of interdependence: that your greatest achievements will come not from isolated brilliance but from deeply aligned collaboration.

Your sensitivity is heightened in a Personal Year 2. You will feel others' moods and emotional states more acutely than usual. This is information, not affliction. Use it to navigate human dynamics with unusual precision.

Patience is the central practice of Year 2. Things are moving — they are simply moving underground. Trust the process. What you do not push will arrive more fully formed than anything you force.`,
    strengths: ["Enhanced intuition and emotional intelligence", "Ideal for deepening existing relationships", "Natural diplomatic skill at peak", "Important decisions become clearer when you wait"],
    challenges: ["Frustration with slower pace", "Over-sensitivity to criticism", "Indecisiveness in key moments"],
    careerGuide: "Focus on collaboration, improving existing systems, and building professional relationships rather than launching new ventures. Your greatest career asset this year is your ability to make others feel heard.",
    loveGuide: "This is the most romantically receptive year in the nine-year cycle. Relationships deepen, important conversations happen, and emotional bonds strengthen. If single, be open — love often arrives quietly in Year 2.",
    healthNotes: "Prioritise sleep and emotional regulation. The heightened sensitivity of Year 2 means your body responds strongly to emotional stress — process feelings rather than suppressing them.",
    luckyNumbers: [2, 11, 20, 29],
    colors: ["Silver", "Pale Blue", "White"],
    gemstones: ["Moonstone", "Pearl", "Blue Lace Agate"],
    affirmations: ["I trust in right timing and allow what is mine to come to me.", "Cooperation opens every door that force cannot."],
    vedicNotes: "Vedically governed by Chandra (Moon), Year 2 rewards those who honour cycles, rest during new moons, and approach relationships with gentle attentiveness.",
    dos: ["Invest in key relationships — personal and professional", "Listen more than you speak", "Trust the process even when results are not yet visible"],
    donts: ["Don't force outcomes that need more time", "Avoid major solo launches without partnership support", "Don't take emotional undercurrents personally"],
  },

  3: {
    key: "personal_year_3",
    title: "A Year of Creativity & Expansion",
    summary: "This is your year to express, socialise, create, and celebrate — joy is both your reward and your purpose.",
    fullText: `Personal Year 3 is one of the most joyful vibrations in the nine-year cycle. After the earnest effort of Year 1 and the patient cultivation of Year 2, this year the flowers bloom. The seeds you have planted and tended are breaking through the surface, and the universe's instruction this year is to celebrate, create, and express.

This is a year of natural abundance in communication and connection. Your words carry more power than usual — writing, speaking, teaching, and performing all flow easily in Year 3. Social connections expand. Opportunities arrive through people rather than through strategic planning. The universe rewards openness, expressiveness, and genuine engagement with others this year.

Creativity is not just available in Year 3 — it is required. This is the year to create the thing you have been dreaming about, to start the art project, the podcast, the business concept that excites you. The 3's energy amplifies whatever you create with genuine enthusiasm.

The shadow of Year 3 is scattered energy — trying to do everything at once, moving fast and wide without going deep. Protect yourself from the pleasurable distraction of all this expansive social energy by keeping your most important creative work as a non-negotiable practice.`,
    strengths: ["Natural creativity at peak", "Social magnetism and expanded opportunities", "Communication and self-expression are heightened", "Abundance in professional visibility"],
    challenges: ["Over-commitment to social life at expense of depth", "Difficulty focusing on completion", "Overspending fuelled by optimistic mood"],
    careerGuide: "This is the year for marketing, visibility, public speaking, creative launches, and making your work known. Put yourself forward — Year 3 rewards those who are seen.",
    loveGuide: "Romance flourishes in Year 3. The energy is playful, expressive, and magnetically social. If you are looking for love, go where people gather. If partnered, inject adventure, creativity, and fun into the relationship.",
    healthNotes: "Overall vitality is high, but watch for overindulgence. Year 3 Jupiter energy can lead to excess. Movement that is expressive — dance, group fitness, outdoor social sports — is ideal.",
    luckyNumbers: [3, 12, 21, 30],
    colors: ["Purple", "Yellow", "Vibrant Orange"],
    gemstones: ["Citrine", "Yellow Topaz", "Amethyst"],
    affirmations: ["I express myself fully and the world receives my gifts.", "Joy is my natural state and my most powerful attractor."],
    vedicNotes: "Governed by Brihaspati (Jupiter), Year 3 is a period of genuine expansion. The Vedic recommendation is to give generously this year — Jupiter multiplies what flows through you.",
    dos: ["Create and share something you have been keeping to yourself", "Engage socially — your network is your net worth in Year 3", "Invest in creative development and expressive skills"],
    donts: ["Don't let social activity completely replace depth work", "Avoid financial overextension fuelled by optimism", "Don't scatter your creative energy across too many projects"],
  },

  4: {
    key: "personal_year_4",
    title: "A Year of Building & Discipline",
    summary: "The universe calls you to build — to do the necessary, sustained work that creates the foundation all future success will rest on.",
    fullText: `Personal Year 4 is not the most glamorous year in the nine-year cycle — it is the most important one. This is the year you build. Not quickly, not flashily, but solidly, honestly, and in ways that will still be standing when the more exciting years return.

Year 4 has a quality of karmic accountability. Whatever you have been avoiding — the practical work, the unsexy systems and structures, the difficult conversations about finances or commitments — Year 4 will bring it to your doorstep. Not as punishment, but as invitation. The universe is offering you the chance to build your house on rock rather than sand.

The pace of this year feels slower. Good. Slow means thorough. Slow means the details are attended to. Slow means the thing you're building will actually hold. Year 4 punishes rushing and rewards methodical, consistent effort.

This is also a year for health, body, and practical life maintenance. Physical fitness, financial organisation, home improvements, career stability — all of these are Year 4 territory. Invest in your infrastructure: the body you will need for the next five years, the financial base you will draw on, the relationships that require honest repair.`,
    strengths: ["Exceptional discipline and follow-through", "Systems and structures that serve long-term", "Honest assessment of what is working and what isn't", "Physical vitality when properly managed"],
    challenges: ["Feeling restricted or stuck", "Resistance to necessary but unglamorous work", "Frustration with the slow pace of visible progress"],
    careerGuide: "This is the year for consolidation, skill development, and building processes that scale. Launch nothing unless your foundation is solid first. The work you do on your professional infrastructure this year will pay dividends for years.",
    loveGuide: "Year 4 tests relationships for authenticity and practicality. Superficial connections fall away; solid partnerships deepen through shared problem-solving and genuine reliability. This is a year for honest conversations rather than romantic escapism.",
    healthNotes: "Year 4 is the ideal year to build lasting health habits — structured exercise, nutritional discipline, and sleep consistency. Anything you establish physically this year tends to stick. Bone and joint health deserve particular attention.",
    luckyNumbers: [4, 13, 22, 31],
    colors: ["Dark Green", "Earth Brown", "Deep Blue"],
    gemstones: ["Emerald", "Malachite", "Tourmaline"],
    affirmations: ["I build with love and patience and what I build endures.", "The foundation I lay today holds everything I dream of tomorrow."],
    vedicNotes: "Governed by Rahu and Saturn's combined influence, Year 4 asks for integrity above all else. What is built dishonestly in a Year 4 will not survive the scrutiny of future years.",
    dos: ["Address the practical details you have been avoiding", "Invest in skills, systems, and professional development", "Establish health and financial habits that will sustain you"],
    donts: ["Don't try to rush or bypass the foundational work", "Avoid major new launches without first completing what is incomplete", "Don't expect glamour — this year's rewards are structural"],
  },

  5: {
    key: "personal_year_5",
    title: "A Year of Freedom & Change",
    summary: "After Year 4's discipline, the universe flings the door open — this is your year of liberation, adventure, and necessary transformation.",
    fullText: `Personal Year 5 arrives like a fresh wind after Year 4's structural discipline. The feeling is unmistakable: something has shifted, movement is available where there was restriction, and the universe seems to be offering possibilities in all directions simultaneously. This is not illusion — this is Year 5's genuine energy of liberation and change.

This year, expect the unexpected. Disruptions that initially feel destabilising will reveal themselves as redirections toward better alignment. Travel, new relationships, career pivots, unexpected opportunities — Year 5 delivers variety with both hands, and your task is to engage it with discernment rather than either rigidity or recklessness.

Freedom is the gift of Year 5, and like all gifts, it comes with responsibility. The freedom to change direction is only valuable if the change is genuinely chosen rather than reactively seized. The 5 Year's shadow is impulsive disruption of things that were genuinely serving you in the name of excitement.

Use this year for the change that you have known for some time was necessary. The momentum is with you; the energy is supportive; and the universe is telling you, clearly, that it is time.`,
    strengths: ["Unusual flexibility and adaptability", "Heightened magnetism and social opportunities", "Ability to pivot quickly when circumstances change", "Natural energy for travel, learning and exploration"],
    challenges: ["Impulsive decisions that disrupt necessary stability", "Scattered energy from too many options", "Commitment issues — everything feels temporary"],
    careerGuide: "Career pivots, new opportunities, networking and visibility all carry exceptional momentum in Year 5. If you have been contemplating a career change, the energy is supportive — but do your research first.",
    loveGuide: "Year 5 brings new romantic energy and social expansion. Existing relationships may undergo significant change — either deepening through new shared experiences or honestly recognising incompatibility. Do not force what wants to move.",
    healthNotes: "High energy year — use it. Active, varied exercise routines suit Year 5 perfectly. Nervous system maintenance is important given the increased stimulation and change.",
    luckyNumbers: [5, 14, 23, 32],
    colors: ["Turquoise", "Bright Blue", "Yellow"],
    gemstones: ["Turquoise", "Aquamarine", "Citrine"],
    affirmations: ["I embrace change as my teacher and freedom as my birthright.", "Every shift this year is steering me toward greater alignment."],
    vedicNotes: "Governed by Mercury (Budha), Year 5 is optimal for communication, commerce, and travel. Mercury's speed this year supports those who move decisively with their opportunities.",
    dos: ["Say yes to genuine opportunities even when they are unexpected", "Travel, explore new environments, expose yourself to new ideas", "Make the change you have been contemplating — the timing is aligned"],
    donts: ["Don't disrupt stability simply for the thrill of change", "Avoid impulsive decisions with long-term consequences", "Don't scatter your energy across so many opportunities that none develop fully"],
  },

  6: {
    key: "personal_year_6",
    title: "A Year of Love & Responsibility",
    summary: "Home, family, relationships, and love take centre stage — this year asks you to serve, heal, and create beauty.",
    fullText: `Personal Year 6 brings the warmth and weight of love, family, and responsibility to the foreground. After Year 5's liberating adventures, this is the year to come home — to the people who matter, to the commitments that sustain you, and to the deep work of nurturing what is most important in your life.

Relationship themes are unavoidable in Year 6. This may manifest as marriage, the arrival of children, deepening family bonds, or the honest reckoning with relationships that have been neglected or strained. Whatever form it takes, the invitation is the same: give your real attention to the people in your life. Not the performative version, but the genuine, full-hearted kind.

This is also a year for home, beauty, and aesthetic creation. Renovating your living space, cultivating your garden (literal or metaphorical), creating art that beautifies — all of these are Year 6 activities. Venus governs this year, and her influence makes beauty not a luxury but a genuine contribution to wellbeing.

The challenge of Year 6 is the tension between service and self-care. This year will ask much of you in terms of care and responsibility. Ensure that you are giving from fullness, not depletion — the most loving thing you can do for others is maintain your own wellbeing.`,
    strengths: ["Deep loving connection available in all relationships", "Creative and aesthetic powers at peak", "Ability to heal and restore damaged relationships", "Natural wisdom about what truly matters"],
    challenges: ["Over-giving leading to resentment or depletion", "Difficulty setting loving but firm boundaries", "Perfectionism in domestic and relational life"],
    careerGuide: "This year favours careers in service, wellness, education, and the arts. Team harmony and collaborative achievement are particularly supported. This is not a year for self-promotion — serve well, and recognition follows naturally.",
    loveGuide: "Year 6 is the most powerful romantic year in the cycle for deepening commitment. Engagements, marriages, and family expansion are all natural in this energy. Single? Year 6 brings the kind of love that lasts — be open and be genuine.",
    healthNotes: "Heart health and emotional wellbeing are the primary concerns this year. Creative practices, time with loved ones, and beauty in your environment are all potent health-givers for Year 6.",
    luckyNumbers: [6, 15, 24, 33],
    colors: ["Rose Pink", "Sage Green", "Cream"],
    gemstones: ["Rose Quartz", "Jade", "Pink Tourmaline"],
    affirmations: ["I give love freely and receive it gracefully.", "The beauty I create enriches everyone it touches."],
    vedicNotes: "Governed by Shukra (Venus), Year 6 is a time for Lakshmi energy — abundance through beauty, love, and genuine service. The more authentically you give this year, the more abundantly it returns.",
    dos: ["Invest real time and attention in your key relationships", "Create beauty in your home and immediate environment", "Engage in healing conversations you have been avoiding"],
    donts: ["Don't sacrifice your wellbeing out of guilt or obligation", "Avoid perfectionism in your care for others — good enough is often perfect enough", "Don't neglect your own creative and aesthetic needs"],
  },

  7: {
    key: "personal_year_7",
    title: "A Year of Spiritual Awakening",
    summary: "This is your year to go deep — to seek truth, deepen wisdom, and emerge with a clarity that will guide the next cycle.",
    fullText: `Personal Year 7 is unlike any other year in the nine-year cycle. It is quieter, more interior, and sometimes more isolating than any year that has preceded it. This is by design. The universe is calling you inward — to the deep well of your own wisdom, to the questions that matter more than the answers currently available, to a quality of knowing that can only emerge through genuine stillness.

Do not resist this year's natural introversion. Attempting to maintain Year 5's social pace or Year 6's relational intensity in a Year 7 will feel exhausting and false. This is a year to simplify, to study, to meditate, to pray, to walk alone in nature with no destination. The outer world will feel slightly less compelling than usual — this is the Year 7 recalibrating your frequency.

This is a year of extraordinary inner development. Learning that happens in Year 7 penetrates to a depth that learning in other years does not. Spiritual practices initiated in Year 7 tend to become lifetime practices. Insights accessed in Year 7 carry an unusual authority and often become the foundational understanding of the years ahead.

Trust the process. The next two years (8 and 9) will require everything you develop and discover this year. You are building in the invisible, and it matters enormously.`,
    strengths: ["Profound intuitive access", "Ideal conditions for inner development and wisdom", "Natural inclination toward spiritual practice", "Ability to see truth that was obscured in busier years"],
    challenges: ["Isolation and withdrawal from meaningful engagement", "Depression if spiritual practice is avoided", "Confusion about external goals and direction"],
    careerGuide: "A year for research, advanced learning, and developing expertise rather than outward achievement. Not the ideal year for launches or aggressive career moves, but perfect for developing the depth that will fuel them.",
    loveGuide: "Year 7 calls for authenticity in relationships above all else. Superficial connections feel unbearable; profound ones deepen greatly. This is a year for honest conversations about what you truly want and value in partnership.",
    healthNotes: "Mental and spiritual health are the primary concerns this year. Meditation, time in nature, reduced screen time, and journaling are potent medicines. Physical symptoms that arise in Year 7 often have emotional or spiritual roots.",
    luckyNumbers: [7, 16, 25, 34],
    colors: ["Deep Purple", "Midnight Blue", "Silver"],
    gemstones: ["Amethyst", "Lapis Lazuli", "Selenite"],
    affirmations: ["I trust the process of deep inner knowing.", "In stillness, I receive the wisdom I need for everything that comes next."],
    vedicNotes: "Governed by Ketu's influence, Year 7 is a year of spiritual preparation. Vedic tradition recommends increased meditation practice, reduced social obligations, and study of sacred texts or philosophical works.",
    dos: ["Meditate or practice inner stillness regularly", "Study what genuinely interests you at depth", "Allow yourself to rest, reflect and integrate"],
    donts: ["Don't force outward achievement against the year's introverted current", "Avoid isolating without maintaining essential human connection", "Don't dismiss the importance of what arises in quiet — it is preparation for everything that follows"],
  },

  8: {
    key: "personal_year_8",
    title: "A Year of Power & Achievement",
    summary: "After Year 7's inner work, the universe moves you into the arena — this is your year to harvest, achieve, and exercise the authority you have earned.",
    fullText: `Personal Year 8 is when all the preparation of the previous seven years bears its most visible fruit. The inner work of Year 7, the foundation of Year 4, the seeds of Year 1 — all of it converges now in what is the most achievement-oriented year of the cycle.

The energy of Year 8 is direct, powerful, and ambitious. Career advancement, financial expansion, business growth, and the exercise of genuine authority — all of these are natural expressions of Year 8's vibration. If you have been working diligently, this year rewards you. If you have been cutting corners or avoiding accountability, this year presents the bill.

This is a year when your ability to manage resources — financial, human, temporal — is tested and strengthened. The executive function of your character comes to the foreground. You will be asked to make significant decisions with confidence and to own their outcomes without equivocation.

The shadow of Year 8 is the potential to sacrifice personal relationships and inner wellbeing on the altar of external achievement. Saturn governs this year, and Saturn rewards not just material success but integrity — the insistence on achieving rightly, with full consideration of all you value, not just what can be counted.`,
    strengths: ["Exceptional manifesting power for material goals", "Natural authority and decisive action", "Financial acumen and strategic clarity at peak", "Ability to lead others and manage large outcomes"],
    challenges: ["Over-emphasis on achievement at the cost of relationship", "Pride and difficulty accepting honest feedback", "Working so hard that physical and emotional health suffer"],
    careerGuide: "Launch, promote, negotiate, expand. This is the single most powerful year in the cycle for career achievement and financial growth. Major moves made in Year 8 tend to succeed when executed with integrity and preparation.",
    loveGuide: "Love in Year 8 is real and grounded, but requires that you actually show up to it. The risk is neglecting your most important relationships in pursuit of achievement. Prioritise your partnership deliberately — it will not maintain itself this year.",
    healthNotes: "Physical energy is generally strong, but the Year 8's workload demands attentive self-care. Heart health, musculoskeletal integrity, and stress management are the primary concerns. Build rest into your schedule as a performance metric.",
    luckyNumbers: [8, 17, 26, 35],
    colors: ["Black", "Charcoal", "Gold"],
    gemstones: ["Blue Sapphire", "Onyx", "Tiger's Eye"],
    affirmations: ["I harvest what I have sown with wisdom and integrity.", "My power is in service of something greater than my personal ambition."],
    vedicNotes: "Governed by Shani (Saturn), Year 8 rewards those who have built honestly and punishes those who have cut corners. Ethical conduct, diligent effort, and genuine service to others amplify Saturn's positive gifts this year.",
    dos: ["Make the ambitious move — the timing is aligned", "Negotiate, close deals, take on larger responsibility", "Invest surplus wisely rather than spending extravagantly"],
    donts: ["Don't sacrifice relationships for achievement", "Avoid unethical shortcuts — Saturn extracts payment with interest", "Don't miss the moment by over-preparing when the window is open"],
  },

  9: {
    key: "personal_year_9",
    title: "A Year of Completion & Release",
    summary: "The cycle is completing — let go of what has served its purpose, forgive, and prepare to begin again.",
    fullText: `Personal Year 9 is the final chapter of a nine-year story. The universe is inviting — and often insisting upon — completion, release, and the graceful ending of what has served its purpose. This can feel like loss: relationships that have been held beyond their natural completion now separate, careers that were maintained out of security rather than alignment finally shift, and patterns of self-deception that have been comfortable to maintain become impossible to sustain.

This is not punishment. It is liberation. Year 9 clears the debris and creates the space in which something genuinely new — the Year 1 that follows — can take root. The quality of your next nine-year cycle depends on the completeness of this year's release.

This is also a year of extraordinary compassion — for yourself and others. The 9's vibration is inherently humanitarian and forgiving. You will find yourself more capable of forgiveness in Year 9 than in any other year. Use this capacity. Old wounds that have been held can be truly released now.

The invitation of Year 9: let go with love. Not bitterness, not indifference, but genuine gratitude for what each chapter has given you, and genuine release of what is no longer yours to carry forward.`,
    strengths: ["Extraordinary capacity for forgiveness and release", "Clarity about what truly matters and what does not", "Access to a deep, wise perspective on your life's journey", "Natural generosity and humanitarian impulse"],
    challenges: ["Resistance to necessary endings", "Grief that becomes clinging", "Confusion about direction (the new has not yet arrived)"],
    careerGuide: "Complete existing projects rather than launching new ones. Tie up professional loose ends with grace. This is not the year for bold new ventures — it is the year for honourable completions that clear the way for Year 1.",
    loveGuide: "Year 9 is a year for honest assessment of relationships. Partnerships that have been maintained from habit rather than genuine love may come to an honest completion. Those with authentic foundations will be strengthened by this year's clarity.",
    healthNotes: "Emotional health is paramount in Year 9. Unprocessed grief and held resentments will manifest physically if not addressed this year. Therapeutic work, creative expression, and physical release practices (vigorous exercise, bodywork) are essential.",
    luckyNumbers: [9, 18, 27, 36],
    colors: ["Deep Rose", "Burgundy", "Gold"],
    gemstones: ["Garnet", "Red Coral", "Morganite"],
    affirmations: ["I release what is complete with love and gratitude.", "The ending I honour today opens the door to the beginning I have been waiting for."],
    vedicNotes: "Governed by Mars (Mangal) and the principle of dharmic completion, Year 9 asks that you examine your actions honestly — what was done rightly, what must be made right. Completion of karmic obligations is the great spiritual work of Year 9.",
    dos: ["Complete what is unfinished, release what is complete", "Practise genuine forgiveness — it frees you, not just them", "Review the past nine years with gratitude for every chapter"],
    donts: ["Don't launch major new projects until Year 1 arrives", "Avoid holding on to what has clearly ended", "Don't let grief about endings prevent you from receiving what is coming"],
  },
};

// ─── PERSONAL DAY GUIDANCE (for AURA Dashboard) ──────────────────────────────

export const PERSONAL_DAY_GUIDANCE: Record<number, { theme: string; dos: string[]; donts: string[]; prediction: string }> = {
  1: {
    theme: "Initiative & Fresh Energy",
    dos: [
      "Start something new, even if small",
      "Assert your perspective clearly in conversations",
      "Make a decision you've been sitting on",
      "Lead — someone is waiting for your initiative",
    ],
    donts: [
      "Don't follow when your instinct says lead",
      "Avoid being pulled into others' agendas at your expense",
      "Don't delay decisive action — this energy favours starters",
    ],
    prediction: "Your energy is forward-moving and initiative-rich today. The universe places resources in the path of the person who takes the first step. Move with purpose.",
  },
  2: {
    theme: "Cooperation & Deep Listening",
    dos: [
      "Listen — truly listen — before responding",
      "Seek a second perspective before deciding",
      "Nurture your most important relationship",
      "Work in partnership rather than alone",
    ],
    donts: [
      "Don't force an outcome that needs more time",
      "Avoid confrontation — diplomacy is your superpower today",
      "Don't try to do everything alone",
    ],
    prediction: "Today's energy rewards patience, cooperation, and emotional attunement. What you build with someone else today will be stronger than what you could have built alone.",
  },
  3: {
    theme: "Creative Expression & Joy",
    dos: [
      "Express yourself — speak, write, create, sing",
      "Connect with people who uplift you",
      "Begin or continue a creative project",
      "Allow yourself to feel genuine joy",
    ],
    donts: [
      "Don't suppress your creative impulse out of self-consciousness",
      "Avoid heavy, draining social environments",
      "Don't let others' opinions dull your light today",
    ],
    prediction: "Creative energy flows freely today. Anything you express — words, art, ideas — carries an unusual quality of resonance and impact. Let yourself be seen.",
  },
  4: {
    theme: "Focus, Structure & Productivity",
    dos: [
      "Tackle the practical work that has been waiting",
      "Organise, plan, and establish systems",
      "Work consistently and methodically",
      "Complete something you started previously",
    ],
    donts: [
      "Don't scatter your energy across too many tasks",
      "Avoid shortcuts — today rewards thoroughness",
      "Don't resist the necessary, even if unglamorous, work",
    ],
    prediction: "Today's energy is grounded and productive. Roll up your sleeves — the work you do today in focused, methodical engagement builds the foundation that everything else rests on.",
  },
  5: {
    theme: "Change, Adaptability & Freedom",
    dos: [
      "Be flexible — what changes today changes for the better",
      "Embrace an unexpected development with openness",
      "Explore something new — a place, an idea, a person",
      "Trust your adaptability",
    ],
    donts: [
      "Don't resist change that the day brings",
      "Avoid clinging to a plan that has already shifted",
      "Don't make impulsive commitments in the excitement of new energy",
    ],
    prediction: "Expect the unexpected and welcome it. Today's energy is kinetic and change-oriented — those who stay flexible will find that today's surprises are actually gifts in disguise.",
  },
  6: {
    theme: "Love, Family & Responsibility",
    dos: [
      "Give meaningful attention to the people you love",
      "Create beauty or harmony in your immediate environment",
      "Take responsibility for something you have been avoiding",
      "Be of genuine service to someone today",
    ],
    donts: [
      "Don't neglect the people who depend on you",
      "Avoid perfectionism — good enough truly is good enough today",
      "Don't take on more than you can give from genuine fullness",
    ],
    prediction: "Today carries a warm, nurturing frequency. Your acts of love and care — however small — have a significance that goes beyond what you can see. Show up fully for the people who matter.",
  },
  7: {
    theme: "Reflection, Intuition & Inner Wisdom",
    dos: [
      "Meditate, journal or spend time in quiet reflection",
      "Trust an inner knowing that doesn't have a logical explanation",
      "Study, research, or explore something that intrigues you",
      "Spend time in nature",
    ],
    donts: [
      "Don't override your intuition with logic today",
      "Avoid forcing conclusions — let understanding unfold",
      "Don't fill every moment with noise and activity",
    ],
    prediction: "Your intuitive channel is open today. Something will come to you in a moment of quiet that weeks of active thinking could not have delivered. Create the space to receive it.",
  },
  8: {
    theme: "Power, Ambition & Achievement",
    dos: [
      "Make the call, close the deal, assert your position",
      "Handle financial matters with confidence",
      "Step into your authority — don't wait to be asked",
      "Think big and act boldly",
    ],
    donts: [
      "Don't miss the window by over-preparing",
      "Avoid aggressive tactics that undermine integrity",
      "Don't let fear of failure shrink your vision",
    ],
    prediction: "Today's energy is powerful and action-oriented. Your authority is recognised when you own it. The universe supports bold, integrity-driven action in the realm of ambition and achievement.",
  },
  9: {
    theme: "Completion, Release & Universal Love",
    dos: [
      "Complete something that has been left unfinished",
      "Practise genuine forgiveness — of yourself or another",
      "Give generously without expectation of return",
      "Let go of something that has run its course",
    ],
    donts: [
      "Don't cling to what is clearly complete",
      "Avoid starting major new ventures today",
      "Don't let resentment take up space that forgiveness could occupy",
    ],
    prediction: "Today asks for grace and completion. What you release today — with genuine love and without bitterness — creates space for something new that you have been waiting for without knowing it.",
  },
};
