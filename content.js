// All on-screen words live here, so they can be edited without touching the logic.
// Everything below is Rachel's copy from the storyboard and wireframes.

const CONTENT = {
  centreName: "Reedsy Cattery Adoption Center",
  agentGreeting: "Let me help by finding your most suitable furry friend!",
  // Prototype-only pointer for reviewers on the first adoption screen
  prototypeTip: "Prototype tip: the first option shows the full experience. Best viewed on desktop.",
  aiPolicyLabel: "AI Policy",

  routes: [
    {
      id: "ai",
      title: "Let Reedsy Adoption Center match you with your purr-fect cat!",
      detail: "(Reedsy uses AI to review your work and give you suggested settings on your cat)",
      showPolicy: true,
    },
    {
      id: "agent",
      title: "Talk through your options with the agent",
      detail: "(You answer questions, no AI used, to find the best settings for you)",
    },
    {
      id: "self",
      title: "Let me choose myself",
      detail: "(Pick a cat that has all of our AI features turned off)",
    },
  ],

  questions: [
    {
      id: "loudness",
      title: "How much attention do you think your cat will need?",
      description: "We want to find a little companion who fits into your lifestyle!",
      answers: [
        { title: "🐈 I’m happy to give them attention all day long!", detail: "(I’d love a cat who keeps me company and checks in regularly, even while I’m busy writing.)", summary: ["Notifications", "Always on, even while you write"] },
        { title: "😸 I’m looking for a laid-back companion", detail: "(I’d like notifications, but my cat should let me concentrate when I’m typing.)", summary: ["Notifications", "On, paused while you type"] },
        { title: "🙈 I’ll let them come to me", detail: "(I’d prefer my cat to keep notifications tucked away until I go looking for them.)", summary: ["Notifications", "Hidden until you open them"] },
      ],
    },
    {
      id: "assistance",
      title: "Are you looking for a cat who likes to get involved?",
      description: "Some cats love getting their paws into everything, while others are happy to sit back and watch!",
      answers: [
        { title: "🐾 I’d love a little helper!", detail: "(I’d like my cat to help with spelling and grammar, using extra writing support tools.)", summary: ["Writing support", "Your cat suggests spelling and grammar fixes"], summaryNoReading: ["Writing support", "On, but your cat needs permission to read your work"] },
        { title: "😽 I’m happy for them to do their own thing", detail: "(I’d prefer to keep the extra writing support tools switched off.)", summary: ["Writing support", "Off (standard spell check only)"] },
      ],
      // Shown as an on/off toggle in settings: answer 0 = on, answer 1 = off
      toggle: true,
    },
    {
      id: "reading",
      title: "How curious would you like your new cat to be?",
      description: "Some cats are always investigating what you’re up to. Others wait until you invite them over!",
      answers: [
        { title: "🐈‍⬛ I want a cat who’s always getting involved!", detail: "(I’d like my cat to regularly read my work and share feedback.)", summary: ["Reading your work", "Regularly, with feedback"] },
        { title: "😺 I’ll invite them up when I need them", detail: "(I’d like my cat to read my work and give feedback only when I ask.)", summary: ["Reading your work", "Only when you ask"] },
        { title: "😴 I’m happy for them to have a nap", detail: "(I’d prefer my cat not to read or review my work.)", summary: ["Reading your work", "Never"] },
      ],
    },
  ],

  // No name is given automatically: the writer names their cat on the certificate
  defaultCatName: "",
  unnamedCat: "your cat",
  nameError: "Give your cat a name before you finish.",
  saveFirstError: "Save your setting before you finish.",
  feedLine: "Feed {name} more of your recent work to improve the AI settings.",
  // Feeding again is allowed: this is a reminder, not a block (writers may have new documents to upload)
  // A repeat meal needs new work from outside Reedsy (the latest chapter has already been eaten)
  feedNeedsUpload: "Upload a file of an external manuscript to feed your cat!",
  feedFedRecently: "You fed {name} recently. Feed again if you have new work to share, like a document from outside Reedsy.",
  feedButton: "Feed Your Cat",
  feedInfo: "By giving your cat permission to read your work, Reedsy can better customize your default settings.",
  finishButton: "Finish",
  groomButton: "Take Your Cat to the Groomers!",
  groomLegend: "Choose a fur color",

  // Feed screen (Rachel's words from her brief for this step)
  // Eyebrow on the feed windows opened from Studio (feeding from the certificate keeps the Adoption Center name)
  feedEyebrow: "{name}'s bowl",
  feedPermission: "Give {name} permission to read your latest work",
  // Feed screen when the cat may already read (reading Regularly or When asked): no tick box needed
  feedAlreadyAllowed: "{name} already has permission to read your work, so your latest chapter is ready to eat.",
  // Under the tick box when reading is set to Never
  feedNeverNote: "Your settings say {name} never reads your work. Ticking this lets {name} read your latest chapter just this once. Your setting stays the same.",
  feedUpload: "Submit work",
  feedUploadHint: "Choose a file from your computer",

  // Prototype stand-in for what the AI would suggest after reading the work (question id -> answer index)
  // After a meal these are suggestions the writer accepts or declines, never automatic changes
  suggestedAfterFeeding: { loudness: 1, assistance: 0, reading: 0 },
  // Claude's wording, for Rachel to edit
  feedSuggest: {
    label: "Suggested",
    accept: "Accept",
    keep: "Keep Mine",
    status: "{name} suggests {n} changes",
    statusOne: "{name} suggests 1 change",
    none: "No changes needed",
    decideFirst: "Accept or keep each suggested change before you continue.",
    // One line per suggestion: what in the work the cat read led to it
    reasons: {
      loudness: "You write in long, focused bursts, so {name} will wait for a pause before purring.",
      assistance: "{name} spotted a few typos and some very long sentences in your latest chapter.",
      reading: "Your chapter leans on a few favorite words. With permission to keep reading, {name} can help you swap them out.",
    },
  },

  // ---------- Option 1: Reedsy looks at your latest work ----------
  aiRoute: {
    title: "The Purr-sonal Matchmaker",
    subtitle: "Let Reedsy Adoption Center match you with your purr-fect cat!",
    // One plain line on what the matchmaker does before the writer consents
    howItWorks: "The matchmaker reads your manuscripts and looks at how you've written over the last 30 days, then suggests the settings that suit you best.",
    permission: "I give Reedsy permission to use AI to look through all manuscripts, and behavior habits from the last 30 days.",
    policyLead: "For more information on how Reedsy handles your work and AI, please read our",
    policyLink: "AI Policy",
    findButton: "Find My Purr-fect Friend",
    loadingLines: [
      "Pawsing to find your perfect match…",
      "Looking for your fur-ever friend…",
      "Searching for a cat-astrophically good match…",
      "Doing some paws-on research…",
    ],
    matchedStatus: "Suggested from your latest work",
    skipLabel: "Skip the wait (prototype only)",
    // Under each setting the matchmaker picked: why it picked it (hidden once the writer changes that setting)
    reasons: {
      loudness: "You tend to write in long, focused sessions, so your cat waits for a pause before speaking up.",
      assistance: "Your latest chapter has a few typos and some very long sentences your cat can help with.",
      reading: "You're in the middle of drafting, so regular feedback will be most useful right now.",
    },
  },
  // ---------- Premium feature on the certificate (locked for free users) ----------
  premium: {
    feature: "World dictionary",
    description: "Save invented words, names and places so they're never flagged as typos.",
    why: "Your story has names like Venger, Presto and Uni that a standard spell check would flag.",
    badge: "Premium",
    unlockLabel: "Upgrade Now",
    upgradeUrl: "https://reedsy.com/studio/pricing/",
    upgradeNote: "User is directed to Reedsy's upgrade page",
  },

  // ---------- AI Policy page (opened from either AI Policy link) ----------
  // Source lines from Rachel's doc: section 1 ("Reedsy has guaranteed it will never train AI on its writers' work";
  // "define the line between assistive and generative AI"), idea 5 ("AI learns from your writing for you only.
  // You can delete its memory"), storyboard frame 3 ("for their own personal use, not for training AI").
  aiPolicy: {
    title: "AI Policy",
    intro: "Your Reedsy AI assistant is here to help you get the most out of your writing journey. You decide how it works, what it remembers, and how much AI support you want along the way.",
    sections: [
      { heading: "What your cat will do", body: "Your assistant learns about your writing goals, preferences and working style to provide personalized support. It can help you brainstorm ideas, organize projects and offer suggestions tailored to you." },
      { heading: "What your cat will never do", body: "Your assistant won't claim your work as its own or use your writing to train AI models without your permission. It won't publish, share or make significant changes to your work without your instruction." },
      { heading: "Your work stays yours", body: "Your manuscripts, ideas and creative work remain yours. Your cat remembers the information you share to personalize your experience. Every 30 days, we'll prompt you to feed your cat a little more information to keep its memory and default settings up to date." },
      { heading: "You're in control", body: "You decide how your assistant works. Change your settings at any time, clear your cat's memory, or choose to work without AI assistance. Your cat is here to support your creativity, not take it over." },
    ],
  },

  // Prototype stand-in for the settings the AI would suggest from the writer's work
  suggestedFromWork: { loudness: 1, assistance: 0, reading: 0 },

  // ---------- Option 3: Let me choose myself ----------
  chooseRoute: {
    title: "Choose Your Own Cat",
    intro: "Every cat here comes with all AI features turned off. You can change that any time in their settings.",
    adoptButton: "Adopt This Cat",
    chosenStatus: "All AI features turned off",
  },
  // A cat with no AI: notifications hidden, writing support off, never reads your work
  noAiSettings: { loudness: 2, assistance: 1, reading: 2 },

  // ---------- 7b: Oscar plays with your story ----------
  manuscript: {
    book: "The Recurring Dream",
    chapter: "Chapter 1",
    // Rachel's 'bad draft': what Oscar reads
    paragraphs: [
      "When I was a kid I used to have this dream. It was a really wierd dream and a really vivid dream and it always started the same way. I would wake up in my bed and everything would be normal and ordinary, but then I would see a girl standing beside my bed. She had ginger hair and a cloak that made her invisable. Her name was Sheila, from the old Dungeons and Dragons cartoon I used to watch. She was the thief and her cloak was magicial and could make her disappear. She would lean over me and whisper \"wake up, we need you. The world needs saving again.\"",
      "I would get out of my bed and put on my pajamas and follow her downstairs. It was always dark and quiet and the house felt very quiet and dark, and as we walked outside the real world started to change. The pavement became sand and the houses disappeared and the streetlights became stars. The sky was big and blue and purple and the ground was a big sandy desert that went on forever.",
      "And there in the middle of the deserty was a tall building that looked like a giant treehouse. It was very tall and wooden and strange, with ladders going all the way up the side. I had to climb the ladders and the ladders were very long and very steep. At the top there was only one room. The room was full of books and plants and there was a yellow bedsheet hanging across one wall. It was a strange room but it felt like home.",
      "The others were waiting for me. Hank had his magical bow that shot glowing arrows. Eric had his shield that made a forcefield. Diana had her staff that could change size, and Presto had his magical hat that could produce spells, although it didn't always work properly. Bobby was there too, holding his big magical club, and beside him was Uni, the little white unicorn with a tiny horn and a cute face.",
      "We were all freinds and we had been on lots of adventures together. But then there was a loud noise and everything started shaking. The plants moved and the books fell off the shelves. A dark shaddow moved across the yellow bedsheet and then another shadow appeared. Then another one. The shadows were coming from Venger, the evil wizard with the horns and the big black wings. He was a scary and evil villain and he wanted our magical items and he wanted to destroy everything.",
      "Before we could beleive it, the shadows grabbed Uni. She squealed and kicked her little hooves and Bobby shouted for her, but she was pulled into the darkness. Venger laughed and the shadows dissapeared, leaving the room empty and quiet.",
      "We had to save Uni. Hank picked up his bow and told us to follow him. Eric raised his shield and Diana swung her staff. Presto reached into his hat and pulled out something that looked like a very large fish, which was not helpful at all. Sheila pulled her cloak over her head and vanished, and Bobby held his club tightly.",
      "We climbed down the staircas and ran out into the desert. The sand was blowing everywhere and the sky was dark and stormy. We ran and ran and ran, following the dark tracks left by the shadows. I knew we would find Uni by tommorow because we always did, but I was scared and the desert was so big and so empty.",
      "Then I woke up.",
      "I was back in my bed, in my own room, with my normal blankets and my normal pillow. It was morning and everything was normal again. But I could still hear Bobby shouting for Uni in the distance, and sometimes, even now, I wonder if we ever found her."
    ],
    tipParagraph: 1,                 // keeps planted spelling mistakes out of this paragraph
    repeatedWords: ["really", "very", "big"],   // highlighted wherever they appear
    // Planted spelling mistakes: underlined when writing support is on (wrong -> suggestion)
    misspelled: {"dissapeared": "disappeared", "magicial": "magical", "shaddow": "shadow", "deserty": "desert", "freinds": "friends", "wierd": "weird", "invisable": "invisible", "beleive": "believe", "staircas": "staircase", "tommorow": "tomorrow"},
    // Rachel's fixed draft, after the Reedsy Learning course
    revisedParagraphs: [
      "When I was a child, I had a dream that returned so often it began to feel less like a dream and more like a place I had once visited.",
      "It always began in my bedroom.",
      "I would wake beneath my familiar blankets, the house silent around me, and find a girl standing at the foot of my bed. She had red hair and a dark cloak pulled tightly around her shoulders. I recognized her immediately. Sheila, the Thief, from the old Dungeons & Dragons cartoon. Her enchanted cloak could make her invisible, though she rarely needed magic to move quietly.",
      "“Come on,” she would whisper. “We're needed.”",
      "I never asked why. Somehow, I already knew.",
      "I'd climb out of bed, pull on my pajamas and follow her downstairs. Together, we would step into the night. At first, everything looked ordinary: the garden gate, the pavement, the streetlights glowing against the darkness. But with every step, the world began to change. The pavement softened into sand. The houses faded into distant silhouettes, then vanished altogether. Above us, the sky deepened into an impossible blue, scattered with unfamiliar stars.",
      "By the time I looked back, home was gone.",
      "We stood in the middle of a vast desert.",
      "Far ahead rose a towering wooden structure, something between a treehouse and an ancient watchtower. Its crooked beams reached toward the sky, and a bewildering tangle of ladders climbed its sides. I would follow Sheila upwards, rung after rung, until we reached a single room perched at the very top.",
      "Inside, the world became quiet.",
      "Books lined the walls, their spines worn and faded. Plants crowded every corner, spilling over shelves and twisting around the wooden beams. A yellow bedsheet hung from one wall, shifting gently in a breeze I could never explain. It was a strange place, suspended above an endless desert, yet it felt strangely familiar. It felt safe.",
      "The others were always waiting for me.",
      "Hank stood near the window, his magical bow resting in his hands, ready to fire arrows of glowing energy. Eric kept his enchanted shield close, able to summon a protective force field when danger came. Diana leaned against her shape-changing staff, confident as ever. Presto adjusted his oversized magician's hat, from which he could conjure spells that rarely behaved quite as expected. And Bobby stood beside his little unicorn, Uni, gripping his enchanted club.",
      "They never seemed surprised to see me.",
      "“You made it,” Hank would say.",
      "And then, almost every time, the trouble would begin.",
      "It started with a sound like distant thunder. The room trembled. Books slid from their shelves, leaves shivered across the floor, and the yellow bedsheet stirred violently against the wall.",
      "A shadow passed over it.",
      "Then another.",
      "The light seemed to drain from the room. Darkness crept between the floorboards, gathering in the corners, until a familiar silhouette appeared against the sheet: tall, horned and crowned with enormous black wings.",
      "Venger.",
      "Even in a dream, I knew him. He was the evil sorcerer who haunted the adventures of my childhood, forever pursuing the six young heroes and their magical weapons. His presence made the air feel colder.",
      "A deep laugh echoed through the room.",
      "The shadows surged forward.",
      "Before anyone could react, they wrapped themselves around Uni. The little unicorn cried out, her hooves scraping desperately against the wooden floor. Bobby lunged for her, but the darkness pulled her beyond his reach.",
      "“UNI!”",
      "The room went still.",
      "For a moment, nobody moved. Then Hank raised his bow, and the familiar glow of its energy arrow illuminated the shelves. Eric lifted his shield. Diana gripped her staff. Presto reached into his hat, muttering a hurried spell, while Sheila drew her cloak around herself and disappeared.",
      "Bobby tightened his hands around his club.",
      "“We're getting her back,” Hank said.",
      "Nobody disagreed.",
      "I followed them down the endless ladders and into the desert, where the wind had risen and the sand whipped against my face. Ahead, a trail of black shadows stretched across the dunes toward the distant horizon.",
      "We ran after it.",
      "I never remembered what happened next. I never reached Venger's fortress, never saw Uni rescued, never discovered whether our little band of adventurers had saved the world. The dream always ended before I could find out.",
      "I would wake in my own bed, beneath my own blankets, with morning light creeping across the walls.",
      "Everything would be ordinary again.",
      "Yet sometimes, in the quiet before sleep, I would remember the yellow bedsheet, the books, the plants and the wooden ladders rising above the desert. I would remember Sheila standing beside my bed, waiting patiently for me to follow.",
      "And I would wonder whether, somewhere beyond the edge of sleep, my friends were still searching for Uni.",
      "Whether Hank was still leading the way.",
      "Whether Bobby was still calling her name.",
      "And whether, tonight, I might finally wake up to find Sheila waiting for me again."
    ],
  },

  purr: {
    tip: "You use “really”, “very” and “big” a lot! Find fresh ways to describe your world with Reedsy Learning.",
    learnButton: "Go to Reedsy Learning",
    dismissLabel: "Maybe Later",
    neverReads: "Paws off, as promised! You asked me never to read your work. You can change that in my settings.",
    happyLine: "Your writing has really improved recently! Well done!",
    // Clearing the cat's memory (from the cat's menu): the AI Policy promises this
    memory: {
      menuItem: "Clear {name}'s memory",
      title: "Clear {name}'s memory?",
      body: "{name} forgets everything read from your work so far, including what was learned at meals and any suggestions you chose to keep. Your manuscript and settings stay as they are.",
      stopReading: "Also stop {name} reading my work",
      confirm: "Clear Memory",
      cancel: "Cancel",
      done: "All forgotten! Feed me again whenever you like.",
      doneStopped: "All forgotten, and I won't read your work again unless you change my settings.",
    },
    // Oscar's menu
    // Oscar's menu: every item has a short description line
    menu: {
      seeSuggestion: "See {name}'s suggestion",
      seeSuggestionNote: "A writing suggestion is waiting",
      seeTip: "See {name}'s tip",
      seeTipNote: "A writing tip is waiting",
      // More than one thing waiting (only the first two pop up on their own)
      seeMany: "See {name}'s suggestions ({n})",
      seeManyNote: "Work through them one at a time",
      play: "Ask {name} to play with this chapter",
      playNote: "Reads it and looks for ways to help",
      scratch: "Give {name} a scratch",
      scratchNote: "Just for fun",
      feed: "Feed {name}",
      fedLabel: "(fed recently)",
      feedNote: "Share new work to fine-tune the settings",
      settings: "Open {name}'s settings",
      settingsNote: "Notifications, writing support and reading",
      memoryNote: "Forget everything read from your work so far",
    },
    // Notification history: everything the cat said this session, newest first
    history: {
      menuItem: "See {name}'s previous purrs",
      menuNote: "Everything {name} has said this session",
      title: "{name}'s previous purrs",
      empty: "No purrs yet this session.",
      showAgain: "Show Again",
      close: "Close",
      typos: "Spotted {n} typos",
      typo: "Typo: ‘{wrong}’",
      tip: "Repeated words tip (‘really’, ‘very’, ‘big’)",
      meal: "After a meal: {setting}",
      outcomes: { fixed: "Fixed", fixedAll: "Fixed all", kept: "Kept as is", noted: "Noted", ignored: "Ignored", later: "Maybe later", learning: "Went to Reedsy Learning", accepted: "Accepted", keptMine: "Kept mine" },
    },
    // A scratch rotates through three reactions: hearts, then these two lines in the speech bubble
    scratchLines: [
      "Purrrrr… right behind the ears, please.",
      "*Slow blink.* In cat, that means I like you.",
    ],
    rereadLine: "Still lovely! Nothing new to flag in this chapter.",
  },

  // ---------- Writing support: the cat's spelling and grammar suggestions ----------
  // Shown only when writing support is on, one at a time, following the notification (loudness) setting.
  // Deterministic prototype rules: the planted misspellings (manuscript.misspelled) plus these grammar examples.
  assist: {
    spellMessage: "Psst! I spotted a little typo. You wrote ‘{wrong}’ — I think you mean ‘{right}’. Shall I tidy that up for you?",
    // One card for all the typos (Rachel to edit: adapted from her single-typo line)
    typosMessage: "Psst! I spotted {n} little typos. Shall I tidy them up for you?",
    fixAllButton: "Fix All",
    ignoreButton: "Ignore",
    fixButton: "Fix It",
    keepButton: "Keep As Is",
    gotItButton: "Got It",
    nextTypo: "Next Typo",
    showButton: "Show Me",
    beforeLabel: "You wrote",
    afterLabel: "Suggestion",
    // Rachel to edit: messages and rewrites are Claude's examples
    grammar: [
      {
        id: "speech",
        original: 'She would lean over me and whisper "wake up, we need you.',
        suggestion: 'She would lean over me and whisper, "Wake up, we need you.',
        message: "Psst! Speech usually opens with a comma and a capital letter. Shall I tidy that up for you?",
      },
      {
        id: "ladders",
        original: "I had to climb the ladders and the ladders were very long and very steep.",
        explainOnly: true,
        message: "This sentence trips over its own ladders! “The ladders” comes twice, joined by “and”. Try combining the two halves in your own words.",
      },
      {
        id: "venger",
        original: "He was a scary and evil villain and he wanted our magical items and he wanted to destroy everything.",
        explainOnly: true,
        message: "This one runs on a little: three ideas strung together with “and”. Breaking it up keeps your reader with you.",
      },
    ],
  },

  learning: {
    label: "Reedsy Learning",
    title: "How to Master the 'Show, Don't Tell' Rule",
    beginButton: "Begin Course",
    // Prototype narration between the course and the revision (edit freely)
    doneEyebrow: "Prototype",
    doneTitle: "Course complete",
    doneBody: "The writer has finished the Reedsy Learning course and returns to their manuscript to revise it.",
    doneNote: "In this prototype you step through the writer's own edits, one paragraph at a time, using what they learned. The cat doesn't write anything.",
    continueButton: "Return to Manuscript",
    revisingNote: "You're revising your own draft, one paragraph at a time. The cat doesn't write a word.",
    reviseNext: "Rewrite Next Paragraph",
    reviseAll: "Write All",
  },
};
