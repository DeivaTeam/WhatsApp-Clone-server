import { createTestClient } from 'apollo-server-testing'
import { ApolloServer, gql } from 'apollo-server-express'
import schema from '../../schema'
import { pool } from '../../db'
import sql from 'sql-template-strings'

describe('Query.chat', () => {
  it('should fetch specified chat', async () => {
    const { rows } = await pool.query(sql`SELECT * FROM users WHERE id = '1'`)
    const currentUser = rows[0]
    const server = new ApolloServer({
      schema,
      context: () => ({
        currentUser,
      }),
    })

    const { query } = createTestClient(server)

    const res = await query({
      variables: { chatId: '1' },
      query: gql `
        query GetChat($chatId: ID!) {
          chat(chatId: $chatId) {
            id
            name
            picture
            lastMessage {
              id
              content
              createdAt
            }
          }
        }
      `,
    })

    expect(res.data).toBeDefined()
    expect(res.errors).toBeUndefined()
    expect(res.data).toMatchSnapshot()
  })
})
