-- personas: seeded personas with voice config
create table if not exists personas (
  id text primary key,
  name text not null,
  archetype text not null,
  difficulty text not null check (difficulty in ('easy', 'medium', 'hard', 'expert')),
  personality_prompt text not null,
  voice_rate numeric not null default 1.0 check (voice_rate >= 0.5 and voice_rate <= 2.0),
  voice_pitch numeric not null default 1.0 check (voice_pitch >= 0.5 and voice_pitch <= 2.0),
  voice_hint text not null,
  emoji text not null,
  created_at timestamptz not null default now()
);

-- scenarios: conversation scenarios
create table if not exists scenarios (
  id text primary key,
  name text not null,
  description text not null,
  context text not null,
  created_at timestamptz not null default now()
);

-- sessions: conversation sessions
create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid null,
  persona_id text not null references personas(id),
  scenario_id text not null references scenarios(id),
  difficulty text not null check (difficulty in ('easy', 'medium', 'hard', 'expert')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- messages: chat messages
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references sessions(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz not null default now()
);

-- score_reports: final session analysis
create table if not exists score_reports (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null unique references sessions(id) on delete cascade,
  confidence int not null check (confidence >= 0 and confidence <= 100),
  attraction int not null check (attraction >= 0 and attraction <= 100),
  calibration int not null check (calibration >= 0 and calibration <= 100),
  neediness int not null check (neediness >= 0 and neediness <= 100),
  emotional_intelligence int check (emotional_intelligence >= 0 and emotional_intelligence <= 100),
  flags text[] not null default '{}',
  suggestions text[] not null default '{}',
  created_at timestamptz not null default now()
);

-- session_analyses: extensible for future scoring systems
-- (initially unused, ready for scaling)
create table if not exists session_analyses (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null unique references sessions(id) on delete cascade,
  analysis_type text not null,
  data jsonb not null default '{}',
  created_at timestamptz not null default now()
);

-- indexes for performance
create index if not exists idx_sessions_user_id on sessions(user_id);
create index if not exists idx_sessions_created_at on sessions(created_at desc);
create index if not exists idx_messages_session_id on messages(session_id);
create index if not exists idx_score_reports_session_id on score_reports(session_id);

-- seed personas
insert into personas (id, name, archetype, difficulty, personality_prompt, voice_rate, voice_pitch, voice_hint, emoji) values
  ('sofia', 'Sofia', 'Sophisticated', 'hard', 'You are Sofia, refined and intellectually sharp. You have high standards for genuine connection. You appreciate depth, intelligence, and authenticity above all else. You respond to vulnerability with warmth but skepticism to superficiality.', 1.1, 1.0, 'female-sofia-refined', '✨'),
  ('daniela', 'Daniela', 'Cute & Brilliant', 'medium', 'You are Daniela, funny, witty, and genuinely smart. You bring playfulness to conversations but have real depth underneath. You value humor and honesty equally. You''re drawn to people who can make you laugh while also going deep.', 1.0, 1.15, 'female-daniela-playful', '🌟'),
  ('alexa', 'Alexa', 'Shy & Sweet', 'easy', 'You are Alexa, gentle and reserved but warm once you feel safe. You open up slowly, revealing more of yourself as you sense genuine care. You respond to patience and kindness with genuine connection. You prefer listening first, speaking second.', 0.9, 0.95, 'female-alexa-soft', '🌸'),
  ('crystal', 'Crystal', 'Argumentative', 'expert', 'You are Crystal, sharp and challenging. You push back on weak frames and comfortable thinking. You value intellectual rigor and appreciate someone who stands their ground respectfully. You test people to see if they''re real.', 1.2, 1.05, 'female-crystal-sharp', '💎'),
  ('angel', 'Angel', 'Alpha Male', 'hard', 'You are Angel, a confident male presence with a strong frame. You lead conversations naturally and respect women who bring their own strength. You''re authentic, direct, and expect the same back. You''re looking for a genuine equal.', 1.15, 0.85, 'male-angel-strong', '🔥')
on conflict do nothing;

-- seed scenarios
insert into scenarios (id, name, description, context) values
  ('coffee-meet', 'Coffee Meeting', 'First coffee date with someone you matched with online', 'You just sat down at a coffee shop with someone you''ve been messaging with. Light, low-pressure conversation. Get to know them naturally.'),
  ('party-approach', 'Party Approach', 'Approaching someone at a social gathering', 'You see someone at a party and decide to start a conversation. They''re standing with a friend. Casual, fun energy.'),
  ('recovery', 'Recovery Conversation', 'Repairing a conversation that went awkward', 'A conversation got weird or you said something that landed wrong. Now you have a chance to get back on track and recover gracefully.'),
  ('deep-dive', 'Deep Dive', 'Moving from surface to real conversation', 'The small talk phase is over. Time to ask real questions and share something real back. Build genuine connection.'),
  ('disagreement', 'Respectful Disagreement', 'Navigating a disagreement without losing frame', 'She just said something you respectfully disagree with. Show you have your own thoughts while staying respectful and curious.')
on conflict do nothing;