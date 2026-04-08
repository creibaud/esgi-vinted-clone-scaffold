import { Article } from "../types.js";

// Seed users — UUIDs hardcodés, ne correspondent jamais à celui d'un étudiant
const users = [
    { userId: "550e8400-e29b-41d4-a716-446655440001", userName: "Marie L." },
    { userId: "550e8400-e29b-41d4-a716-446655440002", userName: "Lucas D." },
    { userId: "550e8400-e29b-41d4-a716-446655440003", userName: "Inès B." },
    { userId: "550e8400-e29b-41d4-a716-446655440004", userName: "Thomas R." },
    { userId: "550e8400-e29b-41d4-a716-446655440005", userName: "Chloé M." },
    { userId: "550e8400-e29b-41d4-a716-446655440006", userName: "Karim A." },
];

export const seedArticles: Article[] = [
    // ── tops (6) ──────────────────────────────────────────
    {
        id: "a0000001-0001-4000-8000-000000000001",
        title: "T-shirt blanc basique",
        description:
            "T-shirt en coton bio, coupe droite. Porté deux fois, comme neuf. Parfait pour un look minimaliste.",
        price: 8,
        category: "tops",
        size: "M",
        condition: "neuf_sans_etiquette",
        imageUrl:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        ...users[0],
        createdAt: "2026-03-01T09:00:00.000Z",
    },
    {
        id: "a0000001-0001-4000-8000-000000000002",
        title: "Chemise en lin bleue",
        description:
            "Chemise en lin légère, idéale pour l'été. Couleur bleu ciel, coupe regular. Très bon état général.",
        price: 22,
        category: "tops",
        size: "L",
        condition: "tres_bon_etat",
        imageUrl:
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
        ...users[1],
        createdAt: "2026-03-02T14:30:00.000Z",
    },
    {
        id: "a0000001-0001-4000-8000-000000000003",
        title: "Pull col roulé noir",
        description:
            "Pull en maille fine, col roulé classique. Matière douce et chaude. Quelques bouloches sous les bras.",
        price: 18,
        category: "tops",
        size: "S",
        condition: "bon_etat",
        imageUrl:
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop",
        ...users[2],
        createdAt: "2026-03-03T11:15:00.000Z",
    },
    {
        id: "a0000001-0001-4000-8000-000000000004",
        title: "Top fleuri Zara",
        description:
            "Joli top à motifs fleuris, manches courtes bouffantes. Jamais porté, étiquette encore présente.",
        price: 15,
        category: "tops",
        size: "S",
        condition: "neuf_avec_etiquette",
        imageUrl:
            "https://images.unsplash.com/photo-1564246544814-647aff343a3b?w=400&h=400&fit=crop",
        ...users[3],
        createdAt: "2026-03-05T16:00:00.000Z",
    },
    {
        id: "a0000001-0001-4000-8000-000000000005",
        title: "Sweat à capuche gris",
        description:
            "Sweat oversize confortable avec capuche et poche kangourou. Intérieur molletonné. Bon état.",
        price: 25,
        category: "tops",
        size: "XL",
        condition: "bon_etat",
        imageUrl:
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
        ...users[4],
        createdAt: "2026-03-06T08:45:00.000Z",
    },
    {
        id: "a0000001-0001-4000-8000-000000000006",
        title: "Polo Ralph Lauren marine",
        description:
            "Polo classique bleu marine avec logo brodé. Coton piqué de qualité. Taille fidèle.",
        price: 30,
        category: "tops",
        size: "M",
        condition: "tres_bon_etat",
        imageUrl:
            "https://images.unsplash.com/photo-1625910513413-5fc421e0bbe2?w=400&h=400&fit=crop",
        ...users[5],
        createdAt: "2026-03-07T10:00:00.000Z",
    },

    // ── bottoms (6) ───────────────────────────────────────
    {
        id: "a0000001-0002-4000-8000-000000000001",
        title: "Jean Levi's 501 bleu",
        description:
            "Jean droit classique Levi's 501, délavage moyen. Porté régulièrement mais sans défaut visible.",
        price: 35,
        category: "bottoms",
        size: "42",
        condition: "bon_etat",
        imageUrl:
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
        ...users[1],
        createdAt: "2026-03-04T09:30:00.000Z",
    },
    {
        id: "a0000001-0002-4000-8000-000000000002",
        title: "Pantalon chino beige",
        description:
            "Chino coupe slim en coton stretch. Couleur sable, très polyvalent. Parfait pour le bureau ou le week-end.",
        price: 20,
        category: "bottoms",
        size: "40",
        condition: "tres_bon_etat",
        imageUrl:
            "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop",
        ...users[0],
        createdAt: "2026-03-06T13:00:00.000Z",
    },
    {
        id: "a0000001-0002-4000-8000-000000000003",
        title: "Short en jean délavé",
        description:
            "Short en jean taille haute, ourlet effiloché. Style décontracté pour l'été. Très bon état.",
        price: 14,
        category: "bottoms",
        size: "38",
        condition: "tres_bon_etat",
        imageUrl:
            "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop",
        ...users[2],
        createdAt: "2026-03-08T17:00:00.000Z",
    },
    {
        id: "a0000001-0002-4000-8000-000000000004",
        title: "Jupe plissée noire",
        description:
            "Jupe midi plissée noire, taille élastiquée. Élégante et confortable. Neuve, jamais portée.",
        price: 28,
        category: "bottoms",
        size: "S",
        condition: "neuf_sans_etiquette",
        imageUrl:
            "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&h=400&fit=crop",
        ...users[4],
        createdAt: "2026-03-09T10:30:00.000Z",
    },
    {
        id: "a0000001-0002-4000-8000-000000000005",
        title: "Jogging Adidas noir",
        description:
            "Pantalon de jogging Adidas avec les trois bandes blanches. Coupe slim. Confortable au quotidien.",
        price: 22,
        category: "bottoms",
        size: "L",
        condition: "bon_etat",
        imageUrl:
            "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop",
        ...users[3],
        createdAt: "2026-03-10T15:45:00.000Z",
    },
    {
        id: "a0000001-0002-4000-8000-000000000006",
        title: "Pantalon large palazzo",
        description:
            "Pantalon fluide taille haute en viscose. Couleur crème, coupe palazzo très tendance. État satisfaisant.",
        price: 16,
        category: "bottoms",
        size: "M",
        condition: "satisfaisant",
        imageUrl:
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
        ...users[5],
        createdAt: "2026-03-11T11:00:00.000Z",
    },

    // ── shoes (6) ─────────────────────────────────────────
    {
        id: "a0000001-0003-4000-8000-000000000001",
        title: "Baskets Nike Air Force 1",
        description:
            "Air Force 1 blanches, modèle iconique. Semelle légèrement usée mais dessus en très bon état.",
        price: 55,
        category: "shoes",
        size: "42",
        condition: "tres_bon_etat",
        imageUrl:
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
        ...users[3],
        createdAt: "2026-03-05T08:00:00.000Z",
    },
    {
        id: "a0000001-0003-4000-8000-000000000002",
        title: "Bottines en cuir marron",
        description:
            "Bottines Chelsea en cuir véritable, couleur cognac. Semelle en caoutchouc. Très élégantes.",
        price: 45,
        category: "shoes",
        size: "39",
        condition: "bon_etat",
        imageUrl:
            "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=400&h=400&fit=crop",
        ...users[0],
        createdAt: "2026-03-07T14:00:00.000Z",
    },
    {
        id: "a0000001-0003-4000-8000-000000000003",
        title: "Sandales dorées à lanières",
        description:
            "Sandales plates avec fines lanières dorées. Idéales pour l'été. Jamais portées dehors.",
        price: 18,
        category: "shoes",
        size: "37",
        condition: "neuf_sans_etiquette",
        imageUrl:
            "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop",
        ...users[2],
        createdAt: "2026-03-09T16:30:00.000Z",
    },
    {
        id: "a0000001-0003-4000-8000-000000000004",
        title: "Mocassins en daim bleu",
        description:
            "Mocassins en daim bleu marine, semelle souple. Style casual chic. Petite trace d'usure à l'arrière.",
        price: 32,
        category: "shoes",
        size: "43",
        condition: "bon_etat",
        imageUrl:
            "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&h=400&fit=crop",
        ...users[5],
        createdAt: "2026-03-12T09:15:00.000Z",
    },
    {
        id: "a0000001-0003-4000-8000-000000000005",
        title: "Chaussures de running Asics",
        description:
            "Asics Gel-Kayano, amorties et stables. Utilisées pour quelques sorties seulement. Pointure fidèle.",
        price: 48,
        category: "shoes",
        size: "44",
        condition: "tres_bon_etat",
        imageUrl:
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
        ...users[1],
        createdAt: "2026-03-14T07:30:00.000Z",
    },
    {
        id: "a0000001-0003-4000-8000-000000000006",
        title: "Escarpins noirs vernis",
        description:
            "Escarpins à talon 7 cm en cuir vernis noir. Portés une seule fois pour un événement. Comme neufs.",
        price: 38,
        category: "shoes",
        size: "38",
        condition: "neuf_sans_etiquette",
        imageUrl:
            "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=400&h=400&fit=crop",
        ...users[4],
        createdAt: "2026-03-15T18:00:00.000Z",
    },

    // ── coats (6) ─────────────────────────────────────────
    {
        id: "a0000001-0004-4000-8000-000000000001",
        title: "Veste en jean vintage",
        description:
            "Veste en jean légèrement délavée, coupe oversize. Style vintage authentique. Portée quelques fois.",
        price: 35,
        category: "coats",
        size: "M",
        condition: "tres_bon_etat",
        imageUrl:
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
        ...users[0],
        createdAt: "2026-03-03T10:30:00.000Z",
    },
    {
        id: "a0000001-0004-4000-8000-000000000002",
        title: "Manteau en laine gris",
        description:
            "Manteau long en laine mélangée, coupe droite. Couleur gris chiné. Chaud et élégant pour l'hiver.",
        price: 65,
        category: "coats",
        size: "L",
        condition: "bon_etat",
        imageUrl:
            "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=400&fit=crop",
        ...users[3],
        createdAt: "2026-03-06T12:00:00.000Z",
    },
    {
        id: "a0000001-0004-4000-8000-000000000003",
        title: "Doudoune légère noire",
        description:
            "Doudoune fine et compressible, idéale pour la mi-saison. Légère mais chaude. Très bon état.",
        price: 40,
        category: "coats",
        size: "S",
        condition: "tres_bon_etat",
        imageUrl:
            "https://images.unsplash.com/photo-1544923246-77307dd270b5?w=400&h=400&fit=crop",
        ...users[2],
        createdAt: "2026-03-10T08:00:00.000Z",
    },
    {
        id: "a0000001-0004-4000-8000-000000000004",
        title: "Trench beige classique",
        description:
            "Trench-coat beige ceinturé, doublure à carreaux. Intemporel et polyvalent. Neuf avec étiquette.",
        price: 75,
        category: "coats",
        size: "M",
        condition: "neuf_avec_etiquette",
        imageUrl:
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop",
        ...users[4],
        createdAt: "2026-03-13T14:30:00.000Z",
    },
    {
        id: "a0000001-0004-4000-8000-000000000005",
        title: "Blouson en cuir noir",
        description:
            "Blouson biker en cuir véritable. Fermeture zippée asymétrique. Le cuir est souple et patiné.",
        price: 90,
        category: "coats",
        size: "L",
        condition: "bon_etat",
        imageUrl:
            "https://images.unsplash.com/photo-1520012218364-3dbe62c99bee?w=400&h=400&fit=crop",
        ...users[5],
        createdAt: "2026-03-16T11:00:00.000Z",
    },
    {
        id: "a0000001-0004-4000-8000-000000000006",
        title: "Veste de costume anthracite",
        description:
            "Veste de blazer coupe ajustée, couleur anthracite. Doublure en satin. État satisfaisant, petite usure au col.",
        price: 28,
        category: "coats",
        size: "48",
        condition: "satisfaisant",
        imageUrl:
            "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=400&fit=crop",
        ...users[1],
        createdAt: "2026-03-18T09:00:00.000Z",
    },

    // ── accessories (6) ───────────────────────────────────
    {
        id: "a0000001-0005-4000-8000-000000000001",
        title: "Sac à main en cuir camel",
        description:
            "Sac cabas en cuir grainé, couleur camel. Doublure en tissu avec poche intérieure. Très bon état.",
        price: 42,
        category: "accessories",
        size: "Unique",
        condition: "tres_bon_etat",
        imageUrl:
            "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
        ...users[4],
        createdAt: "2026-03-04T15:00:00.000Z",
    },
    {
        id: "a0000001-0005-4000-8000-000000000002",
        title: "Écharpe en cachemire grise",
        description:
            "Grande écharpe en pur cachemire, couleur gris perle. Douce et chaude. Quelques bouloches légères.",
        price: 35,
        category: "accessories",
        size: "Unique",
        condition: "bon_etat",
        imageUrl:
            "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=400&fit=crop",
        ...users[2],
        createdAt: "2026-03-08T10:00:00.000Z",
    },
    {
        id: "a0000001-0005-4000-8000-000000000003",
        title: "Ceinture tressée en cuir",
        description:
            "Ceinture en cuir tressé marron, boucle en laiton. Convient à toutes les tailles grâce au tressage.",
        price: 12,
        category: "accessories",
        size: "Unique",
        condition: "tres_bon_etat",
        imageUrl:
            "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400&h=400&fit=crop",
        ...users[0],
        createdAt: "2026-03-11T13:30:00.000Z",
    },
    {
        id: "a0000001-0005-4000-8000-000000000004",
        title: "Lunettes de soleil aviateur",
        description:
            "Lunettes de soleil style aviateur, monture dorée, verres teintés vert foncé. Livrées avec étui.",
        price: 20,
        category: "accessories",
        size: "Unique",
        condition: "neuf_avec_etiquette",
        imageUrl:
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop",
        ...users[5],
        createdAt: "2026-03-14T16:00:00.000Z",
    },
    {
        id: "a0000001-0005-4000-8000-000000000005",
        title: "Bonnet en maille torsadée",
        description:
            "Bonnet en laine épaisse, motif torsadé, couleur bordeaux. Doublure en polaire. Chaud et confortable.",
        price: 10,
        category: "accessories",
        size: "Unique",
        condition: "neuf_sans_etiquette",
        imageUrl:
            "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400&h=400&fit=crop",
        ...users[3],
        createdAt: "2026-03-17T08:30:00.000Z",
    },
    {
        id: "a0000001-0005-4000-8000-000000000006",
        title: "Montre vintage dorée",
        description:
            "Montre à quartz avec bracelet en métal doré. Cadran rond blanc avec chiffres romains. Fonctionne parfaitement.",
        price: 25,
        category: "accessories",
        size: "Unique",
        condition: "bon_etat",
        imageUrl:
            "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop",
        ...users[1],
        createdAt: "2026-03-19T12:00:00.000Z",
    },

    // ── sportswear (5) ────────────────────────────────────
    {
        id: "a0000001-0006-4000-8000-000000000001",
        title: "Legging Nike Pro noir",
        description:
            "Legging de sport taille haute en tissu Dri-FIT. Maintien excellent. Porté quelques fois à la salle.",
        price: 20,
        category: "sportswear",
        size: "S",
        condition: "tres_bon_etat",
        imageUrl:
            "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=400&fit=crop",
        ...users[4],
        createdAt: "2026-03-07T07:00:00.000Z",
    },
    {
        id: "a0000001-0006-4000-8000-000000000002",
        title: "Brassière de sport rose",
        description:
            "Brassière à maintien moyen, couleur rose poudré. Bretelles croisées dans le dos. Neuve sans étiquette.",
        price: 15,
        category: "sportswear",
        size: "M",
        condition: "neuf_sans_etiquette",
        imageUrl:
            "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop",
        ...users[2],
        createdAt: "2026-03-12T06:30:00.000Z",
    },
    {
        id: "a0000001-0006-4000-8000-000000000003",
        title: "Short de running Adidas",
        description:
            "Short léger avec doublure intégrée. Bande réfléchissante sur le côté. Idéal pour le running.",
        price: 12,
        category: "sportswear",
        size: "L",
        condition: "bon_etat",
        imageUrl:
            "https://images.unsplash.com/photo-1562886877-aaaa5c16396e?w=400&h=400&fit=crop",
        ...users[1],
        createdAt: "2026-03-15T17:00:00.000Z",
    },
    {
        id: "a0000001-0006-4000-8000-000000000004",
        title: "Maillot de foot PSG extérieur",
        description:
            "Maillot PSG saison 2024-2025, version extérieur blanc et rouge. Taille M, flocage Mbappé au dos.",
        price: 35,
        category: "sportswear",
        size: "M",
        condition: "tres_bon_etat",
        imageUrl:
            "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&h=400&fit=crop",
        ...users[5],
        createdAt: "2026-03-20T10:00:00.000Z",
    },
    {
        id: "a0000001-0006-4000-8000-000000000005",
        title: "Veste coupe-vent légère",
        description:
            "Veste technique imperméable et coupe-vent. Capuche repliable dans le col. Parfaite pour la randonnée.",
        price: 28,
        category: "sportswear",
        size: "XL",
        condition: "bon_etat",
        imageUrl:
            "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=400&h=400&fit=crop",
        ...users[0],
        createdAt: "2026-03-22T14:00:00.000Z",
    },
];
