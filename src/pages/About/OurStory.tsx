import React from 'react';
import { Heart, Sparkles, BookOpen, Smile, ShieldCheck, Sun } from 'lucide-react';

export const OurStory: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-3">
        <span className="px-4 py-1.5 rounded-full bg-brand-yellow/40 text-brand-deepOrange font-bubble text-sm font-bold uppercase tracking-wider">
          Our Journey
        </span>
        <h1 className="text-4xl md:text-5xl font-bubble text-brand-brown">
          The Story of The Little Master's
        </h1>
        <p className="text-stone-600 text-lg font-medium">
          Born from a passion to protect the sanctity and magic of childhood.
        </p>
      </div>

      <div className="bg-white rounded-5xl p-8 md:p-12 border-3 border-brand-yellow shadow-card space-y-6 text-stone-700 leading-relaxed font-medium">
        <p>
          Every great endeavor starts with a question. For us, that question was simple: <span className="font-bold text-brand-brown">"What kind of space would make a child eager to wake up every morning with a smile on their face?"</span>
        </p>

        <p>
          Too often, early childhood education becomes an artificial race toward memorization, burdening young minds before they have even learned to skip, wonder, and explore. At <strong className="text-brand-deepOrange">The Little Master's Play Way School</strong>, we chose a different path—one centered on the profound truth that play is children's real work.
        </p>

        <div className="p-6 rounded-3xl bg-brand-cream border-2 border-brand-orange/30 italic text-brand-brown font-semibold text-lg text-center">
          "Little minds are not vessels to be filled, but fires to be kindled with warmth, patience, and joyful discovery."
        </div>

        <p>
          Starting from our first joyful classroom, we crafted our curriculum around sensory wonder, language richness, music, and peer empathy. Every corner of our campus—from low-height child washrooms to colorful alphabet play mats—has been shaped to provide psychological safety and immense delight.
        </p>

        <p>
          Today, we proudly welcome little masters from Playgroup through UKG, giving them the emotional confidence and intellectual curiosity they need for a lifetime of happy learning.
        </p>
      </div>
    </div>
  );
};

