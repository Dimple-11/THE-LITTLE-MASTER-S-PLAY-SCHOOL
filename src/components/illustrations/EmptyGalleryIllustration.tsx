import React from 'react';
import { Camera, Sparkles, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EmptyGalleryIllustration: React.FC<{
  onAddClick?: () => void;
  showAdminPrompt?: boolean;
}> = ({ onAddClick, showAdminPrompt = true }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm border-2 border-dashed border-brand-orange/40 rounded-4xl p-8 md:p-12 text-center max-w-2xl mx-auto shadow-card">
      <div className="relative w-28 h-28 mx-auto mb-6 flex items-center justify-center">
        {/* Soft pulsing circle */}
        <div className="absolute inset-0 bg-brand-yellow/30 rounded-full animate-ping opacity-60" />
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-brand-yellow to-brand-orange flex items-center justify-center shadow-playful-orange">
          <Camera className="w-12 h-12 text-white stroke-[2.2]" />
        </div>
        <Sparkles className="absolute -top-1 -right-1 w-7 h-7 text-brand-yellow animate-bounce-gentle" />
      </div>

      <h3 className="text-2xl md:text-3xl font-bubble text-brand-brown mb-3">
        Real Campus Moments Are Being Captured!
      </h3>
      <p className="text-stone-600 max-w-lg mx-auto leading-relaxed mb-6 font-medium">
        Our little masters are busy painting, singing, discovering, and smiling! Verified photographs of classroom adventures, celebrations, and campus joy will be published here through our admin portal.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cream border border-brand-orange/30 text-brand-brown text-sm font-semibold">
          <ImageIcon className="w-4 h-4 text-brand-orange" />
          <span>Real School Photos Only — Zero Stock Photos</span>
        </div>

        {showAdminPrompt && (
          <Link
            to="/admin/gallery"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-orange hover:bg-brand-deepOrange text-white text-sm font-bold shadow-playful-orange transition-all hover:scale-105 active:scale-95"
          >
            <span>School Admin? Upload Real Photos</span>
          </Link>
        )}
      </div>
    </div>
  );
};
