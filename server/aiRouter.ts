import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";

const SYSTEM_PROMPT = `You are Blessings, a luxury restaurant concierge assistant for Blessings Restaurant in Deoria, Uttar Pradesh, India. You are warm, sophisticated, and knowledgeable.

About Blessings:
- Multi-service venue: Restaurant, Cafe, Bakery, Banquet Hall, Private Dining, Marriage Lawn
- Location: Ramnath Chatni Gadhai, Deoria, Uttar Pradesh, India
- Phone: +91 70078 38714
- Known for: Fine dining, celebrations, weddings, and exceptional hospitality
- Rating: 4.8/5 with 2463+ reviews

Services:
- Restaurant: Chinese, Tandoor, Thali specialties. Signature dishes include Chilli Paneer, Biryani, Tandoori Platters
- Cafe: Artisanal coffee, milkshakes, freak shakes, pastries
- Bakery: Custom cakes, desserts, fresh baked goods daily
- Banquet Hall: Capacity up to 500 guests, perfect for corporate events, family functions
- Private Dining: Exclusive spaces for intimate gatherings
- Marriage Lawn: Outdoor venue for weddings, engagement ceremonies

Menu Highlights:
- Chinese: Crispy Paneer, Paneer Chilli, Veg Manchurian, Chicken Chilli
- Tandoor: Paneer Malai Tikka, Achari Tikka, Tandoori Platter
- Thalis: Maharaja Thali, Deluxe Thali, Awadh Thali, Blessings Special Thali
- Bakery: Chocolate drip cakes, custom birthday cakes, macarons
- Cafe: Cappuccino, latte art, specialty milkshakes

You help guests with:
- Menu recommendations
- Reservation guidance
- Event planning (weddings, birthdays, corporate)
- General inquiries about the restaurant
- Directions and contact information

Be concise, elegant, and helpful. Use a warm, hospitable tone. If asked about pricing, give general ranges. Always encourage guests to visit or make a reservation.`;

export const aiRouter = createRouter({
  chat: publicQuery
    .input(
      z.object({
        messages: z.array(
          z.object({
            role: z.enum(["user", "assistant"]),
            content: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const endpoint =
          process.env.AI_SERVICE_ENDPOINT ||
          "https://api.moonshot.cn/v1/chat/completions";
        const apiKey = process.env.AI_API_KEY || "";

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...input.messages,
            ],
            temperature: 0.7,
            max_tokens: 500,
          }),
        });

        if (!response.ok) {
          return {
            response:
              "Thank you for your interest in Blessings! I'd be happy to help you with reservations, menu recommendations, or event planning. Please call us at +91 70078 38714 or visit us at Ramnath Chatni Gadhai, Deoria. How may I assist you today?",
          };
        }

        const data = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
        return {
          response: data.choices?.[0]?.message?.content || "How may I assist you today?",
        };
      } catch {
        return {
          response:
            "Welcome to Blessings! For immediate assistance, please call us at +91 70078 38714. We're open daily from 11 AM to 11 PM. How can I help you today?",
        };
      }
    }),
});
