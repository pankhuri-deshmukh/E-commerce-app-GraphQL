declare global {
    namespace NodeJS {
        interface ProcessEnv{
            PROTECTED_STRING : string,
            DB_USERNAME : string,
            DB_PASSWORD : string,
        }
    }
}

export {}