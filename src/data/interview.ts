/**
 * Interview preparation for Brighton College 11+ (Year 7) entry.
 *
 * This is DELIBERATELY self-contained and is NOT part of `allSections` /
 * `allQuestions`. An interview question can't be auto-graded ("tell me about
 * yourself" has no right answer), so letting these leak into Quiz, Mock Test,
 * Smart Practice or Mistakes would be wrong. The Interview modes read straight
 * from here instead.
 *
 * Research + sourcing: materials/11plus-research/interview.md. The question bank
 * reflects well-evidenced *selective-school* patterns (no real Brighton 11+
 * questions exist publicly) — it's for practising the habit of talking, not for
 * predicting the exact questions. The whole spirit is "be yourself, don't
 * memorise answers", so the prompts below are *approaches to think about*, never
 * scripts to recite.
 */

export type InterviewCategory =
  | 'about-you'
  | 'hobbies'
  | 'reading'
  | 'news'
  | 'thinking'
  | 'why-brighton'
  | 'opinions'
  | 'your-questions';

export interface InterviewCategoryDef {
  id: InterviewCategory;
  /** Kid-facing label used on filter chips and card overlines. */
  label: string;
  /** One-line description of what this group is about. */
  blurb: string;
}

/** Display order of categories on the practice deck's filter row. */
export const INTERVIEW_CATEGORIES: InterviewCategoryDef[] = [
  { id: 'about-you', label: 'All about you', blurb: 'Who you are and what makes you, you.' },
  { id: 'hobbies', label: 'What you love', blurb: 'The things you do outside lessons.' },
  { id: 'reading', label: 'Books & reading', blurb: 'The question they ask most of all.' },
  { id: 'news', label: 'The world & news', blurb: 'Showing you’re curious about the world.' },
  { id: 'thinking', label: 'Big thinking', blurb: 'Fun questions with no right answer.' },
  { id: 'why-brighton', label: 'Why Brighton?', blurb: 'Why you’d love to go there — honestly.' },
  { id: 'opinions', label: 'What you think', blurb: 'Kindness, fairness and having a view.' },
  { id: 'your-questions', label: 'Your turn to ask', blurb: 'Questions YOU ask them at the end.' },
];

export interface InterviewQuestion {
  id: string;
  category: InterviewCategory;
  /** A near-universal question — gets a star so the child practises it most. */
  common?: boolean;
  /** The question, in the words a teacher might use. */
  question: string;
  /** What the interviewer is really trying to find out. */
  asking: string;
  /**
   * Gentle prompts: things to think about or could mention, and *how* to
   * approach it. Never a model answer to memorise.
   */
  talkingPoints: string[];
}

