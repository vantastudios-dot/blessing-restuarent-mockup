import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "@/providers/trpc";
import { Link } from "react-router";
import { ArrowLeft, Loader2, Send, MessageSquare, User, Mail } from "lucide-react";

const messageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  message: z.string().min(1, "Message is required").max(2000),
});

type MessageForm = z.infer<typeof messageSchema>;

export default function Guestbook() {
  const utils = trpc.useUtils();
  const { data: messages, isLoading } = trpc.message.list.useQuery({ limit: 50, offset: 0 });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MessageForm>({
    resolver: zodResolver(messageSchema),
  });

  const messageMutation = trpc.message.create.useMutation({
    onSuccess: () => {
      utils.message.list.invalidate();
      reset();
    },
  });

  const onSubmit = (data: MessageForm) => {
    messageMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <div className="section-padding pt-8 pb-12">
        <div className="max-w-[1200px] mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#8A8A8A] hover:text-[#C7A878] transition-colors text-sm mb-12"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <div className="text-center mb-16">
            <span className="text-label text-[#C7A878] font-accent block mb-4">
              (GUESTBOOK)
            </span>
            <h1 className="font-display text-display-md uppercase text-[#F6F2EB] mb-4">
              Share Your Story.
            </h1>
            <p className="text-body-md text-[#8A8A8A] max-w-[480px] mx-auto">
              We love hearing from our guests. Share your experience at Blessings and become
              part of our story.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="glass-panel p-8 sticky top-24">
                <h2 className="font-display text-heading-lg text-[#F6F2EB] mb-6">
                  Leave a Message
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <label className="text-label text-[#8A8A8A] block mb-2">Name</label>
                    <div className="relative">
                      <User size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-[#8A8A8A]" />
                      <input
                        {...register("name")}
                        className="w-full bg-transparent border-b border-[#F6F2EB]/15 text-[#F6F2EB] text-body-md py-3 pl-7 focus:border-[#C7A878] transition-colors outline-none"
                        placeholder="Your name"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-[#C75B5B] text-xs mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-label text-[#8A8A8A] block mb-2">Email</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-[#8A8A8A]" />
                      <input
                        {...register("email")}
                        className="w-full bg-transparent border-b border-[#F6F2EB]/15 text-[#F6F2EB] text-body-md py-3 pl-7 focus:border-[#C7A878] transition-colors outline-none"
                        placeholder="your@email.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-[#C75B5B] text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-label text-[#8A8A8A] block mb-2">Message</label>
                    <textarea
                      {...register("message")}
                      rows={4}
                      className="w-full bg-transparent border border-[#F6F2EB]/15 text-[#F6F2EB] text-body-md p-4 rounded focus:border-[#C7A878] transition-colors outline-none resize-none"
                      placeholder="Share your experience..."
                    />
                    {errors.message && (
                      <p className="text-[#C75B5B] text-xs mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={messageMutation.isPending}
                    className="w-full h-12 bg-[#C7A878] text-[#0A0A0A] font-display text-[16px] uppercase rounded hover:bg-[#E6D9C6] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {messageMutation.isPending ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <>
                        <Send size={16} />
                        Post Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Messages Wall */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-3 mb-8">
                <MessageSquare size={20} className="text-[#C7A878]" />
                <h2 className="font-display text-heading-lg text-[#F6F2EB]">
                  Messages Wall
                </h2>
                <span className="text-body-sm text-[#8A8A8A]">
                  ({messages?.length || 0})
                </span>
              </div>

              {isLoading ? (
                <div className="text-center py-12">
                  <Loader2 size={24} className="animate-spin text-[#C7A878] mx-auto" />
                </div>
              ) : messages && messages.length > 0 ? (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="border border-[#1A1A1A] rounded-lg p-6 hover:border-[#C7A878]/20 transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-[#C7A878]/20 flex items-center justify-center">
                          <User size={14} className="text-[#C7A878]" />
                        </div>
                        <div>
                          <span className="font-body text-body-md text-[#F6F2EB]">
                            {msg.name}
                          </span>
                          <span className="text-body-sm text-[#8A8A8A] ml-2">
                            {msg.createdAt
                              ? new Date(msg.createdAt).toLocaleDateString()
                              : ""}
                          </span>
                        </div>
                      </div>
                      <p className="font-body text-body-md text-[#8A8A8A] pl-11">
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border border-[#1A1A1A] rounded-lg">
                  <MessageSquare size={32} className="text-[#1A1A1A] mx-auto mb-4" />
                  <p className="text-[#8A8A8A]">
                    No messages yet. Be the first to share your story!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
