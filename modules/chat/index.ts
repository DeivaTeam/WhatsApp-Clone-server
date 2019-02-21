import { GraphQLModule } from '@graphql-modules/core';
import { loadResolversFiles, loadSchemaFiles } from 'graphql-toolkit';
import { UserModule } from '../user';
import { ChatProvider } from './providers/chat.provider';
import { CommonModule } from '../common';
import { ProviderScope } from '@graphql-modules/di';

export const ChatModule = new GraphQLModule({
  name: "Chat",
  imports: [
    CommonModule,
    UserModule,
  ],
  providers: [
    ChatProvider,
  ],
  defaultProviderScope: ProviderScope.Session,
  typeDefs: loadSchemaFiles(__dirname + '/schema/'),
  resolvers: loadResolversFiles(__dirname + '/resolvers/'),
});
