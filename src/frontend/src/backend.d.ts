import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface TopicProgress {
    topic: Topic;
    quizScore: bigint;
    lessonsCompleted: bigint;
}
export type Time = bigint;
export interface QuizAttempt {
    topic: Topic;
    isCorrect: boolean;
    timestamp: Time;
    questionId: string;
    selectedAnswer: string;
}
export interface UserProfile {
    name: string;
}
export enum Topic {
    newtons_first_law = "newtons_first_law",
    newtons_third_law = "newtons_third_law",
    tension_force = "tension_force",
    free_body_diagram = "free_body_diagram",
    newtons_second_law = "newtons_second_law"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllQuizAttempts(): Promise<Array<[Principal, Array<QuizAttempt>]>>;
    getAllTopicProgress(): Promise<Array<[Principal, Array<TopicProgress>]>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getUserQuizHistory(user: Principal): Promise<Array<QuizAttempt>>;
    getUserTopicProgress(user: Principal): Promise<Array<TopicProgress>>;
    isCallerAdmin(): Promise<boolean>;
    recordQuizAttempt(attempt: QuizAttempt): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateTopicProgress(progress: TopicProgress): Promise<void>;
}
