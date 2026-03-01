export interface AddonOption {
    id: string;
    label: string;
    price: number;
    emoji?: string;
}

export interface AddonCategory {
    id: string;
    title: string;
    emoji: string;
    options: AddonOption[];
}

export const ADDON_CATEGORIES: AddonCategory[] = [
    {
        id: "transport-arrival",
        title: "Transport (arrival)",
        emoji: "🚖",
        options: [
            { id: "arr-none", label: "No Taxi", price: 0, emoji: "❌" },
            {
                id: "arr-sumbawa",
                label: "Sumbawa Besar → Scar Reef Resort",
                price: 85,
                emoji: "🚖",
            },
            {
                id: "arr-pototano",
                label: "Poto Tano → Scar Reef Resort",
                price: 35,
                emoji: "🚖",
            },
            {
                id: "arr-lombok-airport",
                label: "Lombok Airport → Scar Reef Resort",
                price: 90,
                emoji: "⛴️🚖",
            },
            {
                id: "arr-kuta-lombok",
                label: "Kuta / Ekas Lombok → Scar Reef Resort",
                price: 100,
                emoji: "⛴️🚖",
            },
            {
                id: "arr-bangsal",
                label: "Bangsal / Rinjani Lodge → Scar Reef Resort",
                price: 120,
                emoji: "⛴️🚖",
            },
            {
                id: "arr-speedboat",
                label: "Lombok Airport → Scar Reef Resort (speed boat)",
                price: 450,
                emoji: "🚤",
            },
            {
                id: "arr-heli-bali",
                label: "Bali → Scar Reef Resort",
                price: 6000,
                emoji: "🚁",
            },
        ],
    },
    {
        id: "snorkeling-outside",
        title: "Snorkeling (2H) Outside Jelenga Bay",
        emoji: "🤿",
        options: [
            { id: "snork-out-no", label: "No", price: 0 },
            {
                id: "snork-out-yes",
                label: "Yes (min 2 persons)",
                price: 100,
            },
        ],
    },
    {
        id: "snorkeling-jelenga",
        title: "Snorkeling (2H) Jelenga Bay",
        emoji: "🐠",
        options: [
            { id: "snork-jel-no", label: "No", price: 0 },
            {
                id: "snork-jel-yes",
                label: "Yes (min 2 persons)",
                price: 50,
            },
        ],
    },
    {
        id: "surf-guide",
        title: "Surf Guide (guide + board)",
        emoji: "🏄",
        options: [
            { id: "surf-no", label: "No", price: 0 },
            { id: "surf-yes", label: "Yes", price: 720 },
        ],
    },
    {
        id: "transport-return",
        title: "Transport (return)",
        emoji: "🚖",
        options: [
            { id: "ret-none", label: "No Taxi", price: 0, emoji: "❌" },
            {
                id: "ret-sumbawa",
                label: "Scar Reef Resort → Sumbawa Besar",
                price: 85,
                emoji: "🚖",
            },
            {
                id: "ret-pototano",
                label: "Scar Reef Resort → Poto Tano / Kertasari",
                price: 35,
                emoji: "🚖",
            },
            {
                id: "ret-yoyo",
                label: "Scar Reef Resort → Yo-yo Sekongkang",
                price: 25,
                emoji: "🚖",
            },
            {
                id: "ret-kuta-lombok",
                label: "Scar Reef Resort → Kuta / Ekas Lombok",
                price: 110,
                emoji: "⛴️🚖",
            },
            {
                id: "ret-bangsal",
                label: "Scar Reef Resort → Bangsal / Rinjani Lodge",
                price: 120,
                emoji: "⛴️🚖",
            },
            {
                id: "ret-salewhales",
                label: "Scar Reef Resort → Salewhales Sharks Bay",
                price: 200,
                emoji: "⛴️🚖",
            },
            {
                id: "ret-lombok-airport",
                label: "Scar Reef Resort → Lombok Airport",
                price: 90,
                emoji: "⛴️🚖",
            },
        ],
    },
];