export const interviewQuestions: InterviewQuestion[] = [
  // ── All about you ─────────────────────────────────────────────────────────
  {
    id: 'int-about-tell-me',
    category: 'about-you',
    common: true,
    question: 'Tell me about yourself.',
    asking: 'They want to meet the real you and hear what makes you, you.',
    talkingPoints: [
      'Start with a couple of true things — your year, what you enjoy, your family.',
      'Pick one thing you really love and say a sentence about it.',
      'You don’t have to list everything — a few real details beat a long speech.',
      'Smile, and take your time.',
    ],
  },
  {
    id: 'int-about-three-words',
    category: 'about-you',
    question: 'How would your friends describe you in three words?',
    asking: 'Whether you know yourself, and how you get on with other people.',
    talkingPoints: [
      'Choose three words that are honestly you — kind? funny? curious?',
      'Give a tiny example for one of them.',
      'It’s fine to think for a few seconds first.',
    ],
  },
  {
    id: 'int-about-proud',
    category: 'about-you',
    question: 'What are you most proud of?',
    asking: 'What you care about, and that you can stick at something hard.',
    talkingPoints: [
      'It doesn’t need to be a prize — finishing a big book or learning to swim counts.',
      'Say why it was hard or special to you.',
      'Talk about how you got there, not just the result.',
    ],
  },
  {
    id: 'int-about-family',
    category: 'about-you',
    question: 'Tell me about your family.',
    asking: 'A gentle warm-up question, just to help you relax.',
    talkingPoints: [
      'Say who’s at home — brothers, sisters, pets.',
      'One nice detail is plenty.',
      'This is a friendly opener, so settle in and enjoy it.',
    ],
  },

  // ── What you love doing ───────────────────────────────────────────────────
  {
    id: 'int-hobbies-outside',
    category: 'hobbies',
    common: true,
    question: 'What do you like doing outside school?',
    asking: 'What you’re passionate about, and how you’d join in school life.',
    talkingPoints: [
      'Talk about something you genuinely do — a sport, music, building, drawing.',
      'Say what you love about it.',
      'Mention if you’d like to keep doing it at the new school.',
    ],
  },
  {
    id: 'int-hobbies-started',
    category: 'hobbies',
    question: 'Have you ever started a club, or got other people involved in something?',
    asking: 'Whether you show a bit of get-up-and-go.',
    talkingPoints: [
      'Organising a game, helping a younger child, or starting a hobby all count.',
      'Say what you did and what happened.',
      'If you haven’t, talk about something you’d love to start.',
    ],
  },
  {
    id: 'int-hobbies-better',
    category: 'hobbies',
    question: 'If you could get better at one thing, what would it be?',
    asking: 'That you like a challenge and want to improve.',
    talkingPoints: [
      'Pick something real you’d like to grow at.',
      'Say one small step you could take to get there.',
      'Wanting to improve matters more than already being the best.',
    ],
  },

  // ── Books & reading (the most common of all) ──────────────────────────────
  {
    id: 'int-reading-now',
    category: 'reading',
    common: true,
    question: 'What are you reading at the moment?',
    asking: 'Whether you read for fun — this is the question they ask most often.',
    talkingPoints: [
      'Have a book you’re actually reading ready to talk about.',
      'Say what’s happening, and a character you like.',
      'Give one real reason you like it.',
      'Always have an honest answer — even "I’ve just finished…" works.',
    ],
  },
  {
    id: 'int-reading-favourite',
    category: 'reading',
    question: 'Tell me about your favourite book or character.',
    asking: 'That you can describe something and explain what you enjoy.',
    talkingPoints: [
      'Describe the character — what are they like?',
      'Use a moment from the story that shows it.',
      'Say how you’d feel if you met them.',
    ],
  },
  {
    id: 'int-reading-disliked',
    category: 'reading',
    question: 'Is there a book you didn’t enjoy? Why?',
    asking: 'That you can have an opinion and back it up — kindly.',
    talkingPoints: [
      'It’s completely fine not to like a book.',
      'Say why — too slow? confusing? just not your kind of story?',
      'That’s far more interesting than saying everything was great.',
    ],
  },

  // ── The world & news ──────────────────────────────────────────────────────
  {
    id: 'int-news-story',
    category: 'news',
    common: true,
    question: 'Tell me about a news story that interested you.',
    asking: 'That you’re curious about the world beyond school.',
    talkingPoints: [
      'Pick a story you actually remember — science, sport, animals, a big event.',
      'Say what happened in a sentence or two.',
      'Say what you think or feel about it, and why.',
    ],
  },
  {
    id: 'int-news-change',
    category: 'news',
    question: 'If you could change one thing about the world, what would it be?',
    asking: 'What you care about, and how you reason.',
    talkingPoints: [
      'Choose something you genuinely care about.',
      'Say why it matters to you.',
      'Even a small, kind idea is a great answer.',
    ],
  },
  {
    id: 'int-news-learned',
    category: 'news',
    question: 'What’s something interesting you’ve learned recently?',
    asking: 'That you enjoy learning new things.',
    talkingPoints: [
      'It can be from a lesson, a book, a video, or a chat.',
      'Explain it simply, as if you were teaching them.',
      'Show that you found it cool — that’s the whole point.',
    ],
  },

  // ── Big thinking (no right answer) ────────────────────────────────────────
  {
    id: 'int-thinking-head',
    category: 'thinking',
    question: 'If you were head teacher for a day, what would you do?',
    asking: 'How you think — there’s no right answer here.',
    talkingPoints: [
      'Have fun with it, but give a reason for your idea.',
      'One good idea explained well beats five quick ones.',
      'It’s fine to think out loud as you go.',
    ],
  },
  {
    id: 'int-thinking-fly',
    category: 'thinking',
    question: 'Would you rather be able to fly, or be invisible?',
    asking: 'That you can pick a side and explain why.',
    talkingPoints: [
      'Choose one — don’t sit on the fence.',
      'Give a reason, or an example of what you’d do.',
      'There’s no wrong choice; the why is everything.',
    ],
  },
  {
    id: 'int-thinking-future',
    category: 'thinking',
    question: 'What do you think you’ll be doing in twenty years?',
    asking: 'Your imagination, and what excites you.',
    talkingPoints: [
      'You don’t need a real plan — dream a little.',
      'Link it to something you enjoy now.',
      'It’s fine to say you’re not sure yet, then have a guess.',
    ],
  },
  {
    id: 'int-thinking-unknown',
    category: 'thinking',
    question: 'What if I ask something you’ve never thought about before?',
    asking: 'Practice for the big one: never freeze.',
    talkingPoints: [
      'Never just stop at "I don’t know".',
      'Say "I’m not sure, but I’d guess…" and think out loud.',
      'Having a go at a new idea is exactly what they want to see.',
    ],
  },

  // ── Why Brighton? ─────────────────────────────────────────────────────────
  {
    id: 'int-why-school',
    category: 'why-brighton',
    common: true,
    question: 'Why do you want to come to Brighton College?',
    asking: 'That YOU (not just your parents) want to be there, for real reasons.',
    talkingPoints: [
      'Pick one or two things you honestly like about the school.',
      'Brighton is known for being kind, curious and confident — say if that feels like you.',
      'Tie it to something you love — a sport, music, science.',
      'True and specific beats a long, rehearsed list.',
    ],
  },
  {
    id: 'int-why-looking-forward',
    category: 'why-brighton',
    question: 'What are you most looking forward to about secondary school?',
    asking: 'Your enthusiasm for what’s ahead.',
    talkingPoints: [
      'Talk about something new you’d love to try — a club, a subject, a trip.',
      'Say why it excites you.',
      'Showing you’re keen is half the answer.',
    ],
  },
  {
    id: 'int-why-bring',
    category: 'why-brighton',
    question: 'What could you bring to our school?',
    asking: 'How you’d add to the place — not just take from it.',
    talkingPoints: [
      'Think of something you’d join in with or help with.',
      'It could be a talent, but also just being kind and welcoming.',
      'Schools love a child who’ll muck in.',
    ],
  },

  // ── What you think (gentle opinions / ethics) ─────────────────────────────
  {
    id: 'int-opinions-friend',
    category: 'opinions',
    question: 'What makes someone a good friend?',
    asking: 'Your values — and Brighton cares a great deal about kindness.',
    talkingPoints: [
      'Talk about what you value — being kind, fair, loyal, fun.',
      'Give a small example if you can.',
      'Speak from the heart, not a "right" answer.',
    ],
  },
  {
    id: 'int-opinions-rule',
    category: 'opinions',
    question: 'Is it ever okay to break a rule?',
    asking: 'That you can think about right and wrong, and see both sides.',
    talkingPoints: [
      'There’s no single right answer.',
      'Think out loud — maybe to keep someone safe?',
      'Showing you can see two sides is brilliant.',
    ],
  },
  {
    id: 'int-opinions-kind',
    category: 'opinions',
    question: 'What does being kind mean to you?',
    asking: 'How you think about kindness — right at the heart of Brighton.',
    talkingPoints: [
      'Use your own words, and a real example.',
      'Small kind things count — helping, sharing, including someone.',
      'Honest beats fancy, every time.',
    ],
  },

  // ── Your turn to ask ──────────────────────────────────────────────────────
  {
    id: 'int-ask-any-questions',
    category: 'your-questions',
    common: true,
    question: 'Do you have any questions for us?',
    asking: 'That you’re genuinely interested — you’ll almost always be asked this at the end.',
    talkingPoints: [
      'Always have one or two real questions ready.',
      'Ask about something you care about — a club, sport, trip, or how lessons work.',
      'Avoid things you could easily find on the website.',
      'It’s the easiest way to show you’re keen.',
    ],
  },
  {
    id: 'int-ask-club',
    category: 'your-questions',
    question: 'A good question to ask: about a club or activity you love.',
    asking: 'Turning your own interest into a question.',
    talkingPoints: [
      'Try: "I love football / violin / art — what’s that like here?"',
      'It shows what matters to you.',
      'Listen to the answer and react to it.',
    ],
  },
  {
    id: 'int-ask-settling',
    category: 'your-questions',
    question: 'A good question to ask: about settling in.',
    asking: 'Shows you’re thinking ahead, in a warm way.',
    talkingPoints: [
      'Try: "What do new pupils enjoy most in the first term?"',
      'Or: "Is there a school council, or a buddy system?"',
      'Friendly and forward-looking.',
    ],
  },
];

