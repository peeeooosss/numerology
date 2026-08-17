export const SERVICE_TYPES = ["numerology", "name-balancing"] as const;

export type ServiceType = (typeof SERVICE_TYPES)[number];

export type ServiceDefinition = {
  type: ServiceType;
  name: string;
  shortName: string;
  description: string;
  durationMinutes: number;
  price: number;
  focusArea: string;
};

export const SERVICES: Record<ServiceType, ServiceDefinition> = {
  numerology: {
    type: "numerology",
    name: "Numerology Consultation",
    shortName: "Numerology",
    description: "A focused reading for decisions, timing, relationships, and personal direction.",
    durationMinutes: 15,
    price: 999,
    focusArea: "Personal growth",
  },
  "name-balancing": {
    type: "name-balancing",
    name: "Name Balancing Consultation",
    shortName: "Name Balancing",
    description: "Compare your current name and possible variations through the selected numerology method.",
    durationMinutes: 10,
    price: 499,
    focusArea: "Name balancing",
  },
};

export function getService(type?: string | null): ServiceDefinition {
  return SERVICES[type as ServiceType] ?? SERVICES.numerology;
}

export function isServiceType(value: string): value is ServiceType {
  return SERVICE_TYPES.includes(value as ServiceType);
}
