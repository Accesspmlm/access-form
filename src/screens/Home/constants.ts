import { Categories, Category, Days, Industries, Tag, Tags } from "./types";

export const inputs = [
  {
    id: "1",
    name: "name",
    placeholder: "Nombre",
    type: "text",
    valueAsNumber: false,
  },
  {
    id: "2",
    name: "descriptionEs",
    placeholder: "Descripción Español",
    type: "text",
    valueAsNumber: false,
  },
  {
    id: "3",
    name: "descriptionEn",
    placeholder: "Descripción Inglés",
    type: "text",
    valueAsNumber: false,
  },
  {
    id: "4",
    name: "phone",
    placeholder: "Teléfono",
    type: "number",
    valueAsNumber: true,
  },
  {
    id: "5",
    name: "facebook",
    placeholder: "Facebook",
    type: "text",
    valueAsNumber: false,
  },
  {
    id: "6",
    name: "lat",
    placeholder: "Latitud",
    type: "number",
    valueAsNumber: true,
  },
  {
    id: "7",
    name: "lng",
    placeholder: "Longitud",
    type: "number",
    valueAsNumber: true,
  },
  {
    id: "8",
    name: "ubication",
    placeholder: "Ubicación",
    type: "text",
    valueAsNumber: false,
  },
];

export const DAYS: Days[] = [
  { label: "Todos", name: "all" },
  { label: "L", name: "monday" },
  { label: "M", name: "tuesday" },
  { label: "M", name: "wednesday" },
  { label: "J", name: "thursday" },
  { label: "V", name: "friday" },
  { label: "S", name: "saturday" },
  { label: "D", name: "sunday" },
];

export const CATEGORIES_RESTAURANTS: Category[] = [
  { name: "italian", label: "Italiana" },
  { name: "mexican", label: "Mexicana" },
  { name: "chinese", label: "China" },
  { name: "japanese", label: "Japonesa" },
  { name: "american", label: "Americana" },
  { name: "french", label: "Francesa" },
  { name: "indian", label: "India" },
  { name: "thai", label: "Tailandesa" },
  { name: "mediterranean", label: "Mediterránea" },
  { name: "vegetarian", label: "Vegetariana" },
];

export const CATEGORIES_HOTELS: Category[] = [
  { name: "boutique", label: "Boutique" },
  { name: "luxury", label: "Lujo" },
  { name: "budget", label: "Económico" },
  { name: "business", label: "Negocios" },
  { name: "resort", label: "Resort" },
  { name: "family_friendly", label: "Familiar" },
  { name: "romantic", label: "Romántico" },
  { name: "all_inclusive", label: "Todo incluido" },
];

export const CATEGORIES: Categories = {
  restaurants: CATEGORIES_RESTAURANTS,
  hotels: CATEGORIES_HOTELS,
};

export const RESTAURANT_TAGS: Tag[] = [
  { name: "family_friendly", label: "Familiar" },
  { name: "pet_friendly", label: "Acepta mascotas" },
  { name: "outdoor_seating", label: "Terraza" },
  { name: "live_music", label: "Música en vivo" },
  { name: "wifi_available", label: "Wifi disponible" },
  { name: "delivery", label: "Servicio a domicilio" },
  { name: "takeaway", label: "Para llevar" },
  { name: "vegetarian_options", label: "Opciones vegetarianas" },
  { name: "vegan_options", label: "Opciones veganas" },
  { name: "gluten_free_options", label: "Opciones sin gluten" },
];

export const HOTEL_TAGS: Tag[] = [
  { name: "pool", label: "Piscina" },
  { name: "spa", label: "Spa" },
  { name: "gym", label: "Gimnasio" },
  { name: "free_breakfast", label: "Desayuno gratis" },
  { name: "free_parking", label: "Estacionamiento gratuito" },
  { name: "conference_rooms", label: "Salas de conferencias" },
  { name: "pet_friendly", label: "Acepta mascotas" },
  { name: "airport_shuttle", label: "Transporte al aeropuerto" },
  { name: "ocean_view", label: "Vista al mar" },
  { name: "kids_club", label: "Club infantil" },
];

export const TAGS: Tags = {
  restaurants: RESTAURANT_TAGS,
  hotels: HOTEL_TAGS,
};

export const INDUSTRIES: Industries[] = [
  { name: "restaurants", label: "Restaurantes" },
  { name: "hotels", label: "Hoteles" },
  { name: "transport", label: "Transporte" },
  { name: "stores", label: "Tiendas" },
  { name: "tours", label: "Tours" },
];
