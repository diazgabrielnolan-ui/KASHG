import React, { useState } from 'react';
import { X, GraduationCap, Award, School, Calendar, Wallet, Check } from 'lucide-react';
import { StudentProfile } from '../../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onUpdateProfile: (updated: Partial<StudentProfile>) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
}) => {
  const [name, setName] = useState(profile.name);
  const [course, setCourse] = useState(profile.course);
  const [yearAndSem, setYearAndSem] = useState(profile.yearAndSem);
  const [monthlyBaonCap, setMonthlyBaonCap] = useState(profile.monthlyBaonCap.toString());
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name: name.trim(),
      course: course.trim(),
      yearAndSem: yearAndSem.trim(),
      monthlyBaonCap: parseFloat(monthlyBaonCap) || 8000,
    });
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl p-5 w-full max-w-md max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl animate-in fade-in slide-in-from-bottom-8">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-[#09090b] text-lg">
            UE Student Profile
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-[#64748b]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Digital Student ID Badge Card */}
        <div className="bg-gradient-to-br from-[#ea580c] to-[#9a3412] text-white p-4 rounded-2xl shadow-lg relative overflow-hidden space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center font-black">
                UE
              </div>
              <div>
                <div className="text-[11px] font-bold tracking-wider uppercase text-orange-200">
                  UNIVERSITY OF THE EAST
                </div>
                <div className="text-[11px] text-orange-100">Manila Campus</div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold">
              VALID STUDENT
            </span>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md shrink-0"
            />
            <div>
              <div className="text-xl font-extrabold">{profile.name}</div>
              <div className="text-xs text-orange-100">{profile.course}</div>
              <div className="text-[11px] text-orange-200 font-medium mt-0.5">
                ID: {profile.studentId} • {profile.yearAndSem}
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSave} className="space-y-3.5 pt-1">
          <div>
            <label className="block text-xs font-bold text-[#334155] mb-1">
              Student Nickname / Preferred Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] text-sm font-bold text-[#09090b] focus:outline-none focus:border-[#ea580c]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#334155] mb-1">
                College Degree / Course
              </label>
              <input
                type="text"
                required
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e2e8f0] text-xs font-medium text-[#09090b] focus:outline-none focus:border-[#ea580c]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#334155] mb-1">
                Year & Semester
              </label>
              <input
                type="text"
                required
                value={yearAndSem}
                onChange={(e) => setYearAndSem(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e2e8f0] text-xs font-medium text-[#09090b] focus:outline-none focus:border-[#ea580c]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#334155] mb-1">
              Monthly Baon Budget Cap (₱)
            </label>
            <input
              type="number"
              required
              value={monthlyBaonCap}
              onChange={(e) => setMonthlyBaonCap(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] text-sm font-bold text-[#09090b] focus:outline-none focus:border-[#ea580c]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#09090b] text-white font-bold text-sm shadow-md hover:bg-[#18181b] flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4 text-[#22c55e]" /> Saved!
              </>
            ) : (
              'Save Profile Changes'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
