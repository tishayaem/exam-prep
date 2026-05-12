import type { Section } from '../types';

export const earth08LightSources: Section = {
  id: 'earth-08-light-sources',
  subject: 'science',
  pack: 'earth-space-forces',
  number: 8,
  title: 'Light Sources and Reflected Light',
  lesson: `Some things make their own light — they are **light sources**. The **Sun** and **stars** are natural light sources. So are candles, light bulbs and torches (those are man-made).

Other things only look bright because they **reflect** light from somewhere else. The **Moon** and the **planets** don\'t make any light of their own. We see them because sunlight bounces off them and reaches our eyes. Mirrors do the same trick — they bounce light back.

To **reflect** = to bounce light off a surface.
To **illuminate** = to light up.`,
  vocabulary: [
    { term: 'Light source', meaning: 'Something that makes its own light' },
    { term: 'Reflect', meaning: 'To bounce light off a surface' },
    { term: 'Illuminate', meaning: 'To light up' },
  ],
  examples: [
    {
      title: 'Cat eyes shine in headlights',
      body: `A cat's eyes glow when caught in a torch beam — but the cat isn't making its own light. Behind the retina is a mirror-like layer called the **tapetum** that bounces light back through the eye, giving the cat a second chance to see by it. The leftover light comes back out of the eye as the shine you notice. The same trick makes deer eyes glow on country roads.`,
    },
    {
      title: 'Glowing animals of the deep sea',
      body: `In the ocean below 1,000 metres, where no sunlight reaches, animals make their own light — a trick called **bioluminescence**. Anglerfish dangle a glowing lure to attract prey. Some squid puff out clouds of glowing ink to confuse hunters. Even a few shark species glow. It's the deep sea's solution to being a **light source** where the Sun can't reach.`,
    },
    {
      title: "Stars twinkle, planets don't",
      body: `Want a quick way to tell a star from a planet? Stars **twinkle** — they look like a single point of light, and Earth's wobbly atmosphere bends that point so it flickers. Planets are close enough to look like tiny discs, which smooths the twinkling out. If it twinkles, it's a star. If it's a steady bright dot, it's almost certainly a planet.`,
    },
    {
      title: 'Try this: source vs reflector',
      body: `In a dark room, switch on a torch and aim it at a mirror. The mirror flares bright. Now point the torch at a sheet of black paper. Same torch, much less brightness coming back. The mirror is a good **reflector** but not a **light source**. The torch bulb is the actual source. Most things you see are reflectors — the Moon, the page of a book, your hand. Sources are rarer.`,
    },
  ],
  questions: [
    {
      id: 'earth-08-q1',
      sectionId: 'earth-08-light-sources',
      type: 'truefalse',
      prompt: 'Is the Moon a light source?',
      choices: ['True', 'False'],
      answer: 'False',
      explanation:
        'No — the Moon makes no light of its own. It only looks bright because sunlight is reflecting off its surface.',
      difficulty: 1,
      source: 'Term 2 Section 8 Q1',
    },
    {
      id: 'earth-08-q2',
      sectionId: 'earth-08-light-sources',
      type: 'short',
      prompt: 'Why can we see planets?',
      answer: 'Because they reflect sunlight',
      acceptable: [
        'they reflect sunlight',
        'they reflect the sun\'s light',
        'sunlight reflects off them',
        'they bounce sunlight back to us',
        'they reflect light from the sun',
        'sun\'s light reflects off them',
      ],
      explanation:
        'Planets don\'t make light. We see them because sunlight hits them, bounces off, and travels to our eyes.',
      difficulty: 2,
      reasoning: true,
      source: 'Term 2 Section 8 Q2',
    },
    {
      id: 'earth-08-q3',
      sectionId: 'earth-08-light-sources',
      type: 'short',
      prompt: 'Name one natural light source.',
      answer: 'The Sun',
      acceptable: [
        'sun',
        'the sun',
        'star',
        'a star',
        'stars',
        'lightning',
        'fire',
        'a firefly',
        'fireflies',
      ],
      explanation:
        'Natural light sources include the Sun, other stars, lightning, fire, and bioluminescent animals like fireflies and some deep-sea fish.',
      difficulty: 1,
      source: 'Term 2 Section 8 Q3',
    },
    {
      id: 'earth-08-q4',
      sectionId: 'earth-08-light-sources',
      type: 'short',
      prompt: 'What does "reflect" mean?',
      answer: 'To bounce light off a surface',
      acceptable: [
        'to bounce light',
        'bounce light off a surface',
        'when light bounces off something',
        'light bouncing off a surface',
      ],
      explanation:
        '"Reflect" = bounce. Mirrors reflect almost all the light that hits them. The Moon reflects sunlight. White surfaces reflect more light than black ones (which absorb it).',
      difficulty: 1,
      source: 'Term 2 Section 8 Q4',
    },
    {
      id: 'earth-08-q5',
      sectionId: 'earth-08-light-sources',
      type: 'mcq',
      prompt: 'Which of these is a **light source** (makes its own light)?',
      choices: ['Mirror', 'Moon', 'Star', 'A blank piece of paper'],
      answer: 'Star',
      explanation:
        'Stars (including our Sun) make their own light through nuclear fusion in their cores. The Moon, mirrors, and paper all only reflect light from somewhere else.',
      difficulty: 2,
      source: 'Term 2 Section 8 — MCQ variant',
    },
    {
      id: 'earth-08-q6',
      sectionId: 'earth-08-light-sources',
      type: 'cloze',
      prompt: 'We can see the Moon because it ____ sunlight.',
      answer: 'reflects',
      acceptable: ['reflects'],
      explanation: 'The Moon reflects sunlight — it doesn\'t produce any light of its own.',
      difficulty: 1,
      source: 'Term 2 Section 8 — cloze variant',
    },
  ],
  deeper: `**Some animals make their own light.** This is called **bioluminescence**. Fireflies use it to attract mates. Deep-sea anglerfish dangle a glowing lure in front of their faces. Some species of fungi glow in the dark to attract insects that spread their spores. Even some sharks glow.

**Stars twinkle but planets don\'t.** Stars are *so* far away that they appear as single points of light, and Earth\'s atmosphere bends that pinprick around as it moves — making them twinkle. Planets are close enough to look like tiny discs, which smooths out the twinkling. Tip: if it twinkles, it\'s a star; if it\'s steady, it\'s probably a planet.

**The Moon would be invisible if the Sun went out.** Even though we never think of it that way, every glimpse you\'ve ever had of the Moon was actually a glimpse of bounced-off sunlight.`,
};
