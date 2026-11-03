import React, { useState } from 'react';
import { Upload, Plus, Trash2, Eye, EyeOff, Image as ImageIcon, Sparkles, Check } from 'lucide-react';
import { GalleryItem, GalleryCategory } from '@/types';
import { DataStore } from '@/services/store';

interface GalleryModuleProps {
  items: GalleryItem[];
  categories: GalleryCategory[];
  onRefresh: () => void;
}

export const GalleryModule: React.FC<GalleryModuleProps> = ({ items, categories, onRefresh }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [altText, setAltText] = useState('');
  const [categorySlug, setCategorySlug] = useState('classrooms');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // File to base64 handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target?.result as string);
      if (!altText) setAltText(file.name.replace(/\.[^/.]+$/, ''));
      if (!title) setTitle(file.name.replace(/\.[^/.]+$/, ''));
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePreview || !title) return;

    setIsUploading(true);
    try {
      await DataStore.addGalleryItem({
        category_slug: categorySlug,
        title: title.trim(),
        caption: caption.trim() || undefined,
        alt_text: altText.trim() || title.trim(),
        image_url: imagePreview,
        is_published: true,
        display_order: items.length + 1,
      });

      // Reset
      setTitle('');
      setCaption('');
      setAltText('');
      setImagePreview(null);
      setShowAddForm(false);
      onRefresh();
    } finally {
      setIsUploading(false);
    }
  };

  const handleTogglePublish = async (item: GalleryItem) => {
    await DataStore.updateGalleryItem(item.id, { is_published: !item.is_published });
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this photograph from the school gallery?')) {
      await DataStore.deleteGalleryItem(id);
      onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bubble text-brand-brown">Media & Photo Gallery</h1>
          <p className="text-stone-500 text-sm">
            Upload and manage verified real school photographs
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-5 py-2.5 rounded-full bg-brand-orange hover:bg-brand-deepOrange text-white font-bubble text-sm font-bold shadow-playful-orange hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Upload New Photograph</span>
        </button>
      </div>

      {/* Upload Drawer / Modal */}
      {showAddForm && (
        <form
          onSubmit={handleUpload}
          className="bg-white rounded-4xl p-6 md:p-8 border-3 border-brand-orange shadow-card space-y-4"
        >
          <h3 className="text-xl font-bubble text-brand-brown">Add Photo to Gallery</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Image Picker */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-2">
                Select Photo File (JPG, PNG, WebP) *
              </label>
              <div className="border-2 border-dashed border-brand-orange/40 rounded-3xl p-6 text-center bg-brand-cream/40 hover:bg-brand-cream transition-colors relative">
                {imagePreview ? (
                  <div className="space-y-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-48 mx-auto rounded-2xl object-contain shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="text-xs text-brand-red font-bold underline"
                    >
                      Choose Different Photo
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-10 h-10 text-brand-orange mx-auto mb-2" />
                    <p className="text-xs font-bold text-stone-700">Click to choose image file</p>
                    <p className="text-[11px] text-stone-400 mt-1">Recommended size: under 5MB</p>
                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Metadata Fields */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
                  Photo Title *
                </label>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Children Painting Rainbows"
                  className="w-full px-4 py-2 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-semibold outline-none focus:border-brand-orange"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
                  Category *
                </label>
                <select
                  value={categorySlug}
                  onChange={(e) => setCategorySlug(e.target.value)}
                  className="w-full px-4 py-2 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-bold text-stone-700 outline-none cursor-pointer"
                >
                  <option value="classrooms">Classrooms & Spaces</option>
                  <option value="activities">Creative Activities</option>
                  <option value="celebrations">Celebrations & Festivals</option>
                  <option value="sports">Sports & Play</option>
                  <option value="school-moments">School Moments</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
                  Short Caption (Optional)
                </label>
                <input
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="e.g. Nursery morning sensory art circle"
                  className="w-full px-4 py-2 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-semibold outline-none focus:border-brand-orange"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
                  Alt Text (For accessibility)
                </label>
                <input
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder="e.g. Preschoolers sharing crayons around art table"
                  className="w-full px-4 py-2 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-semibold outline-none focus:border-brand-orange"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-brand-cream">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-5 py-2 rounded-full text-xs font-bold text-stone-500 hover:text-brand-brown"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading || !imagePreview}
              className="px-6 py-2.5 rounded-full bg-brand-orange text-white font-bubble text-xs font-bold shadow-playful-orange hover:bg-brand-deepOrange disabled:opacity-50"
            >
              {isUploading ? 'Uploading...' : 'Save & Publish Photo'}
            </button>
          </div>
        </form>
      )}

      {/* Gallery Items Grid */}
      <div className="bg-white rounded-4xl p-6 md:p-8 border-2 border-brand-yellow shadow-card">
        <h3 className="font-bubble text-xl text-brand-brown mb-4">
          All Gallery Photographs ({items.length})
        </h3>

        {items.length === 0 ? (
          <div className="text-center py-12 text-stone-500 text-sm border-2 border-dashed border-brand-orange/30 rounded-3xl p-8">
            <ImageIcon className="w-12 h-12 text-brand-orange mx-auto mb-2 opacity-60" />
            <p className="font-bold text-brand-brown">No school photographs uploaded yet.</p>
            <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
              Click "Upload New Photograph" above to add real pictures of students, celebrations, and classrooms.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-brand-cream rounded-3xl overflow-hidden border border-brand-orange/20 shadow-sm flex flex-col justify-between"
              >
                <div className="aspect-square bg-white relative overflow-hidden">
                  <img src={item.image_url} alt={item.alt_text} className="w-full h-full object-cover" />
                  {!item.is_published && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-stone-800/80 text-white text-[10px] font-bold">
                      Unpublished
                    </span>
                  )}
                </div>

                <div className="p-3">
                  <h4 className="font-bubble text-sm font-bold text-brand-brown truncate">{item.title}</h4>
                  <span className="text-[10px] uppercase font-bold text-brand-deepOrange block">
                    {item.category_slug}
                  </span>

                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-brand-yellow/30 text-xs">
                    <button
                      onClick={() => handleTogglePublish(item)}
                      className={`flex items-center gap-1 font-bold ${
                        item.is_published ? 'text-brand-green' : 'text-stone-400'
                      }`}
                      title={item.is_published ? 'Unpublish from website' : 'Publish to website'}
                    >
                      {item.is_published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      <span>{item.is_published ? 'Live' : 'Hidden'}</span>
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-stone-400 hover:text-brand-red p-1"
                      title="Delete photograph"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
