import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AppLayout } from '../components/layout/AppLayout';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { InlineError } from '../components/shared/StatusViews';
import { NutritionRefreshCard } from '../features/nutrition/NutritionRefreshCard';
import { authApi } from '../api/auth.api';
import { errorMessage } from '../hooks/useAsync';

export const SettingsPage: React.FC = () => {
  const { admin, setAdmin } = useApp();

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const [name, setName] = useState(admin?.name ?? '');
  const [email, setEmail] = useState(admin?.email ?? '');
  const [profileError, setProfileError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setProfileError(null);
    try {
      setAdmin(await authApi.updateProfile(name.trim(), email.trim()));
      setIsEditProfileOpen(false);
    } catch (err) {
      setProfileError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const openEditProfile = () => {
    setName(admin?.name ?? '');
    setEmail(admin?.email ?? '');
    setProfileError(null);
    setIsEditProfileOpen(true);
  };

  const closePasswordModal = () => {
    setIsChangePasswordOpen(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError(null);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    setBusy(true);
    try {
      await authApi.changePassword(currentPassword, newPassword);
      setPasswordSuccess(true);
      // Sessions stay valid after a password change; just confirm and close.
      setTimeout(() => {
        setPasswordSuccess(false);
        closePasswordModal();
      }, 1200);
    } catch (err) {
      setPasswordError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <AppLayout title="Settings" subtitle="Manage your admin preferences.">
      <div className="p-6 md:p-12 max-w-5xl mx-auto space-y-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-editorial tracking-tight text-stone-900 font-bold mb-1">
            Settings
          </h2>
          <p className="text-stone-500 text-sm">
            Manage your admin preferences.
          </p>
        </div>

        <div className="space-y-6">
          {/* Admin Profile Card */}
          <section className="bg-white rounded-xl border border-stone-200/90 p-6 shadow-xs">
            <h3 className="text-base font-editorial font-semibold text-stone-900 mb-4 pb-3 border-b border-stone-100">
              Admin Profile
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
              <div className="flex items-center gap-4">
                <img
                  src={admin?.avatarUrl}
                  alt={admin?.name}
                  className="w-14 h-14 rounded-xl object-cover border border-stone-200"
                />
                <div>
                  <h4 className="text-lg font-editorial font-semibold text-stone-900">
                    {admin?.name}
                  </h4>
                  <p className="text-xs text-stone-500 mb-1.5 font-sans">
                    {admin?.email}
                  </p>
                  <span className="inline-block bg-[#DCE7E1] text-[#244B36] text-[10px] font-semibold px-2 py-0.5 rounded">
                    {admin?.role}
                  </span>
                </div>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={openEditProfile}
              >
                Edit Profile
              </Button>
            </div>
          </section>

          <NutritionRefreshCard />

          {/* Security Card */}
          <section className="bg-white rounded-xl border border-stone-200/90 p-6 shadow-xs">
            <div className="mb-4 pb-3 border-b border-stone-100">
              <h3 className="text-base font-editorial font-semibold text-stone-900">
                Security
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Manage your authentication and password settings.
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-stone-800">
                  Change Password
                </p>
                <p className="text-xs text-stone-500 mt-0.5">
                  Update your account password. We recommend changing it
                  periodically.
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsChangePasswordOpen(true)}
              >
                Change Password
              </Button>
            </div>
          </section>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        title="Edit Profile"
      >
        <form onSubmit={handleProfileSave} className="space-y-4">
          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InlineError message={profileError} />
          <div className="flex justify-end gap-3 pt-3">
            <Button
              variant="secondary"
              size="sm"
              type="button"
              onClick={() => setIsEditProfileOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" disabled={busy}>
              {busy ? "Saving…" : "Save"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Change Password Modal */}
      <Modal
        isOpen={isChangePasswordOpen}
        onClose={closePasswordModal}
        title="Change Password"
      >
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          {passwordSuccess ? (
            <div className="p-4 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-medium">
              Password updated successfully!
            </div>
          ) : (
            <>
              <Input
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <Input
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <Input
                label="Confirm New Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <InlineError message={passwordError} />
              <div className="flex justify-end gap-3 pt-3">
                <Button
                  variant="secondary"
                  size="sm"
                  type="button"
                  onClick={closePasswordModal}
                >
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" disabled={busy}>
                  {busy ? "Updating…" : "Update Password"}
                </Button>
              </div>
            </>
          )}
        </form>
      </Modal>
    </AppLayout>
  );
};