export const OurPhilosophy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-3">
        <span className="px-4 py-1.5 rounded-full bg-brand-orange/20 text-brand-deepOrange font-bubble text-sm font-bold uppercase tracking-wider">
          Educational Bedrock
        </span>
        <h1 className="text-4xl md:text-5xl font-bubble text-brand-brown">
          Our Play-Way Philosophy
        </h1>
        <p className="text-stone-600 text-lg font-medium">
          How children learn naturally through hands, heart, and imagination.
        </p>
      </div>

      <div className="space-y-6">
        {[
          {
            title: '1. The Joy of Sensory Discovery',
            desc: 'Before words come textures, sounds, and visual wonders. We integrate sand play, water exploration, play dough modeling, and tactile blocks into daily routines.',
            emoji: '🖐️',
          },
          {
            title: '2. Low Child-to-Teacher Ratio',
            desc: 'Every child expresses themselves differently. With a dedicated 1:6 ratio in Playgroup and 1:10 in Kindergarten, our teachers listen closely and nurture individual temperaments.',
            emoji: '❤️',
          },
          {
            title: '3. Language Immersion Through Music & Puppetry',
            desc: 'Rhymes, action songs, and puppet theatre make vocabulary acquisition natural and joyful rather than repetitive homework.',
            emoji: '🎵',
          },
          {
            title: '4. Kindness & Peer Camaraderie',
            desc: 'Learning to share toys, wait in line for the slide, and encourage friends builds character and emotional intelligence that lasts a lifetime.',
            emoji: '🤝',
          },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-4xl p-6 md:p-8 border-2 border-brand-yellow shadow-card flex gap-6 items-start">
            <span className="text-4xl p-3 rounded-2xl bg-brand-cream border border-brand-orange/20 flex-shrink-0">
              {item.emoji}
            </span>
            <div>
              <h3 className="text-2xl font-bubble text-brand-brown mb-2">{item.title}</h3>
              <p className="text-stone-600 leading-relaxed font-medium">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const PrincipalsMessage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-3">
        <span className="px-4 py-1.5 rounded-full bg-brand-green/20 text-brand-green font-bubble text-sm font-bold uppercase tracking-wider">
          Leadership Note
        </span>
        <h1 className="text-4xl md:text-5xl font-bubble text-brand-brown">
          Message from the Principal
        </h1>
        <p className="text-stone-600 text-lg font-medium">
          Nurturing tender beginnings into confident futures.
        </p>
      </div>

      <div className="bg-white rounded-5xl p-8 md:p-12 border-3 border-brand-green/40 shadow-card space-y-6">
        <div className="flex items-center gap-4 border-b border-brand-cream pb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand-yellow to-brand-orange flex items-center justify-center font-bubble text-3xl shadow-sm">
            🎓
          </div>
          <div>
            <h3 className="text-2xl font-bubble text-brand-brown">Principal's Desk</h3>
            <p className="text-stone-500 font-semibold text-sm">The Little Master's Play Way School</p>
          </div>
        </div>

        <div className="text-stone-700 leading-relaxed space-y-4 font-medium">
          <p>
            Dear Parents, Guardians, and Well-Wishers,
          </p>
          <p>
            It is a profound joy and honor to welcome you to <strong className="text-brand-brown">The Little Master's Play Way School</strong>. When a child takes their very first steps into our campus, they carry with them the immense trust of their parents and an innocent curiosity about the world.
          </p>
          <p>
            Our core mission is to safeguard that innocence while fanning the flames of their natural curiosity. Here, errors are not mistakes—they are exciting discoveries. Laughter is not an interruption—it is the sound of deep learning.
          </p>
          <p>
            Our educators are mentors, storytellers, and loving guardians. We partner closely with parents because a child flourishes best when their home and school speak the same language of unconditional love and encouragement.
          </p>
          <p>
            I look forward to welcoming you and your little master into our cheerful family!
          </p>

          <div className="pt-6 border-t border-brand-cream">
            <p className="font-bubble text-xl text-brand-deepOrange">With Warm Regards & Blessings,</p>
            <p className="font-bold text-brand-brown text-base">Principal & Academic Team</p>
            <p className="text-xs text-stone-500">The Little Master's Play Way School</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Facilities: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-4 py-1.5 rounded-full bg-brand-yellow/40 text-brand-deepOrange font-bubble text-sm font-bold uppercase tracking-wider">
          Campus Infrastructure
        </span>
        <h1 className="text-4xl md:text-5xl font-bubble text-brand-brown">
          Our Facilities & Spaces
        </h1>
        <p className="text-stone-600 text-lg font-medium">
          Thoughtfully arranged spaces built around child ergonomics, safety, and boundless play.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: 'Child-Safe Activity Classrooms',
            desc: 'Custom rounded-corner wooden furniture, non-slip shock-absorbing floor mats, bright natural sunlight, and wide ventilation.',
            icon: '🎨',
          },
          {
            title: 'Tactile Sensory Play Zone',
            desc: 'Filled with kinetic sand, non-toxic water play troughs, Montessori sorting trays, and tactile texture boards.',
            icon: '✨',
          },
          {
            title: 'Outdoor Lawn & Playpark',
            desc: 'Gentle mini-slides, spring rockers, crawling tunnels, and lush soft grass for gross motor development and daily sunshine.',
            icon: '🌿',
          },
          {
            title: 'Little Readers Library Corner',
            desc: 'Hundreds of picture-led storybooks, plush floor cushions, and finger puppet circles to build lifelong love for books.',
            icon: '📚',
          },
          {
            title: 'Hygienic Child-Size Restrooms',
            desc: 'Pots and washbasins mounted at toddler height with non-scalding warm water, anti-bacterial hand washes, and caring didis.',
            icon: '🧼',
          },
          {
            title: 'CCTV Surveillance & Gated Security',
            desc: 'Monitored premises with verified parent ID pickup protocols and secure single-entry doors for complete peace of mind.',
            icon: '🛡️',
          },
        ].map((f, i) => (
          <div key={i} className="bg-white rounded-4xl p-6 border-2 border-brand-yellow shadow-card space-y-3">
            <span className="text-4xl block">{f.icon}</span>
            <h3 className="font-bubble text-xl text-brand-brown">{f.title}</h3>
            <p className="text-stone-600 text-sm font-medium leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
