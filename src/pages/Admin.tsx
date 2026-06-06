import { useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";
import {
  ArrowLeft,
  Users,
  CalendarDays,
  MessageSquare,
  Mail,
  Loader2,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

export default function Admin() {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate("/");
    }
  }, [authLoading, isAdmin, navigate]);

  const { data: stats } = trpc.admin.stats.useQuery(undefined, {
    enabled: isAdmin,
  });

  const { data: recentBookings, isLoading: bookingsLoading } = trpc.admin.recentBookings.useQuery(
    { limit: 10 },
    { enabled: isAdmin }
  );

  const { data: recentMessages, isLoading: messagesLoading } = trpc.admin.recentMessages.useQuery(
    { limit: 10 },
    { enabled: isAdmin }
  );

  const utils = trpc.useUtils();

  const updateStatus = trpc.booking.updateStatus.useMutation({
    onSuccess: () => {
      utils.admin.stats.invalidate();
      utils.admin.recentBookings.invalidate();
    },
  });

  const deleteMessage = trpc.message.delete.useMutation({
    onSuccess: () => {
      utils.admin.stats.invalidate();
      utils.admin.recentMessages.invalidate();
    },
  });

  const deleteBooking = trpc.booking.delete.useMutation({
    onSuccess: () => {
      utils.admin.stats.invalidate();
      utils.admin.recentBookings.invalidate();
    },
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-[#C7A878]" />
      </div>
    );
  }

  if (!isAdmin) return null;

  const statCards = [
    {
      label: "Total Bookings",
      value: stats?.totalBookings ?? 0,
      icon: CalendarDays,
      color: "#C7A878",
    },
    {
      label: "Pending",
      value: stats?.pendingBookings ?? 0,
      icon: Clock,
      color: "#E6A817",
    },
    {
      label: "Messages",
      value: stats?.totalMessages ?? 0,
      icon: MessageSquare,
      color: "#8A8A8A",
    },
    {
      label: "Total Users",
      value: stats?.totalUsers ?? 0,
      icon: Users,
      color: "#C7A878",
    },
    {
      label: "Contacts",
      value: stats?.totalContacts ?? 0,
      icon: Mail,
      color: "#8A8A8A",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="section-padding py-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-[#8A8A8A] hover:text-[#C7A878] transition-colors text-sm mb-4"
              >
                <ArrowLeft size={16} />
                Back to Home
              </Link>
              <h1 className="font-display text-display-sm uppercase text-[#F6F2EB]">
                Admin Dashboard
              </h1>
              <p className="text-body-sm text-[#8A8A8A] mt-1">
                Welcome, {user?.name}
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            {statCards.map((card, i) => (
              <div
                key={i}
                className="border border-[#1A1A1A] rounded-lg p-6 text-center"
              >
                <card.icon size={20} style={{ color: card.color }} className="mx-auto mb-3" />
                <div className="font-display text-3xl text-[#F6F2EB]">{card.value}</div>
                <div className="text-label text-[#8A8A8A] mt-1">{card.label}</div>
              </div>
            ))}
          </div>

          {/* Bookings Table */}
          <div className="mb-12">
            <h2 className="font-display text-heading-lg text-[#F6F2EB] mb-6 flex items-center gap-2">
              <CalendarDays size={20} className="text-[#C7A878]" />
              Recent Bookings
            </h2>

            <div className="border border-[#1A1A1A] rounded-lg overflow-hidden">
              {bookingsLoading ? (
                <div className="p-8 text-center">
                  <Loader2 size={24} className="animate-spin text-[#C7A878] mx-auto" />
                </div>
              ) : recentBookings && recentBookings.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#1A1A1A]">
                        <th className="text-left text-label text-[#8A8A8A] p-4">Name</th>
                        <th className="text-left text-label text-[#8A8A8A] p-4">Phone</th>
                        <th className="text-left text-label text-[#8A8A8A] p-4">Date</th>
                        <th className="text-left text-label text-[#8A8A8A] p-4">Time</th>
                        <th className="text-left text-label text-[#8A8A8A] p-4">Guests</th>
                        <th className="text-left text-label text-[#8A8A8A] p-4">Status</th>
                        <th className="text-left text-label text-[#8A8A8A] p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBookings.map((b) => (
                        <tr key={b.id} className="border-b border-[#1A1A1A] hover:bg-[#111]">
                          <td className="p-4 text-body-sm text-[#F6F2EB]">{b.name}</td>
                          <td className="p-4 text-body-sm text-[#8A8A8A]">{b.phone}</td>
                          <td className="p-4 text-body-sm text-[#8A8A8A]">
                            {b.date ? new Date(b.date).toLocaleDateString() : "-"}
                          </td>
                          <td className="p-4 text-body-sm text-[#8A8A8A]">{b.time}</td>
                          <td className="p-4 text-body-sm text-[#8A8A8A]">{b.guests}</td>
                          <td className="p-4">
                            <span
                              className={`text-xs uppercase tracking-wider px-2 py-1 rounded ${
                                b.status === "confirmed"
                                  ? "bg-green-500/10 text-green-400"
                                  : b.status === "cancelled"
                                  ? "bg-red-500/10 text-red-400"
                                  : "bg-yellow-500/10 text-yellow-400"
                              }`}
                            >
                              {b.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              {b.status === "pending" && (
                                <>
                                  <button
                                    onClick={() =>
                                      updateStatus.mutate({ id: b.id, status: "confirmed" })
                                    }
                                    className="text-green-400 hover:text-green-300 transition-colors"
                                    title="Confirm"
                                  >
                                    <CheckCircle size={16} />
                                  </button>
                                  <button
                                    onClick={() =>
                                      updateStatus.mutate({ id: b.id, status: "cancelled" })
                                    }
                                    className="text-red-400 hover:text-red-300 transition-colors"
                                    title="Cancel"
                                  >
                                    <XCircle size={16} />
                                  </button>
                                </>
                              )}
                              <button
                                onClick={() => deleteBooking.mutate({ id: b.id })}
                                className="text-[#8A8A8A] hover:text-red-400 transition-colors"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center text-[#8A8A8A]">No bookings yet</div>
              )}
            </div>
          </div>

          {/* Messages Table */}
          <div>
            <h2 className="font-display text-heading-lg text-[#F6F2EB] mb-6 flex items-center gap-2">
              <MessageSquare size={20} className="text-[#C7A878]" />
              Recent Messages
            </h2>

            <div className="border border-[#1A1A1A] rounded-lg overflow-hidden">
              {messagesLoading ? (
                <div className="p-8 text-center">
                  <Loader2 size={24} className="animate-spin text-[#C7A878] mx-auto" />
                </div>
              ) : recentMessages && recentMessages.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#1A1A1A]">
                        <th className="text-left text-label text-[#8A8A8A] p-4">Name</th>
                        <th className="text-left text-label text-[#8A8A8A] p-4">Email</th>
                        <th className="text-left text-label text-[#8A8A8A] p-4">Message</th>
                        <th className="text-left text-label text-[#8A8A8A] p-4">Date</th>
                        <th className="text-left text-label text-[#8A8A8A] p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentMessages.map((m) => (
                        <tr key={m.id} className="border-b border-[#1A1A1A] hover:bg-[#111]">
                          <td className="p-4 text-body-sm text-[#F6F2EB]">{m.name}</td>
                          <td className="p-4 text-body-sm text-[#8A8A8A]">{m.email}</td>
                          <td className="p-4 text-body-sm text-[#8A8A8A] max-w-[300px] truncate">
                            {m.message}
                          </td>
                          <td className="p-4 text-body-sm text-[#8A8A8A]">
                            {m.createdAt ? new Date(m.createdAt).toLocaleDateString() : "-"}
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() => deleteMessage.mutate({ id: m.id })}
                              className="text-[#8A8A8A] hover:text-red-400 transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center text-[#8A8A8A]">No messages yet</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
