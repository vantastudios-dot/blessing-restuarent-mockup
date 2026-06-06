import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "@/providers/trpc";
import { Check, Loader2 } from "lucide-react";

const reservationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(10, "Valid phone number required"),
  email: z.string().email("Valid email required").optional().or(z.literal("")),
  guests: z.number().int().min(1).max(20),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  message: z.string().optional(),
});

type ReservationForm = z.infer<typeof reservationSchema>;

export default function Reservation() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReservationForm>({
    resolver: zodResolver(reservationSchema),
    defaultValues: { guests: 2 },
  });

  const bookingMutation = trpc.booking.create.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      reset();
    },
  });

  const onSubmit = (data: ReservationForm) => {
    bookingMutation.mutate(data);
  };

  const timeSlots = [
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
    "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
    "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM",
  ];

  return (
    <section
      id="reservation"
      className="relative bg-[#0A0A0A] section-padding"
      style={{
        paddingTop: "120px",
        paddingBottom: "120px",
        backgroundImage: "url(/images/reservation-ambience.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute inset-0 bg-[#0A0A0A]/85"
      />

      <div className="relative max-w-[640px] mx-auto" style={{ zIndex: 2 }}>
        <div className="text-center mb-12">
          <span className="text-label text-[#C7A878] font-accent block mb-4">
            (RESERVATIONS)
          </span>
          <h2 className="font-display text-display-sm uppercase text-[#F6F2EB] mb-4">
            Reserve Your Table.
          </h2>
          <p className="text-body-sm text-[#8A8A8A]">
            For reservations of 8 or more, please call us directly.
          </p>
        </div>

        {submitted ? (
          <div className="glass-panel p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-[#C7A878]/20 flex items-center justify-center mx-auto mb-6">
              <Check className="w-6 h-6 text-[#C7A878]" />
            </div>
            <h3 className="font-display text-heading-lg text-[#F6F2EB] mb-3">
              Reservation Requested.
            </h3>
            <p className="text-body-md text-[#8A8A8A] mb-4">
              We will confirm your booking shortly.
            </p>
            <p className="text-body-sm text-[#C7A878]">
              Call us: +91 70078 38714
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 text-[#8A8A8A] text-sm hover:text-[#C7A878] transition-colors"
            >
              Make another reservation
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="glass-panel p-8 md:p-12 space-y-6">
            {/* Name */}
            <div>
              <label className="text-label text-[#8A8A8A] block mb-2">Name</label>
              <input
                {...register("name")}
                className="w-full bg-transparent border-b border-[#F6F2EB]/15 text-[#F6F2EB] text-body-md py-3 focus:border-[#C7A878] transition-colors outline-none"
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="text-[#C75B5B] text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="text-label text-[#8A8A8A] block mb-2">Phone</label>
              <input
                {...register("phone")}
                className="w-full bg-transparent border-b border-[#F6F2EB]/15 text-[#F6F2EB] text-body-md py-3 focus:border-[#C7A878] transition-colors outline-none"
                placeholder="+91 XXXXX XXXXX"
              />
              {errors.phone && (
                <p className="text-[#C75B5B] text-xs mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-label text-[#8A8A8A] block mb-2">Email</label>
              <input
                {...register("email")}
                className="w-full bg-transparent border-b border-[#F6F2EB]/15 text-[#F6F2EB] text-body-md py-3 focus:border-[#C7A878] transition-colors outline-none"
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="text-[#C75B5B] text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Guests & Date & Time Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="text-label text-[#8A8A8A] block mb-2">Guests</label>
                <select
                  {...register("guests", { valueAsNumber: true })}
                  className="w-full bg-transparent border-b border-[#F6F2EB]/15 text-[#F6F2EB] text-body-md py-3 focus:border-[#C7A878] transition-colors outline-none"
                >
                  {[...Array(20)].map((_, i) => (
                    <option key={i} value={i + 1} className="bg-[#0A0A0A]">
                      {i + 1} {i === 0 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-label text-[#8A8A8A] block mb-2">Date</label>
                <input
                  type="date"
                  {...register("date")}
                  className="w-full bg-transparent border-b border-[#F6F2EB]/15 text-[#F6F2EB] text-body-md py-3 focus:border-[#C7A878] transition-colors outline-none"
                />
                {errors.date && (
                  <p className="text-[#C75B5B] text-xs mt-1">{errors.date.message}</p>
                )}
              </div>

              <div>
                <label className="text-label text-[#8A8A8A] block mb-2">Time</label>
                <select
                  {...register("time")}
                  className="w-full bg-transparent border-b border-[#F6F2EB]/15 text-[#F6F2EB] text-body-md py-3 focus:border-[#C7A878] transition-colors outline-none"
                >
                  <option value="" className="bg-[#0A0A0A]">Select time</option>
                  {timeSlots.map((t) => (
                    <option key={t} value={t} className="bg-[#0A0A0A]">
                      {t}
                    </option>
                  ))}
                </select>
                {errors.time && (
                  <p className="text-[#C75B5B] text-xs mt-1">{errors.time.message}</p>
                )}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="text-label text-[#8A8A8A] block mb-2">
                Special Request (Optional)
              </label>
              <textarea
                {...register("message")}
                rows={3}
                className="w-full bg-transparent border-b border-[#F6F2EB]/15 text-[#F6F2EB] text-body-md py-3 focus:border-[#C7A878] transition-colors outline-none resize-none"
                placeholder="Any special requests..."
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={bookingMutation.isPending}
              className="w-full h-14 bg-[#C7A878] text-[#0A0A0A] font-display text-heading-md uppercase rounded hover:bg-[#E6D9C6] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {bookingMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                "Reserve Table"
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
