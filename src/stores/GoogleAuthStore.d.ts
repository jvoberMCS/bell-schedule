export type GoogleProfile = {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
    hd: string;
};
export declare const BlankGoogleProfile: {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
    hd: string;
};
interface State {
    isLoggedIn: boolean;
    setIsLoggedIn: (loginStatus: boolean) => void;
    googleProfile: GoogleProfile | null;
    setGoogleProfile: (newGoogleProfile: GoogleProfile | null) => void;
}
export declare const useGoogleAuthStore: import("zustand").UseBoundStore<import("zustand").StoreApi<State>>;
export {};
