import React, { useState } from 'react';
import { MessageSquare, Plus, Trash2, CheckCircle2, Star, HelpCircle } from 'lucide-react';
import { Testimonial, FAQ } from '@/types';
import { DataStore } from '@/services/store';

interface TestimonialsModuleProps {
  testimonials: Testimonial[];
  onRefresh: () => void;
}

export const TestimonialsModule: React.FC<TestimonialsModuleProps> = ({ testimonials, onRefresh }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [parentName, setParentName] = useState('');
  const [childInfo, setChildInfo] = useState('');
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName || !content) return;

    await DataStore.addTestimonial({
      parent_name: parentName.trim(),
      child_info: childInfo.trim() || 'Parent of Little Master',
      rating,
      content: content.trim(),
      is_approved: true,
      is_published: true,
      display_order: testimonials.length + 1,
    });

    setParentName('');
    setChildInfo('');
    setContent('');
    setShowAdd(false);
    onRefresh();
  };

  const handleToggle = async (t: Testimonial) => {
    await DataStore.updateTestimonial(t.id, { is_published: !t.is_published });
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this testimonial?')) {
      await DataStore.deleteTestimonial(id);
      onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bubble text-brand-brown">Parent Testimonials</h1>
          <p className="text-stone-500 text-sm">
            Only approved feedback from real enrolled parents is published
          </p>
        </div>

        <button
          onClick={() => setShowAdd(!showAdd)}
          className="px-5 py-2.5 rounded-full bg-brand-orange hover:bg-brand-deepOrange text-white font-bubble text-sm font-bold shadow-playful-orange flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Approved Testimonial</span>
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleAdd} className="bg-white rounded-4xl p-6 md:p-8 border-3 border-brand-orange shadow-card space-y-4">
          <h3 className="text-xl font-bubble text-brand-brown">Add Approved Feedback</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
                Parent Name *
              </label>
              <input
                required
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="e.g. Shalini Roy"
                className="w-full px-4 py-2 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-semibold outline-none focus:border-brand-orange"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
                Child Class / Details
              </label>
              <input
                value={childInfo}
                onChange={(e) => setChildInfo(e.target.value)}
                placeholder="e.g. Mother of Reyansh (Nursery)"
                className="w-full px-4 py-2 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-semibold outline-none focus:border-brand-orange"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
              Feedback Content *
            </label>
            <textarea
              required
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Parent's actual words regarding the school care and experience..."
              className="w-full px-4 py-2 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-semibold outline-none focus:border-brand-orange resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-brand-cream">
            <button
              type="button"
              onClick={() => setShowAdd(false)}
              className="px-4 py-1.5 text-xs font-bold text-stone-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-brand-orange text-white font-bubble text-xs font-bold shadow-playful-orange"
            >
              Approve & Publish
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-4xl p-6 md:p-8 border-2 border-brand-yellow shadow-card space-y-4">
        {testimonials.length === 0 ? (
          <div className="text-center py-10 text-stone-500 text-sm">
            <MessageSquare className="w-12 h-12 text-brand-orange mx-auto mb-2 opacity-50" />
            <p className="font-bold text-brand-brown">No parent testimonials published yet.</p>
            <p className="text-xs text-stone-400 mt-1">
              As per policy, we never invent fake reviews. Add verified feedback from parents above.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="p-4 rounded-3xl bg-brand-cream/60 border border-brand-orange/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="font-bubble text-base text-brand-brown font-bold">{t.parent_name}</div>
                  <div className="text-xs text-stone-500">{t.child_info}</div>
                  <p className="text-xs text-stone-700 mt-1 italic">"{t.content}"</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggle(t)}
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      t.is_published ? 'bg-green-100 text-brand-green' : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    {t.is_published ? 'Published' : 'Draft'}
                  </button>
                  <button onClick={() => handleDelete(t.id)} className="p-1.5 text-stone-400 hover:text-brand-red">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface FaqsModuleProps {
  faqs: FAQ[];
  onRefresh: () => void;
}

export const FaqsModule: React.FC<FaqsModuleProps> = ({ faqs, onRefresh }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('Admissions');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || !answer) return;

    await DataStore.addFAQ({
      category,
      question: question.trim(),
      answer: answer.trim(),
      display_order: faqs.length + 1,
      is_published: true,
    });

    setQuestion('');
    setAnswer('');
    setShowAdd(false);
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this FAQ?')) {
      await DataStore.deleteFAQ(id);
      onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bubble text-brand-brown">FAQs Management</h1>
          <p className="text-stone-500 text-sm">
            Add and edit questions answered for prospective parents
          </p>
        </div>

        <button
          onClick={() => setShowAdd(!showAdd)}
          className="px-5 py-2.5 rounded-full bg-brand-orange hover:bg-brand-deepOrange text-white font-bubble text-sm font-bold shadow-playful-orange flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add FAQ</span>
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleAdd} className="bg-white rounded-4xl p-6 md:p-8 border-3 border-brand-orange shadow-card space-y-4">
          <h3 className="text-xl font-bubble text-brand-brown">Add New Question</h3>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-bold text-stone-700 outline-none"
            >
              <option value="Admissions">Admissions</option>
              <option value="Academics & Care">Academics & Care</option>
              <option value="Safety & Hygiene">Safety & Hygiene</option>
              <option value="Timings">Timings</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
              Question *
            </label>
            <input
              required
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. What is the pupil-teacher ratio in Playgroup?"
              className="w-full px-4 py-2 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-semibold outline-none focus:border-brand-orange"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
              Answer *
            </label>
            <textarea
              required
              rows={3}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Clear, informative answer for parents..."
              className="w-full px-4 py-2 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-semibold outline-none focus:border-brand-orange resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-brand-cream">
            <button
              type="button"
              onClick={() => setShowAdd(false)}
              className="px-4 py-1.5 text-xs font-bold text-stone-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-brand-orange text-white font-bubble text-xs font-bold shadow-playful-orange"
            >
              Save Question
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-4xl p-6 md:p-8 border-2 border-brand-yellow shadow-card space-y-3">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="p-4 rounded-3xl bg-brand-cream/60 border border-brand-orange/20 flex flex-col sm:flex-row sm:items-start justify-between gap-3"
          >
            <div>
              <span className="text-[10px] font-bold uppercase text-brand-deepOrange bg-brand-cream px-2 py-0.5 rounded-full border border-brand-orange/20">
                {faq.category}
              </span>
              <h4 className="font-bubble text-base text-brand-brown font-bold mt-1">{faq.question}</h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">{faq.answer}</p>
            </div>
            <button
              onClick={() => handleDelete(faq.id)}
              className="p-1.5 text-stone-400 hover:text-brand-red flex-shrink-0"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
