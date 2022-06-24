export interface User {
    isActive: boolean;
    userId: string;
    metaData: Record<string, string>;
    nickname: string;
    profileUrl: string;
}
