'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
    PARTY_EXPRESSIONS,
    TOTAL_EXPRESSIONS,
    EXPRESSIONS_PER_DAY,
    PARTY_DAY_IDS,
    findExpressionLineIndex,
    PartyExpression,
} from '@/data/english/party-expressions';
import {
    MONSTER_EXPRESSIONS,
    TOTAL_MONSTER_EXPRESSIONS,
    MONSTER_EXPRESSIONS_PER_DAY,
    MONSTER_DAY_IDS,
    findMonsterExpressionLineIndex,
    MonsterExpression,
} from '@/data/english/monster-expressions';
import {
    MARINERS_EXPRESSIONS,
    TOTAL_MARINERS_EXPRESSIONS,
    MARINERS_EXPRESSIONS_PER_DAY,
    MARINERS_DAY_IDS,
    findMarinersExpressionLineIndex,
    MarinersExpression,
} from '@/data/english/mariners-trade-expressions';
import {
    MOVIE_EXPRESSIONS,
    TOTAL_MOVIE_EXPRESSIONS,
    MOVIE_EXPRESSIONS_PER_DAY,
    MOVIE_DAY_IDS,
    findMovieExpressionLineIndex,
    MovieExpression,
} from '@/data/english/movie-expressions';
import {
    GAME_NIGHT_EXPRESSIONS,
    TOTAL_GAME_NIGHT_EXPRESSIONS,
    GAME_NIGHT_EXPRESSIONS_PER_DAY,
    GAME_NIGHT_DAY_IDS,
    findGameNightExpressionLineIndex,
    GameNightExpression,
} from '@/data/english/game-night-expressions';
import { collegePartyRecapEntries } from '@/data/english/college-party-recap';
import { monsterUnderBedEntries } from '@/data/english/monster-under-bed';
import { marinersTradeEntries } from '@/data/english/mariners-trade-talk';
import { movieNightEntries } from '@/data/english/movie-night';
import { gameNightEntries } from '@/data/english/game-night-chaos';
import {
    ANTIQUES_EXPRESSIONS,
    TOTAL_ANTIQUES_EXPRESSIONS,
    ANTIQUES_EXPRESSIONS_PER_DAY,
    ANTIQUES_DAY_IDS,
    findAntiquesExpressionLineIndex,
    AntiquesExpression,
} from '@/data/english/antiques-expressions';
import { antiquesHouseEntries } from '@/data/english/antiques-house';
import { bucketListTripEntries } from '@/data/english/bucket-list-trip';
import {
    BUCKET_LIST_EXPRESSIONS,
    TOTAL_BUCKET_LIST_EXPRESSIONS,
    BUCKET_LIST_EXPRESSIONS_PER_DAY,
    BUCKET_LIST_DAY_IDS,
    findBucketListExpressionLineIndex,
    BucketListExpression,
} from '@/data/english/bucket-list-expressions';
import { bbqNeighborhoodEntries } from '@/data/english/bbq-neighborhood';
import {
    BBQ_EXPRESSIONS,
    TOTAL_BBQ_EXPRESSIONS,
    BBQ_EXPRESSIONS_PER_DAY,
    BBQ_DAY_IDS,
    findBbqExpressionLineIndex,
    BbqExpression,
} from '@/data/english/bbq-expressions';
import { blockPartyChaosEntries } from '@/data/english/block-party-chaos';
import {
    BLOCK_PARTY_EXPRESSIONS,
    TOTAL_BLOCK_PARTY_EXPRESSIONS,
    BLOCK_PARTY_EXPRESSIONS_PER_DAY,
    BLOCK_PARTY_DAY_IDS,
    findBlockPartyExpressionLineIndex,
    BlockPartyExpression,
} from '@/data/english/block-party-expressions';
import {
    WORST_FIRST_DATE_EXPRESSIONS,
    TOTAL_WORST_DATE_EXPRESSIONS,
    WORST_DATE_EXPRESSIONS_PER_DAY,
    WORST_DATE_DAY_IDS,
    findWorstDateExpressionLineIndex,
} from '@/data/english/worst-first-date-expressions';
import { worstFirstDateEntries } from '@/data/english/worst-first-date';
import { homeInspectionEntries } from '@/data/english/home-inspection';
import {
    HOME_INSPECTION_EXPRESSIONS,
    TOTAL_HOME_INSPECTION_EXPRESSIONS,
    HOME_INSPECTION_EXPRESSIONS_PER_DAY,
    HOME_INSPECTION_DAY_IDS,
    findHomeInspectionExpressionLineIndex,
    HomeInspectionExpression,
} from '@/data/english/home-inspection-expressions';
import { thanksgivingDinnerEntries } from '@/data/english/thanksgiving-dinner';
import {
    THANKSGIVING_EXPRESSIONS,
    TOTAL_THANKSGIVING_EXPRESSIONS,
    THANKSGIVING_EXPRESSIONS_PER_DAY,
    THANKSGIVING_DAY_IDS,
    findThanksgivingExpressionLineIndex,
    ThanksgivingExpression,
} from '@/data/english/thanksgiving-expressions';
import { airportDelayEntries } from '@/data/english/airport-delay';
import {
    AIRPORT_EXPRESSIONS,
    TOTAL_AIRPORT_EXPRESSIONS,
    AIRPORT_EXPRESSIONS_PER_DAY,
    AIRPORT_DAY_IDS,
    findAirportExpressionLineIndex,
    AirportExpression,
} from '@/data/english/airport-expressions';
import { erWaitingRoomEntries } from '@/data/english/er-waiting-room';
import {
    ER_EXPRESSIONS,
    TOTAL_ER_EXPRESSIONS,
    ER_EXPRESSIONS_PER_DAY,
    ER_DAY_IDS,
    findErExpressionLineIndex,
    ErExpression,
} from '@/data/english/er-expressions';
import { dmvRenewalEntries } from '@/data/english/dmv-renewal';
import {
    DMV_EXPRESSIONS,
    TOTAL_DMV_EXPRESSIONS,
    DMV_EXPRESSIONS_PER_DAY,
    DMV_DAY_IDS,
    findDmvExpressionLineIndex,
    DmvExpression,
} from '@/data/english/dmv-expressions';
import { juryDutyEntries } from '@/data/english/jury-duty';
import {
    JURY_DUTY_EXPRESSIONS,
    TOTAL_JURY_DUTY_EXPRESSIONS,
    JURY_DUTY_EXPRESSIONS_PER_DAY,
    JURY_DUTY_DAY_IDS,
    findJuryDutyExpressionLineIndex,
    JuryDutyExpression,
} from '@/data/english/jury-duty-expressions';
import { campingTripEntries } from '@/data/english/camping-trip';
import {
    CAMPING_TRIP_EXPRESSIONS,
    TOTAL_CAMPING_TRIP_EXPRESSIONS,
    CAMPING_TRIP_EXPRESSIONS_PER_DAY,
    CAMPING_TRIP_DAY_IDS,
    findCampingTripExpressionLineIndex,
    CampingTripExpression,
} from '@/data/english/camping-trip-expressions';
import { roadTripEntries } from '@/data/english/road-trip';
import {
    ROAD_TRIP_EXPRESSIONS,
    TOTAL_ROAD_TRIP_EXPRESSIONS,
    ROAD_TRIP_EXPRESSIONS_PER_DAY,
    ROAD_TRIP_DAY_IDS,
    findRoadTripExpressionLineIndex,
    RoadTripExpression,
} from '@/data/english/road-trip-expressions';
import { cruiseEntries } from '@/data/english/cruise';
import { weddingEntries } from '@/data/english/wedding';
import {
    CRUISE_EXPRESSIONS,
    TOTAL_CRUISE_EXPRESSIONS,
    CRUISE_EXPRESSIONS_PER_DAY,
    CRUISE_DAY_IDS,
    findCruiseExpressionLineIndex,
    CruiseExpression,
} from '@/data/english/cruise-expressions';
import {
    WEDDING_EXPRESSIONS,
    WEDDING_EXPRESSIONS_PER_DAY,
    TOTAL_WEDDING_EXPRESSIONS,
    WEDDING_DAY_IDS,
    findWeddingExpressionLineIndex,
    WeddingExpression,
} from '@/data/english/wedding-expressions';
import { nightDocketEntries } from '@/data/english/night-docket';
import {
    NIGHT_DOCKET_EXPRESSIONS,
    NIGHT_DOCKET_EXPRESSIONS_PER_DAY,
    TOTAL_NIGHT_DOCKET_EXPRESSIONS,
    NIGHT_DOCKET_DAY_IDS,
    findNightDocketExpressionLineIndex,
    NightDocketExpression,
} from '@/data/english/night-docket-expressions';
import { talentShowEntries } from '@/data/english/talent-show';
import {
    TALENT_SHOW_EXPRESSIONS,
    TALENT_SHOW_EXPRESSIONS_PER_DAY,
    TOTAL_TALENT_SHOW_EXPRESSIONS,
    TALENT_SHOW_DAY_IDS,
    findTalentShowExpressionLineIndex,
    TalentShowExpression,
} from '@/data/english/talent-show-expressions';

