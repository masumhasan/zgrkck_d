import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { InlineError } from './StatusViews';
import { authApi } from '../../api/auth.api';
import { errorMessage } from '../../hooks/useAsync';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  initialEmail?: string;
  onClose: () => void;
}

type Step = 'email' | 'reset' | 'done';

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  initialEmail = '',
  onClose,
}) => {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const close = () => {
    setStep('email');
    setOtp('');
    setNewPassword('');
    setError(null);
    onClose();
  };

  const run = async (action: () => Promise<void>) => {
    setBusy(true);
    setError(null);
    try {
      await action();
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const sendCode = (e: React.FormEvent) => {
    e.preventDefault();
    void run(async () => {
      await authApi.requestPasswordReset(email);
      setStep('reset');
    });
  };

  const resetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    void run(async () => {
      await authApi.resetPassword(email, otp, newPassword);
      setStep('done');
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={close} title="Reset Password" maxWidth="sm">
      {step === 'email' && (
        <form onSubmit={sendCode} className="space-y-4">
          <p className="text-xs text-slate-600">
            Enter your admin email address and we&apos;ll send you a 6-digit verification code.
          </p>
          <Input label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <InlineError message={error} />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" size="sm" type="button" onClick={close}>Cancel</Button>
            <Button variant="primary" size="sm" type="submit" disabled={busy}>
              {busy ? 'Sending…' : 'Send Code'}
            </Button>
          </div>
        </form>
      )}

      {step === 'reset' && (
        <form onSubmit={resetPassword} className="space-y-4">
          <p className="text-xs text-slate-600">
            If an account exists for <span className="font-semibold">{email}</span>, a code is on its way. It expires in 10 minutes.
          </p>
          <Input
            label="Verification Code"
            inputMode="numeric"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            required
          />
          <Input
            label="New Password"
            type="password"
            minLength={8}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <InlineError message={error} />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" size="sm" type="button" onClick={() => setStep('email')}>Back</Button>
            <Button variant="primary" size="sm" type="submit" disabled={busy || otp.length !== 6}>
              {busy ? 'Updating…' : 'Update Password'}
            </Button>
          </div>
        </form>
      )}

      {step === 'done' && (
        <div className="space-y-4">
          <div className="p-4 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-medium">
            Password updated. You can now sign in with your new password.
          </div>
          <div className="flex justify-end">
            <Button variant="primary" size="sm" onClick={close}>Back to Sign In</Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
