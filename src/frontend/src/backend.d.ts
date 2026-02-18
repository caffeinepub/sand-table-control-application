import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Pattern {
    thumbnail?: string;
    name: string;
    createdAt: Time;
    gCode: string;
    ledPresets?: LEDPreset;
}
export interface UserProfile {
    name: string;
}
export interface LEDPreset {
    color: string;
    brightness: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createPattern(name: string, gCode: string): Promise<void>;
    deletePattern(name: string): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getPattern(name: string): Promise<Pattern>;
    getPatternCount(): Promise<bigint>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listPatterns(): Promise<Array<Pattern>>;
    patternExists(name: string): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    savePattern(pattern: Pattern): Promise<void>;
    updatePatternLEDs(name: string, leds: LEDPreset): Promise<void>;
    updatePatternThumbnail(name: string, thumbnail: string): Promise<void>;
}
