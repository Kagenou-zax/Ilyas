import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Trash2, ArrowUp, ArrowDown, Image as ImageIcon, Check, Copy, AlertCircle, RefreshCw } from 'lucide-react';
import { SwavyShot } from '../types';
import { resolveFittingLook, sanitizeShot } from '../utils/shotNamer';

interface ManageShotsModalProps {
  shots: SwavyShot[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedShots: SwavyShot[]) => void;
  onReset: () => void;
}

export const ManageShotsModal: React.FC<ManageShotsModalProps> = ({
  shots,
  isOpen,
  onClose,
  onSave,
  onReset,
}) => {
  const [currentShots, setCurrentShots] = useState<SwavyShot[]>(() =>
    shots.map((s, idx) => sanitizeShot(s, idx))
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedExport, setCopiedExport] = useState(false);
  const [showExportView, setShowExportView] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentShots(shots.map((s, idx) => sanitizeShot(s, idx)));
  }, [shots, isOpen]);

  if (!isOpen) return null;

  const handleFilesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsProcessing(true);

    const newShots: SwavyShot[] = [];
    const filesArray = Array.from(files);

    for (let i = 0; i < filesArray.length; i++) {
      const file = filesArray[i];
      try {
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        const serialNum = (currentShots.length + newShots.length + 1).toString().padStart(2, '0');
        const resolved = resolveFittingLook(file.name, undefined, undefined, serialNum);

        newShots.push({
          id: `custom-shot-${Date.now()}-${i}`,
          serial: serialNum,
          title: resolved.title,
          filename: file.name,
          image: dataUrl,
          caption: resolved.caption,
        });
      } catch (err) {
        console.error('Failed reading file:', file.name, err);
      }
    }

    const renumbered = [...currentShots, ...newShots].map((shot, idx) => ({
      ...shot,
      serial: (idx + 1).toString().padStart(2, '0'),
    }));

    setCurrentShots(renumbered);
    setIsProcessing(false);

    // Reset file input so user can re-select if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemove = (id: string) => {
    const filtered = currentShots.filter((s) => s.id !== id);
    const renumbered = filtered.map((shot, idx) => ({
      ...shot,
      serial: (idx + 1).toString().padStart(2, '0'),
    }));
    setCurrentShots(renumbered);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === currentShots.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const items = [...currentShots];
    const [moved] = items.splice(index, 1);
    items.splice(targetIndex, 0, moved);

    const renumbered = items.map((shot, idx) => ({
      ...shot,
      serial: (idx + 1).toString().padStart(2, '0'),
    }));

    setCurrentShots(renumbered);
  };

  const handleUpdateTitle = (id: string, title: string) => {
    setCurrentShots((prev) =>
      prev.map((s) => (s.id === id ? { ...s, title } : s))
    );
  };

  const handleUpdateCaption = (id: string, caption: string) => {
    setCurrentShots((prev) =>
      prev.map((s) => (s.id === id ? { ...s, caption } : s))
    );
  };

  const handleSaveAndApply = () => {
    onSave(currentShots);
    onClose();
  };

  const handleCopyExportJson = () => {
    const exportData = currentShots.map((s) => ({
      id: s.id,
      serial: s.serial,
      title: s.title,
      filename: s.filename,
      caption: s.caption,
    }));
    navigator.clipboard.writeText(JSON.stringify(exportData, null, 2));
    setCopiedExport(true);
    setTimeout(() => setCopiedExport(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#0f172a] border-2 border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#131d35]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#38bdf8] mb-1">
              <ImageIcon size={14} />
              <span>SWAVY_SHOTS CURATOR PORTAL</span>
            </div>
            <h3 className="font-condensed text-2xl sm:text-3xl font-black uppercase text-white leading-none">
              Input & Organize Your Raw Photographs
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto grow space-y-6">
          {/* Upload Area */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-white/20 hover:border-[#38bdf8] bg-white/5 hover:bg-white/10 rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 group"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFilesSelected}
              className="hidden"
            />
            <div className="w-14 h-14 rounded-2xl bg-[#2563eb]/20 text-[#38bdf8] border border-[#38bdf8]/30 flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform">
              <Upload size={24} />
            </div>
            <h4 className="font-bold text-base text-white mb-1">
              Click to browse or drop your photos here
            </h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Select your unedited raw camera photos (.jpg, .jpeg, .png, etc.). You can select multiple photos at once. No AI editing or resizing applied.
            </p>
            {isProcessing && (
              <div className="mt-3 inline-flex items-center gap-2 text-xs font-mono text-[#38bdf8]">
                <RefreshCw size={14} className="animate-spin" />
                <span>Processing raw images...</span>
              </div>
            )}
          </div>

          {/* Photos Count & Stats */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
            <span>
              Loaded Photographs: <strong className="text-white">{currentShots.length}</strong>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowExportView(!showExportView)}
                className="text-[#38bdf8] hover:underline cursor-pointer"
              >
                {showExportView ? 'Hide Export Config' : 'View Export Config'}
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={onReset}
                className="text-red-400 hover:underline cursor-pointer"
              >
                Reset to Default
              </button>
            </div>
          </div>

          {/* Export JSON Helper */}
          {showExportView && (
            <div className="bg-black/60 border border-white/15 rounded-2xl p-4 text-xs font-mono space-y-2">
              <div className="flex items-center justify-between text-slate-300">
                <span>Finalize Summary for Developer:</span>
                <button
                  type="button"
                  onClick={handleCopyExportJson}
                  className="bg-[#2563eb] text-white px-3 py-1 rounded-lg flex items-center gap-1.5 hover:bg-blue-600 cursor-pointer"
                >
                  {copiedExport ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copiedExport ? 'Copied!' : 'Copy Config'}</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-400">
                Once you are satisfied with the order and titles, you can copy this list and say "Finalize with these photos", and we will bake them directly into the codebase!
              </p>
            </div>
          )}

          {/* Current Photos List */}
          <div className="space-y-3">
            {currentShots.map((shot, index) => (
              <div
                key={shot.id}
                className="bg-[#151e33] border border-white/10 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all"
              >
                {/* Thumbnail */}
                <div className="relative w-20 h-24 sm:w-16 sm:h-20 rounded-xl overflow-hidden bg-black shrink-0 border border-white/10">
                  <img
                    src={shot.image}
                    alt={shot.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-1 left-1 bg-black/80 text-[10px] font-mono text-white px-1.5 py-0.5 rounded">
                    #{shot.serial}
                  </span>
                </div>

                {/* Edit Inputs */}
                <div className="grow space-y-2 w-full">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <input
                      type="text"
                      value={shot.title}
                      onChange={(e) => handleUpdateTitle(shot.id, e.target.value)}
                      placeholder="Look / outfit name (e.g. Magenta Silk Wrap & Pleated Gele)..."
                      className="bg-black/50 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#38bdf8] grow"
                    />
                  </div>
                  <input
                    type="text"
                    value={shot.caption}
                    onChange={(e) => handleUpdateCaption(shot.id, e.target.value)}
                    placeholder="Styling details (e.g. Draped silk satin, coral beads, velvet fila)..."
                    className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-slate-300 placeholder-slate-500 focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>

                {/* Action Buttons: Reorder & Remove */}
                <div className="flex sm:flex-col items-center gap-1 self-end sm:self-center shrink-0">
                  <button
                    type="button"
                    onClick={() => handleMove(index, 'up')}
                    disabled={index === 0}
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none text-white flex items-center justify-center transition-colors cursor-pointer"
                    title="Move Up"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(index, 'down')}
                    disabled={index === currentShots.length - 1}
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none text-white flex items-center justify-center transition-colors cursor-pointer"
                    title="Move Down"
                  >
                    <ArrowDown size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(shot.id)}
                    className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/30 text-red-400 flex items-center justify-center transition-colors cursor-pointer"
                    title="Delete photo"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}

            {currentShots.length === 0 && (
              <div className="text-center py-12 text-slate-500 font-mono text-xs">
                No photos loaded. Click the upload box above to add your raw pictures.
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-white/10 bg-[#131d35] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSaveAndApply}
            className="bg-[#25D366] hover:bg-[#20ba5a] text-black font-mono font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <Check size={16} className="stroke-[3]" />
            <span>Apply & View in Gallery ({currentShots.length} Photos)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
