import React, { useState } from 'react';
import { Search, Filter, Trash2, CheckCircle, Clock, Phone, Mail, User, Calendar, MessageSquare, AlertCircle } from 'lucide-react';
import { AdmissionEnquiry, AdmissionStatus } from '@/types';
import { DataStore } from '@/services/store';

interface AdmissionsModuleProps {
  enquiries: AdmissionEnquiry[];
  onRefresh: () => void;
}

export const AdmissionsModule: React.FC<AdmissionsModuleProps> = ({ enquiries, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<AdmissionEnquiry | null>(null);
  const [notesDraft, setNotesDraft] = useState('');

  const filtered = enquiries.filter((item) => {
    const matchesSearch =
      item.parent_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm) ||
      item.reference_id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = classFilter === 'all' || item.interested_class === classFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesClass && matchesStatus;
  });

  const handleStatusChange = async (id: string, newStatus: AdmissionStatus) => {
    await DataStore.updateAdmissionEnquiry(id, { status: newStatus });
    onRefresh();
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    await DataStore.updateAdmissionEnquiry(selectedEnquiry.id, { internal_notes: notesDraft });
    onRefresh();
    setSelectedEnquiry({ ...selectedEnquiry, internal_notes: notesDraft });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this enquiry? This action cannot be undone.')) {
      await DataStore.deleteAdmissionEnquiry(id);
      setSelectedEnquiry(null);
      onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bubble text-brand-brown">Admission Enquiries</h1>
          <p className="text-stone-500 text-sm">
            View, track, and update prospective student applications
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-3xl p-4 border-2 border-brand-yellow/60 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search parent, phone, ref ID..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-semibold outline-none focus:border-brand-orange"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="px-3 py-2 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-bold text-stone-700 outline-none cursor-pointer"
          >
            <option value="all">All Classes</option>
            <option value="Playgroup">Playgroup</option>
            <option value="Nursery">Nursery</option>
            <option value="LKG">LKG</option>
            <option value="UKG">UKG</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-bold text-stone-700 outline-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="scheduled_visit">Scheduled Visit</option>
            <option value="enrolled">Enrolled</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Enquiries Table / List */}
      <div className="bg-white rounded-4xl border-2 border-brand-yellow overflow-hidden shadow-card">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-stone-500 text-sm">
            No matching enquiries found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-cream border-b border-brand-orange/20 text-xs font-bold uppercase tracking-wider text-brand-brown">
                  <th className="py-3.5 px-4">Ref ID</th>
                  <th className="py-3.5 px-4">Parent Name</th>
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Class</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-cream text-xs font-medium text-stone-700">
                {filtered.map((enq) => (
                  <tr key={enq.id} className="hover:bg-brand-yellow/10 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-brand-deepOrange">
                      {enq.reference_id}
                    </td>
                    <td className="py-3 px-4 font-bold text-brand-brown">
                      {enq.parent_name}
                      {enq.child_name && (
                        <span className="block text-[11px] text-stone-400 font-normal">
                          Child: {enq.child_name}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div>{enq.phone}</div>
                      {enq.email && <div className="text-[11px] text-stone-500">{enq.email}</div>}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-brand-cream border border-brand-orange/30 font-bold text-brand-deepOrange">
                        {enq.interested_class}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={enq.status}
                        onChange={(e) => handleStatusChange(enq.id, e.target.value as AdmissionStatus)}
                        className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase cursor-pointer border ${
                          enq.status === 'new'
                            ? 'bg-red-50 text-brand-red border-red-200'
                            : enq.status === 'contacted'
                            ? 'bg-blue-50 text-brand-blue border-blue-200'
                            : enq.status === 'enrolled'
                            ? 'bg-green-50 text-brand-green border-green-200'
                            : 'bg-stone-50 text-stone-600 border-stone-200'
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="scheduled_visit">Scheduled Visit</option>
                        <option value="enrolled">Enrolled</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setSelectedEnquiry(enq);
                          setNotesDraft(enq.internal_notes || '');
                        }}
                        className="px-3 py-1 rounded-xl bg-brand-cream hover:bg-brand-yellow/40 border border-brand-orange/30 font-bold text-brand-brown"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleDelete(enq.id)}
                        className="p-1.5 rounded-xl text-stone-400 hover:text-brand-red hover:bg-red-50 transition-colors"
                        title="Delete Enquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-4xl max-w-lg w-full p-6 md:p-8 border-4 border-brand-yellow shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-brand-cream pb-3">
              <div>
                <span className="text-xs font-bold text-brand-deepOrange uppercase">
                  Ref: {selectedEnquiry.reference_id}
                </span>
                <h3 className="text-2xl font-bubble text-brand-brown">
                  {selectedEnquiry.parent_name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="w-8 h-8 rounded-full bg-brand-cream text-stone-500 hover:bg-brand-orange hover:text-white flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-brand-cream/60 p-4 rounded-2xl">
              <div>
                <span className="text-stone-400 block font-bold">Phone Number:</span>
                <span className="text-sm font-bold text-brand-brown">{selectedEnquiry.phone}</span>
              </div>
              <div>
                <span className="text-stone-400 block font-bold">Email:</span>
                <span className="text-sm font-semibold text-brand-brown">
                  {selectedEnquiry.email || 'None'}
                </span>
              </div>
              <div>
                <span className="text-stone-400 block font-bold">Child Name:</span>
                <span className="text-sm font-semibold text-brand-brown">
                  {selectedEnquiry.child_name || 'Not specified'}
                </span>
              </div>
              <div>
                <span className="text-stone-400 block font-bold">Age Group:</span>
                <span className="text-sm font-semibold text-brand-brown">
                  {selectedEnquiry.child_age_group}
                </span>
              </div>
            </div>

            {selectedEnquiry.message && (
              <div>
                <label className="text-xs font-bold uppercase text-stone-400 block mb-1">
                  Parent's Note:
                </label>
                <div className="p-3 rounded-2xl bg-brand-cream text-xs text-stone-700 leading-relaxed font-medium">
                  {selectedEnquiry.message}
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-bold uppercase text-brand-brown block mb-1">
                Internal Administrative Notes:
              </label>
              <textarea
                rows={3}
                value={notesDraft}
                onChange={(e) => setNotesDraft(e.target.value)}
                placeholder="Add notes e.g., Called on Monday, scheduled campus tour for Saturday..."
                className="w-full p-3 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-medium outline-none focus:border-brand-orange resize-none"
              />
              <button
                onClick={handleSaveNotes}
                className="mt-2 px-4 py-1.5 rounded-full bg-brand-orange text-white text-xs font-bold shadow-playful-orange hover:bg-brand-deepOrange transition-all"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
