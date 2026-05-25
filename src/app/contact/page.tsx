"use client";

import { useState } from "react";
import { ChevronDown, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";

const faqs = [
  {
    question: "Can you tell me more about Sumbawa?",
    answer:
      "Sumbawa is one of the Lesser Sunda Islands. It is located between the islands of Lombok and Komodo and is approximately 300km long. It is 2 islands away from Bali. Its population of about 1.3 million inhabitants is friendly and welcoming. The main local religion is Islam. Geography wise, this beautiful island is located on the ring of fire: Sumbawa's infamous volcano, the Tambora, erupted in 1815 leaving a massive caldera on the North of the island. Sumbawa distinguishes itself with its rocky mountain ranges, lower grasslands and white sandy beaches. Thanks to the mining industry, Sumbawa's road infrastructure is very modern and well maintained. In terms of surfing, Sumbawa is a new frontier and there is still so much to explore.",
  },
  {
    question: "Where is Scar Reef Resort?",
    answer:
      "Scar Reef is located on Pantai Jelenga: a big 3km long bay with beautiful white sand and a huge blue crystal water lagoon. You can see the shoreline and the magnificent Mt Rinjani from the beach at Scar Reef Resort. Jelenga village (300 inhabitants) is located less than 1km away from Scar Reef Resort, further inland. Most of the inhabitants are farmers. The people of Jelenga are friendly and sweet people and are always happy and curious to connect with foreigners. The rest of the time, it's you, the big blue and that's it. When we say the place is an island paradise, we mean it.",
  },
  {
    question: "How do I get to Scar Reef Resort?",
    answer:
      "There are many ways to get to Scar Reef Resort. The simplest is to fly from Bali (DPS) to Sumbawa Besar (SWQ), then take a private car transfer (±2.5 hours). You can also fly to Lombok and take a private fast boat directly to our beach. Please see our Getting Here page for more information or ask our friendly staff.",
  },
  {
    question: "Is Scar Reef Resort near Lakey Peak?",
    answer:
      "No, Scar Reef Resort is on the far West of Sumbawa whereas Lakey Peak is in the middle of Sumbawa's South Coast.",
  },
  {
    question: "Are there any surf shops near Scar Reef Resort?",
    answer:
      "Unfortunately no. Please come with your own board if you haven't joined one of our packages. Please remember to bring some tropical wax, an extra set of fins and a second leash, just in case.",
  },
  {
    question: "What is the weather like in Sumbawa?",
    answer:
      "The weather is tropical, the thermometer never goes below 25°C. Between April and October it's hot and dry, and between November and April it's hot and it sometimes rains. The climate in Sumbawa is dryer than in Bali.",
  },
  {
    question: "What about safety in the water?",
    answer:
      "If you've just come to stay the night, and haven't signed up for a surf guide or coach, it's up to you to make sure you go out in conditions that are OK for your surfing level. For guests with an all-inclusive surf package, a staff member will take you to your favorite break with our boat, stay in the water with you and advise which waves to take. We do not recommend surfing when the tides are too low, because the reef can be sharp. From mid tide to high tides, the surfing is the best in the world.",
  },
  {
    question: "What are the waves like?",
    answer:
      "Scar Reef gets big and gnarly about 30 days a year (mostly in the dry months because of the Antarctic storms pushing ground swells North). Most of the time, you can expect perfect Indonesian waves: glassy barrels, long mellow rides, lefts, rights, wedges and reefbreaks that are ok for all surfing levels from beginner to advanced. Plus you'll be surfing in 28°C water!",
  },
  {
    question: "What is included in the surf guide?",
    answer:
      "Our surf guides are expert surfers who are used to surfing conditions in Indonesia. Our surf guide will make sure that you have the best experience in the water. We take you to the lineup and advise on placement on the wave.",
  },
  {
    question: "What is included with a one-to-one surf coaching?",
    answer:
      "Personal surf coach (subject to availability): an expert surf teacher who will coach you to progress and excel on our waves. He/She will brief you and advise on warmup practices. In the water, the surf coach will analyse and advise placement and techniques to improve your surfing. Out of the water, he/she will debrief on your session and give you tips and tricks to excel. Board rental included.",
  },
  {
    question: "Do I have to bring my board?",
    answer:
      "We would recommend to bring your own boards. But if you don't have one, or you've left it at home, please join one of our packages and we'll have you covered. We have a quiver of recent boards from longboards to shortboards that you can choose from. We even have some softboards for beginners.",
  },
  {
    question: "Are pets accepted?",
    answer:
      "On site we have horses, but we do not accept imported pets according to Indonesian laws. Thank you for your understanding.",
  },
  {
    question: "Is the water safe to drink?",
    answer:
      "Tap water is pumped from our freshwater well. We haven't had any trouble with drinking it but we would recommend using our water dispensers that deliver unlimited purified water to our beloved guests.",
  },
  {
    question: "Are there many mosquitoes?",
    answer:
      "In the dry months, we don't notice mosquitoes very much, but this is Indonesia and we recommend bringing your own insect repellent. There is no malaria in our area.",
  },
  {
    question: "Do I need special vaccinations to go to Sumbawa?",
    answer:
      "No. Indonesia is a country that has been registered as Malaria and Yellow fever free. However, we cannot guarantee there is no health risk. Please consult your physician or your consulate before visiting Indonesia for more information.",
  },
  {
    question: "What are the biggest risks when staying in Sumbawa?",
    answer:
      "The biggest risk is the sun. We would recommend to come with some high protection sun cream so as not to get burnt the first day. If possible, please choose reef friendly sunscreen so as to protect our beautiful seabeds.",
  },
  {
    question: "Is there a hospital nearby?",
    answer:
      "Yes. In Taliwang (30 minutes by car). There is also a doctor in Jelenga village (5 minute walk) who has a plentiful stock of medicine. There is an apotek (pharmacy) in Jereweh too (15 minutes drive).",
  },
  {
    question: "Do I need to take out travel insurance?",
    answer:
      "We strongly advise you to take out travel insurance for your trip to Scar Reef Resort. Please consult your travel advisor or credit card company.",
  },
  {
    question: "Is the resort safe?",
    answer:
      "Yes. Our resort is gated. Our qualified staff is meticulously recruited and vetted. You will find safety boxes in your rooms and we will keep your valuables on request at reception. Scar Reef Resort is a very calm and peaceful place.",
  },
  {
    question: "What about traveling with surfboards?",
    answer:
      "All airlines flying domestic in Indonesia accept surfboards until 7'. Be aware that not all companies can carry longboards. The Wings flights between Sumbawa Besar airport and Lombok are operated on small ATR aircraft (maximum length: 7'). If you are travelling with your longboard, we recommend going via the fast-boat and flight from Lombok.",
  },
];

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-neutral-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-neutral-50 transition-colors"
      >
        <span className="font-semibold text-neutral-900 pr-4">{question}</span>
        <ChevronDown
          className={`h-5 w-5 text-neutral-400 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-5 border-t border-neutral-100">
          <p className="text-neutral-600 text-sm leading-relaxed pt-4">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-neutral-900 text-white text-center">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[var(--font-outfit)] uppercase tracking-wide">
            Contact & FAQ
          </h1>
          <p className="text-neutral-400 mt-4 max-w-2xl mx-auto">
            These are the most frequent questions we receive from our clients. If
            you want to ask another one, please, do not hesitate to contact us.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <a
              href={SITE_CONFIG.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-green-50 border border-green-200 hover:border-green-400 transition-colors group"
            >
              <MessageCircle className="h-8 w-8 text-green-600 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-neutral-900">WhatsApp</h3>
              <p className="text-sm text-neutral-500 mt-1">
                Chat with us directly
              </p>
            </a>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-blue-50 border border-blue-200 hover:border-blue-400 transition-colors group"
            >
              <Mail className="h-8 w-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-neutral-900">Email</h3>
              <p className="text-sm text-neutral-500 mt-1">
                {SITE_CONFIG.email}
              </p>
            </a>
            <a
              href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-primary/5 border border-primary/20 hover:border-primary/40 transition-colors group"
            >
              <Phone className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-neutral-900">Phone</h3>
              <p className="text-sm text-neutral-500 mt-1">
                {SITE_CONFIG.phone}
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-neutral-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 font-[var(--font-outfit)] mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <FaqItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
