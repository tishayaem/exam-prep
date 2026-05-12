import type { Section } from '../types';

export const plants07WoodlandCoastal: Section = {
  id: 'plants-07-woodland-coastal',
  subject: 'science',
  pack: 'plants',
  number: 7,
  title: 'Comparing Woodland and Coastal Habitats',
  lesson: `We compared two very different habitats: **woodland** and **coastal**.

**Woodland** is shady, damp, sheltered from wind, and has lots of layers (canopy, understorey, ground). Plants are **shade-tolerant** (bluebells, ferns, mosses, oak, beech). Animals tend to be **camouflaged and climbing** (deer, foxes, woodpeckers, squirrels).

**Coastal** is bright, very windy, with salt spray, sandy or rocky ground, and changing tides. Plants are **salt-tolerant** (sea thrift, marram grass, sea kale). Animals are usually **hard-shelled and gripping** (crabs, gulls, limpets, sand hoppers).`,
  vocabulary: [
    { term: 'Woodland', meaning: 'A habitat with many trees, shade and leaf litter' },
    { term: 'Coastal', meaning: 'A habitat near the sea, with wind, salt and waves' },
    { term: 'Canopy', meaning: 'The upper layer of trees' },
    { term: 'Understorey', meaning: 'Plants growing beneath the trees' },
    { term: 'Shelter', meaning: 'Protection from weather or predators' },
  ],
  examples: [
    {
      title: 'Bluebells flower before the trees',
      body: `An English **woodland** floor in late April is carpeted blue — but only for a few weeks. Bluebells rush to flower before the oak and beech leaves above grow back, grabbing every bit of sunlight while the **canopy** is still bare. By June the leaves close overhead, light vanishes, and the bluebells fade and disappear until the next spring.`,
    },
    {
      title: 'Marram grass builds sand dunes',
      body: `**Marram grass** has tangled roots that go metres deep through shifting sand. As wind blows sand against the leaves, the plant traps grains and the dune slowly grows higher around it. Without marram, much of Britain's **coastal** edge would just blow inland. The plant doesn't only survive the dune — it builds the dune.`,
    },
    {
      title: 'Limpets have the strongest teeth',
      body: `Limpets, those small cone-shaped shells stuck to seaside rocks, have teeth made of iron-stiffened protein — measured as the **strongest natural material known**, stronger than spider silk or even Kevlar. They use them to scrape algae off the rock. Their famous grip strength is partly down to suction, partly to those incredible teeth chewing into the rock surface.`,
    },
    {
      title: 'Deer ears built for the woods',
      body: `A roe deer's tall, mobile ears can swivel independently — one forward, one back — to track sounds in cluttered **woodland** where you can't see far. Pair that with a brown-flecked coat that vanishes against tree trunks and leaf litter, and the deer is built specifically for British woods: hearing, **camouflage** and a small body for narrow paths.`,
    },
  ],
  questions: [
    {
      id: 'plants-07-q1',
      sectionId: 'plants-07-woodland-coastal',
      type: 'short',
      prompt: 'Why do woodland plants often have large leaves?',
      answer: 'To catch as much of the dim shady light as possible',
      acceptable: [
        'to catch more sunlight',
        'to get more light in the shade',
        'because woodland is shady so they need big leaves to catch light',
        'to catch more of the limited light',
        'to absorb as much sunlight as they can',
      ],
      explanation:
        'The canopy blocks most of the sunlight. Plants on the woodland floor are competing for whatever sneaks through, so big leaves = more surface area to catch it. (Compare with coastal plants — they have small tough leaves because there\'s too *much* light and wind.)',
      difficulty: 2,
      reasoning: true,
      source: 'Term 1 Section 7 Q1',
    },
    {
      id: 'plants-07-q2',
      sectionId: 'plants-07-woodland-coastal',
      type: 'short',
      prompt: 'What might a plant living in salty sea spray need special adaptations for?',
      answer: 'To survive the salt and the wind',
      acceptable: [
        'to survive salt',
        'to cope with salt water',
        'salt and strong wind',
        'to tolerate salt',
        'the strong wind and salt',
        'to handle salt spray and wind',
      ],
      explanation:
        'Salt would normally dehydrate a plant (suck water out of its cells). Coastal plants like sea thrift and marram grass have evolved to **tolerate salt**, often with waxy leaves and deep flexible roots that anchor them in shifting sand.',
      difficulty: 3,
      reasoning: true,
      source: 'Term 1 Section 7 Q2',
    },
    {
      id: 'plants-07-q3',
      sectionId: 'plants-07-woodland-coastal',
      type: 'short',
      prompt: 'Name one woodland animal and one coastal animal.',
      answer: 'Woodland: fox. Coastal: crab.',
      acceptable: [
        'fox and crab',
        'deer and gull',
        'squirrel and limpet',
        'woodpecker and sand hopper',
        'beetle and crab',
        'deer and crab',
        'squirrel and gull',
        'fox and gull',
        'fox and limpet',
      ],
      explanation:
        'Woodland animals (any one): deer, foxes, woodpeckers, beetles, squirrels. Coastal animals: crabs, gulls, limpets, sand hoppers.',
      difficulty: 1,
      source: 'Term 1 Section 7 Q3',
    },
    {
      id: 'plants-07-q4',
      sectionId: 'plants-07-woodland-coastal',
      type: 'short',
      prompt: 'Which habitat has stronger winds, and how does this affect the plants?',
      answer: 'Coastal habitats have stronger winds, so plants are shorter and tougher',
      acceptable: [
        'coastal has stronger winds',
        'coastal so plants are short and tough',
        'coastal habitats are windier so plants stay low',
        'coastal because plants need to be wind-resistant',
        'coastal and the plants are low-growing',
      ],
      explanation:
        'Coastal habitats are *much* windier. To survive, coastal plants grow low and tough — tall plants would just snap. Woodland plants can grow tall because the trees shelter them from wind.',
      difficulty: 3,
      reasoning: true,
      source: 'Term 1 Section 7 Q4',
    },
    {
      id: 'plants-07-q5',
      sectionId: 'plants-07-woodland-coastal',
      type: 'mcq',
      prompt: 'Which is the *upper* layer of a woodland habitat?',
      choices: ['Canopy', 'Understorey', 'Shelter', 'Leaf litter'],
      answer: 'Canopy',
      explanation:
        '**Canopy** = the top layer (tree crowns). **Understorey** = plants growing under the trees. **Leaf litter** = the dead leaves on the ground.',
      difficulty: 2,
      source: 'Term 1 Section 7 — MCQ variant',
    },
    {
      id: 'plants-07-q6',
      sectionId: 'plants-07-woodland-coastal',
      type: 'cloze',
      prompt: 'Marram grass has long, deep roots so it can anchor itself in shifting ____.',
      answer: 'sand',
      acceptable: ['sand', 'the sand'],
      explanation:
        'Sand dunes are constantly moving. Marram grass\'s long roots hold it in place — and as a bonus, the roots help *build* the dunes themselves.',
      difficulty: 2,
      source: 'Term 1 Section 7 — cloze variant',
    },
  ],
  deeper: `**Marram grass builds sand dunes.** Its tangled underground roots trap blowing sand, slowly building the dune higher. Without marram grass, a lot of UK coastline would just blow away.

**Bluebell carpets** that cover woodland floors in spring are doing something clever — they flower fast, before the trees grow leaves, so they can grab sunlight while it's still reaching the ground. Once the canopy closes overhead, the bluebells fade and disappear until next year.

**Limpets are tiny tanks.** A small limpet can grip a rock with a force equivalent to a *human* hanging off it. Their teeth are made of the strongest natural material known — stronger than spider silk and Kevlar.`,
};
