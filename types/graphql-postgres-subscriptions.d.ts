declare module 'graphql-postgres-subscriptions' {
    import { PubSub } from "graphql-subscriptions";
    export class PostgresPubSub extends PubSub {
        constructor(options ?: any)
    }
}