export interface GuideBand {
  /** Two-digit band number shown in the section header. */
  number: string;
  title: string;
  trailing?: string;
  /** The "be yourself" mindset band gets the dark spotlight treatment. */
  tone?: 'plain' | 'spotlight';
  /** Paragraphs of prose (support **bold** / *italic* via renderInline). */
  paras?: string[];
  /** Optional bullet list rendered under the paragraphs. */
  bullets?: string[];
}

/** The read-through guide, shown on the Interview hub page. */
export const interviewGuide: GuideBand[] = [
  {
    number: '01',
    title: 'What happens on the day',
    trailing: 'The plan',
    paras: [
      'Getting into Brighton College has two parts. First, in **December**, you sit some papers at the school — maths, English, and reasoning puzzles. If that goes well, you’re invited back in **January** for an *Interview and Activities Day*.',
      'On that day you do fun activities with teachers, and you have **two short chats** with members of staff. Those chats are the interview — and they’re meant to be friendly, not scary. The teachers just want to get to know you.',
    ],
  },
  {
    number: '02',
    title: 'The big secret: just be you',
    trailing: 'Read this twice',
    tone: 'spotlight',
    paras: [
      'Here’s the most important thing on this whole page. The interview is **not a test you can revise for**. The teachers aren’t checking whether you memorised clever answers — they want to meet the *real you*.',
      'Grown-up interviewers talk to hundreds of children, and they can always tell when an answer was learned off by heart. So don’t do that. Be curious, be kind, be keen — and let them see you.',
    ],
    bullets: [
      'They love **curiosity** — a child with bright eyes who finds things interesting.',
      'They love it when you **think out loud**, even when you’re not sure.',
      'They are *not* looking for perfect, grown-up answers.',
    ],
  },
  {
    number: '03',
    title: 'How to give a great answer',
    trailing: 'Four little habits',
    paras: [
      'You don’t need fancy words. You just need a few simple habits that turn a one-word reply into a proper answer.',
    ],
    bullets: [
      '**Say more than one sentence.** Give your answer, then a *why* or a tiny example.',
      '**It’s okay to think first.** Taking a few seconds is better than rushing.',
      '**Never freeze.** If you don’t know, say *"I’m not sure, but I’d guess…"* and have a go.',
      '**Have a chat, not a speech.** Listen, answer, and let them ask you more.',
    ],
  },
  {
    number: '04',
    title: 'Look and sound friendly',
    trailing: 'Easy to practise',
    paras: [
      'Some of the interview is simply being polite and warm. This part you *can* practise until it feels completely normal.',
    ],
    bullets: [
      'Smile, and say hello.',
      'Look them in the eye when you talk.',
      'If they hold out a hand, give a proper handshake — not a limp one!',
      'Wait to be asked before you sit down.',
      'Sit up, with your back to the chair — it stops the fidgets.',
    ],
  },
  {
    number: '05',
    title: 'Why Brighton College?',
    trailing: 'Answer honestly',
    paras: [
      'They might ask why you want to come. The trick is to be **truthful and specific** — pick something *you* genuinely like, and say why it’s you.',
      'Brighton College is well known for what it stands for. If any of these feel like you, that’s a brilliant and honest thing to say:',
    ],
    bullets: [
      '**Kind** — the school is famous for its "culture of kindness".',
      '**Curious** — it loves children who enjoy learning new things.',
      '**Confident** — it helps you become the best version of *you*.',
      'Plus loads of sport, music, art and clubs — mention one you’d love to try.',
    ],
  },
  {
    number: '06',
    title: 'Get ready this week',
    trailing: 'Your checklist',
    paras: [
      'You can’t revise the interview, but you *can* turn up ready to chat. Here’s how:',
    ],
    bullets: [
      'Have a **book on the go** that you can talk about.',
      'Read the **news for kids** (First News, The Week Junior, Newsround) and have an opinion.',
      'Think of **one or two questions** to ask them at the end.',
      'Have **one practice chat** with a grown-up you don’t see very often.',
      'On the day: get a good sleep — and remember, they already like you, or you wouldn’t be there.',
    ],
  },
];

/** Human-readable label for a category id. */
export function categoryLabel(id: InterviewCategory): string {
  return INTERVIEW_CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

/** Questions for one category, or all of them in display order. */
export function questionsByCategory(
  cat: InterviewCategory | 'all',
): InterviewQuestion[] {
  return cat === 'all'
    ? interviewQuestions
    : interviewQuestions.filter((q) => q.category === cat);
}
