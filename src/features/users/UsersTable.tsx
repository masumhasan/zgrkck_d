import React from 'react';
import type { User } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { UserAvatar } from '../../components/shared/UserAvatar';

export interface UsersTableProps {
  users: User[];
  onSelectUser: (userId: string) => void;
  onBlockUser: (user: User) => void;
}

export const UsersTable: React.FC<UsersTableProps> = ({
  users,
  onSelectUser,
  onBlockUser,
}) => {
  return (
    <div className="bg-white rounded-xl border border-[#E5E1D8] shadow-sm overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-[#ECE7DE] bg-white text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
            <th className="py-3.5 px-6 font-semibold" scope="col">
              User
            </th>
            <th className="py-3.5 px-6 font-semibold" scope="col">
              Email
            </th>
            <th className="py-3.5 px-6 font-semibold" scope="col">
              Plan
            </th>
            <th className="py-3.5 px-6 font-semibold" scope="col">
              Status
            </th>
            <th className="py-3.5 px-6 font-semibold" scope="col">
              Joined
            </th>
            <th className="py-3.5 px-6 font-semibold text-center" scope="col">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#ECE7DE] text-sm">
          {users.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="py-8 text-center text-xs text-slate-500"
              >
                No users match your criteria.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-[#FAF9F6] transition-colors"
              >
                <td className="py-3.5 px-6 whitespace-nowrap">
                  <div
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => onSelectUser(user.id)}
                  >
                    <UserAvatar
                      src={user.avatarUrl}
                      name={user.name}
                      initials={user.initials}
                      size="md"
                      shape="rounded"
                    />
                    <span className="font-editorial text-[15px] font-bold text-[#1F2937] group-hover:text-[#244E41] transition-colors">
                      {user.name}
                    </span>
                  </div>
                </td>
                <td className="py-3.5 px-6 whitespace-nowrap text-xs text-[#4B5563]">
                  {user.email}
                </td>
                <td className="py-3.5 px-6 whitespace-nowrap">
                  <Badge
                    variant={user.plan.toLowerCase() as 'free' | 'plus' | 'pro'}
                  >
                    {user.plan}
                  </Badge>
                </td>
                <td className="py-3.5 px-6 whitespace-nowrap">
                  <Badge
                    variant={
                      user.status.toLowerCase() as
                        | 'active'
                        | 'pending'
                        | 'inactive'
                        | 'suspended'
                    }
                  >
                    {user.status}
                  </Badge>
                </td>
                <td className="py-3.5 px-6 whitespace-nowrap text-xs text-[#4B5563]">
                  {user.joinedDate}
                </td>
                <td className="py-3.5 px-6 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center gap-2.5">
                    <button
                      onClick={() => onBlockUser(user)}
                      className="text-[#E02424] hover:opacity-80 transition-opacity p-1"
                      title={
                        user.status === 'Active' ? 'Block user' : 'Reactivate user'
                      }
                      type="button"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => onSelectUser(user.id)}
                      className="text-[#10B981] hover:opacity-80 transition-opacity p-1"
                      title="View profile"
                      type="button"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
