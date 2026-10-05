import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../simple-reporter';

describe('Json Placeholder', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://jsonplaceholder.typicode.com';

  p.request.setDefaultTimeout(30000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  describe('POSTS', () => {
    it('criar um novo post', async () => {
      await p
        .spec()
        .post(`${baseUrl}/posts`)
        .withJson({
          userId: 1,
          title: 'bootcamp api',
          body: 'criando novos testes de api'
        })
        .expectStatus(StatusCodes.CREATED);
    });

    it('buscar um post existente', async () => {
      await p
        .spec()
        .get(`${baseUrl}/posts/1`)
        .expectStatus(StatusCodes.OK);
    });

    it('atualizar um post existente', async () => {
      await p
        .spec()
        .put(`${baseUrl}/posts/1`)
        .withJson({
          id: 1,
          userId: 1,
          title: 'post atualizado',
          body: 'atualizando teste de api'
        })
        .expectStatus(StatusCodes.OK);
    });

    it('excluir um post', async () => {
      await p
        .spec()
        .delete(`${baseUrl}/posts/1`)
        .expectStatus(StatusCodes.OK);
    });
  });

  describe('ALBUMS', () => {
    it('criar um novo album', async () => {
      await p
        .spec()
        .post(`${baseUrl}/albums`)
        .withJson({
          userId: 1,
          title: 'album do bootcamp'
        })
        .expectStatus(StatusCodes.CREATED);
    });
  });
});