type SeriesKey = 'party' | 'monster' | 'mariners' | 'movie' | 'gamenight' | 'antiques' | 'bucketlist' | 'bbq' | 'blockparty' | 'worstdate' | 'homeinspection' | 'thanksgiving' | 'airport' | 'emergencyroom' | 'dmv' | 'juryduty' | 'campingtrip' | 'roadtrip' | 'cruise' | 'wedding' | 'nightdocket' | 'talentshow';

type AnyExpression = PartyExpression | MonsterExpression | MarinersExpression | MovieExpression | GameNightExpression | AntiquesExpression | BucketListExpression | BbqExpression | BlockPartyExpression | HomeInspectionExpression | ThanksgivingExpression | AirportExpression | ErExpression | DmvExpression | JuryDutyExpression | CampingTripExpression | RoadTripExpression | CruiseExpression | WeddingExpression | NightDocketExpression | TalentShowExpression;

const SERIES_CONFIG: Record<SeriesKey, {
    label: string;
    expressions: AnyExpression[];
    total: number;
    perDay: number;
    dayIds: Record<number, string>;
    dayLabels: Record<number, string>;
    speakerColors: Record<string, string>;
    source: string;
    findLineIndex: (expr: string, speaker: string, lines: Array<{ speaker: string; text: string }>) => number;
    getEntries: () => Array<{ id: string; conversation: { english: Array<{ speaker: string; text: string }> } }>;
}> = {
    party: {
        label: 'College Party',
        expressions: PARTY_EXPRESSIONS,
        total: TOTAL_EXPRESSIONS,
        perDay: EXPRESSIONS_PER_DAY,
        dayIds: PARTY_DAY_IDS,
        dayLabels: {
            1: 'The Setup',
            2: "It's Going Down",
            3: 'Peak Hours',
            4: 'After Midnight',
            5: 'The Morning After',
        },
        speakerColors: {
            Tyler: '#6366F1',
            Brandon: '#F59E0B',
            Alyssa: '#EC4899',
            Derek: '#10B981',
            Megan: '#8B5CF6',
            'Professor Hayes': '#78716C',
            Zoe: '#F97316',
            Jake: '#EF4444',
            Kenji: '#06B6D4',
            Rosa: '#14B8A6',
        },
        source: 'College Party Recap',
        findLineIndex: findExpressionLineIndex,
        getEntries: () => collegePartyRecapEntries,
    },
    monster: {
        label: 'Monster Under the Bed',
        expressions: MONSTER_EXPRESSIONS,
        total: TOTAL_MONSTER_EXPRESSIONS,
        perDay: MONSTER_EXPRESSIONS_PER_DAY,
        dayIds: MONSTER_DAY_IDS,
        dayLabels: {
            1: 'The Goodbye',
            2: 'The Noises',
            3: 'Fort Building',
            4: 'The Showdown',
            5: 'Safe and Sound',
        },
        speakerColors: {
            Timmy: '#60A5FA',
            Sarah: '#F472B6',
            Greg: '#6366F1',
            Emma: '#A78BFA',
            'Grandpa Frank': '#D97706',
            Noah: '#34D399',
            Kayla: '#FB923C',
            Danny: '#EF4444',
        },
        source: 'Monster Under the Bed',
        findLineIndex: findMonsterExpressionLineIndex,
        getEntries: () => monsterUnderBedEntries,
    },
    mariners: {
        label: 'Mariners Trade Talk',
        expressions: MARINERS_EXPRESSIONS,
        total: TOTAL_MARINERS_EXPRESSIONS,
        perDay: MARINERS_EXPRESSIONS_PER_DAY,
        dayIds: MARINERS_DAY_IDS,
        dayLabels: {
            1: 'The Deal',
            2: 'The Offseason',
            3: 'The Perfect Fit',
            4: 'The Next Generation',
            5: 'Building the Future',
        },
        speakerColors: {
            Marcus: '#DC2626',
            Kai: '#0284C7',
        },
        source: 'Mariners Trade Talk',
        findLineIndex: findMarinersExpressionLineIndex,
        getEntries: () => marinersTradeEntries,
    },
    movie: {
        label: 'Movie Night',
        expressions: MOVIE_EXPRESSIONS,
        total: TOTAL_MOVIE_EXPRESSIONS,
        perDay: MOVIE_EXPRESSIONS_PER_DAY,
        dayIds: MOVIE_DAY_IDS,
        dayLabels: {
            1: 'The Arrival',
            2: 'The Previews',
            3: 'Peak Movie',
            4: 'The Climax',
            5: 'After Credits',
        },
        speakerColors: {
            Jayden: '#2563EB',
            Maddie: '#EC4899',
            'Tyler C.': '#F59E0B',
            Ava: '#8B5CF6',
            Benji: '#EF4444',
            'Mrs. Chen': '#78716C',
            Marcus: '#14B8A6',
            'Old Man Gus': '#92400E',
        },
        source: 'First Movie Without Parents',
        findLineIndex: findMovieExpressionLineIndex,
        getEntries: () => movieNightEntries,
    },
    gamenight: {
        label: 'Game Night',
        expressions: GAME_NIGHT_EXPRESSIONS,
        total: TOTAL_GAME_NIGHT_EXPRESSIONS,
        perDay: GAME_NIGHT_EXPRESSIONS_PER_DAY,
        dayIds: GAME_NIGHT_DAY_IDS,
        dayLabels: {
            1: 'The Setup',
            2: 'The Game Begins',
            3: 'The Unraveling',
            4: 'The Fight & Fix',
            5: 'Morning After',
        },
        speakerColors: {
            Marcus: '#DC2626',
            Jess: '#EC4899',
            Trent: '#F59E0B',
            Nina: '#6366F1',
            Devon: '#10B981',
            Priya: '#F97316',
        },
        source: 'Game Night Gone Wrong',
        findLineIndex: findGameNightExpressionLineIndex,
        getEntries: () => gameNightEntries,
    },
    antiques: {
        label: 'Antiques House Call',
        expressions: ANTIQUES_EXPRESSIONS,
        total: TOTAL_ANTIQUES_EXPRESSIONS,
        perDay: ANTIQUES_EXPRESSIONS_PER_DAY,
        dayIds: ANTIQUES_DAY_IDS,
        dayLabels: {
            1: 'The Garage Door Opens',
            2: "Ray's Appraisal Hour",
            3: 'The Lockbox',
            4: 'Keep, Sell, or Donate',
            5: "Ida's Last Surprise",
        },
        speakerColors: {
            'Uncle Ray': '#B45309',
            Nadia: '#0891B2',
            Dex: '#7C3AED',
            'Aunt Margot': '#DB2777',
            Cody: '#4B5563',
            Pearl: '#B91C1C',
        },
        source: 'Antiques House Call',
        findLineIndex: findAntiquesExpressionLineIndex,
        getEntries: () => antiquesHouseEntries,
    },
    bucketlist: {
        label: 'Bucket List Trip',
        expressions: BUCKET_LIST_EXPRESSIONS,
        total: TOTAL_BUCKET_LIST_EXPRESSIONS,
        perDay: BUCKET_LIST_EXPRESSIONS_PER_DAY,
        dayIds: BUCKET_LIST_DAY_IDS,
        dayLabels: {
            1: 'The Drive',
            2: 'The First Hike',
            3: 'The Deeper Trail',
            4: 'The Sunset',
            5: 'The Last Morning',
        },
        speakerColors: {
            Gary: '#78716C',
            Linda: '#EC4899',
            Javi: '#F59E0B',
            Earl: '#2563EB',
            Dot: '#10B981',
            Megan: '#8B5CF6',
        },
        source: 'Bucket List Trip',
        findLineIndex: findBucketListExpressionLineIndex,
        getEntries: () => bucketListTripEntries,
    },
    bbq: {
        label: 'Neighborhood BBQ',
        expressions: BBQ_EXPRESSIONS,
        total: TOTAL_BBQ_EXPRESSIONS,
        perDay: BBQ_EXPRESSIONS_PER_DAY,
        dayIds: BBQ_DAY_IDS,
        dayLabels: {
            1: 'Arrivals',
            2: 'Grill Wars',
            3: 'Side Dish Battle',
            4: 'Beers & Truths',
            5: 'Sunset',
        },
        speakerColors: {
            'Big Dave': '#B45309',
            Tammy: '#EC4899',
            Ken: '#2563EB',
            Yuko: '#0891B2',
            Sota: '#F59E0B',
            Hank: '#78716C',
            Cheryl: '#DB2777',
            Tyler: '#6366F1',
            Brenda: '#10B981',
            Captain: '#D97706',
        },
        source: 'Neighborhood Barbecue',
        findLineIndex: findBbqExpressionLineIndex,
        getEntries: () => bbqNeighborhoodEntries,
    },
    blockparty: {
        label: 'Block Party Gone Wrong',
        expressions: BLOCK_PARTY_EXPRESSIONS,
        total: TOTAL_BLOCK_PARTY_EXPRESSIONS,
        perDay: BLOCK_PARTY_EXPRESSIONS_PER_DAY,
        dayIds: BLOCK_PARTY_DAY_IDS,
        dayLabels: {
            1: 'The Setup',
            2: 'Peak Hours',
            3: 'The Power Outage',
            4: 'The Bounce House Incident',
            5: 'The Morning After',
        },
        speakerColors: {
            Donna: '#B45309',
            Marcus: '#2563EB',
            Leticia: '#7C3AED',
            Reggie: '#78716C',
            Bri: '#EC4899',
            Tommy: '#6366F1',
            'Pastor Jim': '#10B981',
            Keiko: '#0891B2',
        },
        source: 'Block Party Gone Wrong',
        findLineIndex: findBlockPartyExpressionLineIndex,
        getEntries: () => blockPartyChaosEntries,
    },
    worstdate: {
        label: 'The Worst First Date',
        expressions: WORST_FIRST_DATE_EXPRESSIONS,
        total: TOTAL_WORST_DATE_EXPRESSIONS,
        perDay: WORST_DATE_EXPRESSIONS_PER_DAY,
        dayIds: WORST_DATE_DAY_IDS,
        dayLabels: {
            1: 'The Arrival',
            2: 'Dinner Disaster',
            3: 'The Great Escape',
            4: 'Curb Confessions',
            5: 'The Morning After',
        },
        speakerColors: {
            Jake: '#2563EB',
            Chloe: '#EC4899',
            Nate: '#F59E0B',
            Sasha: '#8B5CF6',
            Marco: '#78716C',
            Lydia: '#10B981',
        },
        source: 'The Worst First Date',
        findLineIndex: findWorstDateExpressionLineIndex,
        getEntries: () => worstFirstDateEntries,
    },
    homeinspection: {
        label: 'Home Inspection',
        expressions: HOME_INSPECTION_EXPRESSIONS,
        total: TOTAL_HOME_INSPECTION_EXPRESSIONS,
        perDay: HOME_INSPECTION_EXPRESSIONS_PER_DAY,
        dayIds: HOME_INSPECTION_DAY_IDS,
        dayLabels: {
            1: 'The Basement',
            2: 'The Roof & HVAC',
            3: 'The Negotiation',
            4: 'The Termite Twist',
            5: 'Closing Day',
        },
        speakerColors: {
            Marcus: '#2563EB',
            Jenna: '#EC4899',
            Bob: '#78350F',
            'Mrs. Patterson': '#7C3AED',
            Karen: '#10B981',
        },
        source: 'Home Inspection',
        findLineIndex: findHomeInspectionExpressionLineIndex,
        getEntries: () => homeInspectionEntries,
    },
    thanksgiving: {
        label: 'Thanksgiving Dinner',
        expressions: THANKSGIVING_EXPRESSIONS,
        total: TOTAL_THANKSGIVING_EXPRESSIONS,
        perDay: THANKSGIVING_EXPRESSIONS_PER_DAY,
        dayIds: THANKSGIVING_DAY_IDS,
        dayLabels: {
            1: 'The Arrivals',
            2: 'The Kitchen',
            3: 'The Dinner Table',
            4: 'The Football & The Fallout',
            5: 'Leftovers & Goodbyes',
        },
        speakerColors: {
            'Grandma Lorraine': '#B45309',
            Rick: '#2563EB',
            Carol: '#DB2777',
            'Aunt Pam': '#8B5CF6',
            Spencer: '#10B981',
            Brianna: '#F472B6',
            'Uncle Lou': '#78716C',
            'Grandpa Stan': '#D97706',
        },
        source: 'Thanksgiving Dinner',
        findLineIndex: findThanksgivingExpressionLineIndex,
        getEntries: () => thanksgivingDinnerEntries,
    },
    airport: {
        label: 'Airport Delay',
        expressions: AIRPORT_EXPRESSIONS,
        total: TOTAL_AIRPORT_EXPRESSIONS,
        perDay: AIRPORT_EXPRESSIONS_PER_DAY,
        dayIds: AIRPORT_DAY_IDS,
        dayLabels: {
            1: 'The First Delay',
            2: 'Cancelled',
            3: 'Overnight at Gate B12',
            4: 'The Standby List',
            5: 'Finally Boarding',
        },
        speakerColors: {
            Denise: '#0891B2',
            Reuben: '#1D4ED8',
            Hana: '#EC4899',
            Wendell: '#B45309',
            Simone: '#8B5CF6',
            Chad: '#EF4444',
            'Captain Ortiz': '#475569',
            Diego: '#10B981',
        },
        source: 'Airport Delay',
        findLineIndex: findAirportExpressionLineIndex,
        getEntries: () => airportDelayEntries,
    },
    emergencyroom: {
        label: 'ER Waiting Room',
        expressions: ER_EXPRESSIONS,
        total: TOTAL_ER_EXPRESSIONS,
        perDay: ER_EXPRESSIONS_PER_DAY,
        dayIds: ER_DAY_IDS,
        dayLabels: {
            1: 'The Triage',
            2: 'The Long Wait',
            3: 'Hour Four',
            4: 'Called Back',
            5: 'Discharged',
        },
        speakerColors: {
            'Nurse Tanya': '#0891B2',
            Dave: '#2563EB',
            Renata: '#EC4899',
            Walter: '#B45309',
            Destiny: '#8B5CF6',
            'Little Mateo': '#34D399',
            Brody: '#F59E0B',
            'Dr Osei': '#059669',
            Phil: '#78716C',
        },
        source: 'ER Waiting Room',
        findLineIndex: findErExpressionLineIndex,
        getEntries: () => erWaitingRoomEntries,
    },
    dmv: {
        label: 'The DMV',
        expressions: DMV_EXPRESSIONS,
        total: TOTAL_DMV_EXPRESSIONS,
        perDay: DMV_EXPRESSIONS_PER_DAY,
        dayIds: DMV_DAY_IDS,
        dayLabels: {
            1: 'Take a Number',
            2: 'The Wrong Form',
            3: 'The Eye Test',
            4: 'The Road Test',
            5: 'Smile for the Camera',
        },
        speakerColors: {
            Gloria: '#0891B2',
            Tony: '#2563EB',
            Brenda: '#8B5CF6',
            Kevin: '#F59E0B',
            'Mr Okafor': '#059669',
            Patrice: '#EC4899',
            Vernon: '#B45309',
        },
        source: 'The DMV',
        findLineIndex: findDmvExpressionLineIndex,
        getEntries: () => dmvRenewalEntries,
    },
    juryduty: {
        label: 'Jury Duty',
        expressions: JURY_DUTY_EXPRESSIONS,
        total: TOTAL_JURY_DUTY_EXPRESSIONS,
        perDay: JURY_DUTY_EXPRESSIONS_PER_DAY,
        dayIds: JURY_DUTY_DAY_IDS,
        dayLabels: {
            1: 'The Summons',
            2: 'Voir Dire',
            3: 'The Trial',
            4: 'The Deliberation',
            5: 'The Verdict',
        },
        speakerColors: {
            Wanda: '#B45309',
            Trevor: '#2563EB',
            Aisha: '#0891B2',
            Doug: '#EF4444',
            'Judge Halloran': '#475569',
            'Bailiff Reyes': '#78716C',
            Mei: '#8B5CF6',
        },
        source: 'Jury Duty',
        findLineIndex: findJuryDutyExpressionLineIndex,
        getEntries: () => juryDutyEntries,
    },
    campingtrip: {
        label: 'The Camping Trip',
        expressions: CAMPING_TRIP_EXPRESSIONS,
        total: TOTAL_CAMPING_TRIP_EXPRESSIONS,
        perDay: CAMPING_TRIP_EXPRESSIONS_PER_DAY,
        dayIds: CAMPING_TRIP_DAY_IDS,
        dayLabels: {
            1: 'Setting Up Camp',
            2: 'The Hike',
            3: 'The Storm',
            4: 'The Bear',
            5: 'Breaking Camp',
        },
        speakerColors: {
            Hank: '#B45309',
            Sandra: '#DB2777',
            Logan: '#2563EB',
            Ruby: '#EC4899',
            'Ranger Dawn': '#059669',
            'Uncle Dale': '#78716C',
        },
        source: 'The Camping Trip',
        findLineIndex: findCampingTripExpressionLineIndex,
        getEntries: () => campingTripEntries,
    },
    roadtrip: {
        label: 'The Great American Road Trip',
        expressions: ROAD_TRIP_EXPRESSIONS,
        total: TOTAL_ROAD_TRIP_EXPRESSIONS,
        perDay: ROAD_TRIP_EXPRESSIONS_PER_DAY,
        dayIds: ROAD_TRIP_DAY_IDS,
        dayLabels: {
            1: 'Leaving New Jersey',
            2: 'The Diner',
            3: 'The Big City',
            4: 'The Cornfields',
            5: 'The Faces & The Motel',
            6: 'Yellowstone',
            7: 'Stranded',
            8: 'Las Vegas',
            9: 'The Last Night',
            10: 'The Pacific',
        },
        speakerColors: {
            Walt: '#B45309',
            Roy: '#2563EB',
            Lori: '#DB2777',
            Paige: '#8B5CF6',
            Sam: '#10B981',
            Rhonda: '#0891B2',
            Flo: '#F59E0B',
            'Ranger Kim': '#059669',
            Duke: '#78716C',
            Bud: '#92400E',
        },
        source: 'The Great American Road Trip',
        findLineIndex: findRoadTripExpressionLineIndex,
        getEntries: () => roadTripEntries,
    },
    cruise: {
        label: 'The Honeymoon Cruise',
        expressions: CRUISE_EXPRESSIONS,
        total: TOTAL_CRUISE_EXPRESSIONS,
        perDay: CRUISE_EXPRESSIONS_PER_DAY,
        dayIds: CRUISE_DAY_IDS,
        dayLabels: {
            1: 'Embarkation Day',
            2: 'The Buffet',
            3: 'The Pool Deck',
            4: 'The First Port',
            5: 'Formal Night',
            6: 'The Storm',
            7: 'The Talent Show',
            8: 'The Snorkel Trip',
            9: 'The Vow Renewal',
            10: 'Disembarkation',
        },
        speakerColors: {
            Ben: '#2563EB',
            Kayla: '#EC4899',
            Marv: '#B45309',
            Arlene: '#DB2777',
            Cheryl: '#8B5CF6',
            Julian: '#F59E0B',
            Andres: '#10B981',
            'Captain Lund': '#475569',
            Tessa: '#0891B2',
        },
        source: 'The Honeymoon Cruise',
        findLineIndex: findCruiseExpressionLineIndex,
        getEntries: () => cruiseEntries,
    },
    wedding: {
        label: 'The Wedding Weekend',
        expressions: WEDDING_EXPRESSIONS,
        total: TOTAL_WEDDING_EXPRESSIONS,
        perDay: WEDDING_EXPRESSIONS_PER_DAY,
        dayIds: WEDDING_DAY_IDS,
        dayLabels: {
            1: 'Meeting the Family',
            2: 'The Rehearsal',
            3: 'The Rehearsal Dinner',
            4: 'The Welcome Brunch',
            5: 'The Seating Chart',
            6: 'The Morning Of',
            7: 'The Ceremony',
            8: 'The Toasts',
            9: 'The Reception',
            10: 'The Farewell Brunch',
        },
        speakerColors: {
            Yuki: '#EC4899',
            Chris: '#2563EB',
            Emily: '#DB2777',
            Dan: '#B45309',
            Carol: '#8B5CF6',
            Tyson: '#F59E0B',
            Priya: '#0891B2',
            Denise: '#475569',
            'Uncle Rick': '#78716C',
            'Nana Jo': '#059669',
        },
        source: 'The Wedding Weekend',
        findLineIndex: findWeddingExpressionLineIndex,
        getEntries: () => weddingEntries,
    },
    nightdocket: {
        label: 'The Night Docket',
        expressions: NIGHT_DOCKET_EXPRESSIONS,
        total: TOTAL_NIGHT_DOCKET_EXPRESSIONS,
        perDay: NIGHT_DOCKET_EXPRESSIONS_PER_DAY,
        dayIds: NIGHT_DOCKET_DAY_IDS,
        dayLabels: {
            1: 'The Brisket',
            2: 'The Brown Stain',
            3: 'The Painting',
            4: 'The Clipboard',
            5: 'The Monster',
        },
        speakerColors: {
            'Judge Halloran': '#475569',
            'Bailiff Reyes': '#7C3AED',
            'Dave Boyd': '#C0392B',
            Hank: '#B8941E',
            Tammy: '#DB2777',
            Cheryl: '#A855F7',
            Wanda: '#8B5CF6',
            Marcus: '#2563EB',
            Jenna: '#DB2777',
            'Mrs. Patterson': '#9D174D',
            Bob: '#78350F',
            Karen: '#10B981',
            Margot: '#BE185D',
            Dex: '#2563EB',
            Ray: '#B45309',
            Pearl: '#9D174D',
            Nadia: '#7C3AED',
            Cody: '#059669',
            Donna: '#EC4899',
            Tommy: '#059669',
            Reggie: '#EF4444',
            Devon: '#10B981',
            Bri: '#F472B6',
            Emma: '#A78BFA',
            Timmy: '#60A5FA',
            Greg: '#6366F1',
            Sarah: '#F472B6',
            Noah: '#34D399',
            Frank: '#D97706',
            Vernon: '#78716C',
            Flo: '#B45309',
        },
        source: 'The Night Docket',
        findLineIndex: findNightDocketExpressionLineIndex,
        getEntries: () => nightDocketEntries,
    },
    talentshow: {
        label: 'The Talent Show',
        expressions: TALENT_SHOW_EXPRESSIONS,
        total: TOTAL_TALENT_SHOW_EXPRESSIONS,
        perDay: TALENT_SHOW_EXPRESSIONS_PER_DAY,
        dayIds: TALENT_SHOW_DAY_IDS,
        dayLabels: {
            1: 'The Trumpet',
            2: 'The Complaint',
            3: 'The Calisthenics',
            4: 'The Lecture',
            5: 'The Bus',
        },
        speakerColors: {
            Julian: '#F59E0B',
            'Principal Henderson': '#334155',
            'Ms. Reyes': '#DB2777',
            'Judge Halloran': '#475569',
            Ray: '#B45309',
            'Old Man Gus': '#92400E',
            'Brandon Lee': '#CA8A04',
            'Big Pete': '#92400E',
            'Coach Daryl': '#B91C1C',
            'Coach Vega': '#0E7490',
            Tasha: '#DB2777',
            Paige: '#8B5CF6',
            Devon: '#10B981',
            'Grandpa Stan': '#D97706',
            Donna: '#EC4899',
            Brianna: '#F472B6',
            'Pastor Jim': '#4338CA',
            Leticia: '#7C3AED',
            Reggie: '#EF4444',
            Kenji: '#06B6D4',
            Ken: '#0369A1',
            Sota: '#0EA5E9',
            Hana: '#EC4899',
            Diego: '#10B981',
            Wendell: '#B45309',
            Jake: '#EF4444',
            Nate: '#EA580C',
            Chloe: '#BE185D',
            'Mr. Kowalski': '#57534E',
            Walt: '#B45309',
            Sam: '#10B981',
            Emma: '#A78BFA',
            Timmy: '#60A5FA',
            Derek: '#10B981',
            Marv: '#B45309',
            Arlene: '#DB2777',
            Duke: '#78716C',
        },
        source: 'The Talent Show',
        findLineIndex: findTalentShowExpressionLineIndex,
        getEntries: () => talentShowEntries,
    },
};

