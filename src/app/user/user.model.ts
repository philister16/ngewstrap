export interface User {
    uid: string;
    email?: string;
    emailVerified?: boolean;
    userInfos?: UserInfos;
}

export interface UserInfos {
    gender?: string;
    firstname?: string;
    lastname?: string;
    address?: string;
    address2?: string;
    postalCode?: string;
    city?: string;
    state?: string;
    country?: string;
}
