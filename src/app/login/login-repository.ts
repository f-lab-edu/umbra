import { umbraApi } from '@/lib/umbraApi';
import { convertSnakeToCamelCase } from '@/lib/convert-snake-to-camel-case';

interface RequestTokenInfo {
  success: boolean;
  expiresAt: string;
  requestToken: string;
}

interface NewSession {
  success: boolean;
  sessionId: string;
}

interface UserAccountInfo {
  id: number;
  username: string;
}

const loginRepository = {
  createRequestToken: async (): Promise<RequestTokenInfo> =>
    umbraApi.get('authentication/token/new').then((res) => convertSnakeToCamelCase(res.data)),
  createSession: async ({ requestToken }: { requestToken: string }): Promise<NewSession> =>
    umbraApi
      .post('authentication/session/new', {
        request_token: requestToken,
      })
      .then((res) => convertSnakeToCamelCase(res.data)),
  getAccount: async ({ sessionId }: { sessionId: string }): Promise<UserAccountInfo> =>
    umbraApi.get(`account?session_id=${sessionId}`).then((res) => convertSnakeToCamelCase(res.data)),
};

export { loginRepository };
export type { RequestTokenInfo, NewSession, UserAccountInfo };
