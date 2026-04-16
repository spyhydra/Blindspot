export type { ButtonProps } from "./component.types";

export interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
}

export interface WaitlistPayload {
    email: string;
}

export interface NavLink {
    label: string;
    href: string;
}