interface UserPhrase {
    id: string;
    phrase: string;
    type: string;
    meaning: string;
}

export default function ExpressionsPage() {
    const [activeSeries, setActiveSeries] = useState<SeriesKey>('party');
    const [search, setSearch] = useState('');
    const [dayFilter, setDayFilter] = useState<number | null>(null);
    const [speakerFilter, setSpeakerFilter] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [expandedIdx, setExpandedIdx] = useState<string | null>(null);

    // DB integration state
    const [registeredPhrases, setRegisteredPhrases] = useState<Set<string>>(new Set());
    const [loadingPhrases, setLoadingPhrases] = useState(true);
    const [registeringId, setRegisteringId] = useState<string | null>(null);
    const [flashId, setFlashId] = useState<string | null>(null);
    const [batchRegistering, setBatchRegistering] = useState(false);
    const [batchProgress, setBatchProgress] = useState({ current: 0, total: 0 });

    const config = SERIES_CONFIG[activeSeries];
    const CURRENT_EXPRESSIONS = config.expressions;
    const CURRENT_TOTAL = config.total;
    const CURRENT_PER_DAY = config.perDay;
    const CURRENT_DAY_IDS = config.dayIds;
    const DAY_LABELS = config.dayLabels;
    const SPEAKER_COLORS = config.speakerColors;
    const ALL_SPEAKERS = Object.keys(SPEAKER_COLORS);

    // Reset filters when switching series
    const switchSeries = (key: SeriesKey) => {
        setActiveSeries(key);
        setDayFilter(null);
        setSpeakerFilter(null);
        setSearch('');
        setExpandedIdx(null);
    };

    // Responsive check
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Fetch registered phrases from DB
    useEffect(() => {
        const fetchPhrases = async () => {
            try {
                const res = await fetch('/api/user-phrases');
                if (res.ok) {
                    const data = await res.json();
                    const phrases: UserPhrase[] = data.phrases || [];
                    setRegisteredPhrases(new Set(phrases.map(p => p.phrase.toLowerCase())));
                }
            } catch {
                // silently fail, show unregistered state
            } finally {
                setLoadingPhrases(false);
            }
        };
        fetchPhrases();
    }, []);

    const isRegistered = useCallback((expression: string) => {
        return registeredPhrases.has(expression.toLowerCase());
    }, [registeredPhrases]);

    const registeredCount = useMemo(() => {
        return CURRENT_EXPRESSIONS.filter(e => isRegistered(e.expression)).length;
    }, [isRegistered, CURRENT_EXPRESSIONS]);

    const registeredPerDay = useMemo(() => {
        const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        CURRENT_EXPRESSIONS.forEach(e => {
            if (isRegistered(e.expression)) counts[e.day]++;
        });
        return counts;
    }, [isRegistered, CURRENT_EXPRESSIONS]);

    // Register a single expression
    const registerExpression = async (expr: AnyExpression) => {
        const key = `${expr.expression}-${expr.day}`;
        if (isRegistered(expr.expression) || registeringId === key) return;
        setRegisteringId(key);
        try {
            const res = await fetch('/api/user-phrases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phrase: expr.expression,
                    type: 'expression',
                    meaning: expr.meaning,
                    example: expr.example,
                    source: `${config.source} Day ${expr.day}`,
                }),
            });
            if (res.ok || res.status === 409) {
                setRegisteredPhrases(prev => new Set(prev).add(expr.expression.toLowerCase()));
                setFlashId(key);
                setTimeout(() => setFlashId(null), 2000);
            }
        } finally {
            setRegisteringId(null);
        }
    };

    // Batch register all unregistered expressions
    const batchRegister = async () => {
        const unregistered = CURRENT_EXPRESSIONS.filter(e => !isRegistered(e.expression));
        if (unregistered.length === 0 || batchRegistering) return;
        setBatchRegistering(true);
        setBatchProgress({ current: 0, total: unregistered.length });

        for (let i = 0; i < unregistered.length; i++) {
            const expr = unregistered[i];
            setBatchProgress({ current: i + 1, total: unregistered.length });
            try {
                const res = await fetch('/api/user-phrases', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        phrase: expr.expression,
                        type: 'expression',
                        meaning: expr.meaning,
                        example: expr.example,
                        source: `${config.source} Day ${expr.day}`,
                    }),
                });
                if (res.ok || res.status === 409) {
                    setRegisteredPhrases(prev => new Set(prev).add(expr.expression.toLowerCase()));
                }
            } catch {
                // continue on failure
            }
        }
        setBatchRegistering(false);
    };

    // Build deep-link URL for Memoria
    const getMemoriaLink = useCallback((expr: AnyExpression): string => {
        const memoriaId = CURRENT_DAY_IDS[expr.day];
        if (!memoriaId) return `/memoria/${memoriaId}`;

        const entries = config.getEntries();
        const entry = entries.find((e: any) => e.id === memoriaId);
        if (!entry) return `/memoria/${memoriaId}?autoplay=true`;

        const lineIdx = config.findLineIndex(expr.expression, expr.speaker, entry.conversation.english);
        if (lineIdx >= 0) {
            return `/memoria/${memoriaId}?line=${lineIdx}&autoplay=true`;
        }
        return `/memoria/${memoriaId}?autoplay=true`;
    }, [config, CURRENT_DAY_IDS]);

    const filtered = useMemo(() => {
        let list = [...CURRENT_EXPRESSIONS];
        if (dayFilter !== null) {
            list = list.filter(e => e.day === dayFilter);
        }
        if (speakerFilter !== null) {
            list = list.filter(e => e.speaker === speakerFilter);
        }
        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter(e =>
                e.expression.toLowerCase().includes(q) ||
                e.meaning.toLowerCase().includes(q) ||
                e.meaningEn.toLowerCase().includes(q) ||
                e.speaker.toLowerCase().includes(q) ||
                e.example.toLowerCase().includes(q)
            );
        }
        return list;
    }, [search, dayFilter, speakerFilter, CURRENT_EXPRESSIONS]);

    const unregisteredCount = CURRENT_TOTAL - registeredCount;
    const progressPct = (registeredCount / CURRENT_TOTAL) * 100;

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#FAFAF9',
            padding: isMobile ? '16px' : '32px 40px',
        }}>
            <div style={{ maxWidth: '960px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    alignItems: isMobile ? 'flex-start' : 'center',
                    justifyContent: 'space-between',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? '12px' : '0',
                    marginBottom: '20px',
                }}>
                    <div>
                        <h1 style={{
                            fontSize: isMobile ? '22px' : '28px',
                            fontWeight: '700',
                            color: '#1C1917',
                            margin: 0,
                            letterSpacing: '-0.02em',
                        }}>
                            Slang & Expressions
                        </h1>
                        <p style={{
                            fontSize: '13px',
                            color: '#78716C',
                            margin: '4px 0 0 0',
                        }}>
                            {config.source} -- vocabulary tracker
                        </p>
                    </div>
                </div>

                {/* Series selector */}
                <div style={{
                    display: 'flex',
                    gap: '8px',
                    marginBottom: '16px',
                }}>
                    {(Object.keys(SERIES_CONFIG) as SeriesKey[]).map(key => {
                        const isActive = activeSeries === key;
                        return (
                            <button
                                key={key}
                                onClick={() => switchSeries(key)}
                                style={{
                                    padding: '8px 18px',
                                    fontSize: '13px',
                                    fontWeight: isActive ? '700' : '400',
                                    color: isActive ? '#fff' : '#57534E',
                                    backgroundColor: isActive ? '#D4AF37' : '#FFFFFF',
                                    border: '1px solid',
                                    borderColor: isActive ? '#D4AF37' : '#E7E5E4',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    transition: 'all 0.15s ease',
                                    boxShadow: isActive ? '0 2px 6px rgba(212,175,55,0.3)' : 'none',
                                }}
                            >
                                {SERIES_CONFIG[key].label}
                            </button>
                        );
                    })}
                </div>

                {/* Progress Stats */}
                <div style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E7E5E4',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    marginBottom: '16px',
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '10px',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                            <span style={{ fontSize: '22px', fontWeight: '700', color: '#10B981' }}>
                                {loadingPhrases ? '--' : registeredCount}
                            </span>
                            <span style={{ fontSize: '13px', color: '#78716C' }}>
                                / {CURRENT_TOTAL} registered
                            </span>
                        </div>
                        {!loadingPhrases && unregisteredCount > 0 && (
                            <button
                                onClick={batchRegister}
                                disabled={batchRegistering}
                                style={{
                                    padding: '6px 14px',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    color: batchRegistering ? '#78716C' : '#fff',
                                    backgroundColor: batchRegistering ? '#F5F5F4' : '#D4AF37',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: batchRegistering ? 'default' : 'pointer',
                                    transition: 'all 0.15s ease',
                                }}
                            >
                                {batchRegistering
                                    ? `${batchProgress.current}/${batchProgress.total}...`
                                    : `Register All (${unregisteredCount})`
                                }
                            </button>
                        )}
                        {!loadingPhrases && unregisteredCount === 0 && (
                            <span style={{ fontSize: '12px', fontWeight: '600', color: '#10B981' }}>
                                ALL REGISTERED
                            </span>
                        )}
                    </div>
                    {/* Progress bar */}
                    <div style={{
                        height: '6px',
                        backgroundColor: '#F5F5F4',
                        borderRadius: '3px',
                        overflow: 'hidden',
                        marginBottom: '10px',
                    }}>
                        <div style={{
                            height: '100%',
                            width: loadingPhrases ? '0%' : `${progressPct}%`,
                            backgroundColor: '#10B981',
                            borderRadius: '3px',
                            transition: 'width 0.3s ease',
                        }} />
                    </div>
                    {/* Per-day mini indicators */}
                    <div style={{
                        display: 'flex',
                        gap: isMobile ? '6px' : '12px',
                        flexWrap: 'wrap',
                    }}>
                        {[1, 2, 3, 4, 5].map(day => {
                            const regCount = registeredPerDay[day] || 0;
                            const pct = (regCount / CURRENT_PER_DAY) * 100;
                            return (
                                <div key={day} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    fontSize: '11px',
                                    color: '#78716C',
                                }}>
                                    <span style={{ fontWeight: '500' }}>D{day}</span>
                                    <div style={{
                                        width: '40px',
                                        height: '4px',
                                        backgroundColor: '#F5F5F4',
                                        borderRadius: '2px',
                                        overflow: 'hidden',
                                    }}>
                                        <div style={{
                                            height: '100%',
                                            width: `${pct}%`,
                                            backgroundColor: pct === 100 ? '#D4AF37' : '#10B981',
                                            borderRadius: '2px',
                                            transition: 'width 0.3s ease',
                                        }} />
                                    </div>
                                    <span style={{ fontVariantNumeric: 'tabular-nums', minWidth: '28px' }}>
                                        {loadingPhrases ? '--' : `${regCount}/${CURRENT_PER_DAY}`}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Day filter chips */}
                <div style={{
                    display: 'flex',
                    gap: '8px',
                    marginBottom: '12px',
                    flexWrap: 'wrap',
                }}>
                    <button
                        onClick={() => setDayFilter(null)}
                        style={{
                            padding: '6px 14px',
                            fontSize: '13px',
                            fontWeight: dayFilter === null ? '600' : '400',
                            color: dayFilter === null ? '#fff' : '#57534E',
                            backgroundColor: dayFilter === null ? '#10B981' : '#F5F5F4',
                            border: '1px solid',
                            borderColor: dayFilter === null ? '#10B981' : '#E7E5E4',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                        }}
                    >
                        All Days
                    </button>
                    {[1, 2, 3, 4, 5].map(day => (
                        <button
                            key={day}
                            onClick={() => setDayFilter(dayFilter === day ? null : day)}
                            style={{
                                padding: '6px 14px',
                                fontSize: '13px',
                                fontWeight: dayFilter === day ? '600' : '400',
                                color: dayFilter === day ? '#fff' : '#57534E',
                                backgroundColor: dayFilter === day ? '#10B981' : '#F5F5F4',
                                border: '1px solid',
                                borderColor: dayFilter === day ? '#10B981' : '#E7E5E4',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease',
                            }}
                        >
                            Day {day}
                        </button>
                    ))}
                </div>

                {/* Speaker filter chips */}
                <div style={{
                    display: 'flex',
                    gap: '6px',
                    marginBottom: '16px',
                    flexWrap: 'wrap',
                }}>
                    <button
                        onClick={() => setSpeakerFilter(null)}
                        style={{
                            padding: '4px 10px',
                            fontSize: '11px',
                            fontWeight: speakerFilter === null ? '600' : '400',
                            color: speakerFilter === null ? '#fff' : '#78716C',
                            backgroundColor: speakerFilter === null ? '#78716C' : 'transparent',
                            border: '1px solid',
                            borderColor: speakerFilter === null ? '#78716C' : '#D6D3D1',
                            borderRadius: '14px',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                        }}
                    >
                        All Speakers
                    </button>
                    {ALL_SPEAKERS.map(speaker => {
                        const color = SPEAKER_COLORS[speaker];
                        const isActive = speakerFilter === speaker;
                        return (
                            <button
                                key={speaker}
                                onClick={() => setSpeakerFilter(isActive ? null : speaker)}
                                style={{
                                    padding: '4px 10px',
                                    fontSize: '11px',
                                    fontWeight: isActive ? '600' : '400',
                                    color: isActive ? '#fff' : color,
                                    backgroundColor: isActive ? color : 'transparent',
                                    border: '1px solid',
                                    borderColor: isActive ? color : '#E7E5E4',
                                    borderRadius: '14px',
                                    cursor: 'pointer',
                                    transition: 'all 0.15s ease',
                                }}
                            >
                                {speaker}
                            </button>
                        );
                    })}
                </div>

                {/* Search */}
                <div style={{ marginBottom: '20px' }}>
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search expressions, meanings, speakers..."
                        style={{
                            width: '100%',
                            padding: '12px 16px',
                            fontSize: '14px',
                            border: '1px solid #D6D3D1',
                            borderRadius: '10px',
                            backgroundColor: '#FFFFFF',
                            color: '#1C1917',
                            outline: 'none',
                            boxSizing: 'border-box',
                            transition: 'border-color 0.15s ease',
                        }}
                        onFocus={e => e.target.style.borderColor = '#10B981'}
                        onBlur={e => e.target.style.borderColor = '#D6D3D1'}
                    />
                    {search && (
                        <div style={{
                            fontSize: '12px',
                            color: '#78716C',
                            marginTop: '6px',
                            paddingLeft: '4px',
                        }}>
                            {filtered.length} results found
                        </div>
                    )}
                </div>

                {/* Table */}
                {filtered.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '48px 16px',
                        color: '#A8A29E',
                        fontSize: '14px',
                    }}>
                        {search || speakerFilter ? 'No expressions match your filters.' : 'No expressions found.'}
                    </div>
                ) : (
                    <div style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E7E5E4',
                        borderRadius: '12px',
                        overflow: 'hidden',
                    }}>
                        {/* Table Header (desktop) */}
                        {!isMobile && (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '36px 1fr 100px 48px 80px',
                                padding: '12px 16px',
                                backgroundColor: '#F5F5F4',
                                borderBottom: '1px solid #E7E5E4',
                                fontSize: '11px',
                                fontWeight: '600',
                                color: '#78716C',
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase' as const,
                            }}>
                                <div></div>
                                <div>Expression</div>
                                <div>Speaker</div>
                                <div style={{ textAlign: 'center' }}>Day</div>
                                <div style={{ textAlign: 'right' }}>Actions</div>
                            </div>
                        )}

                        {/* Rows */}
                        {filtered.map((entry, i) => {
                            const key = `${entry.expression}-${entry.day}`;
                            const isExpanded = expandedIdx === key;
                            const registered = isRegistered(entry.expression);
                            const isRegistering = registeringId === key;
                            const isFlashing = flashId === key;

                            return (
                                <div key={key}>
                                    {/* Main row */}
                                    <div
                                        onClick={() => setExpandedIdx(isExpanded ? null : key)}
                                        style={{
                                            display: isMobile ? 'flex' : 'grid',
                                            gridTemplateColumns: isMobile ? undefined : '36px 1fr 100px 48px 80px',
                                            flexDirection: isMobile ? 'column' : undefined,
                                            padding: isMobile ? '12px 16px' : '10px 16px',
                                            borderBottom: (isExpanded || i < filtered.length - 1) ? '1px solid #F5F5F4' : 'none',
                                            backgroundColor: isFlashing
                                                ? '#ECFDF5'
                                                : isExpanded
                                                    ? '#FAFAF9'
                                                    : i % 2 === 0 ? '#FFFFFF' : '#FAFAF9',
                                            alignItems: isMobile ? 'flex-start' : 'center',
                                            gap: isMobile ? '4px' : '0',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.2s ease',
                                        }}
                                    >
                                        {isMobile ? (
                                            <>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    width: '100%',
                                                }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        {/* Status indicator */}
                                                        <span style={{
                                                            width: '8px',
                                                            height: '8px',
                                                            borderRadius: '50%',
                                                            backgroundColor: registered ? '#10B981' : '#D6D3D1',
                                                            flexShrink: 0,
                                                        }} />
                                                        <span style={{
                                                            fontSize: '14px',
                                                            fontWeight: '600',
                                                            color: '#1C1917',
                                                        }}>
                                                            {entry.expression}
                                                        </span>
                                                    </div>
                                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                                        <span style={{
                                                            fontSize: '11px',
                                                            color: SPEAKER_COLORS[entry.speaker] || '#78716C',
                                                            fontWeight: '600',
                                                        }}>
                                                            {entry.speaker}
                                                        </span>
                                                        <span style={{
                                                            fontSize: '11px',
                                                            color: '#10B981',
                                                            fontWeight: '600',
                                                        }}>
                                                            D{entry.day}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div style={{ fontSize: '13px', color: '#57534E', paddingLeft: '16px' }}>
                                                    {entry.meaning}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                {/* Status dot */}
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <span style={{
                                                        width: '8px',
                                                        height: '8px',
                                                        borderRadius: '50%',
                                                        backgroundColor: registered ? '#10B981' : '#D6D3D1',
                                                    }} />
                                                </div>

                                                {/* Expression + meaning */}
                                                <div>
                                                    <div style={{
                                                        fontSize: '14px',
                                                        fontWeight: '600',
                                                        color: '#1C1917',
                                                        lineHeight: '1.4',
                                                    }}>
                                                        {entry.expression}
                                                    </div>
                                                    <div style={{
                                                        fontSize: '12px',
                                                        color: '#78716C',
                                                        marginTop: '1px',
                                                    }}>
                                                        {entry.meaning}
                                                    </div>
                                                </div>

                                                {/* Speaker */}
                                                <div style={{
                                                    fontSize: '12px',
                                                    fontWeight: '600',
                                                    color: SPEAKER_COLORS[entry.speaker] || '#78716C',
                                                }}>
                                                    {entry.speaker}
                                                </div>

                                                {/* Day */}
                                                <div style={{
                                                    fontSize: '12px',
                                                    color: '#10B981',
                                                    fontWeight: '600',
                                                    textAlign: 'center',
                                                }}>
                                                    {entry.day}
                                                </div>

                                                {/* Actions */}
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'flex-end',
                                                    gap: '4px',
                                                }}>
                                                    {/* Play in Memoria */}
                                                    <Link
                                                        href={getMemoriaLink(entry)}
                                                        onClick={e => e.stopPropagation()}
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            width: '28px',
                                                            height: '28px',
                                                            borderRadius: '6px',
                                                            backgroundColor: 'transparent',
                                                            border: '1px solid #E7E5E4',
                                                            color: '#D4AF37',
                                                            textDecoration: 'none',
                                                            transition: 'all 0.15s ease',
                                                        }}
                                                        title={`Play in Memoria Day ${entry.day}`}
                                                    >
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M8 5v14l11-7z" />
                                                        </svg>
                                                    </Link>

                                                    {/* Register / Registered */}
                                                    {registered ? (
                                                        <span style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            width: '28px',
                                                            height: '28px',
                                                            color: '#10B981',
                                                            fontSize: '14px',
                                                        }} title="Registered">
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                                            </svg>
                                                        </span>
                                                    ) : (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                registerExpression(entry);
                                                            }}
                                                            disabled={isRegistering}
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                width: '28px',
                                                                height: '28px',
                                                                borderRadius: '6px',
                                                                backgroundColor: 'transparent',
                                                                border: '1px solid #E7E5E4',
                                                                color: isRegistering ? '#A8A29E' : '#10B981',
                                                                cursor: isRegistering ? 'default' : 'pointer',
                                                                fontSize: '14px',
                                                                transition: 'all 0.15s ease',
                                                                padding: 0,
                                                            }}
                                                            title="+Vocab"
                                                        >
                                                            {isRegistering ? '...' : '+'}
                                                        </button>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Expanded detail */}
                                    {isExpanded && (
                                        <div style={{
                                            padding: isMobile ? '12px 16px' : '12px 16px 12px 52px',
                                            backgroundColor: '#FAFAF9',
                                            borderBottom: i < filtered.length - 1 ? '1px solid #F5F5F4' : 'none',
                                        }}>
                                            {/* English meaning */}
                                            <div style={{
                                                fontSize: '13px',
                                                color: '#57534E',
                                                marginBottom: '8px',
                                            }}>
                                                <span style={{ fontWeight: '600', color: '#78716C', fontSize: '11px', letterSpacing: '0.03em' }}>EN: </span>
                                                {entry.meaningEn}
                                            </div>

                                            {/* Example sentence */}
                                            <div style={{
                                                fontSize: '13px',
                                                color: '#1C1917',
                                                backgroundColor: '#FFFFFF',
                                                border: '1px solid #E7E5E4',
                                                borderRadius: '8px',
                                                padding: '10px 14px',
                                                lineHeight: '1.5',
                                                marginBottom: '10px',
                                                borderLeft: `3px solid ${SPEAKER_COLORS[entry.speaker] || '#D6D3D1'}`,
                                            }}>
                                                <span style={{
                                                    fontSize: '11px',
                                                    color: SPEAKER_COLORS[entry.speaker] || '#78716C',
                                                    fontWeight: '600',
                                                    marginRight: '6px',
                                                }}>
                                                    {entry.speaker}:
                                                </span>
                                                &ldquo;{entry.example}&rdquo;
                                            </div>

                                            {/* Action buttons */}
                                            <div style={{
                                                display: 'flex',
                                                gap: '8px',
                                                alignItems: 'center',
                                                flexWrap: 'wrap',
                                            }}>
                                                <Link
                                                    href={getMemoriaLink(entry)}
                                                    style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '6px',
                                                        padding: '6px 12px',
                                                        fontSize: '12px',
                                                        fontWeight: '600',
                                                        color: '#D4AF37',
                                                        backgroundColor: '#FFFBEB',
                                                        border: '1px solid #FDE68A',
                                                        borderRadius: '8px',
                                                        textDecoration: 'none',
                                                        transition: 'all 0.15s ease',
                                                    }}
                                                >
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                    Play in Memoria
                                                </Link>

                                                {registered ? (
                                                    <span style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '4px',
                                                        padding: '6px 12px',
                                                        fontSize: '12px',
                                                        fontWeight: '600',
                                                        color: '#10B981',
                                                        backgroundColor: '#ECFDF5',
                                                        border: '1px solid #10B981',
                                                        borderRadius: '8px',
                                                    }}>
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                                        </svg>
                                                        Registered
                                                    </span>
                                                ) : (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            registerExpression(entry);
                                                        }}
                                                        disabled={isRegistering}
                                                        style={{
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '4px',
                                                            padding: '6px 12px',
                                                            fontSize: '12px',
                                                            fontWeight: '600',
                                                            color: isRegistering ? '#78716C' : '#fff',
                                                            backgroundColor: isRegistering ? '#F5F5F4' : '#10B981',
                                                            border: 'none',
                                                            borderRadius: '8px',
                                                            cursor: isRegistering ? 'default' : 'pointer',
                                                            transition: 'all 0.15s ease',
                                                        }}
                                                    >
                                                        {isRegistering ? 'Saving...' : '+Vocab'}
                                                    </button>
                                                )}

                                                <span style={{
                                                    fontSize: '11px',
                                                    color: '#A8A29E',
                                                    marginLeft: '4px',
                                                }}>
                                                    Day {entry.day} -- {DAY_LABELS[entry.day]}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Footer */}
                <div style={{
                    textAlign: 'center',
                    padding: '20px 0',
                    fontSize: '12px',
                    color: '#A8A29E',
                }}>
                    {filtered.length === CURRENT_TOTAL
                        ? `${CURRENT_TOTAL} expressions total`
                        : `Showing ${filtered.length} of ${CURRENT_TOTAL} expressions`
                    }
                </div>
            </div>
        </div>
    );
}
