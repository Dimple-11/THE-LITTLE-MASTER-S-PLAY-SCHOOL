import React, { useState } from 'react';
import { Calendar, Plus, Trash2, Edit2, Clock, MapPin, Eye, EyeOff } from 'lucide-react';
import { SchoolEvent, Announcement } from '@/types';
import { DataStore } from '@/services/store';

interface EventsModuleProps {
  events: SchoolEvent[];
  onRefresh: () => void;
}

export const EventsModule: React.FC<EventsModuleProps> = ({ events, onRefresh }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [startTime, setStartTime] = useState('09:30 AM');
  const [endTime, setEndTime] = useState('12:30 PM');
  const [location, setLocation] = useState('School Campus');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDetails, setFullDetails] = useState('');

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !eventDate || !shortDesc) return;

    await DataStore.addEvent({
      title: title.trim(),
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      event_date: eventDate,
      start_time: startTime,
      end_time: endTime,
      location: location.trim(),
      short_description: shortDesc.trim(),
      full_details: fullDetails.trim() || undefined,
      is_published: true,
      is_featured: false,
    });

    setTitle('');
    setEventDate('');
    setShortDesc('');
    setFullDetails('');
    setShowAddForm(false);
    onRefresh();
  };

  const handleTogglePublish = async (evt: SchoolEvent) => {
    await DataStore.updateEvent(evt.id, { is_published: !evt.is_published });
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this event?')) {
      await DataStore.deleteEvent(id);
      onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bubble text-brand-brown">Events & Celebrations</h1>
          <p className="text-stone-500 text-sm">
            Publish upcoming functions, sports days, and carnival notices
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-5 py-2.5 rounded-full bg-brand-orange hover:bg-brand-deepOrange text-white font-bubble text-sm font-bold shadow-playful-orange flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Event</span>
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddEvent} className="bg-white rounded-4xl p-6 md:p-8 border-3 border-brand-orange shadow-card space-y-4">
          <h3 className="text-xl font-bubble text-brand-brown">Create School Event</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
                Event Title *
              </label>
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Colors & Rhymes Day"
                className="w-full px-4 py-2 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-semibold outline-none focus:border-brand-orange"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
                Event Date *
              </label>
              <input
                type="date"
                required
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-4 py-2 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-bold text-stone-700 outline-none focus:border-brand-orange"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
                Timing (Start - End)
              </label>
              <div className="flex gap-2">
                <input
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  placeholder="09:30 AM"
                  className="w-1/2 px-3 py-2 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-semibold outline-none"
                />
                <input
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  placeholder="12:30 PM"
                  className="w-1/2 px-3 py-2 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-semibold outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
                Location
              </label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="School Campus / Playground"
                className="w-full px-4 py-2 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-semibold outline-none focus:border-brand-orange"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
              Short Description *
            </label>
            <input
              required
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              placeholder="e.g. A day of cheerful obstacle races and ribbon games."
              className="w-full px-4 py-2 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-semibold outline-none focus:border-brand-orange"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
              Full Program Details (Optional)
            </label>
            <textarea
              rows={2}
              value={fullDetails}
              onChange={(e) => setFullDetails(e.target.value)}
              placeholder="Detailed guidelines, dress code, parent invitation schedule..."
              className="w-full px-4 py-2 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-semibold outline-none focus:border-brand-orange resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-brand-cream">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-1.5 text-xs font-bold text-stone-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-brand-orange text-white font-bubble text-xs font-bold shadow-playful-orange"
            >
              Save Event
            </button>
          </div>
        </form>
      )}

      {/* Events List */}
      <div className="bg-white rounded-4xl p-6 md:p-8 border-2 border-brand-yellow shadow-card space-y-4">
        {events.length === 0 ? (
          <div className="text-center py-8 text-stone-500 text-sm">No events listed yet.</div>
        ) : (
          <div className="space-y-3">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="p-4 rounded-3xl bg-brand-cream/60 border border-brand-orange/20 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-brand-deepOrange">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{evt.event_date}</span>
                    <span>•</span>
                    <Clock className="w-3.5 h-3.5" />
                    <span>{evt.start_time}</span>
                  </div>
                  <h4 className="font-bubble text-lg text-brand-brown font-bold mt-1">{evt.title}</h4>
                  <p className="text-stone-600 text-xs">{evt.short_description}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleTogglePublish(evt)}
                    className={`flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full ${
                      evt.is_published ? 'bg-green-100 text-brand-green' : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    {evt.is_published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span>{evt.is_published ? 'Live' : 'Hidden'}</span>
                  </button>

                  <button
                    onClick={() => handleDelete(evt.id)}
                    className="p-2 text-stone-400 hover:text-brand-red rounded-xl hover:bg-red-50"
                  >
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

interface AnnouncementsModuleProps {
  announcements: Announcement[];
  onRefresh: () => void;
}

export const AnnouncementsModule: React.FC<AnnouncementsModuleProps> = ({ announcements, onRefresh }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General Notice');
  const [priority, setPriority] = useState<'low' | 'normal' | 'high' | 'urgent'>('normal');
  const [content, setContent] = useState('');
  const [isPinned, setIsPinned] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    await DataStore.addAnnouncement({
      title: title.trim(),
      category,
      priority,
      content: content.trim(),
      is_pinned: isPinned,
      is_published: true,
      published_date: new Date().toISOString().split('T')[0],
    });

    setTitle('');
    setContent('');
    setShowAddForm(false);
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this announcement?')) {
      await DataStore.deleteAnnouncement(id);
      onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bubble text-brand-brown">School Notices & Announcements</h1>
          <p className="text-stone-500 text-sm">
            Post timely circulars, uniform announcements, and holiday notices
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-5 py-2.5 rounded-full bg-brand-orange hover:bg-brand-deepOrange text-white font-bubble text-sm font-bold shadow-playful-orange flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Notice</span>
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAdd} className="bg-white rounded-4xl p-6 md:p-8 border-3 border-brand-orange shadow-card space-y-4">
          <h3 className="text-xl font-bubble text-brand-brown">Publish Notice</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
                Notice Title *
              </label>
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Winter Break Schedule"
                className="w-full px-4 py-2 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-semibold outline-none focus:border-brand-orange"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-bold text-stone-700 outline-none cursor-pointer"
              >
                <option value="General Notice">General Notice</option>
                <option value="Admissions">Admissions</option>
                <option value="Celebrations">Celebrations</option>
                <option value="Holiday Notice">Holiday Notice</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
              Notice Content *
            </label>
            <textarea
              required
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter full notice text for parents..."
              className="w-full px-4 py-2 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-semibold outline-none focus:border-brand-orange resize-none"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-xs font-bold text-stone-700 cursor-pointer">
              <input
                type="checkbox"
                checked={isPinned}
                onChange={(e) => setIsPinned(e.target.checked)}
                className="w-4 h-4 rounded text-brand-orange"
              />
              <span>Pin this notice to homepage banner</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-brand-cream">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-1.5 text-xs font-bold text-stone-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-brand-orange text-white font-bubble text-xs font-bold shadow-playful-orange"
            >
              Publish Notice
            </button>
          </div>
        </form>
      )}

      {/* Announcements List */}
      <div className="bg-white rounded-4xl p-6 md:p-8 border-2 border-brand-yellow shadow-card space-y-3">
        {announcements.map((ann) => (
          <div
            key={ann.id}
            className="p-4 rounded-3xl bg-brand-cream/60 border border-brand-orange/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bubble text-base text-brand-brown font-bold">{ann.title}</span>
                {ann.is_pinned && (
                  <span className="px-2 py-0.5 rounded-full bg-brand-yellow text-brand-deepOrange text-[10px] font-bold">
                    📌 Pinned
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-600 mt-1">{ann.content}</p>
            </div>

            <button
              onClick={() => handleDelete(ann.id)}
              className="text-stone-400 hover:text-brand-red p-1.5 self-end sm:self-center"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
