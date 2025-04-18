interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
}
interface Location {
    zip_code: string
    latitude: number
    longitude: number
    city: string
    state: string
    county: string
}
interface Coordinates {
    lat: number;
    lon: number;
}

interface DogCardObj{
    dogObject: Dog;
    showFav: boolean;
}

export type {Dog, Location, Coordinates, DogCardObj};